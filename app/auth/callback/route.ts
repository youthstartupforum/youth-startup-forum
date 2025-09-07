import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const isSignup = requestUrl.searchParams.get('signup') === 'true'

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { data } = await supabase.auth.exchangeCodeForSession(code)
    
    // Check if this is a new user (signup) by checking if user was just created
    if (data.user && isSignup) {
      return NextResponse.redirect(`${requestUrl.origin}/welcome`)
    }
  }

  // Default to home page for existing users (login)
  return NextResponse.redirect(`${requestUrl.origin}/`)
}