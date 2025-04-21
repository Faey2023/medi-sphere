'use client';

import { useGetOrdersByEmailQuery } from '@/redux/features/orders/orderApi';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { GetAllOrderParams } from '@/types';
import { skipToken } from '@reduxjs/toolkit/query';
import React from 'react';

const ManageOrdersPage = ({
  params,
}: {
  params: Promise<{ email: string }>;
}) => {
  const { email } = React.use(params);
  const decodedEmail = decodeURIComponent(email);

  const { data: order = [], isLoading } = useGetOrdersByEmailQuery(
    decodedEmail ? { email: decodedEmail } : skipToken
  );

  const orders: GetAllOrderParams[] = order?.data;

  if (isLoading) return <Skeleton />;
  // if (error) return <p>Error loading orders. Please try again later.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Order History for {decodedEmail}
      </h2>

      {orders.length === 0 ? (
        <p>No orders found for this user.</p>
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
            {orders?.map((order: GetAllOrderParams) => (
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

                <TableCell className="text-right">{order.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageOrdersPage;
