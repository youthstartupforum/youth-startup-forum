import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const flow = requestUrl.searchParams.get('flow')
  const isSignup = requestUrl.searchParams.get('signup') === 'true'

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/login`)
    }

    if (data.user) {
      const userCreatedAt = new Date(data.user.created_at)
      const now = new Date()
      const timeDiff = now.getTime() - userCreatedAt.getTime()
      const isNewUser = timeDiff < 10000 // User created within last 10 seconds

      // Handle complete-registration flow for Google OAuth signup
      if (flow === 'complete-registration') {
        return NextResponse.redirect(`${requestUrl.origin}/complete-registration`)
      }

      // If explicitly marked as signup OR user was just created, go to welcome
      if (isSignup || isNewUser) {
        return NextResponse.redirect(`${requestUrl.origin}/welcome`)
      }
    }
  }

  // Default to home page for existing users (login)
  return NextResponse.redirect(`${requestUrl.origin}/`)
}