# Deployment Guide

## Pre-Deployment Checklist

### 1. Supabase Setup
- [ ] Database schema applied (`supabase/schema.sql`)
- [ ] Storage bucket `ads` created (public access)
- [ ] Service role key saved securely
- [ ] RLS policies tested

### 2. Stripe Setup
- [ ] Products and prices created in Stripe Dashboard
- [ ] Price IDs added to environment variables
- [ ] Webhook endpoint configured
- [ ] Webhook events selected:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
- [ ] Webhook secret saved

### 3. Domain Configuration
- [ ] DNS records configured for both domains
- [ ] SSL certificates verified
- [ ] Domain verification in Vercel

## Vercel Deployment Steps

### Initial Deployment

1. **Connect Repository**
   ```bash
   vercel login
   vercel link
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard > Project > Settings > Environment Variables
   - Add all variables from `.env.local`
   - Set for Production, Preview, and Development

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Multi-Domain Configuration

1. **Add Domains in Vercel**
   - Settings > Domains
   - Add `betadhub.com`
   - Add `bettipshub.com`
   - Follow DNS configuration instructions

2. **Update Stripe Webhook**
   - Use primary domain: `https://betadhub.com/api/webhooks/stripe`
   - Or use Vercel's webhook URL if different

3. **Update Environment Variables**
   - Set `NEXT_PUBLIC_APP_URL=https://betadhub.com`

### Post-Deployment

1. **Create Admin User**
   - Sign up via `/signup`
   - Run SQL in Supabase:
     ```sql
     UPDATE users SET role = 'admin' WHERE email = 'your-admin@email.com';
     ```

2. **Test Webhook**
   - Create a test subscription
   - Verify webhook events in Stripe Dashboard
   - Check Supabase for subscription record

3. **Test Both Domains**
   - Visit `betadhub.com` → Should show sales page
   - Visit `bettipshub.com` → Should show directory page

## Environment Variables Reference

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Stripe Price IDs (required)
STRIPE_BANNER_MONTHLY_PRICE_ID=
STRIPE_BANNER_ANNUAL_PRICE_ID=
STRIPE_CLASSIFIED_MONTHLY_PRICE_ID=
STRIPE_CLASSIFIED_ANNUAL_PRICE_ID=
STRIPE_REVIEW_MONTHLY_PRICE_ID=
STRIPE_REVIEW_ANNUAL_PRICE_ID=

# Optional
NEXT_PUBLIC_APP_URL=https://betadhub.com
NEXT_PUBLIC_ADMIN_EMAIL=admin@betadhub.com
```

## Troubleshooting

### Webhook Not Working
- Verify webhook secret matches
- Check Stripe Dashboard > Webhooks for event logs
- Verify endpoint is accessible (not behind auth)
- Check Vercel function logs

### Domain Not Routing Correctly
- Verify hostname detection in `lib/utils/hostname.ts`
- Check Vercel domain configuration
- Test with `headers().get('host')` in server components

### Images Not Loading
- Verify Supabase Storage bucket is public
- Check CORS settings in Supabase
- Verify image URLs in database

### Subscription Not Creating
- Check Stripe webhook logs
- Verify price IDs match Stripe Dashboard
- Check Supabase RLS policies
- Verify user record exists in `users` table

## Monitoring

- **Vercel Analytics**: Monitor page views and performance
- **Stripe Dashboard**: Monitor subscriptions and payments
- **Supabase Dashboard**: Monitor database and storage usage
- **Error Tracking**: Consider adding Sentry or similar

## Backup Strategy

1. **Database**: Supabase automatic backups (check plan)
2. **Storage**: Supabase Storage backups
3. **Code**: Git repository
4. **Environment**: Document all env vars securely

## Scaling Considerations

- Supabase free tier limits
- Stripe rate limits
- Vercel function execution limits
- Storage bucket size limits

Consider upgrading plans as traffic grows.

