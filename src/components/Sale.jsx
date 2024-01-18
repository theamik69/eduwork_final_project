import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Card from "./Card";

const Sale = () => {
  const [saleItems, setSaleItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSaleItems(data.filter((item) => item.discount));
      } catch (error) {
        console.error("Error fetching sale data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="border-2 mt-12">
      <h1 className="text-black text-5xl font-semibold mt-3">On Sale</h1>
      <div className="flex justify-center m-10">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          modules={[FreeMode, Autoplay, Pagination, Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          <div className="swiper-button-prev">
            <FaChevronLeft />
          </div>
          {saleItems
            .filter((item) => item.discount)
            .map((item) => (
              <SwiperSlide key={Math.random()} className="m-5">
                <Card img={item.img} title={item.title} star={item.star} discount={item.discount} reviews={item.reviews} prevPrice={item.prevPrice} price={item.price} id={item.id} />
              </SwiperSlide>
            ))}
          <div className="swiper-button-next">
            <FaChevronRight />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Sale;
