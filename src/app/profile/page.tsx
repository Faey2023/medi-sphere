/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import { registerUser } from '@/actions/serverActions';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/profile');
        console.log('Fetched user from /profile:', res.data); // 👈 LOG user
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        console.log('Session:', data); // 👈 LOG session
        setSession(data);

        if (data?.user) {
          await registerUser({ ...data.user });
        }
      } catch (error) {
        console.error('Failed to fetch session', error);
      }
    };

    fetchUser();
    fetchSession();
  }, []);

  const handleUpdateProfile = () => {
    const userId = user?._id || user?.id;
    if (!userId) {
      console.warn('User ID not found');
      return;
    }
    router.push(`/profile/${userId}/edit`);
  };

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (!user)
    return <div className="p-6 text-center text-red-500">User not found</div>;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card className="rounded-2xl border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <Image
            src={
              session?.user?.image ||
              'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
            }
            width={120}
            height={120}
            alt="User Image"
            className="mx-auto rounded-full border border-gray-300"
          />

          <div>
            <h2 className="mt-2 text-xl font-medium">
              Welcome, {session?.user?.name}
            </h2>
            <p className="text-muted-foreground">
              Email: {session?.user?.email}
            </p>
            <p className="text-muted-foreground">
              Role: {session?.user?.role === 'admin' ? 'Admin' : 'User'}
            </p>
          </div>

          {user?._id ? (
            <Button onClick={handleUpdateProfile}>Update Profile</Button>
          ) : (
            <div className="text-sm text-red-500">User ID is missing</div>
          )}

          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="mt-4"
          >
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
