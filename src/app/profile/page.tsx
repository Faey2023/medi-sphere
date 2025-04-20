'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import { useCallback } from 'react';
 
// import { registerUser } from '@/actions/serverActions';

export default function ProfilePage() {
  interface User {
    name?: string;
    email?: string;
    role?: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  interface Session {
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
  }

  const [session, setSession] = useState<Session | null>(null);
  const [mongoId, setMongoId] = useState<string | null>(null);
  const [, setRawData] = useState<string>('');

  const router = useRouter();

  // Improved helper function to extract MongoDB ObjectId
 

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractMongoId = useCallback((data: Record<string, any>): string | null => {
    // Case 1: _id is a string like "ObjectId('...')"
    if (data?._id && typeof data._id === 'string') {
      const match = data._id.match(/ObjectId\(['"]?([0-9a-fA-F]{24})['"]?\)/);
      if (match) return match[1];
      if (/^[0-9a-fA-F]{24}$/.test(data._id)) return data._id;
    }

    // Case 2: _id is an object with $oid
    if (data?._id && typeof data._id === 'object' && data._id.$oid) {
      return data._id.$oid;
    }

    // Case 3: _id is an object with toString method
    if (data?._id && typeof data._id.toString === 'function') {
      const str = data._id.toString();
      const match = str.match(/ObjectId\(['"]?([0-9a-fA-F]{24})['"]?\)/);
      if (match) return match[1];
      if (/^[0-9a-fA-F]{24}$/.test(str)) return str;
    }

    // Case 4: _id or id as plain string elsewhere in the object
    if (typeof data.id === 'string' && /^[0-9a-fA-F]{24}$/.test(data.id)) {
      return data.id;
    }

    // Case 5: Nested _id (e.g. user._id)
    if (data?.user?._id) {
      return extractMongoId(data.user);
    }

    // Case 6: JSON string
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return extractMongoId(parsed);
      } catch {
        // Not a valid JSON string
      }
    }

    return null;
  }, []);

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
              const directRes = await axios.get(`http://localhost:5000/api/users/email/${sessionData.user.email}`);
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

    console.log('Using MongoDB ID for update:', mongoId);
    router.push(`/profile/${mongoId}/edit`);
  };

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;
  if (!user) return <div className="p-6 text-center text-red-500">User not found</div>;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <Image
            src={session?.user?.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'}
            width={120}
            height={120}
            alt="User Image"
            className="mx-auto rounded-full border border-gray-300"
          />

          <div>
            <h2 className="text-xl font-medium mt-2">Welcome, {user?.name || session?.user?.name}</h2>
            <p className="text-muted-foreground">Email: {user?.email || session?.user?.email}</p>
            <p className="text-muted-foreground">Role: {user?.role === 'admin' ? 'Admin' : 'User'}</p>
            <p className="text-xs text-gray-400 mt-1">ID: {mongoId || 'Not found'}</p>
          </div>

         

          <Button onClick={handleUpdateProfile} disabled={!mongoId}>
            {mongoId ? 'Update Profile' : 'Cannot Update'}
          </Button>
          <Button variant="outline" onClick={() => router.push('/')} className="mt-4">
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
