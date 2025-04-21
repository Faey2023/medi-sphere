'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { Eye, EyeClosed } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [togglePassword, setTogglePassword] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/'; // default to home if not specified

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false, // don't redirect immediately
      callbackUrl,
    });

    if (res?.ok) {
      toast.success('Login successful!');

      // Delay redirection a bit to show toast
      setTimeout(() => {
        window.location.href = callbackUrl;
      }, 1500);
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, {
      callbackUrl, // dynamic redirect
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-700">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring focus:ring-indigo-300 focus:outline-none"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={togglePassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 pr-10 focus:ring focus:ring-indigo-300 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setTogglePassword(!togglePassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {togglePassword ? (
                  <Eye className="cursor-pointer" />
                ) : (
                  <EyeClosed className="cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-800"
          >
            Login
          </button>
        </form>

        {/* Social Login Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => handleSocialLogin('github')}
            className="flex cursor-pointer items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-600"
          >
            <Image
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub Logo"
              width={24}
              height={24}
              className="mr-2 rounded-full"
            />
            Login with GitHub
          </button>
          <button
            onClick={() => handleSocialLogin('google')}
            className="flex cursor-pointer items-center justify-center rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-600"
          >
            <Image
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="GitHub Logo"
              width={24}
              height={24}
              className="mr-2 rounded-full"
            />
            Login with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don&rsquo;t have an account?{' '}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
