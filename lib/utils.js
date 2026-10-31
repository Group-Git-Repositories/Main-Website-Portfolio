/**
 * Ensures any external URL string has a valid absolute protocol (https://).
 * Prevents browsers from resolving "www.linkedin.com/..." as a relative path.
 */
export function ensureAbsoluteUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  if (trimmed.startsWith('//')) {
    return `https:${trimmed}`;
  }
  if (/^(mailto:|tel:|sms:)/i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}
