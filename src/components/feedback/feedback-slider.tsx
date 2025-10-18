"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import FeedBackCard, { FeedBackCardProps } from "./feedback-card";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ({
  listFeedback,
}: {
  listFeedback: FeedBackCardProps[];
}) {
  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination
        navigation
        spaceBetween={0}
        slidesPerView={1}
      >
        {listFeedback.map((val) => {
          return (
            <SwiperSlide key={`feedback-${val.id}`}>
              <FeedBackCard
                id={val.id}
                image={val.image}
                customerName={val.customerName}
                feedback={val.feedback}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
