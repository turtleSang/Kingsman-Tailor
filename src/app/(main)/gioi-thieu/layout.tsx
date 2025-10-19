import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kingsman Tailor - May đo Âu phục & Vest cao cấp",
  description:
    "Kingsman Tailor chuyên may đo Âu phục, vest, sơ mi, quần âu cao cấp cho quý ông. Dịch vụ may đo chuẩn Ý – tôn dáng, sang trọng và đẳng cấp.",
  keywords: [
    "Kingsman Tailor",
    "may đo vest",
    "vest nam cao cấp",
    "Âu phục nam",
    "may đo theo số đo",
    "vest cưới",
    "vest công sở",
    "áo sơ mi nam",
    "quần tây nam",
  ],
  authors: [{ name: "Kingsman Tailor", url: process.env.NEXT_PUBLIC_URL }],
  creator: "Thanh Sang",
  publisher: "Kingsman Tailor",
  openGraph: {
    title: "Kingsman Tailor - May đo Âu phục & Vest cao cấp",
    description:
      "Kingsman Tailor – địa chỉ may đo vest và Âu phục cao cấp hàng đầu. Phong cách lịch lãm, chuẩn quý ông hiện đại.",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "Kingsman Tailor",
    images: [
      {
        url: "/default.jpg",
        height: 630,
        alt: "Kingsman Tailor - May đo vest cao cấp",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function LayoutContact({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-20">{children}</div>;
}
