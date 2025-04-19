import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const roleBasedRoutes = {
  user: ['/orders', '/orders/add', '/profile'],
  admin: ['/admin', '/profile'],
};

export default async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const userRole = token.role as keyof typeof roleBasedRoutes;

    if (!userRole || !(userRole in roleBasedRoutes)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    const allowedRoutes = roleBasedRoutes[userRole as keyof typeof roleBasedRoutes];

    const isAllowed = allowedRoutes.some((route) =>
      pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isAllowed) {
      return NextResponse.next();
    }

    // Redirect unauthorized access
    return NextResponse.redirect(new URL('/', req.url));
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/orders(/.*)?', '/admin(/.*)?', '/profile'],
};
