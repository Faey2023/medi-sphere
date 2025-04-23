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
    image:
      'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new02.png',
    title: 'Healthy Living Essentials',
    subtitle: 'Shop Now for Wellness Products',
  },
  {
    image:
      'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-new03.png',
    title: 'Stay Fit & Energized',
    subtitle: 'Best Supplements for You',
  },
  {
    image:
      'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/12/h1-news01.png',
    title: 'Your Daily Health Partner',
    subtitle: 'Discover Natural Remedies',
  },
];

const HeroSlider = () => {
  return (
    <div className="relative min-h-[500px] w-full overflow-hidden pb-12">
      <Swiper
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
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
            className="flex flex-row-reverse items-center justify-center"
            style={{ backgroundColor: '#129ead' }}
          >
            <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-between gap-10 py-8 lg:flex-row">
              {/* Image Section */}
              <motion.div
                className="relative h-64 w-full md:h-80 lg:h-[500px] lg:w-1/2"
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

              {/* Text Section */}
              <motion.div
                className="w-full px-4 text-center text-white sm:px-6 lg:w-1/2 lg:text-left"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              >
                <h2 className="mb-4 text-3xl leading-snug font-extrabold drop-shadow sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h2>
                <p className="mb-6 text-base opacity-90 sm:text-lg">
                  {slide.subtitle}
                </p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Link
                    href="/shop"
                    className="inline-block rounded-full bg-white px-6 py-2 font-semibold text-[#129ead] shadow-md transition hover:scale-105 hover:bg-gray-100"
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
