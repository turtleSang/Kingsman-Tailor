import Image from "next/image";
import Link from "next/link";
import { formatCurrency, truncateWords } from "../../../libs/helper-client";

export interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  link: string;
  price: number;
  thumbnail: string;
  category: { id: number; link: string; name: string };
}

export default function ProductCard({
  category,
  description,
  id,
  link,
  name,
  price,
  thumbnail,
}: ProductCardProps) {
  return (
    <Link
      className="group block relative rounded-sm overflow-hidden"
      href={`/san-pham/${category.link}/${link}`}
    >
      <div className="relative aspect-square">
        <Image src={`/${thumbnail}`} fill alt={name} />
      </div>
      <div className="bg-secondary/75 lg:absolute lg:w-full lg:bottom-0 lg:left-0 p-2 lg:translate-y-2/3 group-hover:translate-y-0 duration-200">
        <h3 className=" uppercase text-base">{truncateWords(name, 4)}</h3>
        <h4 className="text-primary text-right text-xs">
          {formatCurrency(price)} <sup className="text-xs">VNĐ</sup>
        </h4>
        <p className="text-justify">{truncateWords(description, 4)}</p>
      </div>
    </Link>
  );
}
