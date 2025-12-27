'use server';

import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/server';
import { PRICING_TIERS } from '@/lib/stripe/config';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(
  tier: 'banner' | 'classified' | 'review',
  billing: 'monthly' | 'annual'
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get or create Stripe customer
  let customerId: string;
  const { data: userData } = await supabase
    .from('users')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single();

  if (userData?.stripe_customer_id) {
    customerId = userData.stripe_customer_id;
  } else {
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: {
        supabase_user_id: user.id,
      },
    });
    customerId = customer.id;

    await supabase
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', user.id);
  }

  const priceId = PRICING_TIERS[tier][billing].priceId;
  if (!priceId) {
    throw new Error(`Price ID not configured for ${tier} ${billing}`);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/advertise?canceled=true`,
    metadata: {
      tier,
      user_id: user.id,
    },
  });

  return { url: session.url };
}

