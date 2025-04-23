'use client';

import { useGetOrdersByEmailQuery } from '@/redux/features/orders/orderApi';
import { GetAllOrderParams } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSession } from 'next-auth/react';
import DefaultLayout from '@/components/DefaultLayout/DefaultLayout';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const Orders = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { data: order = [], isLoading } = useGetOrdersByEmailQuery(
    email ? { email } : skipToken
  );
  const orderData: GetAllOrderParams[] = order?.data;
  return isLoading ? (
    <Skeleton />
  ) : (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <h2 className="mb-4 text-2xl font-bold">All Orders</h2>

        {/* Check if no orders found */}
        {!orderData || orderData.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery Method</TableHead>
                <TableHead>Ordered Date</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData?.map((order: GetAllOrderParams) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order?._id}</TableCell>
                  <TableCell>{order?.user?.email}</TableCell>
                  <TableCell>{order?.status}</TableCell>
                  <TableCell className="capitalize">
                    {order.deliveryType}
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), 'MM/dd/yyyy hh:mm a')}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate overflow-hidden whitespace-nowrap capitalize">
                    {order.products.map((product) => product?.name).join(', ')}
                  </TableCell>

                  <TableCell className="text-right">
                    {order.totalPrice}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.status === 'Paid' ||
                    order.status === 'Processing' ||
                    order.status === 'Pending' ? (
                      <Button disabled={order.status !== 'Processing'}>
                        {order.status === 'Paid'
                          ? 'Paid'
                          : order.status === 'Processing'
                            ? 'Pay Now'
                            : order.status === 'Pending'
                              ? 'Pending'
                              : order.products.some(
                                    (product) =>
                                      product.prescriptionFile === 'notRequired'
                                  )
                                ? 'Pending'
                                : 'Checking'}
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Orders;
