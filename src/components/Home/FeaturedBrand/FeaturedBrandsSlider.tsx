'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { Navigation, Autoplay } from 'swiper/modules';

const brands = [
  'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-12.jpg',
  'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-52.jpg',
  'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-22.jpg',
  'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-32.jpg',
  'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-42.jpg',
  'https://demo2.themelexus.com/medilazar/wp-content/uploads/2020/11/brands-52.jpg',
];

const FeaturedBrandsSlider = () => {
  const [slidesPerView, setSlidesPerView] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1000) {
        setSlidesPerView(5);
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 576) {
        setSlidesPerView(3);
      } else if (window.innerWidth >= 400) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="mx-12 my-12">
      <h2 className="mb-10 text-3xl font-bold">Featured Brands</h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={slidesPerView}
        // slidesPerView={5}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {brands.map((src, index) => (
          <SwiperSlide
            key={index}
            className="ml-4 flex items-center justify-center"
          >
            <div className="relative h-[60px] w-[160px]">
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
