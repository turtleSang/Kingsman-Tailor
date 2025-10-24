import Image from "next/image";
import Link from "next/link";

export interface CategoryCardProps {
  id: number;
  name: string;
  link: string;
  urlImg: string;
}

export default function CategoryCard({
  id,
  link,
  name,
  urlImg,
}: CategoryCardProps) {
  return (
    <Link
      className="block rounded-sm overflow-hidden bg-secondary hover:bg-secondary-hover hover:scale-105 duration-200"
      href={`/san-pham/${link}`}
    >
      <div className="relative aspect-video">
        <Image
          src={`/${urlImg}`}
          alt={`Danh mục sản phẩm ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <h3 className="text-xl text-center uppercase text-primary py-2">
        {name}
      </h3>
    </Link>
  );
}
