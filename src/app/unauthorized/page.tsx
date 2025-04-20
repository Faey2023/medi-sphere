import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
      <p className="mt-4 text-lg text-gray-700">
        You don not have permission to view this page.
      </p>
      <Link href="/" className="mt-6 text-indigo-600 hover:underline">
        Return to homepage
      </Link>
    </div>
  );
}
