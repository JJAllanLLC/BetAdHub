# BetAdHub - Betting Advertising Platform MVP

A full-stack advertising platform for betting sites, sportsbooks, casinos, and related businesses. Features two domains with different experiences: a sales-focused domain (betadhub.com) and a traffic-driving directory (bettipshub.com).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Payments**: Stripe (Recurring Subscriptions)
- **Deployment**: Vercel

## Features

- ✅ Dual-domain support (betadhub.com / bettipshub.com)
- ✅ Stripe recurring subscriptions (monthly/annual)
- ✅ Three ad tiers: Banner ($15/mo), Classified ($25/mo), Review ($49/mo)
- ✅ Auto-approval for banner/classified ads
- ✅ Admin approval workflow for reviews
- ✅ Banner carousel with rotation
- ✅ Directory listings and review pages
- ✅ User dashboard for ad management
- ✅ Admin panel for review approvals
- ✅ Dofollow links for SEO value
- ✅ Responsive design with betting theme

## Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
3. Create a storage bucket named `ads` (public access)
4. Get your Supabase URL and anon key from Settings > API

### 3. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create products and prices in Stripe Dashboard:
   - **Banner Ad Monthly**: $15/month
   - **Banner Ad Annual**: $153/year (15% off)
   - **Classified Ad Monthly**: $25/month
   - **Classified Ad Annual**: $255/year (15% off)
   - **Review Ad Monthly**: $49/month
   - **Review Ad Annual**: $499.80/year (15% off)
3. Add metadata `tier: banner|classified|review` to each price
4. Copy the Price IDs and add them to your `.env.local`
5. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
6. Select events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`

### 4. Environment Variables

Create `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Stripe Price IDs (from Stripe Dashboard)
STRIPE_BANNER_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_BANNER_ANNUAL_PRICE_ID=price_xxxxx
STRIPE_CLASSIFIED_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_CLASSIFIED_ANNUAL_PRICE_ID=price_xxxxx
STRIPE_REVIEW_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_REVIEW_ANNUAL_PRICE_ID=price_xxxxx

# App
NEXT_PUBLIC_APP_URL=https://betadhub.com
NEXT_PUBLIC_ADMIN_EMAIL=admin@betadhub.com
```

### 5. Create Admin User

After signing up, manually set a user's role to `admin` in Supabase:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-admin-email@example.com';
```

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Vercel Deployment

### Multi-Domain Setup

1. **Deploy to Vercel**:
   ```bash
   vercel
   ```

2. **Add Both Domains**:
   - Go to Vercel Dashboard > Your Project > Settings > Domains
   - Add `betadhub.com` and `bettipshub.com`
   - Configure DNS records as instructed

3. **Environment Variables**:
   - Add all environment variables from `.env.local` to Vercel
   - Set `NEXT_PUBLIC_APP_URL` to your production domain

4. **Stripe Webhook**:
   - Update webhook URL in Stripe Dashboard to: `https://betadhub.com/api/webhooks/stripe`
   - Or use Vercel's webhook URL if different

### Domain Routing

The app automatically detects the hostname and shows:
- `betadhub.com` → Sales homepage with pricing
- `bettipshub.com` → Directory homepage with ads

Both domains share the same codebase and database.

## Database Schema

- **users**: User accounts with roles (user/admin)
- **subscriptions**: Stripe subscription records
- **ads**: Advertisements (banner/classified/review)

See `supabase/schema.sql` for full schema.

## Project Structure

```
/app
  /actions          # Server actions (Stripe checkout)
  /api              # API routes (webhooks)
  /advertise        # Pricing page
  /dashboard        # User dashboard
  /admin            # Admin panel
  /directory        # Directory view
  /reviews/[slug]   # Dynamic review pages
  /login, /signup   # Auth pages
  /terms, /privacy, /contact  # Static pages

/components
  BannerCarousel    # Rotating banner ads
  DirectoryGrid     # Review listings
  ClassifiedListings # Classified ads
  PricingTable      # Subscription pricing
  UploadForm        # Ad creation form
  AdminPanel        # Review approval UI

/lib
  /supabase         # Supabase client configs
  /stripe           # Stripe configs
  /utils            # Hostname detection
```

## Features in Detail

### Ad Types

1. **Banner Ads** ($15/mo)
   - Banner image upload
   - Auto-approved
   - Rotates in carousel

2. **Classified Ads** ($25/mo)
   - Description + URL
   - Auto-approved
   - Listed in directory

3. **Sponsored Reviews** ($49/mo)
   - Full review page with slug
   - Admin approval required
   - Markdown content support

### Subscription Flow

1. User selects tier on `/advertise`
2. Redirects to Stripe Checkout
3. Webhook creates subscription record
4. User creates ads in `/dashboard`
5. Ads appear on directory (if approved)

### Webhook Events

- `checkout.session.completed` - Create subscription
- `customer.subscription.updated` - Update subscription status
- `customer.subscription.deleted` - Cancel subscription
- `invoice.payment_succeeded` - Renew subscription
- `invoice.payment_failed` - Mark as past_due

## Development Notes

- Banner images stored in Supabase Storage (`ads` bucket)
- All ad links are `rel="nofollow sponsored"` for transparency
- Reviews use Markdown for content
- Hostname detection happens server-side for SEO

## License

Proprietary - All rights reserved

