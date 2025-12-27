'use client';

import { PRICING_TIERS } from '@/lib/stripe/config';
import { useState } from 'react';
import { createCheckoutSession } from '@/app/actions/checkout';

export function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (tier: 'banner' | 'classified' | 'review') => {
    setLoading(tier);
    try {
      const { url } = await createCheckoutSession(tier, billing);
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to create checkout session. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="bg-gray-900 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-6 py-2 rounded ${
              billing === 'monthly'
                ? 'bg-betting-green text-betting-darker font-semibold'
                : 'text-gray-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`px-6 py-2 rounded ${
              billing === 'annual'
                ? 'bg-betting-green text-betting-darker font-semibold'
                : 'text-gray-300'
            }`}
          >
            Annual <span className="text-sm">(15% off)</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {(['banner', 'classified', 'review'] as const).map((tier) => {
          const pricing = PRICING_TIERS[tier][billing];
          return (
            <div
              key={tier}
              className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-betting-green transition"
            >
              <h3 className="text-2xl font-bold mb-2 capitalize">{tier} Ad</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-betting-green">
                  ${pricing.price}
                </span>
                <span className="text-gray-400">/{billing === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <ul className="space-y-2 mb-6 text-gray-300">
                {tier === 'banner' && (
                  <>
                    <li>✓ Banner placement</li>
                    <li>✓ Dofollow link</li>
                    <li>✓ Auto-approval</li>
                  </>
                )}
                {tier === 'classified' && (
                  <>
                    <li>✓ Featured listing</li>
                    <li>✓ Description included</li>
                    <li>✓ Dofollow link</li>
                    <li>✓ Auto-approval</li>
                  </>
                )}
                {tier === 'review' && (
                  <>
                    <li>✓ Full review page</li>
                    <li>✓ SEO optimized</li>
                    <li>✓ Dofollow links</li>
                    <li>✓ Admin approval</li>
                  </>
                )}
              </ul>
              <button
                onClick={() => handleSubscribe(tier)}
                disabled={loading === tier}
                className="w-full bg-betting-green text-betting-darker py-3 rounded font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading === tier ? 'Loading...' : 'Subscribe'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

