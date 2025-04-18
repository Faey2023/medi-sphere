/* eslint-disable @typescript-eslint/no-explicit-any */
// src/actions/serverActions.ts

"use server";

export const registerUser = async (userInfo: any) => {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

 
  if (!res.ok) {
    const errorText = await res.text(); 
    throw new Error(`Server Error: ${res.status} - ${errorText}`);
  }

  const result = await res.json(); 
  return result;
};
