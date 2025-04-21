'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';
import Image from 'next/image';

const images = [
    '/slide 1.png',
    '/slide 2.png',
    '/slide3.png',
  ];
  

const HeroSlider = () => {
    return (
      <div className="w-full h-[500px]">
        <Swiper
          direction={'horizontal'}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          modules={[Mousewheel]}
          className="mySwiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center">
              <div className="relative w-full h-[500px]">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover rounded-xl"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

export default HeroSlider;
