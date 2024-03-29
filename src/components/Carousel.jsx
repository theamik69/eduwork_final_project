import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Autoplay } from "swiper/modules";

import { ServiceData } from "../constants/carouselData";

const Carousel = () => {
  return (
    <div className="h-[550px] flex flex-col md:flex-row gap-20 justify-around mt-28">
      <div className="flex flex-col gap-6 ml-40 mt-16">
        <h1 className="text-black text-[50px] font-semibold">
          Select Your New <br /> Perfect Style
        </h1>
        <p className="text-[16px] max-w-[400px] text-gray-200 md:text-gray-400">There are various types of shoes that you can choose to complement your style and needs.</p>
        <div className="flex justify-center items-center">
          <Link to="/products">
            <button className="border-2 p-2 rounded-lg bg-red-700 text-white border-stone-50 hover:font-bold">Shop now</button>
          </Link>
        </div>
      </div>
      <div className="w-[70%] md:w-[40%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          modules={[FreeMode, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {ServiceData.map((item) => (
            <SwiperSlide key={Math.random()}>
              <div className="flex mb-20 relative shadow-lg text-white lg:h-[550px] lg:w-[400px] overflow-hidden">
                <img src={item.backgroundImage} alt="image" className="rounded-md h-[600px] w-[500px] object-cover object-center" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
