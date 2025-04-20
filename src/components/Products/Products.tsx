import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

function Products() {
  return (
    <div className="container mx-auto overflow-scroll py-10">
      <div className="mb-6 flex items-center justify-between p-2">
        <h1 className="text-3xl font-bold">Medicine Products</h1>
        <Button asChild>
          <Link href={'/admin/medicines/add'}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Link>
        </Button>
      </div>
      {/* <ProductsTable /> */}
    </div>
  );
}

export default Products;
