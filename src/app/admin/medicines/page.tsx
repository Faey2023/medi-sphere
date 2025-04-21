import Products from '@/components/Products/Products';
import React from 'react';

const Medicines = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 text-center">
      <h1 className="mb-4 text-2xl font-semibold">
        This is Medicine Management Page
      </h1>
      <Products />
    </div>
  );
};

export default Medicines;
