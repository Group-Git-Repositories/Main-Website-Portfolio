import { NextResponse } from 'next/server';
import { getCompanyData, saveCompanyData } from '../../../lib/data';
import { getSessionFromRequest } from '../../../lib/auth';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const forceReset = searchParams.get('reset') === 'true';

  // If manual reset requested and user has session (or in dev)
  if (forceReset) {
    const session = getSessionFromRequest(request);
    if (session) {
      try {
        const localPath = path.join(process.cwd(), 'data', 'company_portfolio.json');
        const raw = await fs.readFile(localPath, 'utf-8');
        const defaultData = JSON.parse(raw);
        await saveCompanyData(defaultData);
        return NextResponse.json({ success: true, message: 'Reset to repository defaults', data: defaultData });
      } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }
  }

  const data = await getCompanyData();
  if (!data) {
    return NextResponse.json({ error: 'Failed to load company data' }, { status: 500 });
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
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
