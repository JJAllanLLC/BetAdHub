export function getDomainType(hostname: string): 'sales' | 'directory' {
  if (hostname === 'betadhub.com' || hostname === 'www.betadhub.com') {
    return 'sales';
  }
  if (hostname === 'bettipshub.com' || hostname === 'www.bettipshub.com') {
    return 'directory';
  }
  // Default to sales for localhost/development
  return 'sales';
}

export function getDomainName(hostname: string): string {
  if (hostname.includes('betadhub.com')) {
    return 'betadhub.com';
  }
  if (hostname.includes('bettipshub.com')) {
    return 'bettipshub.com';
  }
  return 'betadhub.com';
}

