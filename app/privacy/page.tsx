export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="text-gray-300">
            We collect information you provide directly to us, including email addresses, payment information, 
            and content you submit for advertising. We also collect usage data through cookies and similar technologies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-300">
            We use your information to provide and improve our services, process payments, communicate with you, 
            and ensure compliance with our terms of service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
          <p className="text-gray-300">
            We do not sell your personal information. We may share information with service providers (such as 
            Stripe for payment processing) and as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <p className="text-gray-300">
            We implement appropriate security measures to protect your information. However, no method of 
            transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
          <p className="text-gray-300">
            You have the right to access, update, or delete your personal information. You may also opt out 
            of certain communications from us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Cookies</h2>
          <p className="text-gray-300">
            We use cookies to enhance your experience, analyze usage, and assist with authentication. 
            You can control cookies through your browser settings.
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

