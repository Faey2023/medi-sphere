'use client';

import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import { IMedicine } from '@/types';
import Image from 'next/image';

const DealProduct = () => {
  const { data } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const medicineData: IMedicine[] = data?.data?.data?.slice(0, 2); // First 2 products only

  return (
    <div className="my-14 px-6 md:px-12">
      <h2 className="text-3xl font-bold mb-8">Deal of the Day</h2>

      <div className="flex flex-col gap-10">
        {medicineData?.map((product: IMedicine) => (
          <div
            key={product._id}
            className="flex flex-col md:flex-row items-center border rounded-lg shadow-md overflow-hidden"
          >
            {/* Product Image */}
            <div className="w-full md:w-1/2 h-64 relative">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 p-6">
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-xl font-bold text-green-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealProduct;
