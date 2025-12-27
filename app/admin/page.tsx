import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminPanel } from '@/components/AdminPanel';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is admin
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (userData?.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      <AdminPanel />
    </div>
  );
}

