import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin Tức Thời Trang Nam & Suit Cao Cấp | Kingsman Tailor",
  description:
    "Cập nhật xu hướng thời trang nam, phong cách suit cao cấp, bí quyết phối đồ và câu chuyện may đo từ Kingsman Tailor – thương hiệu may suit đẳng cấp tại Việt Nam.",
  openGraph: {
    title: "Tin Tức Thời Trang Nam & Suit Cao Cấp | Kingsman Tailor",
    description:
      "Khám phá xu hướng suit nam, bí quyết phối đồ và phong cách may đo chuẩn quý ông từ Kingsman Tailor.",
    url: `${process.env.NEXT_PUBLIC_URL}/tin-tuc`,
    images: [
      {
        url: "/default.jpg",
        width: 1200,
        height: 630,
        alt: "Kingsman Tailor - Tin tức thời trang nam cao cấp",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function LayoutPost({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-20 w-10/12 mx-auto">{children}</div>;
}
