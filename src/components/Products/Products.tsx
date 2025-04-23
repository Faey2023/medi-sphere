'use client';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import ProductsTable from './MedicineTable';

function Products() {
  return (
    <div className="w-full py-10">
      <div className="mb-6 flex flex-col items-center justify-between gap-2 p-2 md:flex-row">
        <h1 className="text-3xl font-bold">Medicine Products</h1>
        <Button asChild>
          <Link href={'/admin/medicines/add'}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>
      <ProductsTable />
    </div>
  );
}

export default Products;
