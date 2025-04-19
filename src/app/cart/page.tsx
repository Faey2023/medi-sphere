'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  updateQuantity,
  removeFromCart,
  uploadPrescription,
} from '@/redux/features/cart/cartSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>(
    'standard'
  );

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

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const missing = cart.filter(
      (item) => item.requiredPrescription && !item.prescriptionFile
    );
    if (missing.length) {
      alert('Please upload prescription for required medicines.');
      return;
    } else if (cart.length === 0) {
      alert(
        'Your cart is empty. Please add items to your cart before checking out.'
      );
    } else {
      alert('Proceeding to secure checkout...');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-muted-foreground">Your cart is currently empty.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            {cart.map((item) => (
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
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(item._id)}
                      >
                        <Trash2 className="text-destructive h-5 w-5" />
                      </Button>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item._id, -1)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item._id, 1)}
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
                            if (file) handlePrescriptionUpload(item._id, file);
                          }}
                        />
                        {item.prescriptionFile && (
                          <p className="mt-1 text-xs text-green-600">
                            Uploaded: {item.prescriptionFile}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="p-4">
              <Label className="mb-2 block font-medium">Delivery Option</Label>
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
                  variant={deliveryOption === 'express' ? 'default' : 'outline'}
                  onClick={() => setDeliveryOption('express')}
                >
                  Express (1-2 days)
                </Button>
              </div>
            </Card>
          </div>

          <div className="sticky top-24">
            <Card className="rounded-2xl p-6 shadow">
              <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Delivery</span>
                <span>{deliveryOption === 'standard' ? '$3.00' : '$6.00'}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>
                  $
                  {(
                    totalPrice + (deliveryOption === 'standard' ? 3 : 6)
                  ).toFixed(2)}
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                className="mt-4 w-full bg-green-600 text-white hover:bg-green-700"
              >
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
