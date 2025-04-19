'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

export default function EditProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/profile/${id}`);
        const { name, email, image } = res.data;
        setFormData({
          name: name || '',
          email: email || '',
          image: image || '',
        });
      } catch (err) {
        console.error('Error fetching user profile', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/profile/${id}`, formData);
      router.push('/profile');
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  if (loading) return <div className="p-6 text-center text-lg">Loading...</div>;

  return (
    <div className="mx-auto max-w-xl p-6">
      <Card className="shadow-xl border border-gray-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="image"
              placeholder="Profile Image URL"
              value={formData.image}
              onChange={handleChange}
            />
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
