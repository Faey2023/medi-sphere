'use client';

import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import { IMedicine } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const DealProduct = () => {
  const { data } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const medicineData: IMedicine[] = data?.data?.data?.slice(0, 2); // Only 2 products

  return (
    <div className="my-14 px-6 md:px-12">
      <h2 className="text-3xl font-bold mb-8">Deal of the Day</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {medicineData?.map((product: IMedicine) => (
          <div
            key={product._id}
            className="flex flex-col md:flex-row w-full border rounded-lg shadow-md overflow-hidden"
          >
            {/* Product Image */}
            <div className="w-full md:w-1/2 h-72 bg-white flex items-center justify-center">
              <Image
                src={product.imageUrl || '/src/assets/placeholder.png'}
                alt={product.name}
                width={280}
                height={280}
                className="object-contain max-h-full max-w-full"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-xl font-bold text-green-600 mb-4">${product.price}</p>
              </div>
              <div className="flex gap-4">
                
                <Link
                  href={`/shop/${product._id}`}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealProduct;
