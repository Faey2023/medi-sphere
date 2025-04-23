'use client';

import { CheckCircle, XCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hook';
import { useVerifyOrderQuery } from '@/redux/features/payment/paymentSlice';
import { toast } from 'react-toastify';

const PaymentResponsePage = () => {
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
    if (isVerifyError) {
      toast.error('Payment verification failed');
      console.error(verifyError);
    }
  }, [isVerifySuccess, isVerifyError, verifyData, verifyError, dispatch]);
  const paymentStatus = verifyData?.data[0]?.bank_status;

  if (!isVerifySuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center text-gray-600">
        <p>Verifying payment...</p>
      </div>
    );
  }

  const {
    order_id,
    name,
    amount,
    currency,
    method,
    date_time,
    card_holder_name,
    card_number,
    phone_no,
    bank_trx_id,
    sp_message,
  } = verifyData?.data[0] || {};

  const renderStatusContent = () => {
    switch (paymentStatus) {
      case 'Success':
        return (
          <>
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h1 className="mb-2 text-3xl font-semibold text-gray-800">
              Payment Successful!
            </h1>
            <p className="mb-6 text-gray-600">
              Thank you, {name}. Your payment has been confirmed.
            </p>
          </>
        );
      case 'Failed':
        return (
          <>
            <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
            <h1 className="mb-2 text-3xl font-semibold text-gray-800">
              Payment Failed
            </h1>
            <p className="mb-6 text-gray-600">
              Unfortunately, your payment could not be processed. Please try
              again.
            </p>
          </>
        );
      case 'Cancel':
        return (
          <>
            <RefreshCcw className="mx-auto mb-4 h-16 w-16 text-yellow-500" />
            <h1 className="mb-2 text-3xl font-semibold text-gray-800">
              Payment Cancelled
            </h1>
            <p className="mb-6 text-gray-600">
              Your payment has been cancelled. If this was a mistake, please try
              again.
            </p>
          </>
        );
      default:
        return (
          <>
            <p className="mb-6 text-gray-600">
              We are unable to verify your payment status at the moment.
            </p>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-green-50 to-white px-4">
      <div className="w-full max-w-xl text-center">
        {renderStatusContent()}

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
                {paymentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date & Time:</span>
              <span>{date_time}</span>
            </div>
            {paymentStatus === 'Failed' && sp_message && (
              <div className="flex justify-between">
                <span className="font-medium">Failure Reason:</span>
                <span>{sp_message}</span>
              </div>
            )}
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

export default PaymentResponsePage;
