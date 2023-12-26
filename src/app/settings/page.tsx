'use client'
import { useContext, useEffect } from 'react';
import Navbar from '../dashboard/components/navbar/Navbar';
import StatusBar from '../dashboard/components/statusBar/StatusBar';

import styles from './Settings.module.scss';

import AuthContext from '@/context/AuthContext';
import { redirect } from 'next/navigation';

export default function Settings() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // redirect if user null in AuthContext provider (naive approach for now)
    if (!user) {
      redirect('/');
    }
  }, [user]);

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.navContainer}>
        <Navbar></Navbar>
      </div>
      <div className={styles.setContentContainer}>
        <StatusBar></StatusBar>
      </div>
    </div>
  );
}
