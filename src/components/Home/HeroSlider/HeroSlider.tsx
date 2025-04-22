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
    <div className="relative min-h-[500px] w-full overflow-hidden pb-12">
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
            <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto h-full items-center gap-10 justify-between py-8">
              
              {/* Image Section */}
              <motion.div
                className="relative w-full lg:w-1/2 h-64 md:h-80 lg:h-[500px]"
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
                className="w-full lg:w-1/2 text-white text-center lg:text-left px-4 sm:px-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-snug drop-shadow">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg mb-6 opacity-90">{slide.subtitle}</p>
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
