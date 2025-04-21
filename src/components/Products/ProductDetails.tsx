'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  ArrowLeft,
  Edit,
  Calendar,
  Tag,
  Package,
  Pill,
  ShoppingCart,
  AlertTriangle,
} from 'lucide-react';
import { useGetSingleMedicineQuery } from '@/redux/api/productApi';
import type { IMedicine } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const ProductDetails = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  // medicine data
  //   const { data, isLoading, isError, error } = useGetSingleMedicineQuery(id)
  const { data, isLoading, isError, error, refetch } =
    useGetSingleMedicineQuery(id, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    });

  const medicine: IMedicine | undefined = data?.data;

  // loading
  if (isLoading) {
    return (
      <Card className="mx-auto max-w-4xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p>Loading medicine details...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // error
  if (isError || !medicine) {
    return (
      <Card className="mx-auto max-w-4xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <h2 className="text-xl font-bold text-red-500">
              Error Loading Medicine
            </h2>
            <p>
              {(error as any)?.data?.message || 'Failed to load medicine data'}
            </p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle Get stock status badge
  const getStockBadge = (inStock: boolean, quantity: number) => {
    if (!inStock) {
      return (
        <Badge
          variant="outline"
          className="border-red-200 bg-red-50 text-red-700"
        >
          Out of Stock
        </Badge>
      );
    }
    if (quantity < 5) {
      return (
        <Badge
          variant="outline"
          className="border-yellow-200 bg-yellow-50 text-yellow-700"
        >
          Low Stock
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="border-green-200 bg-green-50 text-green-700"
      >
        In Stock
      </Badge>
    );
  };

  // format date
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate price after discount
  const calculateDiscountedPrice = (price: number, discount: number) => {
    if (!discount) return price;
    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* header*/}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Medicine Details</h1>
        <div className="ml-auto">
          <Button asChild>
            <Link href={`/admin/medicines/edit/${medicine._id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Medicine
            </Link>
          </Button>
        </div>
      </div>

      {/* main */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* left column - img and basic info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{medicine.name}</CardTitle>
              {getStockBadge(medicine.inStock, medicine.quantity)}
            </div>
            <CardDescription>
              {medicine.manufacturer} • {medicine.type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6 aspect-square overflow-hidden rounded-lg border">
              <Image
                src={medicine.imageUrl || '/placeholder.png'}
                alt={medicine.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                  Description
                </h3>
                <p className="text-sm">
                  {medicine.description || 'No description available.'}
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <div className="text-right">
                    {medicine.discount > 0 ? (
                      <>
                        <span className="mr-2 font-medium line-through">
                          ${medicine.price.toFixed(2)}
                        </span>
                        <span className="font-medium text-green-600">
                          $
                          {calculateDiscountedPrice(
                            medicine.price,
                            medicine.discount
                          ).toFixed(2)}
                        </span>
                        <div className="text-xs text-green-600">
                          {medicine.discount}% off
                        </div>
                      </>
                    ) : (
                      <span className="font-medium">
                        ${medicine.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Quantity Available
                  </span>
                  <span>
                    {medicine.quantity < 1 ? '0' : medicine.quantity} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-mono">{medicine.sku || 'N/A'}</span>
                </div>
              </div>

              {medicine.requiredPrescription && (
                <>
                  <Separator />
                  <div className="flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Prescription Required
                    </span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* right column - specifications & additional info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Manufacturer
                    </h3>
                    <p className="font-medium">{medicine.manufacturer}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Supplier
                    </h3>
                    <p className="font-medium">{medicine.supplier || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Type
                    </h3>
                    <div className="flex items-center gap-1">
                      <Pill className="h-4 w-4" />
                      <p className="font-medium">{medicine.type}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Expiry Date
                    </h3>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <p className="font-medium">
                        {formatDate(medicine.expiryDate)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {medicine.categories && medicine.categories.length > 0 ? (
                      medicine.categories.map((category, index) => (
                        <Badge key={index} variant="secondary">
                          {category}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No categories specified
                      </span>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Symptoms
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {medicine.symptoms && medicine.symptoms.length > 0 ? (
                      medicine.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="outline">
                          {symptom}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No symptoms specified
                      </span>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {medicine.tags && medicine.tags.length > 0 ? (
                      medicine.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 text-sm"
                        >
                          <Tag className="h-3 w-3" />
                          <span>{tag}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No tags specified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Inventory Status
                  </h3>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    <p className="font-medium">
                      {medicine.inStock
                        ? 'Available for Purchase'
                        : 'Not Available'}
                    </p>
                    {getStockBadge(medicine.inStock, medicine.quantity)}
                  </div>
                  <p className="mt-1 text-sm">
                    {medicine.quantity < 1 ? '0' : medicine.quantity} units in
                    stock
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Product ID
                  </h3>
                  <p className="font-mono text-sm">{medicine._id}</p>
                </div>

                <Separator />
                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Created At
                  </h3>
                  <p className="text-sm">
                    {medicine.createdAt
                      ? formatDate(medicine.createdAt)
                      : formatDate(new Date())}
                  </p>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <div>
                    <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                      Status
                    </h3>
                    <Badge
                      variant={medicine.isDeleted ? 'destructive' : 'default'}
                    >
                      {medicine.isDeleted ? 'Deleted' : 'Active'}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                      Last Updated
                    </h3>
                    <p className="text-sm">
                      {medicine.updatedAt
                        ? formatDate(medicine.updatedAt)
                        : formatDate(new Date())}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Package Information
                  </h3>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <p className="text-sm">
                      {medicine.type} • {medicine.manufacturer}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* actions */}
          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <Link href={`/admin/medicines/edit/${medicine._id}`}>
                Edit Medicine
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Back to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
