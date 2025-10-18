"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard, { CategoryCardProps } from "./category-card";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function CategorySlider({
  listCategory,
}: {
  listCategory: CategoryCardProps[];
}) {
  return (
    <div className="relative px-10">
      <Swiper
        className="px-10"
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000 }}
        navigation
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 3,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {listCategory.map((category) => {
          return (
            <SwiperSlide key={category.id}>
              <CategoryCard
                id={category.id}
                name={category.name}
                link={category.link}
                urlImg={category.urlImg}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
