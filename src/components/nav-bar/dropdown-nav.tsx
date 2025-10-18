import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useCategory } from "../../../libs/fetch";
import Loading from "../loading";
import NotFound from "../not-found";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";

export default function DropdownNav({ activeTab }: { activeTab: string }) {
  const { categories, error, isLoading } = useCategory();
  const [activeDrop, setActiveDrop] = useState(false);
  return (
    <div
      className="relative text-center"
      onMouseEnter={() => {
        setActiveDrop(true);
      }}
      onMouseLeave={() => {
        setActiveDrop(false);
      }}
    >
      <Link
        className="block text-center hover:text-primary duration-200 relative"
        href={"/san-pham"}
      >
        <span
          className={clsx(
            "uppercase p-1 relative text-xs lg:text-base",
            activeTab === "/san-pham" && "text-primary"
          )}
        >
          Sản phẩm{" "}
          <motion.span
            animate={activeDrop ? { rotate: 180 } : { rotate: 0 }}
            className="hidden lg:inline-block ml-2 "
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </motion.span>
          {activeTab === "/san-pham" && (
            <motion.div
              layoutId="underline"
              id="underline"
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary-dark rounded-md"
            ></motion.div>
          )}
        </span>
      </Link>
      <AnimatePresence>
        {activeDrop && (
          <motion.div
            initial={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 10 }}
            className="absolute top-[130%] left-1/2 w-44 min-h-52 bg-secondary -z-20 -translate-x-1/2 rounded-md grid grid-cols-1 gap-3 p-3"
          >
            {error && <NotFound />}
            {isLoading && <Loading />}
            {categories &&
              categories.length > 0 &&
              categories.map((val) => {
                return (
                  <Link
                    key={val.id}
                    href={`/san-pham/${val.link}`}
                    className="capitalize text-text-primary hover:text-primary"
                  >
                    {val.name}
                  </Link>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
