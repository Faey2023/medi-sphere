'use client';

import { IMedicine } from '@/types';
import MedicineCard from './MedicineCard';
import { Button } from '../ui/button';
import { useGetAllMedicineQuery } from '@/redux/api/productApi';

export default function AllMedicinesForHome() {
  const { data } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const medicineData: IMedicine[] = data?.data;
  console.log('datta from', data?.data, medicineData);

  return (
    <div className="my-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {medicineData?.length > 0 ? (
        medicineData?.map((medicine: IMedicine) => (
          <MedicineCard key={medicine._id} medicine={medicine} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center py-10 text-center text-gray-500">
          <p className="mb-4">No medicines found matching your criteria.</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reset All Filters
          </Button>
        </div>
      )}
      <h1>hi</h1>
    </div>
  );
}
