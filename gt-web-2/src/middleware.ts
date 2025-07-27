import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ACCESS_TOKEN, IS_ADMIN_USER } from './utils/constant'

export function middleware(request: NextRequest) {
  const routeRequest = request.nextUrl.pathname
  const cookie = request.cookies.get(IS_ADMIN_USER)
  const accessTokenCookie = request.cookies.get(ACCESS_TOKEN)
  const accessToken = accessTokenCookie?.value
  const isAdmin = cookie?.value
  const isAdminRoute = routeRequest.startsWith('/admin')
  // if (isAdminRoute && (!accessToken || isAdmin !== TRUE)) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  // }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
