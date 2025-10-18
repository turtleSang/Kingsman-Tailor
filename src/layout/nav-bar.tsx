"use client";
import Logo from "@/components/nav-bar/logo";
import NavLinkGroup from "@/components/nav-bar/nav-link-group";
import useScrollDirection from "@/hook/useScrollDirection";
import clsx from "clsx";
import { motion, Variants } from "motion/react";
import { useEffect, useState } from "react";

export default function NavBarMain() {
  const { scrollDir, isAtTop } = useScrollDirection(100);
  const [acitveNavBar, setActiveNavBar] = useState<"show" | "hidden">("show");

  const variants: Variants = {
    show: { y: 0, opacity: 1 },
    hidden: { y: "-100%", opacity: 0 },
  };

  useEffect(() => {
    if (!isAtTop && scrollDir === "down") {
      setActiveNavBar("hidden");
    } else {
      setActiveNavBar("show");
    }
  }, [scrollDir]);

  return (
    <motion.nav
      variants={variants}
      initial="show"
      animate={acitveNavBar}
      transition={{ duration: 0.2 }}
      className={clsx(
        "p-2 flex flex-row justify-around items-center fixed w-full duration-200 z-30",
        isAtTop ? "bg-transparent" : "bg-secondary"
      )}
    >
      <Logo />
      <NavLinkGroup />
    </motion.nav>
  );
}
