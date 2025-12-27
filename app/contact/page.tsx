'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to an API endpoint
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
        {submitted ? (
          <div className="text-center py-8">
            <p className="text-betting-green text-lg font-semibold mb-2">Thank you!</p>
            <p className="text-gray-300">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:border-betting-green focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:border-betting-green focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:border-betting-green focus:outline-none"
                rows={6}
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-betting-green text-betting-darker py-3 rounded font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-8 pt-8 border-t border-gray-800">
          <h3 className="font-semibold mb-4">Other Ways to Reach Us</h3>
          <p className="text-gray-300 mb-2">Email: support@betadhub.com</p>
          <p className="text-gray-300">Response time: Usually within 24 hours</p>
        </div>
      </div>
    </div>
  );
}

