import { getDomainType } from '@/lib/utils/hostname';
import { SalesHomepage } from '@/components/SalesHomepage';
import { DirectoryHomepage } from '@/components/DirectoryHomepage';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  const hostname = headersList.get('host') || '';
  const domainType = getDomainType(hostname);

  if (domainType === 'sales') {
    return <SalesHomepage />;
  }

  return <DirectoryHomepage />;
}

