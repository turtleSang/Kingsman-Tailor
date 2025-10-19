import { motion, Variants } from "motion/react";
import Image from "next/image";

const shape: React.CSSProperties = {
  strokeWidth: 5,
  strokeLinecap: "round",
  fill: "transparent",
};

export interface ProcessItemProps {
  title: string;
  description: string;
  image: string;
  isEnd: boolean;
}

export default function ProcessItem({
  description,
  image,
  isEnd,
  title,
}: ProcessItemProps) {
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
    <div className="">
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
          <motion.line />
        </motion.svg>
        <div className="aspect-video w-11/12 absolute top-1/2 left-1/2 -translate-1/2 ">
          <Image src={`/${image}`} alt={title} fill />
        </div>
      </div>
      <div className="p-3">
        <h2 className="text-center">{title}</h2>
        <p className="text-justify">{description}</p>
      </div>
      {!isEnd && (
        <motion.svg
          viewBox="0 0 600 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.line
            x1={300}
            x2={300}
            y1={0}
            y2={100}
            stroke="#f5b400"
            style={{ strokeWidth: 5 }}
            variants={draw}
            initial="hidden"
            whileInView="visible"
            custom={0}
          />
        </motion.svg>
      )}
    </div>
  );
}
