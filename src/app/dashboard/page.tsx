'use client';
import React, { useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import KeysContext from '@/keysContext/KeysContext';
import { redirect } from 'next/navigation';
import {
  decryptPrivateKey,
  generateSymmetricKey,
  encryptDataWithSymmetricKey,
  encryptSymmetricKeyWithPublicKey,
} from '@/utils/encryption';

export default function Dasbhoard() {
  const { user } = useContext(AuthContext);
  const { fetchKey, privateKey, iv } = useContext(KeysContext);
  // temp vars for testing - simulates current user's public key & entered password
  const publicKeyPem = `-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAltv5N4tglsw/8/1cJTsGo9SuSYTxCXulhvzO5EUioz0T5eO3Qf82kwyASB+tHDkEnaufjY5fInfGAjnSdB+lpgcSRZFcRY6tb+7f8vzbjNGtWn6YZtPjzV/Fv3mgpURzBBDwUWDBbobsi40sI3o9pUXTkBTgVjjEegck0hK5vCP2rzsZ9j1zfHonNbD0aO5/1c0oXuSy+PqtQBTbhw3x8XMatkFevbbt+Lguqx0a9/pz2NbbOIi+Bk+JlkWAqhEWil+iva5NPuM/OeU1qz1kTaQdE6n7YcKTXdSITZ8rjavD9nhu/dtPFlxfR9a2n74h88N7LMH1pNjv9M0gPLP06QIDAQAB-----END PUBLIC KEY-----`;
  const masterPassword = 'abrakadabra';

  // encryption of symmetric key fails here
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const file = files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result || !(e.target.result instanceof ArrayBuffer)) {
        console.error('FileReader did not load a valid ArrayBuffer');
        return;
      }

      const arrayBuffer = e.target.result;

      try {
        const symmetricKey = await generateSymmetricKey();
        const { encryptedDataBase64, ivBase64 } =
          await encryptDataWithSymmetricKey(arrayBuffer, symmetricKey);

        // Now encrypt the symmetric key with the public key
        const encryptedSymmetricKeyBase64 =
          await encryptSymmetricKeyWithPublicKey(symmetricKey, publicKeyPem);

        // You now have encrypted data and an encrypted key
        console.log('Encrypted File Data:', encryptedDataBase64);
        console.log('Encrypted Symmetric Key:', encryptedSymmetricKeyBase64);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    // redirect if user is not logged in (naive approach for now)
    if (!user) {
      redirect('/');
    }
    // necessary for below useEffect
    fetchKey();

    const handleAsync = async () => {
      const symKey = await generateSymmetricKey();
      console.log(await encryptSymmetricKeyWithPublicKey(symKey, publicKeyPem));
    };

    handleAsync();
  }, []);

  useEffect(() => {
    if (privateKey && iv) {
      decryptPrivateKey(privateKey, iv, masterPassword)
        .then((decryptedKey) => {
          // console.log('Decrypted Private Key:', decryptedKey);
        })
        .catch((error) => {
          console.error('Error during decryption:', error);
        });
    }
  }, [privateKey]);

  return (
    <>
      <div>Dashboard page</div>
      <input
        type='file'
        id='myFile'
        name='filename'
        onChange={handleFileUpload}
      ></input>
    </>
  );
}
