"use client";
import { useEffect, useState } from "react";
import ProductCard, { ProductCardProps } from "./product-card";
import axios from "axios";
import NotFound from "../not-found";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

export default function ListProduct({ urlLink }: { urlLink?: string }) {
  const [listProduct, setListProduct] = useState<ProductCardProps[]>([]);
  const [canShowMore, setCanShowMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getListProduct = async (page: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_API_URL}/product`;
    if (urlLink) {
      url = `${url}/category/${urlLink}`;
    }
    try {
      const res = await axios.get(url, { params: { page } });

      const data = res.data as {
        listProduct: ProductCardProps[];
        hasMore: boolean;
      };

      if (page === 1) {
        setListProduct(data.listProduct);
      } else {
        setListProduct((val) => {
          return [...val, ...data.listProduct];
        });
      }
      setCanShowMore(data.hasMore);
      setIsLoading(false);
    } catch (error) {
      setCanShowMore(false);
      setIsLoading(false);
      setListProduct([]);
    }
  };

  useEffect(() => {
    getListProduct(page);
  }, []);

  return (
    <>
      {listProduct.length === 0 && !isLoading && (
        <NotFound
          title="404 Not found"
          description="Không có sản phẩm nào để hiển thị"
        />
      )}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {listProduct.length > 0 &&
          listProduct.map((product) => {
            return (
              <ProductCard
                key={`product-${product.id}`}
                category={product.category}
                description={product.description}
                id={product.id}
                name={product.name}
                link={product.link}
                price={product.price}
                thumbnail={product.thumbnail}
              />
            );
          })}
        {isLoading && <ProductCardSkeleton />}
      </div>
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
    </>
  );
}
