import { API_URL } from '@/config/index';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(res: NextResponse) {
  const cookiesStores = cookies();

  const strapiRes = await fetch(`${API_URL}/api/files/tome`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookiesStores.get('token')?.value}`,
      'Content-Type': 'application/json ',
    },
  });

  const data = await strapiRes.json();

  if (strapiRes.ok) {
    return new NextResponse(
      JSON.stringify({
        message: 'User recieved files fetched successfully',
        data: data,
      }),
      {
        status: res.status,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'User recieved files could not be fetched' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
