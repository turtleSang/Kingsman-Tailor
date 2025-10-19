"use client";

import Logo from "@/components/nav-bar/logo";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faMailBulk,
  faMap,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-200 border-t border-neutral-800 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Intro */}
        <div>
          <Logo />
          <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
            Kingsman – thương hiệu âu phục may đo cao cấp, mang đến sự lịch lãm
            và phong thái tự tin cho quý ông hiện đại.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Liên hệ</h3>
          <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMap} />
              <span>
                150 Ngô Gia Tự, phường Thủ Dầu Một, thành phố Hồ Chí Minh
              </span>
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} />
              <span>038 885 8682</span>
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMailBulk} />
              <span>khoapham682@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            Kết nối cùng chúng tôi
          </h3>
          <div className="flex gap-4">
            <Link
              href="#"
              className="w-10 h-10 text-center leading-10 inline-block rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link
              href="#"
              className="w-10 h-10 text-center leading-10 inline-block rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-neutral-800 mt-10">
        <p className="text-center text-sm text-neutral-500 py-6">
          © {new Date().getFullYear()} Kingsman - Tailor. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
