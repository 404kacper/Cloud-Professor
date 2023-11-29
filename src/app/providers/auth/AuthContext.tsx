'use client';
import { createContext, useState } from 'react';
import { NEXT_URL } from '@/config/index';
import { ReactNode } from 'react';
import { authContextDefaultValue, authContextType } from './AuthTypes';

const AuthContext = createContext<authContextType>(authContextDefaultValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <AuthContext.Provider value={{ user, error, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
