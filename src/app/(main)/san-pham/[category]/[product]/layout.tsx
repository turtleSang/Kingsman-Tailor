import { ProductDetailProps } from "@/components/product/product-detail";

import { Metadata } from "next";
import { prisma } from "../../../../../../libs/prisma";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product } = await params;
  const productFinded = await prisma.product.findUnique({
    where: { link: product },
  });

  if (!productFinded) {
    return {
      title: "Sản phẩm không tồn tại - Kingsman Tailor",
      description: "Sản phẩm bạn đang tìm kiếm không tồn tại.",
    };
  }
  return {
    title: `${productFinded.name}`,
    description: productFinded.description,
    openGraph: {
      title: productFinded.name,
      description: productFinded.description || "Sản phẩm Kingsman",
      images: [
        {
          url: `/${productFinded.thumbnail}` || "/default.jpg",
          width: 800,
          height: 600,
          alt: productFinded.name,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const productList = await prisma.product.findMany({
    select: { link: true },
  });
  return productList.map((item) => ({
    product: item.link,
  }));
}

export default function LayoutProduct({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
