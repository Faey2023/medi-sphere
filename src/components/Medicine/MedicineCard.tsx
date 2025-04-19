'use client';

import { IMedicine } from '@/types';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props {
  medicine: IMedicine;
}

export default function MedicineCard({ medicine }: Props) {
  const {
    _id,
    name,
    price,
    // description,
    quantity,
    type,
    categories,
    imageUrl,
  } = medicine;

  return (
    <div className="mx-auto w-full max-w-xs space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100">
        {/* <Image
          src={imageUrl || "/placeholder.jpg"}
          alt={description || name || "Medicine Image"}
          fill
          className="object-cover"
        /> */}
        <img src={imageUrl} alt="image from web" />
      </div>

      <h3 className="truncate text-lg font-semibold text-gray-800">{name}</h3>

      <p className="text-sm text-gray-600 capitalize">
        {type} — {quantity} units
      </p>

      <p className="text-lg font-bold text-green-600">${price.toFixed(2)}</p>

      {categories?.length > 0 && (
        <p className="text-sm text-gray-500">Category: {categories[0]}</p>
      )}

      <Link href={`/shop/${_id}`}>
        <Button className="mt-3 w-full" variant="default">
          View Details
        </Button>
      </Link>
    </div>
  );
}
