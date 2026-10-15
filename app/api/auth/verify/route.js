import { NextResponse } from 'next/server';
import { getSessionFromRequest } from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
