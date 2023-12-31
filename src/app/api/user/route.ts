import { API_URL } from '@/config/index';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(res: NextResponse) {
  const cookiesStores = cookies();

  const strapiRes = await fetch(`${API_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookiesStores.get('token')?.value}`,
    },
  });

  const user = await strapiRes.json();

  if (strapiRes.ok) {
    return new NextResponse(JSON.stringify({ user }), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    return new NextResponse(JSON.stringify({ message: 'User forbidden' }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
