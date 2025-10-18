"use client";

import LargeCardSkeleton from "@/components/skeleton/LargeCardSkeleton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../../libs/helper-client";
import NotFound from "@/components/not-found";

export interface Product {
  id: number;
  name: string;
  description: string;
  link: string;
  price: number;
  thumbnail: string;
  category: { name: string; id: number };
}

export default function PageProductAdmin() {
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [canShowMore, setCanShowMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getListProduct = async (page: number) => {
    setIsLoading(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/product`;
    const res = await axios.get(url, { params: { page } });
    const data = res.data as { listProduct: Product[]; hasMore: boolean };

    if (page === 1) {
      setListProduct(data.listProduct);
    } else {
      setListProduct((val) => {
        return [...val, ...data.listProduct];
      });
    }
    setCanShowMore(data.hasMore);
    setIsLoading(false);
  };

  useEffect(() => {
    getListProduct(page);
  }, []);

  return (
    <div className="my-5 grid grid-cols-1 gap-3">
      {listProduct.length === 0 && (
        <NotFound
          title="404 Not found"
          description="Không có sản phẩm nào để hiển thị"
        />
      )}
      {listProduct.map((item) => {
        console.log(item.thumbnail);
        return (
          <div
            className="flex flex-row justify-start items-center  bg-secondary p-3 rounded-lg"
            key={item.id}
          >
            <div className="aspect-video relative w-1/3">
              <Image
                src={`/${item.thumbnail}`}
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
                  Tên sản phẩm:
                </span>
                <p className="w-8/12">{item.name}</p>
              </div>
              <div className="flex flex-row">
                <span className="text-white text-sm md:text-base w-4/12">
                  Mô tả:
                </span>
                <p className="w-8/12">{item.description}</p>
              </div>
              <div className="flex flex-row">
                <span className="text-white text-sm md:text-base w-4/12">
                  Giá sản phẩm:
                </span>
                <p className="w-8/12 wrap-anywhere">
                  {formatCurrency(item.price) || "Không có"}
                </p>
              </div>
              <div className="flex flex-row">
                <span className="text-white text-sm md:text-base w-4/12">
                  Danh mục:
                </span>
                <p className="w-8/12">{item.category.name}</p>
              </div>
              <div className="text-center mt-2">
                <Link
                  className="inline-block text-black border-2 p-2 bg-primary rounded-xl"
                  href={`product/update/${item.link}`}
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
              getListProduct(pageNumber);
            }}
          >
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
}
