import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import Image from 'next/image';

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: review } = await supabase
    .from('ads')
    .select('id, url, description, review_brief, review_content, banner_image_url, created_at')
    .eq('slug', slug)
    .eq('approved', true)
    .eq('type', 'review')
    .single();

  if (!review) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <article>
        {review.banner_image_url && (
          <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={review.banner_image_url}
              alt={review.description || 'Review'}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold mb-4">{review.description}</h1>
        
        {review.review_brief && (
          <p className="text-xl text-gray-300 mb-8">{review.review_brief}</p>
        )}

        {review.review_content ? (
          <div className="prose prose-invert max-w-none mb-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {review.review_content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 mb-8">
            <p className="text-gray-400">Review content coming soon...</p>
          </div>
        )}

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold mb-4">Visit Site</h2>
          <Link
            href={review.url}
            target="_blank"
            rel="nofollow sponsored"
            className="inline-block bg-betting-green text-betting-darker px-6 py-3 rounded font-semibold hover:opacity-90 transition"
          >
            Visit {review.description} →
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Published: {new Date(review.created_at).toLocaleDateString()}</p>
          <p className="mt-2">This is a sponsored review. BetAdHub receives advertising fees from the featured site.</p>
        </div>
      </article>
    </div>
  );
}

