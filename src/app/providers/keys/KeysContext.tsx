'use client';
import { createContext, useState } from 'react';
import { NEXT_URL } from '@/config/index';
import { ReactNode } from 'react';
import { keysContextDefaultValue, keysContextType } from './KeysTypes';

const KeysContext = createContext<keysContextType>(keysContextDefaultValue);

export const KeysProvider = ({ children }: { children: ReactNode }) => {
  const [publicKey, setPublicKey] = useState(keysContextDefaultValue.publicKey);
  const [privateKey, setPrivateKey] = useState(
    keysContextDefaultValue.privateKey
  );
  const [iv, setIv] = useState(keysContextDefaultValue.iv);
  const [error, setError] = useState(keysContextDefaultValue.error);

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

  return (
    <KeysContext.Provider
      value={{ publicKey, privateKey, error, iv, fetchKeys }}
    >
      {children}
    </KeysContext.Provider>
  );
};

export default KeysContext;
