"use client";

import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export interface InputDropdown {
  labelName: string;
  listValue: { id: number; name: string; link: string; urlImg: string }[];
  defaultValue: number;
  handleValue: (id: number) => void;
}
export default function InputDropDown({
  labelName,
  listValue,
  defaultValue,
  handleValue,
}: InputDropdown) {
  const [nameSelected, setNameSelected] = useState<string>("Chọn danh mục");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: number, name: string) => {
    handleValue(id);
    setNameSelected(name);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const selected = listValue.find((val) => val.id === defaultValue);
    if (selected?.name) {
      setNameSelected(selected.name);
    }
  }, []);

  return (
    <div className="relative my-3 z-10">
      <span>{labelName}</span>
      <div>
        <button className="button-normal" onClick={handleOpen}>
          {nameSelected} <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ translateY: -10, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -10, opacity: 0 }}
            className="grid grid-cols-1 gap-3 bg-secondary absolute p-7 rounded-md"
          >
            {listValue.map((item) => {
              return (
                <span
                  className="text-center inline-block p-3 hover:bg-primary-dark duration-200 cursor-pointer rounded-md"
                  key={item.id}
                  onClick={() => handleSelect(item.id, item.name)}
                >
                  {item.name}
                </span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
