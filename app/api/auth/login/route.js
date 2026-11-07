import { NextResponse } from 'next/server';
import { verifyCredentials, createSessionToken, AUTH_COOKIE_NAME } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!verifyCredentials(username, password)) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = createSessionToken(username);
    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

    const proto = request.headers.get('x-forwarded-proto') || request.nextUrl?.protocol?.replace(':', '');
    const isHttps = proto === 'https';

    const cookieOptions = {
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    };

    // Set cookie on response
    response.cookies.set(cookieOptions);

    // Also set via next/headers cookies() store for SSR consistency
    try {
      cookies().set(cookieOptions);
    } catch (_) {}

    return response;
  } catch (err) {
    console.error('Authentication error:', err);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
