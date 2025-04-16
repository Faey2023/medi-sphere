'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', formData);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#e6f0ff] to-[#f2f8ff] px-4">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Left Section - Image or Branding */}
        <div className="hidden w-1/2 items-center justify-center bg-[#edf6ff] p-10 lg:flex">
          <Image
            src="/medicine-login.png"
            alt="Login"
            width={400}
            height={400}
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full p-10 lg:w-1/2">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="mb-8 text-center text-gray-500">
            Login to your medicine shop account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="mr-2"
                />
                Remember me
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white transition duration-300 hover:bg-indigo-700"
            >
              Login
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleSocialLogin('GitHub')}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
            >
              <Image
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Logo"
                width={24}
                height={24}
                className="rounded-full"
              />
              Login with GitHub
            </button>

            <button
              onClick={() => handleSocialLogin('Google')}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-400"
            >
              <Image
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google Logo"
                width={24}
                height={24}
                className="rounded-full"
              />
              Login with Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
