'use client';
import React, { useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import AuthContext from '@/context/AuthContext';
import KeysContext from '@/keysContext/KeysContext';
import DataContext from '@/dataContext/DataContext';
import { redirect } from 'next/navigation';

import Navbar from './components/navbar/Navbar';
import StatusBar from './components/statusBar/StatusBar';
import Indicators from './components/indicators/Indicators';
import Sharing from './components/sharing/Sharing';
import FilesContainer from './components/files/FilesContainer';

import ModalContainer, { ModalTypes } from './components/modals/ModalContainer';

import styles from './Dashboard.module.scss';

export default function Dasbhoard() {
  const { user, displayModal } = useContext(AuthContext);
  const { fetchKeys } = useContext(KeysContext);
  const {
    error,
    retrieveMyFiles,
    retrieveToMeFiles,
    retrieveMylogs,
    findUsers,
  } = useContext(DataContext);

  // fetch all the necessary data for all dashboard navigation links in here
  // the state values don't change between client side navigation
  useEffect(() => {
    fetchKeys();
    retrieveMyFiles();
    retrieveToMeFiles();
    retrieveMylogs();
    // fetch 8 random users with empty query string
    findUsers('');
  }, []);

  useEffect(() => {
    // redirect if user null in AuthContext provider (naive approach for now)
    if (!user) {
      redirect('/');
    }
  }, [user]);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  return (
    <div className={styles.dashboardContainer}>
      {displayModal == ModalTypes.SETUP ? (
        <ModalContainer type={ModalTypes.SETUP} />
      ) : displayModal == ModalTypes.SHARE_FILE ? (
        <ModalContainer type={ModalTypes.SHARE_FILE} />
      ) : displayModal == ModalTypes.PASSWORD_PROMPT ? (
        <ModalContainer type={ModalTypes.PASSWORD_PROMPT} />
      ) : null}
      <div className={styles.navContainer}>
        <Navbar></Navbar>
      </div>
      <div className={styles.dashContentContainer}>
        <StatusBar></StatusBar>
        <ToastContainer />
        {/* 1:3:7 proportions for remaining */}
        <Indicators></Indicators>
        <Sharing></Sharing>
        <FilesContainer></FilesContainer>
      </div>
    </div>
  );
}
