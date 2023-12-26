// the reason behind this use client...
// I guess you can't perform client side navigation without making all pages client side
// That way I don't have to make requests on each page load
// & make context values persist across each navigation
'use client';
import { useContext, useEffect } from 'react';
import Navbar from '../dashboard/components/navbar/Navbar';
import StatusBar from '../dashboard/components/statusBar/StatusBar';
import KeysCentre from './components/keysCentre/KeysCentre';
import SharingHistory from './components/sharingHistory/SharingHistory';

import AuthContext from '@/context/AuthContext';
import { redirect } from 'next/navigation';

import styles from './Keys.module.scss';

export default function Keys() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // redirect if user null in AuthContext provider (naive approach for now)
    if (!user) {
      redirect('/');
    }
  }, [user]);

  return (
    <div className={styles.keysContainer}>
      <div className={styles.navContainer}>
        <Navbar></Navbar>
      </div>
      <div className={styles.keysContentContainer}>
        <StatusBar></StatusBar>
        <KeysCentre></KeysCentre>
        <SharingHistory></SharingHistory>
      </div>
    </div>
  );
}
