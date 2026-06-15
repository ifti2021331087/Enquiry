import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { auth } from './lib/utils/auth';

// Make sure to import your Better Auth instance (update the path if needed) 

export async function proxy(request: NextRequest) {
  // 1. Better Auth safely extracts and checks the full session directly on the Node runtime
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // 2. If no valid session is found, send them to login
  if (!session) {
    const signInUrl = new URL('/auth/signIn', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 3. User is authenticated, let them through!
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/ask/:path*',
    '/problem/:path*',
    '/notifications/:path*',
    '/profile/:path*',
    '/admin/:path*'
  ],
};