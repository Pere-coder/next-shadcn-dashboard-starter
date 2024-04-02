import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
  }
  
  // Replace 'productionBaseUrl' with your actual production base URL
  const productionBaseUrl = 'https://next-shadcn-dashboard-starter-orpin.vercel.app/'
  const dashboardUrl = new URL('/dashboard', productionBaseUrl)

  // URL to redirect to after sign-in process completes
  return NextResponse.redirect(dashboardUrl.href)
} 
