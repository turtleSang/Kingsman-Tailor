import { LogoFont } from "@/app/layout";
import NotFound from "@/components/not-found";
import { ProductCardProps } from "@/components/product/product-card";
import ProductCardMainPage from "@/components/product/product-card-main-page";
import clsx from "clsx";
import Link from "next/link";
import { prisma } from "../../libs/prisma";
import { pageSize } from "../../libs/constance";

export const revalidate = 60;

export default async function ProductNewMainPage() {
  try {
    const list = await prisma.product.findMany({
      skip: 0,
      take: pageSize,
      orderBy: { updatedAt: "desc" },
      include: { category: true },
    });
    const listProductNew = list as ProductCardProps[];

    return (
      <div className="mt-10">
        <h2
          className={clsx(
            "text-center uppercase  w-8/12 mx-auto",
            LogoFont.className
          )}
        >
          Sản Phẩm mới
        </h2>
        <p className="mt-4 text-lg max-w-2xl text-center mx-auto mb-4">
          Khám phá bộ sưu tập Kingsman mới nhất, nơi tinh hoa may đo Savile Row
          được nâng tầm với các chất liệu len và mohair cao cấp, cùng phom dáng
          Double-Breasted kinh điển cho quý ông hiện đại.
        </p>
        <div className="w-10/12 mx-auto">
          {(!listProductNew || listProductNew.length === 0) && (
            <NotFound title="404 Không tìm thấy sản phẩm nào" />
          )}
        </div>
        <div className="w-11/12 mx-auto grid grid-cols-2 lg:grid-cols-3  gap-3">
          {listProductNew &&
            listProductNew.length > 0 &&
            listProductNew.map((product, index) => {
              return (
                <ProductCardMainPage
                  key={`${product.category.id}-${product.id}`}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  link={product.link}
                  price={product.price}
                  thumbnail={product.thumbnail}
                  category={product.category}
                  index={index}
                />
              );
            })}
        </div>
        <div className="flex justify-center mt-5">
          <Link href={`/san-pham`} className="button-outline">
            Xem Thêm Sản Phẩm
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="w-10/12 mx-auto">
        <NotFound title="404 Không tìm thấy sản phẩm nào" />
      </div>
    );
  }
}
