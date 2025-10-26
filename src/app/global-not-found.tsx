import Logo from "@/components/nav-bar/logo";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Metadata } from "next";
import { LogoFont } from "./layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Kingsman Tailor",
  description: "Trang bạn tìm không tồn tại",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="h-[100vh] flex justify-center items-center">
          <div className="text-center border-2 border-border p-10 rounded-md md:w-1/2 flex flex-col justify-center items-center">
            <Logo />
            <h2>
              <FontAwesomeIcon icon={faBan} />
              <span className="block">404</span>
            </h2>
            <h3
              className={clsx("text-3xl text-primary-dark", LogoFont.className)}
            >
              Trang không tìm thấy
            </h3>
            <p className="my-5">
              Xin lỗi quý khách, trang quý khách tìm không tồn tại!!
            </p>
            <Link className="button-normal inline-block" href={"/"}>
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
