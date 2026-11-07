import { NextResponse } from 'next/server';
import { getSessionFromRequest, AUTH_COOKIE_NAME, verifySessionToken } from '../../../../lib/auth';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  let session = getSessionFromRequest(request);

  if (!session) {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
      if (token && verifySessionToken(token)) {
        session = { authenticated: true };
      }
    } catch (_) {}
  }

  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      {
        status: 401,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
        },
      }
    );
  }

  return NextResponse.json(
    { authenticated: true },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
      },
    }
  );
}
