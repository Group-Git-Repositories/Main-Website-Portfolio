import { NextResponse } from 'next/server';
import { getCompanyData, saveCompanyData } from '../../../lib/data';
import { getSessionFromRequest } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getCompanyData();
  if (!data) {
    return NextResponse.json({ error: 'Failed to load company data' }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const updatedData = await request.json();
    if (!updatedData || typeof updatedData !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await saveCompanyData(updatedData);
    return NextResponse.json({ success: true, data: updatedData });
  } catch (err) {
    console.error('Error saving company content:', err);
    return NextResponse.json({ error: err.message || 'Failed to update content' }, { status: 500 });
  }
}
