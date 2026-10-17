import { promises as fs } from 'fs';
import path from 'path';
import { get, put } from '@vercel/blob';

const dataFilePath = path.join(process.cwd(), 'data', 'company_portfolio.json');
const backupFilePath = path.join(process.cwd(), 'data', 'company_portfolio.backup.json');
const inquiriesFilePath = path.join(process.cwd(), 'data', 'inquiries.json');

function getBlobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  if (process.env.VERCEL_BLOB_READ_WRITE_TOKEN) return process.env.VERCEL_BLOB_READ_WRITE_TOKEN;
  if (process.env.STORAGE_BLOB_READ_WRITE_TOKEN) return process.env.STORAGE_BLOB_READ_WRITE_TOKEN;

  // Support custom/store-prefixed tokens created by Vercel (e.g. MAIN_WEBSITE_PORTFOLIO_BLOB_READ_WRITE_TOKEN)
  const allKeys = Object.keys(process.env);
  const matchingKey = allKeys.find(
    (k) =>
      k.endsWith('READ_WRITE_TOKEN') ||
      (k.includes('BLOB') && k.includes('TOKEN')) ||
      (k.includes('STORE') && k.includes('TOKEN'))
  );

  if (matchingKey && process.env[matchingKey]) {
    return process.env[matchingKey];
  }

  return undefined;
}

function getDetectedEnvSummary() {
  const keys = Object.keys(process.env).filter(
    (k) => /blob|store|token|storage/i.test(k) && !/npm/i.test(k)
  );
  return keys.length > 0 ? keys.join(', ') : 'none';
}

export async function getCompanyData() {
  const token = getBlobToken();

  // 1. If running with Vercel Blob Storage, attempt reading remote state (supports both public & private stores)
  if (token) {
    try {
      let res = await get('data/company_portfolio.json', {
        access: 'public',
        token,
        useCache: false,
      });
      if (!res?.stream) {
        res = await get('data/company_portfolio.json', {
          access: 'private',
          token,
          useCache: false,
        });
      }
      if (res && res.stream) {
        const text = await new Response(res.stream).text();
        if (text) return JSON.parse(text);
      }
    } catch (e) {
      try {
        const res = await get('data/company_portfolio.json', {
          access: 'private',
          token,
          useCache: false,
        });
        if (res && res.stream) {
          const text = await new Response(res.stream).text();
          if (text) return JSON.parse(text);
        }
      } catch (_) {
        // Fall through to local file read
      }
    }
  }

  // 2. Read from local JSON
  try {
    const raw = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading company_portfolio.json:', err);
    return null;
  }
}

export async function saveCompanyData(data) {
  const token = getBlobToken();
  const jsonString = JSON.stringify(data, null, 2);
  let blobSaved = false;

  // 1. Save to Vercel Blob if token available (auto-adapts to public or private stores)
  if (token) {
    try {
      await put('data/company_portfolio.json', jsonString, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
        contentType: 'application/json',
      });
      blobSaved = true;
    } catch (err) {
      try {
        await put('data/company_portfolio.json', jsonString, {
          access: 'private',
          addRandomSuffix: false,
          allowOverwrite: true,
          token,
          contentType: 'application/json',
        });
        blobSaved = true;
      } catch (privateErr) {
        console.error('Vercel blob save error:', privateErr);
        throw new Error(`Blob storage save failed: ${privateErr.message || err.message}`);
      }
    }
  }

  // 2. Save locally if writable (for local dev environments)
  try {
    try {
      const current = await fs.readFile(dataFilePath, 'utf-8');
      await fs.writeFile(backupFilePath, current, 'utf-8');
    } catch (_) {}

    await fs.writeFile(dataFilePath, jsonString, 'utf-8');
    return true;
  } catch (fsErr) {
    if (fsErr.code === 'EROFS' || fsErr.message?.includes('read-only')) {
      if (!token && !blobSaved) {
        const detected = getDetectedEnvSummary();
        throw new Error(`Vercel filesystem is read-only and no Blob token was found (detected storage/token env keys: [${detected}]). In Vercel, check Settings -> Environment Variables to ensure your BLOB token is checked for 'Production'.`);
      }
      return true;
    }
    throw fsErr;
  }
}

export async function getInquiriesData() {
  const token = getBlobToken();
  if (token) {
    try {
      let res = await get('data/inquiries.json', { access: 'public', token, useCache: false });
      if (!res?.stream) {
        res = await get('data/inquiries.json', { access: 'private', token, useCache: false });
      }
      if (res && res.stream) {
        const text = await new Response(res.stream).text();
        if (text) return JSON.parse(text);
      }
    } catch (_) {
      try {
        const res = await get('data/inquiries.json', { access: 'private', token, useCache: false });
        if (res && res.stream) {
          const text = await new Response(res.stream).text();
          if (text) return JSON.parse(text);
        }
      } catch (_) {}
    }
  }

  try {
    const raw = await fs.readFile(inquiriesFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export async function saveInquiry(inquiry) {
  const token = getBlobToken();
  const current = await getInquiriesData();
  const updated = [
    {
      id: `inq-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      status: 'New',
      ...inquiry,
    },
    ...current,
  ];
  const jsonString = JSON.stringify(updated, null, 2);

  if (token) {
    try {
      await put('data/inquiries.json', jsonString, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
        contentType: 'application/json',
      });
      return true;
    } catch (_) {
      try {
        await put('data/inquiries.json', jsonString, {
          access: 'private',
          addRandomSuffix: false,
          allowOverwrite: true,
          token,
          contentType: 'application/json',
        });
        return true;
      } catch (err) {
        console.error('Blob inquiry save error:', err);
      }
    }
  }

  try {
    await fs.writeFile(inquiriesFilePath, jsonString, 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving inquiry:', err);
    return false;
  }
}
