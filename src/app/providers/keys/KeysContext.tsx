'use client';
import { createContext, useState, useContext } from 'react';
import { NEXT_URL } from '@/config/index';
import { ReactNode } from 'react';
import { keysContextDefaultValue, keysContextType } from './KeysTypes';

import AuthContext from '@/context/AuthContext';

const KeysContext = createContext<keysContextType>(keysContextDefaultValue);

export const KeysProvider = ({ children }: { children: ReactNode }) => {
  const [publicKey, setPublicKey] = useState(keysContextDefaultValue.publicKey);
  const [privateKey, setPrivateKey] = useState(
    keysContextDefaultValue.privateKey
  );
  const [iv, setIv] = useState(keysContextDefaultValue.iv);
  const [error, setError] = useState(keysContextDefaultValue.error);

  // consume AuthContext here to update the set modal function
  // I don't see any other solution than this
  const { setDisplaySetupModal } = useContext(AuthContext);

  // Check if user is logged in
  const fetchKeys = async () => {
    const res = await fetch(`${NEXT_URL}/api/user/keys`);
    const data = await res.json();

    if (res.ok) {
      setPublicKey(data.publicKey);
      setPrivateKey(data.privateKey);
      setIv(data.iv);
    } else {
      setError(data.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  const setupKeys = async (masterPassword: string): Promise<boolean> => {
    const res = await fetch(`${NEXT_URL}/api/user/keys`, {
      method: 'POST',
      body: JSON.stringify({ masterPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      setPublicKey(data.publicKey);
      setPrivateKey(data.privateKey);
      setIv(data.iv);
      setDisplaySetupModal(data.setupDone);
      return true;
    } else {
      setError(data.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
      return false;
    }
  };

  return (
    <KeysContext.Provider
      value={{ publicKey, privateKey, error, iv, fetchKeys, setupKeys }}
    >
      {children}
    </KeysContext.Provider>
  );
};

export default KeysContext;
