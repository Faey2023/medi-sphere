'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  updateQuantity,
  removeFromCart,
  uploadPrescription,
  setCart,
} from '@/redux/features/cart/cartSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Trash2, Undo } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useCreateOrderMutation } from '@/redux/features/payment/paymentSlice';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

const CartPage = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>(
    'standard'
  );
  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();
  const calculateDiscountedPrice = (price: number, discount: number) =>
    price - discount;
  const handleQuantityChange = (id: string, delta: number) => {
    const currentItem = cart.find((item) => item._id === id);
    if (!currentItem) return;
    const newQuantity = Math.max(1, currentItem.quantity + delta);
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };
  const handlePrescriptionUpload = async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_KEY;

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        const imageUrl = data.data.url;
        dispatch(uploadPrescription({ id, prescription: imageUrl }));
      } else {
        console.error('Error uploading prescription:', data.error.message);
      }
    } catch (error) {
      console.error('Error during prescription upload:', error);
    }
  };
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };
  const handleCheckout = async () => {
    if (!session?.user) {
      toast.error('Please login to proceed with checkout.');
      signIn(undefined, { callbackUrl: '/cart' });
      return;
    }
    const nonPrescriptionItems = cart.filter(
      (item) => !item.requiredPrescription
    );
    const uploadedPrescriptionItems = cart.filter(
      (item) => item.requiredPrescription && item.prescription
    );
    const missingPrescriptionItems = cart.filter(
      (item) => item.requiredPrescription && !item.prescription
    );
    const itemsToProceed = [
      ...nonPrescriptionItems,
      ...uploadedPrescriptionItems,
    ];

    if (itemsToProceed.length === 0) {
      toast.error(
        'Please upload prescription for the required items before checkout.'
      );
      return;
    }

    const formattedItems = itemsToProceed.map((item) => ({
      product: item._id,
      name: item.name,
      quantity: item.quantity,
      prescriptionFile: item.prescription || 'notRequired',
    }));

    try {
      const res = await createOrder({
        products: formattedItems,
        deliveryType: deliveryOption,
        pendingPrescriptions: missingPrescriptionItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
        })),
      });

      if ('data' in res && res?.data?.data) {
        toast.success(res?.data?.message);
        if (res?.data?.data) {
          setTimeout(() => {
            window.location.href = res?.data?.data;
          }, 1000);
        }
        const remainingItems = cart.filter(
          (item) => item.requiredPrescription && !item.prescription
        );
        dispatch(setCart(remainingItems));
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to Process!');
    }
  };
  useEffect(() => {
    if (isError) {
      toast.error(JSON.stringify(error));
    }
  }, [isError, error]);
  const payableItems = cart.filter(
    (item) => !item.requiredPrescription || item.prescription
  );
  const subtotal = payableItems.reduce(
    (sum, item) =>
      sum +
      calculateDiscountedPrice(item.price, item.discount || 0) * item.quantity,
    0
  );
  const total = subtotal + (deliveryOption === 'standard' ? 3 : 6);

  return (
    <div className="container mx-auto px-4 py-8">
      {cart.length > 0 && (
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-800"
          >
            <Undo className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      )}

      <h1 className="text-3xl font-bold">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="flex min-h-[calc(100vh-150px)] items-center justify-center p-4">
          <div className="flex flex-col items-center">
            <p className="text-muted-foreground">
              Your cart is currently empty.
            </p>
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-bold text-cyan-600 transition-colors duration-300 hover:text-cyan-800"
            >
              <Undo size={20} />
              Back to Shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {cart.map((item) => {
              const discountedPrice = calculateDiscountedPrice(
                item.price,
                item.discount || 0
              );

              return (
                <Card key={item._id} className="rounded-2xl shadow">
                  <CardContent className="flex gap-4 p-4">
                    <Image
                      width={96}
                      height={96}
                      src={item.imageUrl || '/placeholder.png'}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg border object-cover"
                    />
                    <div className="flex w-full flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-lg font-semibold">{item.name}</h2>
                          <p className="text-muted-foreground text-sm">
                            <span className="line-through">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="text-red-600">
                              ${discountedPrice.toFixed(2)} x {item.quantity}
                            </span>
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item._id!)}
                        >
                          <Trash2 className="text-destructive h-5 w-5" />
                        </Button>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item._id!, -1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuantityChange(item._id!, 1)}
                        >
                          +
                        </Button>
                      </div>

                      {item.requiredPrescription && (
                        <div className="mt-4">
                          <Label className="text-primary mb-1 block text-sm">
                            Prescription Required
                          </Label>
                          <Input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file)
                                handlePrescriptionUpload(item._id!, file);
                            }}
                          />
                          {item.prescription && (
                            <p className="mt-1 text-xs text-green-600">
                              Uploaded: {item.prescription}
                            </p>
                          )}
                          {!item.prescription && (
                            <p className="mt-1 text-xs text-red-600">
                              Note: Need Prescription to order this Item.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="sticky top-24">
            <Card className="rounded-2xl p-6 shadow">
              <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>
              <div className="mb-2 flex justify-between">
                <span>Subtotal (Payable Items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="mb-2">
                <span className="font-semibold">Payable Products:</span>
                <ul className="list-disc pl-4">
                  {payableItems.map((item) => (
                    <li key={item._id}>{item.name}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-2 flex justify-between">
                <span>Delivery</span>
                <span>{deliveryOption === 'standard' ? '$3.00' : '$6.00'}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="mt-4">
                <Label className="mb-2 block font-medium">
                  Delivery Option
                </Label>
                <div className="flex gap-4">
                  <Button
                    variant={
                      deliveryOption === 'standard' ? 'default' : 'outline'
                    }
                    onClick={() => setDeliveryOption('standard')}
                  >
                    Standard (3-5 days)
                  </Button>
                  <Button
                    variant={
                      deliveryOption === 'express' ? 'default' : 'outline'
                    }
                    onClick={() => setDeliveryOption('express')}
                  >
                    Express (1-2 days)
                  </Button>
                </div>
              </div>
              {session?.user?.role !== 'admin' && (
                <Button
                  onClick={handleCheckout}
                  className="mt-6 w-full bg-green-600 text-white hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
