'use client';

import { IMedicine } from '@/types';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  medicine: IMedicine;
}

export default function MedicineCard({ medicine }: Props) {
  const {
    _id,
    name,
    price,
    // description,
    discount,
    quantity,
    type,
    categories,
    imageUrl,
  } = medicine;

  // Function to calculate discounted price for a single medicine
  const calculateTotalPrice = ({
    price,
    discount,
  }: {
    price: number;
    discount: number;
  }) => {
    const discountedAmount = price * (discount / 100);

    const discountedPrice = price - discountedAmount;

    return {
      discountedPrice: discountedPrice,
    };
  };

  const result = calculateTotalPrice({ price, discount });

  return (
    <div className="mx-auto w-full max-w-xs space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={imageUrl || '/placeholder.png'}
          className="relative"
          alt="image from web"
          width={300}
          height={100}
        />
        {discount > 0 ? (
          <div className="absolute top-0 left-0 rounded-md bg-blue-600 px-2.5 py-1 text-white">
            Sale
          </div>
        ) : (
          <></>
        )}
      </div>

      <h3 className="truncate text-lg font-semibold text-gray-800">{name}</h3>

      <p className="text-sm text-gray-600 capitalize">
        {type} — {quantity} units
      </p>

      {/* <p className="text-lg font-bold text-green-600">${price.toFixed(2)}</p> */}
      {discount ? (
        <div className="flex items-center gap-2">
          <p className="text-[22px] font-bold text-blue-600">
            ${result.discountedPrice.toFixed(2)}
          </p>{' '}
          <del className="text-gray-500">${price.toFixed(2)}</del>
        </div>
      ) : (
        <p className="text-[22px] font-bold text-blue-600">
          ${price.toFixed(2)}
        </p>
      )}

      {categories?.length > 0 && (
        <p className="text-sm text-gray-500">Category: {categories[0]}</p>
      )}

      <Link href={`/shop/${_id}`}>
        <Button className="mt-3 w-full cursor-pointer">View Details</Button>
      </Link>
    </div>
  );
}
