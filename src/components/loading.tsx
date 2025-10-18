"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute w-full h-full top-1/2 left-1/2 -translate-1/2 z-50 bg-secondary/50">
      <div className="absolute w-1/3 top-1/2 left-1/2 -translate-1/2">
        <div className="relative aspect-square">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full w-full top-0 left-0 h-full bg-linear-to-r from-background to-primary z-0"
          ></motion.div>
          <div className="absolute rounded-full  w-11/12 h-11/12 top-1/2 left-1/2 -translate-1/2 z-10 bg-background"></div>
          <div className="absolute w-9/12 h-9/12 top-1/2 left-1/2 -translate-1/2 z-20">
            <Image src={"/logo.png"} alt="Logo" fill />
          </div>
        </div>
      </div>
    </div>
  );
}
