'use client';
import { createContext, useState } from 'react';
import { NEXT_URL } from '@/config/index';
import { ReactNode } from 'react';
import { dataContextDefaultValue, dataContextType } from './DataTypes';
import EncryptionDataManager from '@/utils/subclasses/EncryptionDataManager';
import EncryptionKeyManager from '@/utils/subclasses/EncryptionKeyManager';

const DataContext = createContext<dataContextType>(dataContextDefaultValue);

export const DataProvider = ({ children }: { children: ReactNode }) => {
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

    // do the request to server route here
    const res = await fetch(`${NEXT_URL}/api/user/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileKey: symKeyEncrypted,
        fileData: encryptedData,
        fileIv: iv,
        fileName: name,
        fileSize: size,
      }),
    });

    const resNext = await res.json();

    if (res.ok) {
      // display success message
      // or/and updates files list
      console.log(resNext.message)
    } else {
      setError(resNext.message);
      // clear error message after 1s
      setTimeout(() => setError(null), 1000);
    }
  };

  return (
    <DataContext.Provider value={{ error, uploadFile }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;