'use client';
import React, { useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import KeysContext from '@/keysContext/KeysContext';
import DataContext from '@/dataContext/DataContext';
import { redirect } from 'next/navigation';
import CryptoUserManager from '@/utils/CryptoUserManager';
import EncryptionDataManager from '@/utils/subclasses/EncryptionDataManager';
import EncryptionKeyManager from '@/utils/subclasses/EncryptionKeyManager';
import Navbar from '../components/dashboard/navbar/Navbar';

import styles from './Dashboard.module.scss';

export default function Dasbhoard() {
  const { user } = useContext(AuthContext);
  const { uploadFile } = useContext(DataContext);
  const { fetchKeys, publicKey, privateKey, iv } = useContext(KeysContext);

  // will be comming from database as- hardcoded for now
  let fileIv = '';

  // used in: download process (decrypting symmetric key) - doesn't need to be stored in KeysContext
  let privateKeyDecrypted: CryptoKey;

  // used in: download process (decrypting file data) - doesn't need to be stored in KeysContext
  let symmetricKeyDecrypted: CryptoKey;

  let symmetricKeyGenerated: CryptoKey;
  // hardcoded from postman request
  const masterPassword = 'abrakadabra';

  // will be stored in database to combine file after download
  // used in: upload/download to mark the file type
  let fileExtension = '';

  // Base64 string after encoding the file & uploading (simulates the file after being fetched)
  // comes from db: encrypted file data - doesn't need to be stored in KeysContext
  let fileDataBase64 = '';

  // Managers for the whole encryption process
  const cryptoManager = new CryptoUserManager();
  const encryptionKeyManager = new EncryptionKeyManager();
  const encryptionDataManager = new EncryptionDataManager();

  // This method encrypts file data:
  //  - with generated symmetric key at the component mount
  //  - file is uploaded by the user
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Generate symmetric key for testing and share it in component within same render
    symmetricKeyGenerated = await cryptoManager.generateSymmetricKey();

    const files = event.target.files;
    if (!files) {
      return;
    }

    const file = files[0];
    if (!file) {
      return;
    }

    // Extracting file extension - necessary to put the file back together after downloading
    // const fileName = file.name;
    // fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);

    const reader = new FileReader();

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      // Some safety checks
      if (!e.target?.result || !(e.target.result instanceof ArrayBuffer)) {
        console.error('FileReader did not load a valid ArrayBuffer');
        return;
      }

      // Loading the file data into an ArrayBuffer
      const arrayBuffer = e.target.result;

      try {
        await uploadFile(arrayBuffer, publicKey, file.name, file.size);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // This method encrypts & decrypts file data & keys:
  //  - encrypts symmetric key with public key of reciever
  //  - decrypts private key of reciever
  //  - uses decrypted private key to decrypt symmetric key (encrypted in step 1)
  //  - uses decrypted symmetric key to decrypt file data and displays it
  const testFlow = async () => {
    // Encrypt the key with the public key
    // This actually belong to upload logic but for w/e it's just testing
    const encryptSymmetricKey = async (): Promise<string> => {
      try {
        const encryptedSymmetricKeyBase64 =
          await encryptionKeyManager.encryptSymmetricKeyWithPublicKey(
            symmetricKeyGenerated,
            publicKey
          );
        return encryptedSymmetricKeyBase64;
      } catch (error) {
        console.error('Error encrypting symmetric key:', error);
        throw error;
      }
    };

    // execute above and return the encrypted key in base64
    const encryptedSymKey = await encryptSymmetricKey();

    // decrypted the private key with the master password
    privateKeyDecrypted = await encryptionKeyManager.decryptPrivateKey(
      privateKey,
      iv,
      masterPassword
    );

    // decrypt the symmetric key with the private key
    const decryptSymmetricKey = async () => {
      try {
        symmetricKeyDecrypted =
          await encryptionKeyManager.decryptSymmetricKeyWithPrivateKey(
            encryptedSymKey,
            privateKeyDecrypted
          );
      } catch (error) {
        console.error('Error encrypting symmetric key:', error);
        throw error;
      }
    };

    // at this point we have symmetric key that was encrypted with public key and later decrypted with private key
    await decryptSymmetricKey();

    // What remains is to decrypt the file data with the symmetric key
    const decryptedFileData =
      await encryptionDataManager.decryptDataWithSymmetricKey(
        fileDataBase64,
        symmetricKeyDecrypted,
        fileIv
      );

    // // 1st way to display the processed data - non text
    // const blob = new Blob([decryptedFileData], { type: 'image/jpeg' }); // Replace 'image/jpeg' with the correct MIME type
    // const imageUrl = URL.createObjectURL(blob);

    // // This url can be a state variable and used in an <img> tag
    // console.log(`Image URL:`, imageUrl);

    // 2nd way to display the processed data - text
    const textDecoder = new TextDecoder('utf-8');
    const decryptedText = textDecoder.decode(decryptedFileData);
    console.log(`Decrypted file data (as text):`, decryptedText);
  };

  useEffect(() => {
    // redirect if user null in AuthContext provider (naive approach for now)
    if (!user) {
      redirect('/');
    }

    fetchKeys();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.navContainer}>
        <Navbar></Navbar>
      </div>
      <div className={styles.dashContentContainer}>
        <div>Dashboard page</div>
        <input
          type='file'
          id='myFile'
          name='filename'
          onChange={handleFileUpload}
        ></input>
        <button type='button' onClick={testFlow}>
          Run tests
        </button>
      </div>
    </div>
  );
}
