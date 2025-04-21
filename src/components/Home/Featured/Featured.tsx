'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Grid, Navigation } from 'swiper/modules';
import './featured.css';
import FeaturedCard from './FeaturedCard';
import { IMedicine } from '@/types';
import { useGetAllMedicineQuery } from '@/redux/api/productApi';

const Featured = () => {
  const { data } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const medicineData: IMedicine[] = data?.data?.data;
  console.log(medicineData);

  const [slidesPerView, setSlidesPerView] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
    <div className="my-10 px-12">
      <div className="flex justify-between">
        <div>
          <h1 className="text-left text-2xl font-extrabold uppercase lg:text-3xl">
            featured medicines
          </h1>
          <p>Discounts & Offers Up To 25%</p>
        </div>
      </div>
      <Swiper
        slidesPerView={slidesPerView}
        grid={{
          rows: 1,
        }}
        spaceBetween={30}
        navigation={true}
        modules={[Grid, Navigation]}
        className="mySwiper my-10"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {medicineData?.map((product: IMedicine) => (
            <SwiperSlide key={product._id}>
              <FeaturedCard product={product} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Featured;
