/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
export const registerUser = async (data: any) => {
  console.log('data', data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();
  console.log(result);
  return result;
};
