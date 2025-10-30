import ListProduct from "@/components/product/list-product";
import ListProductCardSkeleton from "@/components/skeleton/ListProductCardSkeleton";
import { Metadata } from "next";
import { prisma } from "../../../../../libs/prisma";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  const cate = await prisma.category.findFirst({ where: { link: category } });

  return {
    title: cate ? cate.name : "Sản phẩm của Kingsman Tailor",
    description: "Các sản phẩm chất lượng cao của kingsman tailor",
    openGraph: {
      type: "website",
      images: [
        {
          url: cate ? `/${cate.urlImg}` : "/default.jpg",
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const categoryList = await prisma.category.findMany({
    select: { link: true },
  });
  return categoryList.map((item) => ({ category: item.link }));
}

export default async function PageProductByCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <div>
      <ListProduct urlLink={category} />
    </div>
  );
}
