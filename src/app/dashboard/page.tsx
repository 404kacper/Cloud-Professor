'use client';
import React, { useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import KeysContext from '@/keysContext/KeysContext';
import { redirect } from 'next/navigation';

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
  }, []);

  useEffect(() => {
    if (privateKey && iv) {
      console.log('Decrypting');
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

async function decryptPrivateKey(
  encryptedPrivateKey: string,
  iv: string,
  password: string
): Promise<string> {
  try {
    // Convert IV from hex string to buffer
    const ivBuffer = new Uint8Array(
      iv.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );

    // Convert encrypted private key from hex string to buffer
    const encryptedBuffer = new Uint8Array(
      encryptedPrivateKey.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ||
        []
    );

    // Derive the key (adjust according to the backend's key derivation method)
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: enc.encode('salt'), // The same salt as in the backend
        iterations: 100000, // Match the iteration count as per the backend
        hash: 'SHA-256', // Use the same hash algorithm
      },
      keyMaterial,
      { name: 'AES-CBC', length: 256 },
      false,
      ['decrypt']
    );

    // Decrypt the private key
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: ivBuffer },
      key,
      encryptedBuffer
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw error;
  }
}
