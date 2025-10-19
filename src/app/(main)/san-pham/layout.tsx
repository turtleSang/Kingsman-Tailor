import ProductNav from "@/components/product/product-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Sản phẩm Tại Kingsman Tailor",
    template: "%s |Kingsman Tailor",
  },
  description:
    "May đo âu phục, vest, suit, tuxedo cao cấp tại Thành phố Hồ Chí Minh. Thiết kế và cắt may thủ công, vừa vặn hoàn hảo theo phong cách độc quyền của quý khách.",
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
