import { NextResponse } from 'next/server';
import { getInquiriesData, saveInquiry } from '../../../lib/data';
import { getSessionFromRequest } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  const inquiries = await getInquiriesData();
  return NextResponse.json(inquiries);
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!payload.name || !payload.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const success = await saveInquiry(payload);
    if (!success) {
      return NextResponse.json({ error: 'Could not record inquiry' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
