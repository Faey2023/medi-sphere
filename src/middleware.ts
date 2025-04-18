// export { default } from "next-auth/middleware"

// export const config = { matcher: [
//     "/orders(/.*)?",
//     "/profile",
//     "/dashboard",
//   ], }

// export { default } from "next-auth/middleware"

import { getToken } from 'next-auth/jwt';
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from 'next/server';

// export const config = { matcher: [
//     "/orders(/.*)?", // Matches /orders, /orders/add, /orders/update, /orders/delete
//     "/profile",
//   ], }

const roleBasedRoutes = {
  user: ['/orders', '/profile'],
  admin: ['/orders', '/orders/add', '/orders/delete', '/profile'],
};

export default async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect('/login');
    }

    const userRole = token.role;

    const allowedRoutes =
      roleBasedRoutes[userRole as keyof typeof roleBasedRoutes];

    if (userRole && allowedRoutes) {
      const hasAccess = allowedRoutes.includes(pathname);

      if (hasAccess) {
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL('/', req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = { matcher: ['/orders(/.*)?', '/profile'] };
