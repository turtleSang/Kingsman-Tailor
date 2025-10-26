import CardText from "@/components/CardText";
import NotFound from "@/components/not-found";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function PageCategoryAdmin() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/category`;
  const result = await axios.get(url);
  const listCategory = result.data as {
    id: number;
    name: string;
    link: string;
    urlImg: string;
  }[];

  return (
    <div className="grid grid-cols-1 gap-3">
      {listCategory.length === 0 && (
        <NotFound title="404 category" description="Không tìm thấy danh mục" />
      )}
      {listCategory.map((item) => {
        return (
          <div
            className="flex flex-row justify-start items-center bg-secondary p-3 rounded-lg"
            key={item.id}
          >
            <div className="aspect-video relative w-1/3">
              <Image
                src={`/${item.urlImg}`}
                fill={true}
                alt={item.name || ""}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="pl-5 w-2/3">
              <div className="flex flex-row">
                <span className="text-white text-sm md:text-base w-4/12">
                  ID:
                </span>
                <p className="w-8/12">{item.id}</p>
              </div>
              <div className="flex flex-row">
                <span className="text-white text-sm md:text-base w-4/12">
                  Tên mục:
                </span>
                <p className="w-8/12">{item.name}</p>
              </div>
              <div className="flex flex-row">
                <span className="text-white text-sm md:text-base w-4/12">
                  Link:
                </span>
                <p className="w-8/12 wrap-anywhere">
                  {item.link || "Không có"}
                </p>
              </div>
              <div className="text-center mt-2">
                <Link
                  className="inline-block text-black border-2 p-2 bg-primary rounded-xl"
                  href={`category/update/${item.id}`}
                >
                  Chỉnh sửa
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
