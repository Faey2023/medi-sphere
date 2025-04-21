'use client';

import { Edit, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { IMedicine } from '@/types';
import Image from 'next/image';
import {
  useDeleteMedicineMutation,
  useGetAllMedicineQuery,
} from '@/redux/api/productApi';

export default function ProductsTable() {
  const { data, isLoading } = useGetAllMedicineQuery({ page: 1, limit: 100 });
  const [deleteMedicine] = useDeleteMedicineMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  const products = data?.data?.data || [];
  console.log(products);

  // if No products founds
  if (products.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="mb-4">
          No products found. Add your first Medicine product.
        </p>
        <Button asChild>
          <Link href="/admin/medicines/add">Add Product</Link>
        </Button>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMedicine(id).unwrap(); //https://redux-toolkit.js.org/rtk-query/usage/error-handling
      //to access the error or success payload immediately after a mutation, you can chain .unwrap().
      toast.success('Medicine deleted success');
    } catch (error) {
      toast.error('failed to delete');
      console.error('Failed to delete medicine:', error);
    }
  };

  return (
    <>
      {/* mbl - sm */}
      <div className="space-y-4 md:hidden">
        {products?.map((product: IMedicine) => (
          <Card key={`mobile-${product._id}`} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <Image
                  src={product.imageUrl || '/placeholder.svg'}
                  alt={product.description ? product.name : 'product image'}
                  className="mr-4 h-16 w-16 rounded-md object-cover"
                  width={64}
                  height={64}
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {product.manufacturer} • {product.type}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-2 p-4">
                <div>
                  <p className="text-muted-foreground text-xs">Price</p>
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Quantity</p>
                  <p>{product.quantity}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Status</p>
                  <div>
                    {product.inStock ? (
                      <Badge
                        variant="outline"
                        className="mt-1 border-green-200 bg-green-50 text-green-700"
                      >
                        In Stock
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="mt-1 border-red-200 bg-red-50 text-red-700"
                      >
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/medicines/details/${product._id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/medicines/edit/${product._id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove the product "{product.name}". This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => handleDelete(product._id as string)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* md => device */}
      <div className="hidden rounded-md border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: IMedicine) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Image
                    src={product.imageUrl || '/placeholder.svg'}
                    alt={product.description ? product.name : 'product image'}
                    className="h-12 w-12 rounded-md object-cover"
                    width={48}
                    height={48}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.manufacturer}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {product.quantity < 1 ? '0' : product.quantity}
                </TableCell>
                <TableCell>
                  {product.inStock ? (
                    <Badge
                      variant="outline"
                      className="border-green-200 bg-green-50 text-green-700"
                    >
                      In Stock
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-red-200 bg-red-50 text-red-700"
                    >
                      Out of Stock
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/medicines/details/${product._id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/medicines/edit/${product._id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove the product "{product.name}". This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(product._id as string)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
