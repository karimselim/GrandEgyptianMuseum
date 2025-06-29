import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";

function ImageSlider({ imgs }) {
  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 text-center">
      <div className="relative z-0">
        <Swiper
          className="swiper_container"
          effect={"coverflow"}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{
            // clickable: true,
            type: "bullets",
            renderBullet: (index, className) => {
              return `<span class="${className} w-3 h-3 bg-gray-600 rounded-full mx-1 opacity-60 hover:opacity-100 transition-all duration-300"></span>`;
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
        >
          {imgs.map((img, index) => (
            <SwiperSlide
              key={index}
              className="!w-[300px] !h-[400px] flex items-center justify-center"
            >
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </SwiperSlide>
          ))}

          <div className="swiper-pagination mt-12 flex justify-center" />
        </Swiper>

        <div className="absolute top-1/2 left-0 w-full flex justify-between transform -translate-y-1/2 px-2 z-10 [--swiper-navigation-color:white]">
          <div className="swiper-button-prev text-white text-3xl"></div>
          <div className="swiper-button-next text-white text-3xl"></div>
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
/**works */
