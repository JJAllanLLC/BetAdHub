'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

interface Review {
  id: string;
  url: string;
  review_brief?: string;
  banner_image_url?: string;
  slug?: string;
  description?: string;
}

export function DirectoryGrid({ type }: { type: 'review' }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const supabase = createClient();
      const { data } = await supabase
        .from('ads')
        .select('id, url, review_brief, banner_image_url, slug, description')
        .eq('type', type)
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (data) {
        setReviews(data);
      }
      setLoading(false);
    }

    fetchReviews();
  }, [type]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-900 rounded-lg h-64 animate-pulse" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-12 text-center border border-gray-800">
        <p className="text-gray-400">No reviews available yet</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <Link
          key={review.id}
          href={review.slug ? `/reviews/${review.slug}` : '#'}
          className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-betting-green transition group"
        >
          {review.banner_image_url && (
            <div className="relative h-48 w-full">
              <Image
                src={review.banner_image_url}
                alt={review.description || 'Review'}
                fill
                className="object-cover group-hover:scale-105 transition"
                unoptimized
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-betting-green transition">
              {review.description || 'Sponsored Review'}
            </h3>
            {review.review_brief && (
              <p className="text-gray-400 text-sm line-clamp-3">{review.review_brief}</p>
            )}
            <span className="inline-block mt-4 text-betting-green text-sm font-semibold">
              Read Review →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

