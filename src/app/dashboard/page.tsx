'use client';
import React, { useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import KeysContext from '@/keysContext/KeysContext';
import DataContext from '@/dataContext/DataContext';
import { redirect } from 'next/navigation';
import EncryptionDataManager from '@/utils/subclasses/EncryptionDataManager';
import EncryptionKeyManager from '@/utils/subclasses/EncryptionKeyManager';

import Navbar from './components/navbar/Navbar';
import StatusBar from './components/statusBar/StatusBar';
import Indicators from './components/indicators/Indicators';
import Sharing from './components/sharing/Sharing';
import FilesContainer from './components/files/FilesContainer';

import ModalContainer, { ModalTypes } from './components/modals/ModalContainer';

import styles from './Dashboard.module.scss';

export default function Dasbhoard() {
  const { user } = useContext(AuthContext);
  const { fetchKeys, publicKey, privateKey, iv } = useContext(KeysContext);
  const { retrieveMyFiles, retrieveToMeFiles } = useContext(DataContext);

  // will be comming from database as- hardcoded for now
  let fileIv = '';

  // used in: download process (decrypting symmetric key) - doesn't need to be stored in KeysContext
  let privateKeyDecrypted: CryptoKey;

  // used in: download process (decrypting file data) - doesn't need to be stored in KeysContext
  let symmetricKeyDecrypted: CryptoKey;

  let symmetricKeyGenerated: CryptoKey;

  // Base64 string after encoding the file & uploading (simulates the file after being fetched)
  // comes from db: encrypted file data - doesn't need to be stored in KeysContext
  let fileDataBase64 = '';

  // Managers for the whole encryption process
  const encryptionKeyManager = new EncryptionKeyManager();
  const encryptionDataManager = new EncryptionDataManager();

  // This method encrypts & decrypts file data & keys:
  //  - encrypts symmetric key with public key of reciever
  //  - decrypts private key of reciever
  //  - uses decrypted private key to decrypt symmetric key (encrypted in step 1)
  //  - uses decrypted symmetric key to decrypt file data and displays it
  const testFlow = async () => {
    // const encryptSymmetricKey = async (): Promise<string> => {
    //   try {
    //     const encryptedSymmetricKeyBase64 =
    //       await encryptionKeyManager.encryptSymmetricKeyWithPublicKey(
    //         symmetricKeyGenerated,
    //         publicKey
    //       );
    //     return encryptedSymmetricKeyBase64;
    //   } catch (error) {
    //     console.error('Error encrypting symmetric key:', error);
    //     throw error;
    //   }
    // };

    // execute above and return the encrypted key in base64
    // const encryptedSymKey = await encryptSymmetricKey();

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
    retrieveMyFiles();
    retrieveToMeFiles();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <ModalContainer type={ModalTypes.SETUP} />
      <div className={styles.navContainer}>
        <Navbar></Navbar>
      </div>
      <div className={styles.dashContentContainer}>
        <StatusBar></StatusBar>
        {/* 1:3:7 proportions for remaining */}
        <Indicators></Indicators>
        <Sharing></Sharing>
        <FilesContainer></FilesContainer>
        {/* <div>Dashboard page</div>
        <button type='button' onClick={testFlow}>
          Run tests
        </button> */}
      </div>
    </div>
  );
}
