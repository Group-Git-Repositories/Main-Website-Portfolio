import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { put } from '@vercel/blob';
import { getSessionFromRequest } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const session = getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name || 'mockup.png';
    const cleanName = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    const token =
      process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.VERCEL_BLOB_READ_WRITE_TOKEN ||
      process.env.STORAGE_BLOB_READ_WRITE_TOKEN;

    if (token) {
      const blob = await put(`projects/${cleanName}`, buffer, {
        access: 'public',
        token,
      });
      return NextResponse.json({ url: blob.url });
    }

    // Save locally to public/projects
    const uploadDir = path.join(process.cwd(), 'public', 'projects');
    await fs.mkdir(uploadDir, { recursive: true });
    const localFilePath = path.join(uploadDir, cleanName);
    await fs.writeFile(localFilePath, buffer);

    return NextResponse.json({ url: `/projects/${cleanName}` });
  } catch (err) {
    console.error('Upload failed:', err);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
