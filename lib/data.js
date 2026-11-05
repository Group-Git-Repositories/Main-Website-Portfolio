import bundledPortfolioData from '../data/company_portfolio.json';
import { promises as fs } from 'fs';
import path from 'path';
import { get, put } from '@vercel/blob';

const dataFilePath = path.join(process.cwd(), 'data', 'company_portfolio.json');
const backupFilePath = path.join(process.cwd(), 'data', 'company_portfolio.backup.json');
const inquiriesFilePath = path.join(process.cwd(), 'data', 'inquiries.json');
const commentsFilePath = path.join(process.cwd(), 'data', 'comments.json');

function getBlobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  if (process.env.VERCEL_BLOB_READ_WRITE_TOKEN) return process.env.VERCEL_BLOB_READ_WRITE_TOKEN;
  if (process.env.STORAGE_BLOB_READ_WRITE_TOKEN) return process.env.STORAGE_BLOB_READ_WRITE_TOKEN;

  // Support custom/store-prefixed tokens created by Vercel
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
  // 1. Read the baseline JSON shipped with the current deployment
  let localData = bundledPortfolioData;
  try {
    const raw = await fs.readFile(dataFilePath, 'utf-8');
    localData = JSON.parse(raw);
  } catch (err) {
    localData = bundledPortfolioData;
  }

  const token = getBlobToken();

  // 2. If running on Vercel with Blob Storage, check remote state
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
        if (text) {
          const blobData = JSON.parse(text);

          // If blob is from an older schema/version or missing vision/mission, auto-sync remote blob with new deployment
          const targetVersion = Math.max(localData?.version || 7, 7);
          const isOutdated =
            !blobData.version ||
            blobData.version < targetVersion ||
            !blobData.testimonials ||
            !blobData.company?.vision ||
            !blobData.company?.mission ||
            (blobData.company?.linkedin && !blobData.company.linkedin.startsWith('http'));

          if (localData && isOutdated) {
            console.log(`Vercel Blob is version ${blobData.version || 0}. Upgrading to version ${targetVersion}...`);
            const upgradedData = {
              ...localData,
              ...blobData,
              projects: localData.projects,
              company: {
                ...localData.company,
                ...(blobData.company || {}),
                vision: blobData.company?.vision || localData.company?.vision,
                mission: blobData.company?.mission || localData.company?.mission,
              },
              version: targetVersion,
            };
            try {
              await saveCompanyData(upgradedData);
            } catch (syncErr) {
              console.error('Failed to auto-upgrade blob:', syncErr);
            }
            return upgradedData;
          }

          if (localData?.company && (!blobData.company?.vision || !blobData.company?.mission)) {
            blobData.company = {
              ...blobData.company,
              vision: blobData.company?.vision || localData.company.vision,
              mission: blobData.company?.mission || localData.company.mission,
            };
          }

          return blobData;
        }
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
          if (text) {
            const blobData = JSON.parse(text);
            const targetVersion = Math.max(localData?.version || 7, 7);
            const isOutdated =
              !blobData.version ||
              blobData.version < targetVersion ||
              !blobData.testimonials ||
              !blobData.company?.vision ||
              !blobData.company?.mission ||
              (blobData.company?.linkedin && !blobData.company.linkedin.startsWith('http'));

            if (localData && isOutdated) {
              console.log(`Vercel Blob is version ${blobData.version || 0}. Upgrading to version ${targetVersion}...`);
              const upgradedData = {
                ...localData,
                ...blobData,
                projects: localData.projects,
                company: {
                  ...localData.company,
                  ...(blobData.company || {}),
                  vision: blobData.company?.vision || localData.company?.vision,
                  mission: blobData.company?.mission || localData.company?.mission,
                },
                version: targetVersion,
              };
              try {
                await saveCompanyData(upgradedData);
              } catch (_) {}
              return upgradedData;
            }

            if (localData?.company && (!blobData.company?.vision || !blobData.company?.mission)) {
              blobData.company = {
                ...blobData.company,
                vision: blobData.company?.vision || localData.company.vision,
                mission: blobData.company?.mission || localData.company.mission,
              };
            }

            return blobData;
          }
        }
      } catch (_) {
        // Fall through to local file
      }
    }
  }

  return localData || bundledPortfolioData;
}

export async function saveCompanyData(data) {
  const token = getBlobToken();
  const payloadWithVersion = {
    ...data,
    version: data.version || 2,
    lastSaved: new Date().toISOString(),
  };
  const jsonString = JSON.stringify(payloadWithVersion, null, 2);
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
    if (blobSaved || process.env.VERCEL || fsErr.code === 'EROFS' || fsErr.code === 'ENOENT' || fsErr.code === 'EACCES' || fsErr.message?.includes('read-only')) {
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

export async function getCommentsData() {
  const token = getBlobToken();
  if (token) {
    try {
      let res = await get('data/comments.json', { access: 'public', token, useCache: false });
      if (!res?.stream) {
        res = await get('data/comments.json', { access: 'private', token, useCache: false });
      }
      if (res && res.stream) {
        const text = await new Response(res.stream).text();
        if (text) return JSON.parse(text);
      }
    } catch (_) {
      try {
        const res = await get('data/comments.json', { access: 'private', token, useCache: false });
        if (res && res.stream) {
          const text = await new Response(res.stream).text();
          if (text) return JSON.parse(text);
        }
      } catch (_) {}
    }
  }

  try {
    const raw = await fs.readFile(commentsFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export async function saveComment(comment) {
  const token = getBlobToken();
  const current = await getCommentsData();
  const newComment = {
    id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: comment.status || 'Approved',
    name: comment.name ? comment.name.trim() : 'Anonymous Client',
    email: comment.email ? comment.email.trim() : '',
    role: comment.role ? comment.role.trim() : '',
    rating: Math.min(5, Math.max(1, Number(comment.rating) || 5)),
    comment: comment.comment ? comment.comment.trim() : '',
  };
  const updated = [newComment, ...current];
  const jsonString = JSON.stringify(updated, null, 2);

  if (token) {
    try {
      await put('data/comments.json', jsonString, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
        contentType: 'application/json',
      });
    } catch (_) {
      try {
        await put('data/comments.json', jsonString, {
          access: 'private',
          addRandomSuffix: false,
          allowOverwrite: true,
          token,
          contentType: 'application/json',
        });
      } catch (err) {
        console.error('Blob comments save error:', err);
      }
    }
  }

  try {
    await fs.writeFile(commentsFilePath, jsonString, 'utf-8');
    return newComment;
  } catch (err) {
    console.error('Error saving comment:', err);
    return newComment;
  }
}

export async function updateComment(id, updates) {
  const token = getBlobToken();
  const current = await getCommentsData();
  const index = current.findIndex((c) => c.id === id);
  if (index === -1) return false;

  current[index] = { ...current[index], ...updates, updatedAt: new Date().toISOString() };
  const jsonString = JSON.stringify(current, null, 2);

  if (token) {
    try {
      await put('data/comments.json', jsonString, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
        contentType: 'application/json',
      });
    } catch (_) {
      try {
        await put('data/comments.json', jsonString, {
          access: 'private',
          addRandomSuffix: false,
          allowOverwrite: true,
          token,
          contentType: 'application/json',
        });
      } catch (err) {
        console.error('Blob comments update error:', err);
      }
    }
  }

  try {
    await fs.writeFile(commentsFilePath, jsonString, 'utf-8');
    return current[index];
  } catch (err) {
    console.error('Error writing comments file:', err);
    return current[index];
  }
}

export async function deleteComment(id) {
  const token = getBlobToken();
  const current = await getCommentsData();
  const filtered = current.filter((c) => c.id !== id);
  if (filtered.length === current.length) return false;

  const jsonString = JSON.stringify(filtered, null, 2);

  if (token) {
    try {
      await put('data/comments.json', jsonString, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
        contentType: 'application/json',
      });
    } catch (_) {
      try {
        await put('data/comments.json', jsonString, {
          access: 'private',
          addRandomSuffix: false,
          allowOverwrite: true,
          token,
          contentType: 'application/json',
        });
      } catch (err) {
        console.error('Blob comments delete error:', err);
      }
    }
  }

  try {
    await fs.writeFile(commentsFilePath, jsonString, 'utf-8');
    return true;
  } catch (err) {
    console.error('Error deleting comment file:', err);
    return true;
  }
}
