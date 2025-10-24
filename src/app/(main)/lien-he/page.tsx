import { LogoFont } from "@/app/layout";
import { faZalo } from "@/components/customizing/faZalo";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="w-10/12 mx-auto">
      <div>
        <h1
          className={clsx(
            " font-semibold mb-4 text-gray-900 text-center",
            LogoFont.className
          )}
        >
          Liên hệ với Kingsman Tailor
        </h1>
        <p className="text-gray-600 mb-8">
          Chúng tôi luôn sẵn sàng tư vấn và hỗ trợ bạn trong mọi nhu cầu may đo
          và dịch vụ chăm sóc khách hàng.
        </p>
        <div className="text-center mt-3">
          <a
            className="inline-block text-justify button-normal w-7/12"
            href="tel:0388858682"
          >
            <FontAwesomeIcon className="mr-3" icon={faPhone} />
            Đặt lịch ngay
          </a>
          <br />
          <a
            className="inline-block text-justify button-outline mt-3 w-7/12"
            href="https://www.facebook.com/Hentoribespoke.suitmaydo.thudaumot"
            target="_blank"
          >
            <FontAwesomeIcon className="mr-3" icon={faFacebook} />
            Facebook
          </a>
          <a
            className="inline-block text-justify button-outline mt-3 w-7/12"
            href="https://zalo.me/0388858682"
            target="_blank"
          >
            <FontAwesomeIcon className="mr-3" icon={faZalo} />
            Zalo
          </a>
        </div>
      </div>
      <div className="mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.8565581082257!2d106.66346777451949!3d10.97419785551571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1c641dc3929%3A0x4ada34bee13560b6!2sKingsman%20Bespoke%20Tailoring!5e0!3m2!1svi!2s!4v1761280572058!5m2!1svi!2s"
          width="600"
          height="450"
          style={{ border: 0, width: "100%", height: "450px" }}
          allowFullScreen={false}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
