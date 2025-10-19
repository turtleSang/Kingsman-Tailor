"use client";
import { formatCurrency } from "../../../libs/helper-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import SilderProductImage from "./slider-product-image";
import clsx from "clsx";
import { LogoFont } from "@/app/layout";

export interface ProductDetailProps {
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  imagesUrl: { url: string }[];
}

export default function ProductDetail({
  description,
  imagesUrl,
  name,
  price,
  thumbnail,
}: ProductDetailProps) {
  let listImage = [thumbnail];
  imagesUrl.forEach((item) => {
    listImage = [...listImage, item.url];
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className=" relative p-3">
        <SilderProductImage images={listImage} name={`Sản phẩm ${name}`} />
      </div>
      <div className=" grid grid-cols-1 p-3">
        <h3
          className={clsx(
            LogoFont.className,
            "text-3xl md:text-5xl text-primary uppercase "
          )}
        >
          {name}
        </h3>
        <h3 className="text-primary-dark mt-3 text-xl md:text-3xl lg:text-5xl text-right">
          {formatCurrency(price)} <sup>VNĐ</sup>
        </h3>
        <p className="mt-3">{description}</p>
        <div className="text-center mt-3">
          <a
            className="inline-block text-justify button-normal w-7/12"
            href="tel:0388858682"
          >
            Đặt lịch ngay
            <FontAwesomeIcon className="ml-3" icon={faPhone} />
          </a>
          <br />
          <a
            className="inline-block text-justify button-outline mt-3 w-7/12"
            href="https://www.facebook.com/Hentoribespoke.suitmaydo.thudaumot"
            target="_blank"
          >
            Facebook
            <FontAwesomeIcon className="ml-3" icon={faFacebook} />
          </a>
        </div>
      </div>
    </div>
  );
}
