import { API_URL } from '@/config/index';
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// Remember it's req then res not req then res...
export async function POST(req: NextRequest, res: NextResponse) {
  const cookiesStores = cookies();

  const body = await req.json();

  const strapiRes = await fetch(`${API_URL}/api/files/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cookiesStores.get('token')?.value}`,
      'Content-Type': 'application/json ',
    },
    body: JSON.stringify(body),
  });

  const strapiResponseData = await strapiRes.json();

  if (strapiRes.ok) {
    return new NextResponse(
      JSON.stringify({
        message: 'File uploaded successfully',
        data: strapiResponseData,
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
      JSON.stringify({ message: 'File could not be uploaded' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
