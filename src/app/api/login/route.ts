import { API_URL } from '@/config/index';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  // Parse the request body to get the login and password
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
    const { message, status, details, name } = data.error;
    // if there is more than 1 error loop through them & display combined message else return just the top level message
    // check if details is an empty object
    if (Object.keys(details).length > 0) {
      let errorString: string = '';
      
      for (let i = 0; i < details.errors.length; i++) {
        const error = details.errors[i];
        if (`${error.path}` == `identifier`) {
          errorString += `Email field is required`;
        } else if (`${error.path}` == `password`) {
          errorString += `Password field is required`;
        } else {
          errorString += `${error.message}`;
        }
        // don't add a new line if it's the last error
        if (i < details.errors.length - 1) {
          errorString += `\n`;
        }
      }

      return new NextResponse(JSON.stringify({ message: errorString }), {
        status: status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      let errorString: string = 'Invalid email or password';
      // custom error message to hide identifier field
      if (name == 'ValidationError') {
        return new NextResponse(JSON.stringify({ message: errorString }), {
          status: status,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        return new NextResponse(JSON.stringify({ message: message }), {
          status: status,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

    }
  }
}
