'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface PendingReview {
  id: string;
  url: string;
  description?: string;
  review_brief?: string;
  review_content?: string;
  slug?: string;
  created_at: string;
}

export function AdminPanel() {
  const router = useRouter();
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [reviewContent, setReviewContent] = useState('');

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  async function fetchPendingReviews() {
    const supabase = createClient();
    const { data } = await supabase
      .from('ads')
      .select('id, url, description, review_brief, review_content, slug, created_at')
      .eq('type', 'review')
      .eq('approved', false)
      .order('created_at', { ascending: false });

    if (data) {
      setPendingReviews(data);
    }
    setLoading(false);
  }

  async function approveReview(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('ads')
      .update({ approved: true })
      .eq('id', id);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      router.refresh();
      fetchPendingReviews();
    }
  }

  async function saveReviewContent(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('ads')
      .update({ review_content: reviewContent })
      .eq('id', id);

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      setEditingId(null);
      fetchPendingReviews();
    }
  }

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Pending Reviews</h2>
      {pendingReviews.length === 0 ? (
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center">
          <p className="text-gray-400">No pending reviews</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingReviews.map((review) => (
            <div key={review.id} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">{review.description || 'Review'}</h3>
                <p className="text-gray-400 text-sm break-all mb-2">URL: {review.url}</p>
                {review.review_brief && (
                  <p className="text-gray-300 mb-2">{review.review_brief}</p>
                )}
                <p className="text-xs text-gray-500">
                  Submitted: {new Date(review.created_at).toLocaleString()}
                </p>
              </div>

              {editingId === review.id ? (
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Review Content (Markdown)</label>
                  <textarea
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 h-64 font-mono text-sm"
                    placeholder="Write review content in Markdown..."
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => saveReviewContent(review.id)}
                      className="bg-betting-green text-betting-darker px-4 py-2 rounded font-semibold hover:opacity-90 transition"
                    >
                      Save Content
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setReviewContent('');
                      }}
                      className="bg-gray-700 text-white px-4 py-2 rounded font-semibold hover:opacity-90 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  {review.review_content ? (
                    <div className="bg-gray-800 p-4 rounded text-sm text-gray-300 whitespace-pre-wrap">
                      {review.review_content}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No review content yet</p>
                  )}
                  <button
                    onClick={() => {
                      setEditingId(review.id);
                      setReviewContent(review.review_content || '');
                    }}
                    className="mt-2 text-betting-green hover:underline text-sm"
                  >
                    {review.review_content ? 'Edit Content' : 'Add Review Content'}
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => approveReview(review.id)}
                  className="bg-betting-green text-betting-darker px-6 py-2 rounded font-semibold hover:opacity-90 transition"
                >
                  Approve & Publish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

