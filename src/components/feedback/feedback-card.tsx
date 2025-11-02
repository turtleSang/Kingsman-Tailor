import { LogoFont } from "@/app/layout";
import clsx from "clsx";
import Image from "next/image";
import { truncateWords } from "../../../libs/helper-client";

export interface FeedBackCardProps {
  id: number;
  image: string;
  customerName: string;
  feedback: string;
}

export default function FeedBackCard({
  feedback,
  customerName,
  image,
}: FeedBackCardProps) {
  return (
    <div className="bg-secondary rounded-md overflow-hidden">
      <div className="relative aspect-video">
        <Image
          alt={`customer ${customerName} feedback`}
          fill
          sizes="70vw"
          src={`/${image}`}
        />
      </div>
      <div className="px-16 pb-5 mt-3 ">
        <h3
          className={clsx(
            "text-xl md:text-3xl text-primary-dark",
            LogoFont.className
          )}
        >
          Khách hàng {customerName}
        </h3>
        <p className="">
          <span className="text-xs md:text-xl">
            "{truncateWords(feedback, 30)} "
          </span>
        </p>
      </div>
    </div>
  );
}
