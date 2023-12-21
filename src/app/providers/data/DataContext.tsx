'use client';
import { createContext, useState, useContext } from 'react';
import { NEXT_URL } from '@/config/index';
import { ReactNode } from 'react';

import {
  dataContextDefaultValue,
  dataContextType,
  downloadOriginType,
} from './DataTypes';

import EncryptionDataManager from '@/utils/subclasses/EncryptionDataManager';
import EncryptionKeyManager from '@/utils/subclasses/EncryptionKeyManager';

import KeysContext from '@/keysContext/KeysContext';
import AuthContext from '@/context/AuthContext';

const DataContext = createContext<dataContextType>(dataContextDefaultValue);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [myFiles, setMyFiles] = useState(dataContextDefaultValue.myFiles);
  const [toMeFiles, setToMeFiles] = useState(dataContextDefaultValue.toMeFiles);
  const [logs, setLogs] = useState(dataContextDefaultValue.logs);
  const [users, setUsers] = useState(dataContextDefaultValue.users);
  const [error, setError] = useState(dataContextDefaultValue.error);

  const keyManager = new EncryptionKeyManager();
  const dataManager = new EncryptionDataManager();

  const { privateKey, iv } = useContext(KeysContext);
  const { adjustUserProperty } = useContext(AuthContext);

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
      // account for changes in indicators
      adjustUserProperty('totalFiles', 'increment');
      adjustUserProperty('uploadedFiles', 'increment');
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

  // Retrieve files logs where user is a recipient
  // - associated by jwt token
  const retrieveMylogs = async () => {
    const res = await fetch(`${NEXT_URL}/api/user/logs`);

    const resNext = await res.json();

    if (res.ok) {
      // display success message & update files state
      console.log(resNext.message);
      setLogs(resNext.data);
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
        setError('Unknown origin when deleting file');
      }
      // account for changes in indicators
      adjustUserProperty('totalFiles', 'decrement');
    } else {
      setError(resNext.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  // Downloades clicked file
  // - associated by jwt token
  // - fetches stored file data from server by id of a clicked element
  // - file contents are base64 encoded (encrypted)
  const downloadMyFile = async (id: number): Promise<ArrayBuffer> => {
    const res = await fetch(`${NEXT_URL}/api/user/files/${id}`);

    const resNext = await res.json();

    if (!res.ok) {
      setError(resNext.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }

    console.log(resNext.data);

    // display success message after fetching necessary file data
    console.log(resNext.message);
    // masterPassword for private key - hardcoded for now (will be taken from user input)
    const masterPassword = '12312';
    let privateKeyDecrypted: CryptoKey;
    let symmetricKeyDecrypted: CryptoKey;
    let fileDataDecrypted: ArrayBuffer;

    try {
      privateKeyDecrypted = await keyManager.decryptPrivateKey(
        privateKey,
        iv,
        masterPassword
      );
    } catch {
      setError('Wrong master password');
      setTimeout(() => setError(null), 1000);
      return Promise.reject('Private key could not be decrypted');
    }

    // application flow doesn't allow for this to happend
    // since the private key is either users or recipients - and they're always fetched properly
    // but it's always good to check just in case
    try {
      symmetricKeyDecrypted =
        await keyManager.decryptSymmetricKeyWithPrivateKey(
          resNext.data.key,
          privateKeyDecrypted
        );
    } catch {
      setError('Private key is invalid');
      setTimeout(() => setError(null), 1000);
      return Promise.reject('Private key is invalid');
    }

    // same story with this - it definitely won't happen
    // since even if the symmetric key is invalid - there will be output
    // but that output will simply be meaningless
    // unless a structural error exists within that passed key (whatever it might be)
    try {
      fileDataDecrypted = await dataManager.decryptDataWithSymmetricKey(
        resNext.data.contents,
        symmetricKeyDecrypted,
        resNext.data.fileIv
      );
    } catch {
      setError('Symmetric key is invalid');
      setTimeout(() => setError(null), 1000);
      return Promise.reject('Symmetric key is invalid');
    }

    // account for changes in indicators
    adjustUserProperty('downloadedFiles', 'increment');

    // return ArrayBuffer with decrypted file data & convert it into a url on frontend & download it
    return fileDataDecrypted;
  };

  const findUsers = async (searchTerm: string) => {
    const res = await fetch(`${NEXT_URL}/api/users?email=${searchTerm}`);

    const resNext = await res.json();

    if (res.ok) {
      // display success message & update files state
      console.log(resNext.message);
      setUsers(resNext.data);
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
        users,
        logs,
        uploadFile,
        retrieveMyFiles,
        retrieveToMeFiles,
        deleteMyFile,
        downloadMyFile,
        findUsers,
        retrieveMylogs,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
