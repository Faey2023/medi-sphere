'use client';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  Heart,
  Share2,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ShoppingCart,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import Link from 'next/link';
// import { useParams } from "next/navigation"
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { IMedicine } from '@/types';
import {
  useGetAllMedicineQuery,
  useGetSingleMedicineQuery,
} from '@/redux/api/productApi';
import Image from 'next/image';
import DefaultLayout from '../DefaultLayout/DefaultLayout';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { toast } from 'react-toastify';

export default function MedicineDetails({ id }: { id: string }) {
  //   const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useGetSingleMedicineQuery(id as string);
  const { data: medicines } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // console.log('this is medicine data from medicine details page', medicines);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Skeleton className="h-[500px] w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-red-100 p-3">
              <RotateCcw className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-medium">
              Error Loading Medicine Details
            </h3>
            <p className="text-muted-foreground">
              We could not load the details for this medicine. Please try again.
            </p>
            <Button asChild variant="outline">
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const medicine: IMedicine = data.data;
  // console.log('hi this is data from details page ', medicine);

  const handleAddToCart = () => {
    dispatch(addToCart(medicine));
    toast.success(`${medicine.name} added to cart!`);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-6xl p-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground mb-2 pl-0"
          >
            <Link href="/shop" className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
          <div className="text-muted-foreground flex items-center text-sm">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-foreground">
              shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{medicine.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border bg-white">
              <Image
                width={500}
                height={500}
                src={
                  medicine.imageUrl || '/placeholder.svg?height=500&width=500'
                }
                alt={medicine.name || 'medicine image'}
                className="h-[500px] w-full object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Image thumbnails - placeholders for multiple images */}
            <div className="flex justify-evenly space-x-2">
              <div className="border-primary h-20 w-20 cursor-pointer overflow-hidden rounded-md border">
                <Image
                  width={100}
                  height={100}
                  src={
                    medicine.imageUrl || '/placeholder.svg?height=100&width=100'
                  }
                  alt={medicine.name || 'medicine image'}
                  className="h-full w-full object-cover"
                />
              </div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 w-20 cursor-pointer overflow-hidden rounded-md border"
                >
                  <Image
                    width={100}
                    height={100}
                    src={
                      medicine.imageUrl ||
                      `/placeholder.svg?height=100&width=100&text=View ${i}`
                    }
                    alt={`${medicine.name} view ${i}`}
                    className="h-full w-full object-cover opacity-70"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {medicine.name}
                </h1>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="mt-2 flex items-center">
                <Badge variant="outline" className="mr-2 rounded-md">
                  {medicine.categories[0]}
                </Badge>
                <Badge variant="outline" className="rounded-md">
                  {Array.isArray(medicine.type)
                    ? medicine.type.join(', ')
                    : medicine.type}
                </Badge>
              </div>

              <div className="mt-4">
                <p className="text-primary text-3xl font-bold">
                  ${medicine.price?.toFixed(2) || medicine.price}
                </p>
                <p className="text-muted-foreground text-sm">
                  Free shipping on orders over $100
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <p className="text-muted-foreground">{medicine.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Brand</p>
                  <p>{medicine.manufacturer}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Discount</p>
                  <p>{medicine.discount}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Type</p>
                  <p>
                    {Array.isArray(medicine.type)
                      ? medicine.type.join(', ')
                      : medicine.type}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Availability</p>
                  <p className="text-green-600">
                    In Stock ({medicine.quantity} available)
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <div className="flex h-8 w-12 items-center justify-center border-y">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={incrementQuantity}
                    disabled={quantity >= medicine.quantity}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart--> important */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Button
                  className="flex-1 cursor-pointer"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button className="flex-1 cursor-pointer" variant="outline">
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Shipping and Returns */}
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <Truck className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-muted-foreground text-xs">
                    On orders over $100
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">2 Year Warranty</p>
                  <p className="text-muted-foreground text-xs">
                    Full coverage for peace of mind
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">30-Day Returns</p>
                  <p className="text-muted-foreground text-xs">
                    Hassle-free return policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">
                Additional information
              </TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Product Details</h3>
                <p>
                  {medicine.name} is a high-quality {medicine.type} medication
                  manufactured by {medicine.manufacturer}.
                  {medicine.requiredPrescription &&
                    ' This medication requires a prescription from a licensed healthcare provider.'}
                </p>
                <p>{medicine.description}</p>
                {medicine.symptoms && medicine.symptoms.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium">
                      Common symptoms treated:
                    </h4>
                    <ul className="mt-2 list-disc pl-5">
                      {medicine.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Manufacturer</span>
                      <span>{medicine.manufacturer}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Type</span>
                      <span>{medicine.type}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Categories</span>
                      <span>
                        {Array.isArray(medicine.categories)
                          ? medicine.categories.join(', ')
                          : medicine.categories}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">SKU</span>
                      <span>{medicine.sku || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Expiry Date</span>
                      <span>
                        {medicine.expiryDate
                          ? new Date(medicine.expiryDate).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Prescription Required</span>
                      <span>
                        {medicine.requiredPrescription ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">In Stock</span>
                      <span
                        className={
                          medicine.inStock ? 'text-green-600' : 'text-red-500'
                        }
                      >
                        {medicine.inStock ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-medium">Quantity Available</span>
                      <span>{medicine.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to review this product.
                </p>
                <Button variant="outline">Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {medicines?.data?.data?.length > 0
              ? medicines?.data?.data
                  // showing half of the product
                  .filter((item: IMedicine) => item._id !== medicine._id)
                  .slice(0, 4)
                  .map((relatedMedicine: IMedicine, i: number) => (
                    <div key={i}>
                      <Link href={`/shop/${relatedMedicine?._id}`}>
                        <Card className="overflow-hidden">
                          <div className="aspect-square overflow-hidden">
                            <Image
                              width={100}
                              height={100}
                              src={
                                relatedMedicine.imageUrl ||
                                '/placeholder.svg?height=200&width=200'
                              }
                              alt={relatedMedicine.name || 'Related Medicine'}
                              className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium">
                              {relatedMedicine.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {relatedMedicine.supplier}
                            </p>
                            <p className="mt-2 font-bold">
                              $
                              {relatedMedicine.price?.toFixed(2) ||
                                relatedMedicine.price}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))
              : ''}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
