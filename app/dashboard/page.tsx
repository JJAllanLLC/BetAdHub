import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { UploadForm } from '@/components/UploadForm';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user's active subscriptions
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('id, tier, status, current_period_end')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  // Get user's ads
  const { data: ads } = await supabase
    .from('ads')
    .select('id, type, url, description, approved, created_at')
    .in('subscription_id', subscriptions?.map(s => s.id) || [])
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Active Subscriptions</h2>
        {subscriptions && subscriptions.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold mb-2 capitalize">{sub.tier} Ad</h3>
                <p className="text-gray-400 mb-4">Status: <span className="text-betting-green">{sub.status}</span></p>
                <p className="text-sm text-gray-500">
                  Renews: {new Date(sub.current_period_end).toLocaleDateString()}
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Create New Ad</h4>
                  <UploadForm subscriptionId={sub.id} adType={sub.tier as 'banner' | 'classified' | 'review'} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center">
            <p className="text-gray-400 mb-4">No active subscriptions</p>
            <a
              href="/advertise"
              className="inline-block bg-betting-green text-betting-darker px-6 py-3 rounded font-semibold hover:opacity-90 transition"
            >
              Subscribe Now
            </a>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Your Ads</h2>
        {ads && ads.length > 0 ? (
          <div className="space-y-4">
            {ads.map((ad) => (
              <div key={ad.id} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">{ad.type} Ad</h3>
                    <p className="text-gray-400 text-sm break-all">{ad.url}</p>
                    {ad.description && (
                      <p className="text-gray-300 mt-2">{ad.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Created: {new Date(ad.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      ad.approved 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {ad.approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center">
            <p className="text-gray-400">No ads created yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

