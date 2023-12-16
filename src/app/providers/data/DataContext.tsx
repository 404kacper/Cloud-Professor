'use client';
import { createContext, useState } from 'react';
import { NEXT_URL } from '@/config/index';
import { ReactNode } from 'react';
import {
  dataContextDefaultValue,
  dataContextType,
  downloadOriginType,
} from './DataTypes';
import EncryptionDataManager from '@/utils/subclasses/EncryptionDataManager';
import EncryptionKeyManager from '@/utils/subclasses/EncryptionKeyManager';

const DataContext = createContext<dataContextType>(dataContextDefaultValue);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [myFiles, setMyFiles] = useState(dataContextDefaultValue.myFiles);
  const [toMeFiles, setToMeFiles] = useState(dataContextDefaultValue.toMeFiles);
  const [error, setError] = useState(dataContextDefaultValue.error);
  const keyManager = new EncryptionKeyManager();
  const dataManager = new EncryptionDataManager();

  // Upload file:
  //  - Recieves binary buffer with file data & reciever's public key & file name (extension included) + file size
  //  - Generates symmetric key for the file
  //  - Encrypts file with symmetric key
  //  - Encrypts symmetric key with recipient's public key
  //  - Sends encrypted file and encrypted symmetric key to server route (along with all the necessary fields for schema)
  const uploadFile = async (
    data: ArrayBuffer,
    recipientsPublicKey: string,
    name: string,
    size: number
  ) => {
    const symKeyForFile: CryptoKey = await keyManager.generateSymmetricKey();

    const {
      encryptedDataBase64: encryptedData,
      ivBase64: iv,
    }: { encryptedDataBase64: string; ivBase64: string } =
      await dataManager.encryptDataWithSymmetricKey(data, symKeyForFile);

    const symKeyEncrypted: string =
      await keyManager.encryptSymmetricKeyWithPublicKey(
        symKeyForFile,
        recipientsPublicKey
      );

    const res = await fetch(`${NEXT_URL}/api/user/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileKey: symKeyEncrypted,
        fileKeySize: (symKeyForFile.algorithm as any).length,
        fileData: encryptedData,
        fileIv: iv,
        fileName: name,
        fileSize: size,
      }),
    });

    const resNext = await res.json();

    if (res.ok) {
      // display success message
      console.log(resNext.message);
      // add new file to the state
      setMyFiles((currentFiles: any) => [...currentFiles, resNext.data]);
    } else {
      setError(resNext.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  // Retrieve user files from server
  // - associated by jwt token
  // - fetches files which have current user as an author
  const retrieveMyFiles = async () => {
    const res = await fetch(`${NEXT_URL}/api/user/files/me`);

    const resNext = await res.json();

    if (res.ok) {
      // display success message & update files state
      console.log(resNext.message);
      setMyFiles(resNext.data);
    } else {
      setError(resNext.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  // Retrieve files shared with user from server
  // - associated by jwt token
  // - fetches files which have current user as an author
  const retrieveToMeFiles = async () => {
    const res = await fetch(`${NEXT_URL}/api/user/files/tome`);

    const resNext = await res.json();

    if (res.ok) {
      // display success message & update files state
      console.log(resNext.message);
      setToMeFiles(resNext.data);
    } else {
      setError(resNext.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  // Retrieve files shared with user from server
  // - associated by jwt token
  // - fetches files which have current user as an author or recipient
  const deleteMyFile = async (id: number, origin: downloadOriginType) => {
    const res = await fetch(`${NEXT_URL}/api/user/files/${id}`, {
      method: 'DELETE',
    });

    const resNext = await res.json();

    if (res.ok) {
      // display success message & update files state
      console.log(resNext.message);
      // update state according to list from which the method was called
      if (origin == downloadOriginType.UPLOAD) {
        setMyFiles((currentFiles: any) =>
          currentFiles.filter((file: any) => file.id !== id)
        );
      } else if (origin == downloadOriginType.DOWNLOAD) {
        setToMeFiles((currentFiles: any) =>
          currentFiles.filter((file: any) => file.id !== id)
        );
      } else {
        setError('Unknown origin when downloading file');
      }
    } else {
      setError(resNext.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  const downloadMyFile = async (id: number) => {
    const res = await fetch(`${NEXT_URL}/api/user/files/${id}`);

    const resNext = await res.json();

    if (res.ok) {
      // display success message & update files state
      console.log(resNext.message);
      // update files state here
      // eg filter out what was returned from server
      // setToMeFiles(resNext.data);
    } else {
      setError(resNext.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  return (
    <DataContext.Provider
      value={{
        error,
        myFiles,
        toMeFiles,
        uploadFile,
        retrieveMyFiles,
        retrieveToMeFiles,
        deleteMyFile,
        downloadMyFile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
