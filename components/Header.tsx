'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDomainType } from '@/lib/utils/hostname';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [domainType, setDomainType] = useState<'sales' | 'directory'>('sales');
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setDomainType(getDomainType(window.location.hostname));
    
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      setUser(user);
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();
        setIsAdmin(userData?.role === 'admin');
      }
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  return (
    <header className="border-b border-gray-800 bg-betting-darker">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-betting-green">
          {domainType === 'sales' ? 'BetAdHub' : 'BetTipsHub'}
        </Link>
        
        <div className="flex items-center gap-6">
          {domainType === 'sales' ? (
            <>
              <Link href="/advertise" className="text-gray-300 hover:text-betting-green transition">
                Pricing
              </Link>
              <Link 
                href="https://bettipshub.com" 
                className="text-gray-300 hover:text-betting-green transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Directory →
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/" 
                className={`transition ${pathname === '/' ? 'text-betting-green font-semibold underline' : 'text-gray-300 hover:text-betting-green'}`}
              >
                Directory
              </Link>
              <Link href="/classifieds" className="text-gray-300 hover:text-betting-green transition">
                Classifieds
              </Link>
              <Link 
                href="https://betadhub.com/advertise" 
                className="text-gray-300 hover:text-betting-green transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Advertise Here →
              </Link>
            </>
          )}
          
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-300 hover:text-betting-green transition">
                Dashboard
              </Link>
              {isAdmin && (
                <Link href="/admin" className="text-gray-300 hover:text-betting-green transition">
                  Admin
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-betting-green transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-betting-green transition">
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-betting-green text-betting-darker px-4 py-2 rounded font-semibold hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

