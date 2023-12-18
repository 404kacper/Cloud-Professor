import { API_URL } from '@/config/index';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest, ctx: any) {
  const cookiesStores = cookies();

  // destructure filters from the query
  const email = req.nextUrl.searchParams.get('email');

  // since email is the same as username i'm going to use it for both queries rtn
  // 8 maximum results to match the current number in UI
  const strapiRes = await fetch(
    `${API_URL}/api/users?filters[email][$contains]=${email}&filters[username][$contains]=${email}&limit=${8}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookiesStores.get('token')?.value}`,
      },
    }
  );

  const users = await strapiRes.json();

  if (strapiRes.ok) {
    return new Response(
      JSON.stringify({ message: 'Successfully fetched users', data: users }),
      {
        status: strapiRes.status,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } else {
    return new Response(JSON.stringify({ message: 'Search failed' }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
