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

  // const medicineData: IMedicine[] = data?.data?.data?.slice(0, 2); // Only 2 products

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
      discountedPrice,
    };
  };

  const medicineData: (IMedicine & { discountedPrice: number })[] =
    data?.data?.data
      ?.filter((item: IMedicine) => item.discount && item.discount > 0)
      .slice(0, 2)
      .map((item: IMedicine) => {
        const { discountedPrice } = calculateTotalPrice({
          price: item.price,
          discount: item.discount || 0,
        });

        return {
          ...item,
          discountedPrice,
        };
      });

  return (
    <div className="my-14 px-6 md:px-12">
      <h2 className="mb-8 text-3xl font-bold">Deal of the Day</h2>

      <div className="flex flex-col gap-8 md:flex-row">
        {medicineData?.map((product: IMedicine) => (
          <div
            key={product._id}
            className="flex w-full flex-col overflow-hidden rounded-lg border shadow-md md:flex-row"
          >
            {/* Product Image */}
            <div className="flex h-72 w-full items-center justify-center bg-white md:w-1/2">
              <Image
                src={product.imageUrl || '/src/assets/placeholder.png'}
                alt={product.name}
                width={280}
                height={280}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex w-full flex-col justify-between p-6 md:w-1/2">
              <div>
                <h3 className="mb-2 text-2xl font-semibold">{product.name}</h3>
                <p className="mb-4 text-gray-600">{product.description}</p>
                {/* <p className="mb-4 text-xl font-bold text-green-600">
                  ${product.price}
                </p> */}
                <div className="flex gap-2 text-xl">
                  <del className="text-gray-500">
                    ${product.price.toFixed(2)}
                  </del>
                  <p className="mb-4 font-bold text-green-600">
                    $
                    {(
                      product as IMedicine & { discountedPrice: number }
                    ).discountedPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/shop/${product._id}`}
                  className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300"
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
