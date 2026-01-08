import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;
  const isNewSignup = requestUrl.searchParams.get('signup') === 'true';

  if (code) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(`${origin}/signin?error=auth_callback_failed`);
    }

    // Check if this is an existing user by looking for their profile
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, first_name')
        .eq('id', data.user.id)
        .maybeSingle();

      // If signing in (not signing up) and no profile exists, reject login
      if (!isNewSignup && !profile) {
        // Sign out the user since they don't have an account
        await supabase.auth.signOut();
        
        // Clear cookies by setting response headers
        const response = NextResponse.redirect(`${origin}/signin?error=no_account&email=${encodeURIComponent(data.user.email || '')}`);
        response.cookies.delete('sb-eyspyeslaugfpmwzsfhw-auth-token');
        response.cookies.delete('sb-eyspyeslaugfpmwzsfhw-auth-token-code-verifier');
        return response;
      }

      // If this is a new signup via Google OAuth, create their profile
      if (isNewSignup && !profile) {
        const metadata = data.user.user_metadata;
        await supabase.from('profiles').upsert({
          id: data.user.id,
          email: data.user.email,
          first_name: metadata?.full_name?.split(' ')[0] || metadata?.name?.split(' ')[0] || '',
          last_name: metadata?.full_name?.split(' ').slice(1).join(' ') || metadata?.name?.split(' ').slice(1).join(' ') || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    }
  }

  // Redirect to home page after successful sign in
  return NextResponse.redirect(origin);
}
