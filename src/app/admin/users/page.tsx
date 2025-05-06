'use client';

import { useGetAllUsersQuery } from '@/redux/features/users/userApi';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { User } from '@/types';

const ManageUsers = () => {
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();

  return (
    <div className="container mx-auto pt-4">
      <h2 className="mb-4 text-2xl font-bold">Manage Users</h2>

      {usersLoading ? (
        <Skeleton />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>View Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user._id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/orders/${user.email}`}>
                    <button className="cursor-pointer text-cyan-600 hover:underline">
                      View Orders
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageUsers;
