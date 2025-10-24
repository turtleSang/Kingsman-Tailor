"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { truncateWords } from "../../../libs/helper-client";

export default function BannerItem({
  imageUrl,
  link,
  description,
}: {
  imageUrl: string;
  link: string;
  description: string;
}) {
  return (
    <div className="relative w-full aspect-video max-h-[100vh]">
      <div className="absolute aspect-video w-full z-0">
        <Image
          alt=""
          src={`/${imageUrl}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-0 left-0 z-10 bg-black w-full h-full opacity-20"></div>
        <div className="absolute bottom-0 lg:bottom-50 left-3  z-40 bg-black/50 hover:bg-primary/50 p-3 rounded-md duration-200">
          <Link
            href={link}
            className=" text-sm text-white text-justify md:text-base lg:text-xl"
          >
            <span className="uppercase">{truncateWords(description, 10)}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
