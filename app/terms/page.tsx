export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300">
            By accessing and using BetAdHub, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Advertising Services</h2>
          <p className="text-gray-300">
            BetAdHub provides advertising services for betting sites, sportsbooks, casinos, and related businesses. 
            All advertisements are subject to approval and must comply with our content guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Payment Terms</h2>
          <p className="text-gray-300">
            Subscriptions are billed monthly or annually in advance. All fees are non-refundable except as required by law. 
            You may cancel your subscription at any time, and your ads will remain active until the end of your billing period.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Content Guidelines</h2>
          <p className="text-gray-300">
            Advertisers are responsible for ensuring their content complies with applicable laws and regulations. 
            We reserve the right to reject or remove any content that violates our guidelines or applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-300">
            BetAdHub is not responsible for any damages arising from the use of our services. 
            We provide advertising space only and do not endorse or guarantee any advertised products or services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Changes to Terms</h2>
          <p className="text-gray-300">
            We reserve the right to modify these terms at any time. Continued use of our services after changes 
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <p className="text-gray-400 text-sm mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </section>
      </div>
    </div>
  );
}

