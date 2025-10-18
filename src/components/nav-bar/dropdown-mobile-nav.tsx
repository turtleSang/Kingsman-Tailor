import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageLink } from "./nav-link-group";
import Link from "next/link";
import clsx from "clsx";
import { useCategory } from "../../../libs/fetch";
import Loading from "../loading";
import { useEffect, useState } from "react";
import NotFound from "../not-found";
import { AnimatePresence, motion } from "motion/react";

export default function DropDownMobile({
  activeTab,
  link,
  name,
  type,
  setActiveMenu,
}: {
  activeTab: string;
  setActiveMenu: (isActive: boolean) => void;
} & PageLink) {
  const { categories, error, isLoading } = useCategory();
  const [activeDrop, setActiveDrop] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <Link
          className={clsx(
            "block p-5 text-xl capitalize mb-2",
            activeTab === link && "text-primary"
          )}
          href={link}
          key={link}
          onClick={() => setActiveMenu(false)}
        >
          {name}
        </Link>
        <button
          className="ml-10 text-text-primary p-5 mb-2"
          onClick={() => setActiveDrop(!activeDrop)}
        >
          <motion.span
            className="inline-block"
            animate={activeDrop ? { rotate: 180 } : { rotate: 0 }}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </motion.span>
        </button>
      </div>
      <AnimatePresence>
        {activeDrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            {isLoading && <Loading />}
            {error && <NotFound />}
            {categories &&
              categories.length > 0 &&
              categories.map((cate) => {
                return (
                  <Link
                    className={clsx(
                      "block mb-1 pl-10 py-1 text-xl capitalize "
                    )}
                    href={`/product/${cate.link}`}
                    key={cate.id}
                    onClick={() => {
                      setActiveMenu(false);
                    }}
                  >
                    - {cate.name}
                  </Link>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
