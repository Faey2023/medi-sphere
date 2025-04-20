'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EditProfilePage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(`http://localhost:5000/api/users/by-email/${session.user.email}`)
        .then((res) => {
          setName(res.data.name || '');
          setEmail(res.data.email || '');
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
        });
    }
  }, [session]);

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/users/by-email/${session?.user?.email}`, {
        name,
        email,
      });
      alert('Profile updated!');
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Update failed.');
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) return <div>You must be signed in to edit your profile.</div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

      <div className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

        <Button onClick={handleSubmit}>Update Profile</Button>
      </div>
    </div>
  );
}
