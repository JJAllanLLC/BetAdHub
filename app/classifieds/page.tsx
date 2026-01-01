'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

interface Classified {
  id: string;
  url: string;
  description?: string;
  banner_image_url?: string;
  created_at: string;
}

export default function ClassifiedsPage() {
  const [listings, setListings] = useState<Classified[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      const supabase = createClient();
      const { data } = await supabase
        .from('ads')
        .select('id, url, description, banner_image_url, created_at')
        .eq('type', 'classified')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (data) {
        // Sort: listings with images first (featured), then text-only
        const sorted = [...data].sort((a, b) => {
          const aHasImage = !!a.banner_image_url;
          const bHasImage = !!b.banner_image_url;
          if (aHasImage && !bHasImage) return -1;
          if (!aHasImage && bHasImage) return 1;
          return 0;
        });
        setListings(sorted);
      }
      setLoading(false);
    }

    fetchListings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Classified Listings</h1>
        <p className="text-xl text-gray-300">
          Find betting tools, tipster services, and more
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-900 rounded-lg h-20 animate-pulse" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-gray-900 rounded-lg p-12 text-center border border-gray-800">
          <p className="text-gray-400 text-lg mb-6">
            No classified listings available yet – Be the first! Post free or upgrade for featured placement.
          </p>
          <Link
            href="https://betadhub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-betting-green text-betting-darker px-6 py-3 rounded font-semibold hover:opacity-90 transition"
          >
            Advertise Here →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={listing.url}
              target="_blank"
              rel="dofollow"
              className="block bg-gray-900 rounded-lg border border-gray-800 hover:border-betting-green transition group"
            >
              {listing.banner_image_url ? (
                <div className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-gray-800">
                      <Image
                        src={listing.banner_image_url}
                        alt={listing.description || 'Classified Listing'}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-betting-green transition">
                        {listing.description || 'Classified Listing'}
                      </h3>
                      <p className="text-sm text-gray-400 break-all">{listing.url}</p>
                    </div>
                    <span className="text-betting-green ml-4">→</span>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-betting-green transition">
                        {listing.description || 'Classified Listing'}
                      </h3>
                      <p className="text-sm text-gray-400 break-all">{listing.url}</p>
                    </div>
                    <span className="text-betting-green ml-4">→</span>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

