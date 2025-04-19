'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { Navigation, Autoplay } from 'swiper/modules';

const brands = [
  "https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-12.jpg",
  "https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-52.jpg",
  "https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-22.jpg",
  "https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-32.jpg",
  "https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-42.jpg",
  "https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-52.jpg",
];

const FeaturedBrandsSlider = () => {
  return (
    <section className="my-12 mx-12">
      <h2 className="text-3xl font-bold mb-10">Featured Brands</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={5}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        
      >
        {brands.map((src, index) => (
          <SwiperSlide key={index} className="flex ml-4 justify-center items-center">
            <div className="relative w-[160px] h-[60px]">
              <Image
                src={src}
                alt={`Brand ${index + 1}`}
                fill
                quality={100}
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100px, 160px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedBrandsSlider;
