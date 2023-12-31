import { API_URL } from '@/config/index';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// export async function DELETE(req: NextRequest, res: NextResponse) {
export async function DELETE(
  req: NextResponse,
  { params }: { params: { id: number } }
) {
  const cookiesStores = cookies();

  const { id } = params;

  const strapiRes = await fetch(`${API_URL}/api/user-files/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${cookiesStores.get('token')?.value}`,
    },
  });

  if (strapiRes.ok) {
    return new NextResponse(
      JSON.stringify({ message: 'File deleted successfully' }),
      {
        status: strapiRes.status,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'File could not be deleted' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const cookiesStores = cookies();

  const { id } = params;

  const strapiRes = await fetch(`${API_URL}/api/user-files/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookiesStores.get('token')?.value}`,
    },
  });

  const returnedFile = await strapiRes.json();

  if (strapiRes.ok) {
    return new NextResponse(
      JSON.stringify({
        message: 'File downloaded successfully',
        data: returnedFile.data.attributes,
      }),
      {
        status: strapiRes.status,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'File could not be downloaded' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
