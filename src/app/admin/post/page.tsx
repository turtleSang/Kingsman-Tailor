"use client";
import Image from "next/image";
import NotFound from "@/components/not-found";
import LargeCardSkeleton from "@/components/skeleton/LargeCardSkeleton";
import { Post } from "@/generated/prisma";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPostPage() {
  const [listPost, setListPost] = useState<Post[]>([]);
  const [canShowMore, setCanShowMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getListPost = async (page: number) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/post`;
    setIsLoading(true);
    try {
      const res = await axios.get(url, { params: { page } });
      const data = res.data as { listPost: Post[]; hasMore: boolean };
      if (page === 1) {
        setListPost(data.listPost);
      } else {
        setListPost((val) => {
          return [...val, ...data.listPost];
        });
      }
      setCanShowMore(data.hasMore);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return;
    }
  };
  useEffect(() => {
    getListPost(page);
  }, []);

  return (
    <div>
      {isLoading && <LargeCardSkeleton />}
      {!isLoading && listPost.length === 0 && <NotFound title="404 post" />}
      {listPost.map((item) => {
        return (
          <div
            className="flex flex-row justify-start items-center  bg-secondary p-3 rounded-lg"
            key={item.id}
          >
            <div className="aspect-video relative w-1/3">
              <Image
                src={`/${item.thumnail}`}
                fill={true}
                alt={item.title || ""}
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
                  Tiêu đề:
                </span>
                <p className="w-8/12">{item.title}</p>
              </div>
              <div className="flex flex-row">
                <span className="text-white text-sm md:text-base w-4/12">
                  Tóm tắt:
                </span>
                <p className="w-8/12 wrap-anywhere">
                  {item.excerpt || "Không có"}
                </p>
              </div>
              <div className="text-center mt-2">
                <Link
                  className="inline-block text-black border-2 p-2 bg-primary rounded-xl"
                  href={`post/update/${item.link}`}
                >
                  Chỉnh sửa
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      {canShowMore && (
        <div className="mt-5 flex justify-center">
          <button
            className="button-normal"
            onClick={() => {
              const pageNumber = page + 1;
              setPage(pageNumber);
              getListPost(pageNumber);
            }}
          >
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
}
