'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  interface User {
    name?: string;
    email?: string;
    role?: string;
    _id?: string;
    image?: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/email/${session.user.email}`
        );
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchData();
    } else if (status === 'unauthenticated') {
      setError('You are not logged in.');
      setLoading(false);
    }
  }, [session, status]);

  const handleUpdateProfile = () => {
    if (!user?._id) {
      alert('User ID could not be found.');
      return;
    }
    router.push(`/profile/${user._id}/edit`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl p-6 text-center shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Image
            src={
              user?.image ||
              'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
            }
            width={120}
            height={120}
            alt="User Image"
            className="mx-auto rounded-full border border-gray-300"
          />

          <div>
            <h2 className="text-xl font-medium">Welcome, {user?.name}</h2>
            <p className="text-muted-foreground">Email: {user?.email}</p>
            <p className="text-muted-foreground">
              Role: {user?.role || 'User'}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              ID: {user?._id || 'Not found'}
            </p>
          </div>

          <Button onClick={handleUpdateProfile} className="w-full">
            {user?._id ? 'Update Profile' : 'Cannot Update'}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="mt-2 w-full"
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
