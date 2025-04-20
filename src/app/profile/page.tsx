'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function ProfilePage() {
  interface User {
    name?: string;
    email?: string;
    role?: string;
    _id?: string; // MongoDB Object ID
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the user profile (assuming your backend endpoint provides this)
        const profileRes = await axios.get('http://localhost:5000/api/users/6804a6c6616afc90df99a50e');
        const profileData = profileRes.data;

        setUser(profileData); // Store the user data in state
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Profile Update
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
    <div className="mx-auto max-w-2xl p-6">
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <Image
            src={user?.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'}
            width={120}
            height={120}
            alt="User Image"
            className="mx-auto rounded-full border border-gray-300"
          />

          <div>
            <h2 className="text-xl font-medium mt-2">Welcome, {user?.name}</h2>
            <p className="text-muted-foreground">Email: {user?.email}</p>
            <p className="text-muted-foreground">Role: {user?.role}</p>
            {/* <p className="text-xs text-gray-400 mt-1">ID: {user?._id || 'Not found'}</p> Display ID here */}
          </div>

          <Button onClick={handleUpdateProfile}>
            {user?._id ? 'Update Profile' : 'Cannot Update'}
          </Button>
          <Button variant="outline" onClick={() => router.push('/')} className="mt-4">
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
