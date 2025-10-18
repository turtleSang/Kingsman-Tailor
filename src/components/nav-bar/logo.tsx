"use client";
import { LogoFont } from "@/app/layout";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flex flex-start items-center justify-start">
      <motion.div
        initial={{
          opacity: 0,
          translateX: -20,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={"/logo.png"}
          alt="Logo Kingsman Tailor"
          width={50}
          height={50}
        />
      </motion.div>

      <motion.span
        initial={{
          opacity: 0,
          translateX: 20,
        }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className={clsx(
          "ml-2 uppercase text-primary text-3xl md:text-xl lg:text-3xl",
          LogoFont.className
        )}
      >
        ingsman
      </motion.span>

      <motion.span
        initial={{
          opacity: 0,
          translateX: 20,
        }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={clsx(
          "ml-2 uppercase text-primary hidden lg:inline-block md:text-2xl lg:text-3xl",
          LogoFont.className
        )}
      >
        -
      </motion.span>

      <motion.span
        initial={{
          opacity: 0,
          translateX: -20,
        }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className={clsx(
          "ml-2 uppercase text-primary hidden lg:inline-block md:text-xl lg:text-3xl",
          LogoFont.className
        )}
      >
        tailor
      </motion.span>
    </Link>
  );
}
