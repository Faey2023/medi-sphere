'use client';

import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hook';
import { useVerifyOrderQuery } from '@/redux/features/payment/paymentSlice';
import { clearCart } from '@/redux/features/cart/cartSlice';
import { toast } from 'react-toastify';

const PaymentSuccessPage = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const {
    data: verifyData,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    error: verifyError,
  } = useVerifyOrderQuery(orderId!, {
    skip: !orderId,
  });

  useEffect(() => {
    if (isVerifySuccess && verifyData?.data[0]?.bank_status === 'Success') {
      dispatch(clearCart());
    }
    if (isVerifyError) {
      toast.error('Payment verification failed');
      console.error(verifyError);
    }
  }, [isVerifySuccess, isVerifyError, verifyData, verifyError, dispatch]);

  if (!isVerifySuccess || verifyData?.data[0]?.bank_status !== 'Success') {
    return (
      <div className="flex min-h-screen items-center justify-center text-center text-gray-600">
        <p>Verifying payment...</p>
      </div>
    );
  }

  // Extracting data from the response
  const {
    order_id,
    name,
    amount,
    currency,
    bank_status,
    method,
    date_time,
    card_holder_name,
    card_number,
    phone_no,
    bank_trx_id,
  } = verifyData?.data[0] || {};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-green-50 to-white px-4">
      <div className="w-full max-w-xl text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-2 text-3xl font-semibold text-gray-800">
          Payment Successful!
        </h1>
        <p className="mb-6 text-gray-600">
          Thank you, {name}. Your payment has been confirmed.
        </p>

        <Card className="text-left shadow-md">
          <CardContent className="space-y-3 p-6">
            <div className="flex justify-between">
              <span className="font-medium">Order ID:</span>
              <span>{order_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Transaction ID:</span>
              <span>{bank_trx_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span>
                {amount} {currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Method:</span>
              <span>{method}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Card Holder Name:</span>
              <span>{card_holder_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Card Number:</span>
              <span>{card_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone Number:</span>
              <span>{phone_no}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Status:</span>
              <span className="font-semibold text-green-600">
                {bank_status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date & Time:</span>
              <span>{date_time}</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center gap-4">
          <Button onClick={() => (window.location.href = '/orders')}>
            Track Orders
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = '/shop')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
