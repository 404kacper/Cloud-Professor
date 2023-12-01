'use client';
import { createContext, useState, useEffect } from 'react';
import { NEXT_URL } from '@/config/index';
import { ReactNode } from 'react';
import { authContextDefaultValue, authContextType } from './AuthTypes';

const AuthContext = createContext<authContextType>(authContextDefaultValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(authContextDefaultValue.user);
  const [error, setError] = useState(authContextDefaultValue.error);

  // check for cookie with token name
  useEffect(() => {
    verifyUser();
  }, []);

  // login route for client side
  const login = async ({
    email: identifier,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  //register route for client side
  const register = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  // Check if user is logged in
  const verifyUser = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, register, verifyUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
