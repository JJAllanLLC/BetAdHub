export const PRICING_TIERS = {
  banner: {
    monthly: {
      name: 'Banner Ad',
      price: 15,
      priceId: process.env.STRIPE_BANNER_MONTHLY_PRICE_ID || '',
    },
    annual: {
      name: 'Banner Ad (Annual)',
      price: 153, // 15% off: $15 * 12 * 0.85
      priceId: process.env.STRIPE_BANNER_ANNUAL_PRICE_ID || '',
    },
  },
  classified: {
    monthly: {
      name: 'Classified Ad',
      price: 25,
      priceId: process.env.STRIPE_CLASSIFIED_MONTHLY_PRICE_ID || '',
    },
    annual: {
      name: 'Classified Ad (Annual)',
      price: 255, // 15% off: $25 * 12 * 0.85
      priceId: process.env.STRIPE_CLASSIFIED_ANNUAL_PRICE_ID || '',
    },
  },
  review: {
    monthly: {
      name: 'Sponsored Review',
      price: 49,
      priceId: process.env.STRIPE_REVIEW_MONTHLY_PRICE_ID || '',
    },
    annual: {
      name: 'Sponsored Review (Annual)',
      price: 499.80, // 15% off: $49 * 12 * 0.85
      priceId: process.env.STRIPE_REVIEW_ANNUAL_PRICE_ID || '',
    },
  },
} as const;

export type TierType = 'banner' | 'classified' | 'review';
export type BillingType = 'monthly' | 'annual';

