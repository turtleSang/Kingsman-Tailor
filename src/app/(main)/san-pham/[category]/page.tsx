import ListProduct from "@/components/product/list-product";
import ListProductCardSkeleton from "@/components/skeleton/ListProductCardSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Các sản phẩm của Kingsman - Tailor",
  description:
    "May đo âu phục, vest, suit, tuxedo cao cấp tại Thành phố Hồ Chí Minh. Thiết kế và cắt may thủ công, vừa vặn hoàn hảo theo phong cách độc quyền của quý khách.",
  keywords: [
    "âu phục may đo",
    "bespoke suit",
    "vest cao cấp",
    "may đo tuxedo",
    "thiết kế vest riêng",
    "thợ may thủ công",
  ],
  openGraph: {
    title: "Âu Phục May Đo Bespoke - Thiết Kế Veston Độc Quyền - Kingsman",
    description:
      "Các sản phẩm của Kingsman - Tailo, cắt may thủ công để tạo nên bộ suit vừa vặn hoàn hảo, thể hiện phong cách riêng của bạn.",
    type: "website",
    locale: "vi-VN",
    images: [{ url: "/default.jpg", width: 1280, height: 720 }],
  },
};

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
