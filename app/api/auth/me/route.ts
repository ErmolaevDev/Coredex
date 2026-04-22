import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('access_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, secret)

    // Get user data from backend
    const backendResponse = await fetch(`${process.env.BACKEND_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: backendResponse.status }
      )
    }

    const userData = await backendResponse.json()

    return NextResponse.json(userData)
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}