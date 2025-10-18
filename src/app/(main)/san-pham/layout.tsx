import ProductNav from "@/components/product/product-nav";
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

export default function LayoutPageProduct({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-20">
      <div className="grid lg:grid-cols-4 gap-3 px-3">
        <div className="lg:col-span-1 border-2 border-border rounded-md p-3">
          <ProductNav />
        </div>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}
