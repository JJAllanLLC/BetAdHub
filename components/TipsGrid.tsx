'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

interface Tip {
  id: string;
  url: string;
  review_brief?: string;
  banner_image_url?: string;
  slug?: string;
  description?: string;
  type: 'review';
}

export function TipsGrid() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTips() {
      const supabase = createClient();
      // Fetch reviews (sponsored tips) and mix them with free content
      // For now, we'll show reviews as they are the sponsored tips
      const { data } = await supabase
        .from('ads')
        .select('id, url, review_brief, banner_image_url, slug, description, type')
        .eq('type', 'review')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(9);

      if (data) {
        setTips(data as Tip[]);
      }
      setLoading(false);
    }

    fetchTips();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="bg-gray-900 rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (tips.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-12 text-center border border-gray-800">
        <p className="text-gray-400">No tips available yet</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tips.map((tip) => (
        <Link
          key={tip.id}
          href={tip.slug ? `/reviews/${tip.slug}` : '#'}
          className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group relative"
        >
          <span className="absolute top-4 right-4 bg-betting-green text-betting-darker text-xs font-semibold px-3 py-1 rounded z-10">
            Sponsored
          </span>
          {tip.banner_image_url ? (
            <div className="relative h-48 w-full">
              <Image
                src={tip.banner_image_url}
                alt={tip.description || 'Review'}
                fill
                className="object-cover group-hover:scale-105 transition"
                unoptimized
              />
            </div>
          ) : (
            <div className="relative h-48 w-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Sportsbook Review</span>
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3 group-hover:text-betting-green transition">
              {tip.description || 'Sponsored Review'}
            </h3>
            {tip.review_brief && (
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{tip.review_brief}</p>
            )}
            <span className="inline-block text-betting-green text-sm font-semibold">
              Read More →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

