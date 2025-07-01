import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import img1 from "../../assets/pic.jpeg";
import img2 from "../../assets/second.jpeg";
import img3 from "../../assets/first.jpeg";

export default function Feedback() {
  return (
    <div className="relative h-fit w-screen text-white py-[50px]">
      <div className="relative flex w-[80%] bg-[#1e1e1e] mx-auto px-6 py-3 rounded-lg max-[660px]:w-full max-[660px]:flex-col">
        <Parallax speed={2}>
          <h1 className="relative -top-20 font-['Daikon_Bold'] text-[2.2rem] text-[#e0e0e0] max-[660px]:top-0">
            Feedback from our clients.
          </h1>
        </Parallax>

        <div className="w-[60%] max-[660px]:w-full">
          <Swiper
            className=""
            slidesPerView={1}
            modules={[Pagination, EffectFade]}
            effect="fade"
            pagination={{
              clickable: true,
              el: "#seventh-screen-slider-pagination",
              bulletElement: "span",
              bulletClass: "swiper-bullet",
              bulletActiveClass: "swiper-bullet-active",
            }}
          >
            <SwiperSlide className="px-[25px] py-[15px] bg-[#1e1e1e]">
              <p className="text-[1.15em] font-['Daikon_Medium_Italic'] text-[#b0b0b0] leading-[1.5em] mb-[50px]">
                Working with this team transformed our digital presence
                completely. Their innovative approach and attention to detail
                resulted in a 40% increase in our customer engagement within
                just two months.
              </p>

              <div className="flex flex-row items-center gap-[10px]">
                <Image
                  src={img1}
                  alt="Sarah Johnson"
                  height={65}
                  width={65}
                  className="object-cover rounded-full"
                />
                <p className="text-[1.1em] font-['Daikon_Medium'] text-white">
                  - Morad Hafez, Software Engineer.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="px-[25px] py-[15px] bg-[#1e1e1e]">
              <p className="text-[1.15em] font-['Daikon_Medium_Italic'] text-[#b0b0b0] leading-[1.5em] mb-[50px]">
                The level of professionalism and creativity exceeded all our
                expectations. They delivered our project ahead of schedule while
                maintaining exceptional quality throughout the process.
              </p>

              <div className="flex flex-row items-center gap-[10px]">
                <Image
                  src={img2}
                  alt="Michael Chen"
                  height={65}
                  width={65}
                  className="object-cover rounded-full"
                />
                <p className="text-[1.1em] font-['Daikon_Medium'] text-white">
                  - Hady Moait, ML Engineer.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="px-[25px] py-[15px] bg-[#1e1e1e]">
              <p className="text-[1.15em] font-['Daikon_Medium_Italic'] text-[#b0b0b0] leading-[1.5em] mb-[50px]">
                Their team understood our vision perfectly and brought it to
                life in ways we couldn't have imagined. The final product has
                become our competitive edge in the market.
              </p>

              <div className="flex flex-row items-center gap-[10px]">
                <Image
                  src={img3}
                  alt="Amina Diallo"
                  height={65}
                  width={65}
                  className="object-cover rounded-full"
                />
                <p className="text-[1.1em] font-['Daikon_Medium'] text-white">
                  - Karim Selim, Frontend Developer.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>

          <div
            id="seventh-screen-slider-pagination"
            className="w-fit flex flex-row flex-nowrap justify-center gap-[5px] mx-auto p-[10px]"
          ></div>
        </div>

        <div className="absolute bottom-0 right-0 leading-[50px] text-[7em] font-['URW_Geometric_SemiBold'] text-white opacity-80">
          ,,
        </div>
      </div>
    </div>
  );
}
