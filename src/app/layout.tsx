import type { Metadata } from "next";
import { Inter, Montserrat, EB_Garamond } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
});

export const LogoFont = EB_Garamond({
  subsets: ["vietnamese"],
  weight: ["500", "600", "700"],
});

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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable}`}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
