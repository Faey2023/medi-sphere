'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';

export default function EditProfilePage() {
  const params = useParams();
  const [user, setUser] = useState({ _id: '', name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${params.id}`
        );
        setUser(res.data);
      } catch (err) {
        console.error('User load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${params.id}`, {
        name: user.name,
        email: user.email,
      });
      alert('প্রোফাইল সফলভাবে আপডেট হয়েছে।');
      router.push('/profile');
    } catch (err) {
      console.error('Update failed:', err);
      alert('প্রোফাইল আপডেট করতে সমস্যা হয়েছে।');
    }
  };

  if (loading) return <div className="text-center">লোড হচ্ছে...</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl p-6 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            প্রোফাইল এডিট করুন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">নাম</Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ইমেইল</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              আপডেট করুন
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
