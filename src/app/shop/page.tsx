import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import AllMedicines from '@/components/Medicine/AllMedicines';
import { Suspense } from 'react';

const Shop = () => {
  return (
    <DefaultLayout>
      <Suspense
        fallback={<div className="p-10 text-center">Loading shop...</div>}
      >
        <AllMedicines />
      </Suspense>
    </DefaultLayout>
  );
};

export default Shop;
