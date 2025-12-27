import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Using '2023-10-16' to match the current package's TypeScript types for successful build
  apiVersion: '2023-10-16',
  typescript: true,
});

