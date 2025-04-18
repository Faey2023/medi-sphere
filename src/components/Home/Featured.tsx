'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Grid, Navigation } from 'swiper/modules';
import ProductCard from './FeaturedCard';
import { Product } from '@/types/Product';
import './featured.css';

const Featured = () => {
  //fetching all products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/medicines', {
          method: 'GET',
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();

        // console.log('API response:', data?.data);

        setProducts(data?.data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="my-10 px-12">
      <div className="flex justify-between">
        <div>
          <h1 className="text-left text-3xl font-extrabold uppercase">
            featured medicines
          </h1>
          <p>Discounts & Offers Up To 25%</p>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        grid={{
          rows: 1,
        }}
        spaceBetween={30}
        navigation={true}
        modules={[Grid, Navigation]}
        className="mySwiper my-10"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: Product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Featured;
