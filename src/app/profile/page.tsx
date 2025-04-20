'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  interface User {
    name?: string;
    email?: string;
    role?: string;
    image?: string;
    _id?: string;
  }

  interface Session {
    user?: {
      image?: string;
      name?: string;
      email?: string;
      role?: string;
    };
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [mongoId, setMongoId] = useState<string | null>(null);
  const [, setRawData] = useState<string>('');
  const router = useRouter();

  const extractMongoId = useCallback(
    (data: Record<string, any>): string | null => {
      if (data?._id && typeof data._id === 'string') {
        const match = data._id.match(/ObjectId\(['"]?([0-9a-fA-F]{24})['"]?\)/);
        if (match) return match[1];
        if (/^[0-9a-fA-F]{24}$/.test(data._id)) return data._id;
      }

      if (data?._id && typeof data._id === 'object' && data._id.$oid) {
        return data._id.$oid;
      }

      if (data?._id && typeof data._id.toString === 'function') {
        const str = data._id.toString();
        const match = str.match(/ObjectId\(['"]?([0-9a-fA-F]{24})['"]?\)/);
        if (match) return match[1];
        if (/^[0-9a-fA-F]{24}$/.test(str)) return str;
      }

      if (typeof data.id === 'string' && /^[0-9a-fA-F]{24}$/.test(data.id)) {
        return data.id;
      }

      if (data?.user?._id) {
        return extractMongoId(data.user);
      }

      if (typeof data === 'string') {
        try {
          const parsed = JSON.parse(data);
          return extractMongoId(parsed);
        } catch {
          return null;
        }
      }

      return null;
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionRes = await fetch('/api/auth/session');
        const sessionData = await sessionRes.json();
        console.log('Session data:', sessionData);
        setSession(sessionData);

        try {
          const profileRes = await axios.get('/profile');
          console.log('Raw profile response:', profileRes);

          setRawData(JSON.stringify(profileRes.data, null, 2));
          setUser(profileRes.data);

          const extractedId = extractMongoId(profileRes.data);
          console.log('Extracted MongoDB ID:', extractedId);

          if (extractedId) {
            setMongoId(extractedId);
          } else {
            console.warn('Could not extract MongoDB ID from profile data');
          }
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);

          if (sessionData?.user?.email) {
            try {
              const directRes = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/email/${sessionData.user.email}`
              );
              console.log('Direct API response:', directRes.data);

              setUser(directRes.data);

              const directId = extractMongoId(directRes.data);
              if (directId) {
                setMongoId(directId);
              }
            } catch (directError) {
              console.error('Direct API call failed:', directError);
            }
          }
        }
      } catch (error) {
        console.error('Error in data fetching process:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [extractMongoId]);

  const handleUpdateProfile = () => {
    if (!mongoId) {
      console.warn('MongoDB ID not available');
      alert('User ID could not be found. Please try again or contact support.');
      return;
    }

    router.push(`/profile/${mongoId}/edit`);
  };

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (!user)
    return <div className="p-6 text-center text-red-500">User not found</div>;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Your Profile</CardTitle>
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
              Welcome, {user?.name || session?.user?.name}
            </h2>
            <p className="text-muted-foreground">
              Email: {user?.email || session?.user?.email}
            </p>
            <p className="text-muted-foreground">
              Role: {user?.role === 'admin' ? 'Admin' : 'User'}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              ID: {mongoId || 'Not found'}
            </p>
          </div>

          <Button onClick={handleUpdateProfile} disabled={!mongoId}>
            {mongoId ? 'Update Profile' : 'Cannot Update'}
          </Button>

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
