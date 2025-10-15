import NotFound from "@/components/not-found";
import LargeCardSkeleton from "@/components/skeleton/LargeCardSkeleton";
import { Banner } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function PageBannerAdmin() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/banner`;
  const data = await fetch(url);
  const result = await data.json();

  if (!result.listBanner) {
    return (
      <NotFound title="Not Found 404" description="Không tìm thấy banner nào" />
    );
  }

  const listBanner = result.listBanner as Banner[];

  if (listBanner.length == 0 || !result) {
    return (
      <NotFound title="Not Found 404" description="Không tìm thấy banner nào" />
    );
  }

  return (
    <div className="p-2 grid grid-cols-1 gap-3">
      {listBanner.map((item) => {
        return (
          <div
            className="flex flex-row justify-start items-center bg-secondary p-3 rounded-lg"
            key={item.id}
          >
            <div className="aspect-video relative w-1/3">
              <Image
                src={`/${item.imageUrl}`}
                fill={true}
                alt={item.description || ""}
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
                  Mô tả:
                </span>
                <p className="w-8/12">{item.description}</p>
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
                  href={`banner/update/${item.id}`}
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
