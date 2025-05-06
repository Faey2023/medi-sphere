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
import { GetAllOrderParams, OrderProducts } from '@/types';
import { skipToken } from '@reduxjs/toolkit/query';
import React from 'react';
import Link from 'next/link';

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
  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="container mx-auto pt-4">
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
              <TableHead>Prescription</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: GetAllOrderParams) => (
              <TableRow key={order._id}>
                <TableCell className="max-w-[30px] truncate overflow-hidden font-medium whitespace-nowrap capitalize">
                  {order._id}
                </TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), 'MM/dd/yyyy hh:mm a')}
                </TableCell>
                <TableCell className="max-w-[200px] truncate overflow-hidden whitespace-nowrap capitalize">
                  {order.products.map((product) => product.name).join(', ')}
                </TableCell>
                <TableCell>
                  {order.products.map(
                    (product: OrderProducts, index: number) =>
                      product?.prescriptionFile === 'notRequired' ? (
                        <p key={index} className="text-gray-500 italic">
                          Prescription not required
                        </p>
                      ) : (
                        <Link
                          key={index}
                          href={`${product.prescriptionFile}`}
                          download={`prescription-${index + 1}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 block text-cyan-600 hover:underline"
                        >
                          View Prescription
                        </Link>
                      )
                  )}
                </TableCell>
                <TableCell className="capitalize">
                  {order.deliveryType}
                </TableCell>
                <TableCell>${order.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageOrdersPage;
