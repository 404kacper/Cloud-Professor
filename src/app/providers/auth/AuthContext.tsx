'use client';
import { createContext, useState, useEffect } from 'react';
import { NEXT_URL } from '@/config/index';
import { ReactNode } from 'react';
import { authContextDefaultValue, authContextType } from './AuthTypes';
import { ModalTypes } from 'src/app/dashboard/components/modals/ModalContainer';

const AuthContext = createContext<authContextType>(authContextDefaultValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(authContextDefaultValue.user);
  const [displayModal, setDisplayModal] = useState(
    authContextDefaultValue.displayModal
  );
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
      // based on the returned data also update the setup state to show the setup modal
      data.user.doneSetup
        ? setDisplayModal(ModalTypes.NONE)
        : setDisplayModal(ModalTypes.SETUP);
    } else {
      setUser(null);
    }
  };

  // immutable update pattern to change indicator values in UI
  const adjustUserProperty = (
    property: 'downloadedFiles' | 'totalFiles' | 'uploadedFiles',
    adjustment: 'increment' | 'decrement'
  ) => {
    if (user) {
      setUser((prevUser: any) => ({
        ...prevUser,
        [property]:
          adjustment === 'increment'
            ? (prevUser[property] ?? 0) + 1
            : Math.max((prevUser[property] ?? 0) - 1, 0), // Prevent negative values
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        displayModal,
        login,
        register,
        verifyUser,
        adjustUserProperty,
        setDisplayModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
