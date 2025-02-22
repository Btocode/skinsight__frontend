import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/update-password') {
    return NextResponse.redirect(new URL('/?auth=set-new-password', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/update-password'
}