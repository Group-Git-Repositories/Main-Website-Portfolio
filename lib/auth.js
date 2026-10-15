import crypto from 'crypto';

const COOKIE_NAME = 'hope_admin_session';
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days in seconds

function getSecret() {
  return process.env.SESSION_SECRET || 'fallback_dev_secret_key_hope_teams_2026';
}

export function verifyCredentials(username, password) {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD || 'hope2026';

  if (!username || !password) return false;
  return username.trim() === expectedUser.trim() && password.trim() === expectedPass.trim();
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
    if (parts.length !== 3) return false;

    const [username, timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();

    // Check expiration (7 days)
    if (now - timestamp > SESSION_TTL * 1000) {
      return false;
    }

    const secret = getSecret();
    const expectedPayload = `${username}:${timestampStr}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(expectedPayload).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch (err) {
    return false;
  }
}

export function getSessionFromRequest(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader
      .split(';')
      .map((c) => c.trim().split('='))
      .filter(([k, v]) => k && v)
  );

  const token = cookies[COOKIE_NAME];
  if (!token) return null;

  const isValid = verifySessionToken(token);
  return isValid ? { authenticated: true } : null;
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
