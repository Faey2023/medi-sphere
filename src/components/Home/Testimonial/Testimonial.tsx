'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

const testimonials = [
  {
    name: 'John Smith',
    image: '/user-1.jpeg',
    rating: 5,
    review:
      'Medi Sphere made ordering my prescriptions so easy! The website is user-friendly, the product range is excellent, and delivery was incredibly fast.',
  },
  {
    name: 'Emil Johnson',
    image: '/user-2.jpeg',
    rating: 4,
    review:
      'Great service and wide variety of health products. Customer support was responsive and helpful. Very happy with my experience!',
  },
  {
    name: 'David Lee',
    image: '/user-3.jpeg',
    rating: 5,
    review:
      'Received my medicine within 2 days! Everything was well-packed and the service was top-notch. Highly recommend Medi Sphere.',
  },
  {
    name: 'Spirit Williams',
    image: '/user-4.jpg',
    rating: 5,
    review:
      'Fantastic from start to finish. Ordering was smooth, and my order arrived on time and in perfect condition.',
  },
  {
    name: 'John Smith',
    image: '/user-1.jpeg',
    rating: 5,
    review:
      'Medi Sphere made ordering my prescriptions so easy! The website is user-friendly, the product range is excellent, and delivery was incredibly fast.',
  },
  {
    name: 'Emil Johnson',
    image: '/user-2.jpeg',
    rating: 4,
    review:
      'Great service and wide variety of health products. Customer support was responsive and helpful. Very happy with my experience!',
  },
  {
    name: 'David Lee',
    image: '/user-3.jpeg',
    rating: 5,
    review:
      'Received my medicine within 2 days! Everything was well-packed and the service was top-notch. Highly recommend Medi Sphere.',
  },
  {
    name: 'Spirit Williams',
    image: '/user-4.jpg',
    rating: 5,
    review:
      'Fantastic from start to finish. Ordering was smooth, and my order arrived on time and in perfect condition.',
  },
];


const Testimonial = () => {
 
  return (
    <div>

<h2 className="mb-4  text-3xl font-bold mx-12 mt-16">
        Featured Feedback
      </h2>


      <div className="relative mx-auto max-w-5xl py-9">
     
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={'auto'}
        spaceBetween={6}
        centeredSlides={true}
        loop={true}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide my-5 w-auto max-w-[330px] flex-shrink-0 transition-transform duration-300"
          >
            <div className="relative mx-5 mb-8 h-full max-w-[330px] cursor-pointer rounded-2xl bg-white p-7 shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              <div className="flex w-full flex-col items-center text-center">
                <div className="stars text-2xl text-[#f1b00f]">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p className="mt-6 mb-7 text-xs font-medium text-[#696b76] italic md:text-lg">
                  {testimonial.review}
                </p>

                <Image
                  className="size-20 rounded-full"
                  src={testimonial.image}
                  alt="avatar"
                  width={80}
                  height={80}
                />
                <h4 className="text-base font-bold text-gray-500 md:text-lg">
                  {testimonial.name}
                </h4>
                <h6 className="text-[10px] font-medium text-gray-700 md:text-sm">
                  Medi Sphere
                </h6>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" />
      </Swiper>
    </div>
    </div>
  );
};

export default Testimonial;
