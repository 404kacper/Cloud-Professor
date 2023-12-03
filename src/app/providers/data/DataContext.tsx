'use client';
import { createContext, useState } from 'react';
import { NEXT_URL } from '@/config/index';
import { ReactNode } from 'react';
import { dataContextDefaultValue, dataContextType } from './DataTypes';

const DataContext = createContext<dataContextType>(dataContextDefaultValue);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState(dataContextDefaultValue.error);

  // Upload file:
  //  - Recieves binary buffer with file data
  //  - Generates symmetric key for the file
  //  - Encrypts file with symmetric key
  //  - Encrypts symmetric key with public key to reciever
  //  - Returns encrypted file and encrypted symmetric key
  const uploadFile = async (data: ArrayBuffer) => {
    const res = await fetch(`${NEXT_URL}/api/user/keys`);
  };

  return (
    <DataContext.Provider value={{ error, uploadFile }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
