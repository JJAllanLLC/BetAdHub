import Link from 'next/link';
import { PricingTable } from './PricingTable';

export function SalesHomepage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Advertise Your Betting Site
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-4">
          Dofollow Ads from $15/month
        </p>
        <p className="text-xl text-gray-400 mb-8">
          No Site Too Small.
        </p>
        <Link
          href="/advertise"
          className="inline-block bg-betting-green text-betting-darker px-8 py-4 rounded-lg text-xl font-bold hover:opacity-90 transition"
        >
          View Pricing →
        </Link>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Affordable Advertising</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold text-betting-green mb-3">Banner Ads</h3>
            <p className="text-gray-300">
              Prominent banner placement on our high-traffic directory. Perfect for sportsbooks and casinos.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold text-betting-green mb-3">Classified Listings</h3>
            <p className="text-gray-300">
              Featured listings in our directory with description and direct link. Great for bonus sites.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold text-betting-green mb-3">Sponsored Reviews</h3>
            <p className="text-gray-300">
              Full review pages with SEO value. Ideal for tipsters and odds tools.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose BetAdHub?</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-2">✓ Dofollow Links</h3>
            <p className="text-gray-400">All links are dofollow for maximum SEO value.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">✓ No Commissions</h3>
            <p className="text-gray-400">We only charge ad fees. No revenue sharing.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">✓ Recurring Billing</h3>
            <p className="text-gray-400">Set it and forget it. Monthly or annual plans.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">✓ Quick Approval</h3>
            <p className="text-gray-400">Banner and classified ads auto-approve.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <PricingTable />
        <Link
          href="/advertise"
          className="inline-block mt-8 text-betting-green hover:underline text-lg"
        >
          View Full Pricing Details →
        </Link>
      </div>
    </div>
  );
}

