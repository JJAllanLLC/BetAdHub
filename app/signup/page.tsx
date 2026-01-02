'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const supabase = createClient();
    
    // Sign up user with production redirect URL
    const redirectTo = process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      : 'https://betadhub.com/dashboard';
    
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (signUpError) {
      console.error('Signup error:', signUpError);
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    console.log('Signup success:', { user: data.user, session: data.session });

    // Create user record in public.users table (if user was created)
    if (data.user) {
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          role: 'user',
        });

      if (userError) {
        console.error('Error creating user record:', userError);
        // Don't fail the signup if user record creation fails - it might already exist
      }
    }

    // If session exists, user is confirmed and logged in - redirect
    if (data.session) {
      router.push('/dashboard');
      router.refresh();
    } else if (data.user && data.session === null) {
      // User created but email confirmation required - show "Check email" message
      setSuccess(true);
      setLoading(false);
    } else {
      // This shouldn't happen, but handle gracefully
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-4xl font-bold mb-8 text-center">Sign Up</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-lg border border-gray-800">
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded">
            Check your email to confirm your account.
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:border-betting-green focus:outline-none"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 focus:border-betting-green focus:outline-none"
            placeholder="••••••••"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-betting-green text-betting-darker py-3 rounded font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-betting-green hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

