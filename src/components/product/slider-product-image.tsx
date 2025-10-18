"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { useState } from "react";
export default function SilderProductImage({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="w-full max-w-[100vw]">
      {/* Slider chính */}
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mb-4 rounded-lg overflow-hidden"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-square">
              <Image
                src={`/${src}`}
                alt={`${name} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slider thumbnail (pagination) */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="cursor-pointer"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-square border border-border rounded-md overflow-hidden">
              <Image
                src={`/${src}`}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover hover:opacity-80 transition"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
