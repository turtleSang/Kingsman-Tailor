"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useBanner } from "../../../libs/fetch";
import BannerSkeleton from "../skeleton/BannerSkeleton";
import NotFound from "../not-found";
import BannerItem from "./banner-item";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

export default function Slider({
  banners,
}: {
  banners: {
    id: number;
    imageUrl: string;
    link: string | null;
    description: string | null;
  }[];
}) {
  return (
    <div className="relative">
      {banners && (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 10000 }}
          allowTouchMove
        >
          {banners &&
            banners.length > 0 &&
            banners.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <BannerItem
                    imageUrl={item.imageUrl}
                    link={item.link || ""}
                    description={item.description || ""}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
      <motion.div
        animate={{ opacity: [0, 1, 0], translateY: [-10, 0, 10] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="hidden text-primary lg:block text-5xl text-center absolute left-1/2 -translate-1/2 bottom-0 z-20"
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </motion.div>
    </div>
  );
}
