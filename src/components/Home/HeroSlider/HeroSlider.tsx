'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';
import Image from 'next/image';

const images = ['/slide 1.png', '/slide 2.png', '/slide3.png'];

const HeroSlider = () => {
  return (
    <div className="h-[500px] w-full">
      <Swiper
        direction={'horizontal'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        modules={[Mousewheel]}
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div className="relative h-[500px] w-full">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                fill
                className="rounded-xl object-cover"
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
