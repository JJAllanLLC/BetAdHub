'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface Classified {
  id: string;
  url: string;
  description?: string;
}

export function ClassifiedListings() {
  const [listings, setListings] = useState<Classified[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      const supabase = createClient();
      const { data } = await supabase
        .from('ads')
        .select('id, url, description')
        .eq('type', 'classified')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (data) {
        setListings(data);
      }
      setLoading(false);
    }

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-900 rounded-lg h-20 animate-pulse" />
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-12 text-center border border-gray-800">
        <p className="text-gray-400">No classified listings available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={listing.url}
          target="_blank"
          rel="nofollow sponsored"
          className="block bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-betting-green transition group"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-betting-green transition">
                {listing.description || 'Classified Listing'}
              </h3>
              <p className="text-sm text-gray-400 break-all">{listing.url}</p>
            </div>
            <span className="text-betting-green ml-4">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

