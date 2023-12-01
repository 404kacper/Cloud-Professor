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
  const fetchKey = async () => {
    const res = await fetch(`${NEXT_URL}/api/user/key`);
    const data = await res.json();

    if (res.ok) {
      setPrivateKey(data.privateKey);
      setIv(data.iv);
    } else {
      setError(data.message);
    }
  };

  return (
    <KeysContext.Provider
      value={{ publicKey, privateKey, error, iv, fetchKey }}
    >
      {children}
    </KeysContext.Provider>
  );
};

export default KeysContext;
