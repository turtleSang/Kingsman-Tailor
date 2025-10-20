"use client";
import { motion, Variants } from "motion/react";
import Image from "next/image";
import { ProcessItemProps } from "./process-item";
import { LogoFont } from "@/app/layout";
import clsx from "clsx";

const shape: React.CSSProperties = {
  strokeWidth: 5,
  strokeLinecap: "round",
  fill: "transparent",
};

export default function ProcessIntro() {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <div className="grid grid-cols-3 mt-5">
      <div className="relative">
        <motion.svg
          viewBox="0 0 600 338"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.rect
            x="0"
            y="0"
            width="600"
            height="338"
            stroke="#f5b400"
            style={shape}
            variants={draw}
            initial="hidden"
            whileInView="visible"
            custom={0}
          />
        </motion.svg>
        <div className="aspect-video w-11/12 absolute top-1/2 left-1/2 -translate-1/2 ">
          <Image
            src={`/intro/intro-page-1.jpg`}
            alt={"Cửa hàng Kingsman"}
            fill
          />
        </div>
      </div>
      <div>
        <motion.svg
          viewBox="0 0 600 338"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.line
            x1={0}
            x2={600}
            y1={169}
            y2={169}
            stroke="#f5b400"
            style={{ strokeWidth: 5 }}
            variants={draw}
            initial="hidden"
            whileInView="visible"
            custom={1}
          />
        </motion.svg>
      </div>
      <div className="relative">
        <motion.svg
          viewBox="0 0 600 338"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.rect
            x="0"
            y="0"
            width="600"
            height="338"
            stroke="#f5b400"
            style={shape}
            variants={draw}
            initial="hidden"
            whileInView="visible"
            custom={3}
          />
        </motion.svg>
        <div className="aspect-video w-11/12 absolute top-1/2 left-1/2 -translate-1/2 ">
          <Image
            src={`/intro/intro-page-2.jpg`}
            alt={"Đội ngũ Kingsman"}
            fill
          />
        </div>
      </div>
      <div>
        <h2
          className={clsx(
            "text-center capitalize w-8/12 mx-auto",
            LogoFont.className
          )}
        >
          2017
        </h2>
      </div>
      <div></div>
      <div>
        <h2
          className={clsx(
            "text-center capitalize w-8/12 mx-auto",
            LogoFont.className
          )}
        >
          Now
        </h2>
      </div>
    </div>
  );
}
