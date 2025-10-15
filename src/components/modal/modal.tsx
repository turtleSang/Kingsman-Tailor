"use client";
import {
  ButtonHTMLAttributes,
  createContext,
  HTMLAttributes,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export interface ModalPops {
  data: React.ReactNode;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  buttonTxt: string | React.ReactNode;
}

export interface ModalContextProps {
  setCloseModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export default function Modal({ data, buttonProps, buttonTxt }: ModalPops) {
  const [isOpenModal, setOpenModal] = useState(false);

  const OpenModal = () => {
    setOpenModal(true);
  };

  const CloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ModalContext.Provider value={{ setCloseModal: CloseModal }}>
        <button type="button" {...buttonProps} onClick={OpenModal}>
          {buttonTxt}
        </button>
        <AnimatePresence>
          {isOpenModal && (
            <motion.div
              className="fixed top-0 left-0 w-full h-[100vh] z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-text-primary z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={CloseModal}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0.5, translateY: "-100%" }}
                animate={{ opacity: 1, translateY: "-70%" }}
                exit={{ opacity: 0, translateY: "100%" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 z-30 bg-secondary rounded-3xl w-3/4"
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="button-circle "
                    onClick={CloseModal}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
                <div className="p-3 max-h-96 overflow-y-auto">{data}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalContext.Provider>
    </>
  );
}
