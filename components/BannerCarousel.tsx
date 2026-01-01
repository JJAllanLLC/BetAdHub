'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface Banner {
  id: string;
  url: string;
  banner_image_url: string;
  description?: string;
}

export function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      const supabase = createClient();
      const { data } = await supabase
        .from('ads')
        .select('id, url, banner_image_url, description')
        .eq('type', 'banner')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (data) {
        // Shuffle for random rotation
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setBanners(shuffled);
      }
      setLoading(false);
    }

    fetchBanners();

    // Auto-rotate every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(banners.length, 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg h-64 flex items-center justify-center">
        <p className="text-gray-400">Loading banners...</p>
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative">
      <Link
        href={currentBanner.url}
        target="_blank"
        rel="nofollow sponsored"
        className="block relative h-64 md:h-96 rounded-lg overflow-hidden border border-gray-800"
      >
        {currentBanner.banner_image_url ? (
          <Image
            src={currentBanner.banner_image_url}
            alt={currentBanner.description || 'Sponsored banner'}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <p className="text-gray-400">Banner Image</p>
          </div>
        )}
      </Link>

      {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            aria-label="Previous banner"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            aria-label="Next banner"
          >
            →
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition ${
                  index === currentIndex ? 'bg-betting-green w-8' : 'bg-gray-600 w-2'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

