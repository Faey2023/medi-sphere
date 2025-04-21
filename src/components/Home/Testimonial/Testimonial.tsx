'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const testimonials = [
  {
    name: 'John Smith',
    image: '/user-1.jpeg',
    rating: 5,
    review:
      'Cycle Sphere made my bike shopping experience effortless! The website is easy to use, the selection is great, and delivery was fast.',
  },
  {
    name: 'Emil Johnson',
    image: '/user-2.jpeg',
    rating: 4,
    review:
      'Great service and amazing variety of bikes. Customer support was quick to respond. Totally satisfied with my purchase!',
  },
  {
    name: 'David Lee',
    image: '/user-3.jpeg',
    rating: 5,
    review:
      'Got my mountain bike within 3 days! High quality and smooth ride. Would definitely recommend Cycle Sphere to others.',
  },
  {
    name: 'Spirit Williams',
    image: '/user-4.jpg',
    rating: 5,
    review:
      'Fantastic experience from start to finish. Easy checkout process and the bike arrived in perfect condition.',
  },
  {
    name: 'John Smith',
    image: '/user-1.jpeg',
    rating: 5,
    review:
      'Cycle Sphere made my bike shopping experience effortless! The website is easy to use, the selection is great, and delivery was fast.',
  },
  {
    name: 'Emil Johnson',
    image: '/user-2.jpeg',
    rating: 4,
    review:
      'Great service and amazing variety of bikes. Customer support was quick to respond. Totally satisfied with my purchase!',
  },
  {
    name: 'David Lee',
    image: '/user-3.jpeg',
    rating: 5,
    review:
      'Got my mountain bike within 3 days! High quality and smooth ride. Would definitely recommend Cycle Sphere to others.',
  },
  {
    name: 'Spirit Williams',
    image: '/user-4.jpg',
    rating: 5,
    review:
      'Fantastic experience from start to finish. Easy checkout process and the bike arrived in perfect condition.',
  },
];

const Testimonial = () => {
  const { data: session, status } = useSession();
  return (
    <div className="relative mx-auto max-w-5xl py-9">
      <h2 className="mb-4 text-center text-4xl italic">
        See what our satisfied customers have to say.
        <p>status:{status}</p>
        {session ? (
          <p>Logged in as {session.user?.email}</p>
        ) : (
          <p>Not logged in</p>
        )}
      </h2>
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
  );
};

export default Testimonial;
