import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  // Clear the authentication cookie
  cookies().set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: -1, // Expire immediately
    sameSite: 'strict',
    path: '/',
  });

  // Return a simple success response
  return new NextResponse(JSON.stringify({ message: "Logged out successfully" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
