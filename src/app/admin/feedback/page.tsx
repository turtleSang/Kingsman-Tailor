"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LargeCardSkeleton from "@/components/skeleton/LargeCardSkeleton";

interface Feedback {
  id: number;
  image: string;
  customerName: string;
  feedback: string;
}

export default function PageFeedbackAdmin() {
  const [listFeedBack, setListFeedBack] = useState<Feedback[]>([]);
  const [canShowMore, setCanShowMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getListFeedBack = async (page: number) => {
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/feedback`;
    const res = await axios.get(url, { params: { page } });
    const data = res.data as { listFeedback: Feedback[]; hasMore: boolean };

    if (page === 1) {
      setListFeedBack(data.listFeedback);
    } else {
      setListFeedBack((val) => {
        return [...val, ...data.listFeedback];
      });
    }
    setCanShowMore(data.hasMore);
    setIsLoading(false);
  };

  useEffect(() => {
    getListFeedBack(page);
  }, []);

  return (
    <div className="my-5 grid grid-cols-1 gap-3">
      {listFeedBack.map((item) => {
        return (
          <div
            className="flex flex-row justify-start items-center  bg-secondary p-3 rounded-lg"
            key={item.id}
          >
            <div className="aspect-video relative w-1/3">
              <Image
                src={`/${item.image}`}
                fill={true}
                alt={item.customerName || ""}
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
                  Tên Khách hàng:
                </span>
                <p className="w-8/12">{item.customerName}</p>
              </div>
              <div className="flex flex-row">
                <span className="text-white text-sm md:text-base w-4/12">
                  Feedback:
                </span>
                <p className="w-8/12 wrap-anywhere">
                  {item.feedback || "Không có"}
                </p>
              </div>
              <div className="text-center mt-2">
                <Link
                  className="inline-block text-black border-2 p-2 bg-primary rounded-xl"
                  href={`feedback/update/${item.id}`}
                >
                  Chỉnh sửa
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      {isLoading && <LargeCardSkeleton />}
      {canShowMore && (
        <div className="mt-5 flex justify-center">
          <button
            className="button-normal"
            onClick={() => {
              const pageNumber = page + 1;
              setPage(pageNumber);
              getListFeedBack(pageNumber);
            }}
          >
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
}
