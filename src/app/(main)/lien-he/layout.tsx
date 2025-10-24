import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ - Kingsman Tailor",
  description:
    "Liên hệ Kingsman Tailor để được tư vấn và đặt lịch may đo trang phục nam cao cấp. Đội ngũ chuyên nghiệp, dịch vụ tận tâm, chất lượng vượt trội.",
};

export default function LayoutContact({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-20">{children}</div>;
}
