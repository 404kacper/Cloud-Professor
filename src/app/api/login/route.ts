import { API_URL } from '@/config/index';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  // Parse the request body to get the username and password
  const { identifier, password } = await req.json();

  const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });

  // Fetch data from response
  const data = await strapiRes.json();

  // Set cookie on successful login and return user
  // Else return error message
  if (strapiRes.ok) {
    cookies().set('token', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
      path: '/',
    });

    return new NextResponse(JSON.stringify({ user: data.user }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new NextResponse(
      JSON.stringify({ message: data.message[0].messages[0].message }),
      {
        status: data.statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
