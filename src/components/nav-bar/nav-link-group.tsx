"use client";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DropdownNav from "./dropdown-nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import DropDownMobile from "./dropdown-mobile-nav";

export interface PageLink {
  name: string;
  link: string;
  type: "normal" | "dropdown";
}

const MainPageLink: PageLink[] = [
  { link: "/", name: "trang chủ", type: "normal" },
  { link: "/gioi-thieu", name: "giới thiệu", type: "normal" },
  { link: "/san-pham", name: "sản phẩm", type: "dropdown" },
  { link: "/feedback", name: "Khách hàng", type: "normal" },
  { link: "/lien-he", name: "Liên hệ", type: "normal" },
  { link: "/tin-tuc", name: "Tin Tức", type: "normal" },
];
export default function NavLinkGroup() {
  const pathName = usePathname();
  const [activeTab, setTab] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    const listPath = pathName.split("/");
    if (listPath[1]) {
      setTab(`/${listPath[1]}`);
    } else {
      setTab("/");
    }
  }, [pathName]);

  return (
    <>
      <div className="hidden md:grid grid-cols-6 gap-3">
        {MainPageLink.map((item) => {
          if (item.type === "normal") {
            return (
              <Link
                href={item.link}
                key={item.link}
                className="block text-center hover:text-primary duration-200"
              >
                <span
                  className={clsx(
                    "uppercase p-1 relative text-xs lg:text-base",
                    activeTab === item.link && "text-primary"
                  )}
                >
                  {item.name}
                  {activeTab === item.link && (
                    <motion.div
                      layoutId="underline"
                      id="underline"
                      className="absolute -bottom-2 left-0 w-full h-1 bg-primary-dark rounded-md"
                    ></motion.div>
                  )}
                </span>
              </Link>
            );
          } else {
            return <DropdownNav activeTab={activeTab} key={item.link} />;
          }
        })}
      </div>
      <div className="block md:hidden">
        <button
          className="absolute z-50 top-5"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <AnimatePresence>
            {activeMenu && (
              <motion.span
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{ duration: 0.3 }}
                className="text-2xl absolute text-primary hover:text-primary-dark"
                key={2}
              >
                <FontAwesomeIcon icon={faClose} />
              </motion.span>
            )}
            {!activeMenu && (
              <motion.span
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{ duration: 0.3 }}
                className="text-2xl absolute text-primary hover:text-primary-dark"
                key={1}
              >
                <FontAwesomeIcon icon={faBars} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <AnimatePresence>
          {activeMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                className="fixed top-0 left-0 bg-secondary-hover w-full h-full z-40 opacity-30"
                onClick={() => setActiveMenu(false)}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0, translateX: "100%" }}
                animate={{ opacity: 1, translateX: "0" }}
                exit={{ opacity: 0, translateX: "100%" }}
                className="fixed top-0 right-0 w-2/3 h-full overflow-y-auto bg-border rounded-l-md z-40 "
              >
                <div className="h-[100vh] overflow-y-auto flex flex-col justify-end pl-10 pb-20">
                  {MainPageLink.map((val) => {
                    if (val.type == "normal") {
                      return (
                        <Link
                          className={clsx(
                            "block p-5 text-xl capitalize mb-2",
                            activeTab === val.link && "text-primary"
                          )}
                          href={val.link}
                          key={val.link}
                          onClick={() => setActiveMenu(false)}
                        >
                          {val.name}
                        </Link>
                      );
                    } else {
                      return (
                        <DropDownMobile
                          activeTab={activeTab}
                          name={val.name}
                          link={val.link}
                          type={"dropdown"}
                          key={val.link}
                          setActiveMenu={setActiveMenu}
                        />
                      );
                    }
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
