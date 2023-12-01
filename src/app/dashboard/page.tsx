'use client';
import React, { useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import KeysContext from '@/keysContext/KeysContext';
import { redirect } from 'next/navigation';
import { decryptPrivateKey , generateSymmetricKey} from '@/utils/encryption';

export default function Dasbhoard() {
  const { user } = useContext(AuthContext);
  const { fetchKey, privateKey, iv } = useContext(KeysContext);

  const masterPassword = 'abrakadabra';

  useEffect(() => {
    // redirect user registered/logged/has cookie stored
    if (!user) {
      redirect('/');
    }
    fetchKey();
    generateSymmetricKey().then((key) => {
      console.log('Symmetric Key:', key);
    });
  }, []);

  useEffect(() => {
    if (privateKey && iv) {
      decryptPrivateKey(privateKey, iv, masterPassword)
        .then((decryptedKey) => {
          console.log('Decrypted Private Key:', decryptedKey);
        })
        .catch((error) => {
          console.error('Error during decryption:', error);
        });
    }
  }, [privateKey]);

  return <div>Dashboard page</div>;
}
