import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes
  const publicRoutes = ['/auth/sign-in', '/auth/register', '/auth/verify-email', '/']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check for access token
  const token = request.cookies.get('access_token')?.value ||
                request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  try {
    // Verify JWT
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch (error) {
    // Token invalid, try refresh
    const refreshToken = request.cookies.get('refresh_token')?.value

    if (!refreshToken) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    try {
      // Attempt to refresh token
      const refreshResponse = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Cookie': `refresh_token=${refreshToken}`,
        },
      })

      if (refreshResponse.ok) {
        const data = await refreshResponse.json()
        const response = NextResponse.next()

        // Set new access token
        response.cookies.set('access_token', data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60, // 15 minutes
        })

        return response
      }
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError)
    }

    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}