import { ProductDetailProps } from "@/components/product/product-detail";
import axios from "axios";
import { Metadata } from "next";

export async function generateMetaData({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/product/detail/`;
  const res = await axios.get(url, { params: { product } });
  const productProps = res.data as ProductDetailProps;

  const metadata: Metadata = {
    title: `${productProps.name} | Cửa hàng của tôi`,
    description: productProps.description,
    openGraph: {
      title: productProps.name,
      description: productProps.description,
      images: [
        {
          url: `/${productProps.thumbnail}` || "/default.jpg",
          width: 800,
          height: 600,
          alt: productProps.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productProps.name,
      description: productProps.description,
      images: [`/${productProps.thumbnail}`],
    },
  };
  console.log(metadata);

  return metadata;
}

export default function LayoutProduct({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
