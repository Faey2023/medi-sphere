'use client';

import {
  useGetAllOrderQuery,
  useUpdateOrderStatusMutation,
} from '@/redux/features/orders/orderApi';
import { GetAllOrderParams } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const { data: order = [], isLoading, refetch } = useGetAllOrderQuery({});
  const orderData: GetAllOrderParams[] = order?.data;

  const [updateStatus] = useUpdateOrderStatusMutation();
  const statuses = ['Processing', 'Shipped', 'Completed', 'Cancelled'];

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateStatus({ id: orderId, status: newStatus });
      toast('Order Status Updated Successfully');
      refetch();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return isLoading ? (
    <Skeleton />
  ) : (
    <div className="container mx-auto pt-4">
      <h2 className="mb-4 text-2xl font-bold">All Orders</h2>
      {orderData && orderData.length === 0 ? (
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
              <TableHead>Status</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData?.map((order: GetAllOrderParams) => (
              <TableRow key={order._id}>
                <TableCell className="max-w-[30px] truncate overflow-hidden font-medium whitespace-nowrap capitalize">
                  {order._id}
                </TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell className="capitalize">
                  {order.deliveryType}
                </TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), 'MM/dd/yyyy hh:mm a')}
                </TableCell>
                <TableCell className="max-w-[130px] truncate overflow-hidden whitespace-nowrap capitalize">
                  {order.products.map((product) => product?.name).join(', ')}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer rounded-full bg-gray-200 px-3 py-1 text-sm font-medium capitalize">
                      {order.status}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {statuses
                        .filter((status) => status !== order.status)
                        .map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() =>
                              handleStatusChange(order._id, status)
                            }
                            className="capitalize"
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="text-right">
                  ${order.totalPrice}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminOrders;
