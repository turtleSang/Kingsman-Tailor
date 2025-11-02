"use client";

import { LogoFont } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";

export interface CardPostProps {
  thumbnail: string;
  title: string;
  excerpt: string;
  link: string;
}

export default function CardPost({
  excerpt,
  thumbnail,
  title,
  link,
}: CardPostProps) {
  return (
    <Link
      href={`/tin-tuc/${link}`}
      className="flex flex-col  lg:flex-row bg-secondary hover:bg-secondary-hover duration-200 gap-3 rounded-md overflow-hidden items-center"
    >
      <div className="relative aspect-video w-full lg:w-1/2">
        <Image
          src={`/${thumbnail}`}
          fill
          alt={title}
          sizes="(max-width: 1200px) 80vw, 40vw"
        />
      </div>
      <div className="p-3 w-full lg:w-1/2">
        <h2 className={LogoFont.className}>{title}</h2>
        <p>{excerpt}</p>
      </div>
    </Link>
  );
}
