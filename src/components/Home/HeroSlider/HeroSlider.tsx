'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const slides = [
  {
    image: 'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new02.png',
    title: 'Healthy Living Essentials',
    subtitle: 'Shop Now for Wellness Products',
  },
  {
    image: 'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new03.png',
    title: 'Stay Fit & Energized',
    subtitle: 'Best Supplements for You',
  },
  {
    image: 'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-news01.png',
    title: 'Your Daily Health Partner',
    subtitle: 'Discover Natural Remedies',
  },
];

const HeroSlider = () => {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        mousewheel={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination, Autoplay]}
        className="mySwiper h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center"
            style={{ backgroundColor: '#129ead' }}
          >
            <div className="flex w-full max-w-7xl px-4 mx-auto h-[500px] items-center justify-between">
              {/* Animated Image */}
              <motion.div
                className="relative w-1/2 h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                />
              </motion.div>

              {/* Animated Text Section */}
              <motion.div
                className="w-1/2 text-white px-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              >
                <h2 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow">
                  {slide.title}
                </h2>
                <p className="text-lg mb-6 opacity-90">{slide.subtitle}</p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link
                    href="/shop"
                    className="inline-block bg-white text-[#129ead] font-semibold py-2 px-6 rounded-full shadow-md transition hover:bg-gray-100 hover:scale-105"
                  >
                    Visit Shop
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
