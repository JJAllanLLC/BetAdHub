import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Using stable API version for build compatibility (experimental versions not recognized by TypeScript types)
  apiVersion: '2024-11-20',
  typescript: true,
});

