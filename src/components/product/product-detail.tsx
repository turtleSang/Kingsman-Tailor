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
    <div className="grid grid-cols-2">
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
        <h3 className="text-primary-dark text-xl md:text-3xl lg:text-5xl text-right">
          {formatCurrency(price)} <sup>VNĐ</sup>
        </h3>
        <p>{description}</p>
        <div className="text-center">
          <a
            className="inline-block button-normal w-7/12"
            href="tel:0388858682"
          >
            Liên hệ đặt lịch ngay
            <FontAwesomeIcon className="ml-3" icon={faPhone} />
          </a>
          <br />
          <a
            className="inline-block button-outline mt-3 w-7/12"
            href="https://www.facebook.com/Hentoribespoke.suitmaydo.thudaumot"
            target="_blank"
          >
            Liên hệ qua Facebook{" "}
            <FontAwesomeIcon className="ml-3" icon={faFacebook} />
          </a>
        </div>
      </div>
    </div>
  );
}
