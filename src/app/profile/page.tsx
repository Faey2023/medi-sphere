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
        setSession(data);

        // Register user from session info
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

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <div className="p-6">User not found</div>;

  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
          {session?.user && (
        <div className="text-center">
          <h1 className="mt-6 text-2xl">Welcome {session.user.name}</h1>
          <h2 className="text-md mt-2">
            Logged-in Email: {session.user.email}
          </h2>
          <Image
            src={
              session.user.image ||
              'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
            }
            width={100}
            height={100}
            alt="User Image"
            className="mx-auto mt-4 rounded-full"
          />
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            <strong>Name:</strong> {session.user.name}
          </p>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || 'N/A'}
          </p>
          <p>
            <strong>Address:</strong> {user.address || 'N/A'}
          </p>

          <Button onClick={() => router.push(`/profile/${user._id}/edit`)}>
            Update Profile
          </Button>
        </CardContent>
      </Card>

  
    </div>
  );
}
