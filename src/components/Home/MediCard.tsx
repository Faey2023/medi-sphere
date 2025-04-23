import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MediCard = () => {
  const cardData = [
    {
      img: '/banner-h3-01.jpg',
      title: 'Premium Wellness',
      subtitle: 'Save up to 25% today',
    },
    {
      img: '/banner-h3-02.jpg',
      title: 'Natural Health Boosters',
      subtitle: 'Limited time offers available',
    },
    {
      img: '/banner-h3-03.jpg',
      title: 'Essential Daily Care',
      subtitle: 'Deals you can’t miss!',
    },
  ];

  return (
    <div className="my-10 sm:my-8 flex flex-col items-center justify-center gap-3 lg:flex-row">
      {cardData.map((card, index) => (
        <Link href="/shop" key={index} className="group">
          <div className="relative h-[250px] lg:w-[400px] w-[350px] cursor-pointer overflow-hidden rounded transition-transform duration-300 hover:scale-105">
            <Image
              src={card.img}
              alt={card.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40">
              <h2 className="p-8 text-left text-2xl font-bold text-white">
                {card.title}
              </h2>
              <h3 className="pl-8 text-xl font-medium text-white">
                {card.subtitle}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MediCard;
