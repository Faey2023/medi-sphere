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

const Orders = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  console.log(email);
  const { data: order = [], isLoading } = useGetOrdersByEmailQuery(
    email ? { email } : skipToken
  );
  const orderData: GetAllOrderParams[] = order?.data;
  console.log(orderData);

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
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Ordered Product</TableHead>
                <TableHead>Shipping Method</TableHead>
                <TableHead>Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData?.map((order: GetAllOrderParams) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>{order.user.email}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell className="capitalize">
                    {order.deliveryType}
                  </TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), 'MM/dd/yyyy hh:mm a')}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate overflow-hidden whitespace-nowrap capitalize">
                    {order.products.map((product) => product.name).join(', ')}
                  </TableCell>

                  <TableCell className="text-right">
                    {order.totalPrice}
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
