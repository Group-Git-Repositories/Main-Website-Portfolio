import crypto from 'crypto';

const COOKIE_NAME = 'hope_admin_session';
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecret() {
  return process.env.SESSION_SECRET || 'fallback_dev_secret_key_hope_teams_2026';
}

export function verifyCredentials(username, password) {
  if (!username || !password) return false;

  const u = String(username).trim();
  const p = String(password).trim();

  // Primary credentials requested by the user
  if (u === 'RohaDev123' && p === 'Roha123@098765') {
    return true;
  }

  // Also support environment variables if configured
  const envUser = process.env.ADMIN_USERNAME?.trim();
  const envPass = process.env.ADMIN_PASSWORD?.trim();
  if (envUser && envPass && u === envUser && p === envPass) {
    return true;
  }

  return false;
}

export function createSessionToken(username) {
  const secret = getSecret();
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const token = Buffer.from(`${payload}:${hmac}`).toString('base64');
  return token;
}

export function verifySessionToken(token) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length < 3) return false;

    // Last part is the hex hmac signature
    const signature = parts[parts.length - 1];
    // Second to last part is the timestamp
    const timestampStr = parts[parts.length - 2];
    // Any preceding parts form the username
    const username = parts.slice(0, parts.length - 2).join(':');

    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp)) return false;

    const now = Date.now();
    // Check expiration (7 days)
    if (now - timestamp > SESSION_TTL * 1000) {
      return false;
    }

    const secret = getSecret();
    const expectedPayload = `${username}:${timestampStr}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(expectedPayload).digest('hex');

    const bufSig = Buffer.from(signature);
    const bufExp = Buffer.from(expectedSignature);

    if (bufSig.length !== bufExp.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufSig, bufExp);
  } catch (err) {
    return false;
  }
}

export function getSessionFromRequest(request) {
  let token = null;

  // 1. Try NextRequest / Next.js request.cookies API
  try {
    if (request?.cookies?.get) {
      token = request.cookies.get(COOKIE_NAME)?.value;
    }
  } catch (_) {}

  // 2. Fallback to raw Cookie header with robust regex (preserves base64 padding '=' characters)
  if (!token && request?.headers?.get) {
    try {
      const cookieHeader = request.headers.get('cookie') || '';
      const match = cookieHeader.match(new RegExp('(?:^|;\\s*)' + COOKIE_NAME + '=([^;]*)'));
      if (match && match[1]) {
        token = decodeURIComponent(match[1].trim());
      }
    } catch (_) {}
  }

  if (!token) return null;

  const isValid = verifySessionToken(token);
  return isValid ? { authenticated: true } : null;
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
