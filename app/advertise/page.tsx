import { PricingTable } from '@/components/PricingTable';

export default function AdvertisePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Advertising Pricing
        </h1>
        <p className="text-xl text-gray-300">
          Choose the plan that works for your business
        </p>
      </div>

      <PricingTable />

      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-2">What are dofollow links?</h3>
            <p className="text-gray-300">
              Dofollow links pass SEO value (link juice) to your site, helping improve your search engine rankings.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-2">How quickly are ads approved?</h3>
            <p className="text-gray-300">
              Banner and classified ads are auto-approved. Sponsored reviews require admin approval, typically within 24-48 hours.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-300">
              Yes, you can cancel your subscription at any time. Your ads will remain active until the end of your billing period.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-300">
              We accept all major credit cards through Stripe. Payments are processed securely and automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

