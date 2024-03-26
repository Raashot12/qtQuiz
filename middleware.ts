import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  const verify = request.cookies.get('loggedin');
  if (
    (verify && request.nextUrl.pathname === '/auth/login') ||
    (verify && request.nextUrl.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}
