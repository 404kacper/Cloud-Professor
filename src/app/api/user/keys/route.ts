import { API_URL } from '@/config/index';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(res: NextResponse) {
  const cookiesStores = cookies();

  const strapiRes = await fetch(`${API_URL}/api/users/setup/mykeys`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookiesStores.get('token')?.value}`,
    },
  });

  const data = await strapiRes.json();

  if (strapiRes.ok) {
    return new NextResponse(JSON.stringify(data), {
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

export async function POST(req: NextRequest, res: NextResponse) {
  const cookiesStores = cookies();

  const { masterPassword } = await req.json();

  const strapiRes = await fetch(`${API_URL}/api/users/setup/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookiesStores.get('token')?.value}`,
      'Content-Type': 'application/json ',
    },
    body: JSON.stringify({ masterPassword }),
  });

  const data = await strapiRes.json();

  if (strapiRes.ok) {
    return new NextResponse(JSON.stringify(data), {
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
