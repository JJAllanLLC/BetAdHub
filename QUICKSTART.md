# Quick Start Guide

Get your BetAdHub MVP running in 15 minutes.

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Supabase (5 min)

1. Go to [supabase.com](https://supabase.com) and create a project
2. In SQL Editor, run the contents of `supabase/schema.sql`
3. Go to Storage, create a bucket named `ads` (make it public)
4. Copy your project URL and anon key from Settings > API
5. Copy your service role key (keep it secret!)

## 3. Set Up Stripe (5 min)

1. Go to [stripe.com](https://stripe.com) and create an account
2. Create 6 products/prices in Stripe Dashboard:

   **Banner Ad Monthly**
   - Price: $15.00 USD
   - Recurring: Monthly
   - Metadata: `tier: banner`
   - Copy the Price ID

   **Banner Ad Annual**
   - Price: $153.00 USD (15% off)
   - Recurring: Yearly
   - Metadata: `tier: banner`
   - Copy the Price ID

   Repeat for:
   - Classified Monthly ($25) and Annual ($255)
   - Review Monthly ($49) and Annual ($499.80)

3. Get your API keys from Developers > API keys
4. Set up webhook (for local dev, use Stripe CLI):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   Copy the webhook secret

## 4. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

STRIPE_BANNER_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_BANNER_ANNUAL_PRICE_ID=price_xxxxx
STRIPE_CLASSIFIED_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_CLASSIFIED_ANNUAL_PRICE_ID=price_xxxxx
STRIPE_REVIEW_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_REVIEW_ANNUAL_PRICE_ID=price_xxxxx

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 6. Create Admin User

1. Sign up at `/signup`
2. In Supabase SQL Editor, run:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

## 7. Test the Flow

1. **Subscribe**: Go to `/advertise`, click Subscribe (use Stripe test card: 4242 4242 4242 4242)
2. **Create Ad**: Go to `/dashboard`, create a banner ad
3. **View Directory**: Go to `/directory` to see your ad
4. **Admin**: Go to `/admin` to approve reviews

## Testing Stripe Webhooks Locally

Use Stripe CLI:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# or download from https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The CLI will show a webhook secret - use that in `.env.local`.

## Common Issues

**"Price ID not configured"**
- Make sure all 6 price IDs are in `.env.local`
- Verify prices exist in Stripe Dashboard

**"User not found"**
- Make sure you've signed up first
- Check Supabase `users` table has your record

**Images not uploading**
- Verify `ads` bucket exists in Supabase Storage
- Check bucket is public
- Verify file size limits

**Webhook not working**
- Check webhook secret matches
- Verify endpoint is accessible
- Check Stripe Dashboard > Webhooks for errors

## Next Steps

- Customize branding and colors
- Add more ad placement options
- Set up analytics
- Configure email notifications
- Add more payment methods

See `README.md` and `DEPLOYMENT.md` for more details.

