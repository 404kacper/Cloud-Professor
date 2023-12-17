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
  const { fetchKeys } = useContext(KeysContext);
  const { retrieveMyFiles, retrieveToMeFiles } = useContext(DataContext);

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
      </div>
    </div>
  );
}
