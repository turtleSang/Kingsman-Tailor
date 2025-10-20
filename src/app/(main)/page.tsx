import Image from "next/image";
import type { Metadata } from "next";
import BannerItem from "@/components/banner/banner-item";
import Slider from "@/components/banner/slider";
import ProductNewMainPage from "@/layout/product-new-main-page";
import CategoryListMainPage from "@/layout/category-list-main-page";
import Loading from "@/components/loading";
import FeedBackListMainPage from "@/layout/feedback-list-main-page";
import IntroMainPage from "@/layout/intro-main-page";

export const metadata: Metadata = {
  title: "Kingsman - Âu Phục May Đo Cao Cấp",
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
      "May đo âu phục cao cấp, sử dụng vải Ý/Anh, cắt may thủ công để tạo nên bộ suit vừa vặn hoàn hảo, thể hiện phong cách riêng của bạn.",
    type: "website",
    locale: "vi-VN",
    images: [{ url: "/default.jpg", width: 1280, height: 720 }],
  },
};

export default function Home() {
  return (
    <div className="">
      <Slider />
      <CategoryListMainPage />
      <IntroMainPage />
      <ProductNewMainPage />
      <FeedBackListMainPage />
    </div>
  );
}
