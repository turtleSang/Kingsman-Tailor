"use client";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, truncateWords } from "../../../libs/helper-client";
import { ProductCardProps } from "./product-card";
import { motion } from "motion/react";

export default function ProductCardMainPage({
  category,
  description,
  id,
  link,
  name,
  price,
  thumbnail,
  index,
}: { index: number } & ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 10 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 0.2 + 0.05 * index }}
    >
      <Link
        className="group block relative rounded-sm overflow-hidden"
        href={`/san-pham/${category.link}/${link}`}
      >
        <div className="relative aspect-square">
          <Image src={`/${thumbnail}`} fill alt={name} />
        </div>
        <div className="bg-secondary/75 lg:absolute lg:w-full lg:bottom-0 lg:left-0 p-2 lg:translate-y-2/3 group-hover:translate-y-0 duration-200">
          <h3 className="uppercase text-base text-nowrap md:text-2xl lg:text-xl">
            {truncateWords(name, 5)}
          </h3>
          <h4 className="text-primary text-right">
            <span className="text-base md:text-2xl">
              {formatCurrency(price)}
            </span>{" "}
            <sup className="text-xs">VNĐ</sup>
          </h4>
          <p className="text-justify text-nowrap">
            {truncateWords(description, 5)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
