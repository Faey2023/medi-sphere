'use client';

import { useGetAllOrderQuery } from '@/redux/features/orders/orderApi';
import { GetAllOrderParams } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const AdminOrders = () => {
  const { data: order = [], isLoading } = useGetAllOrderQuery({});
  const orderData: GetAllOrderParams[] = order?.data;

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="container mx-auto p-6">
      <h2 className="mb-4 text-2xl font-bold">All Orders</h2>

      {/* Check if no orders found */}
      {orderData && orderData.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Customer Email</th>
                <th className="px-4 py-2 text-left">Ordered Product</th>
                <th className="px-4 py-2 text-left">Created At</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderData?.map((order: GetAllOrderParams) => (
                <tr key={order._id}>
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.user.email}</td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2">
                    {format(new Date(order.createdAt), 'MM/dd/yyyy hh:mm a')}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-1 ${
                        order.status === 'Paid'
                          ? 'bg-green-500'
                          : 'bg-amber-500'
                      } text-white`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">${order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
