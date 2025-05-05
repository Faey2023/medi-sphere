import Products from '@/components/Products/Products';

const Medicines = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <h1 className="mb-4 text-center text-2xl font-semibold">
        This is Medicine Management Page
      </h1>
      <Products />
    </div>
  );
};

export default Medicines;
