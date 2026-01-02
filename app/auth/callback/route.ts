import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get('token_hash');
  const type = url.searchParams.get('type');

  if (token_hash && type) {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'email' | 'recovery' | 'invite' | 'magiclink',
    });

    if (error) {
      console.error('Error verifying OTP:', error);
      // Redirect to home with error (or you could redirect to login with error)
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Verification successful, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // No token_hash or type, redirect to home
  return NextResponse.redirect(new URL('/', request.url));
}

