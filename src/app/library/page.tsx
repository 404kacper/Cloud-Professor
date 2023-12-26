'use client'
import { useContext, useEffect } from 'react';
import Navbar from '../dashboard/components/navbar/Navbar';
import StatusBar from '../dashboard/components/statusBar/StatusBar';

import styles from './library.module.scss';

import AuthContext from '@/context/AuthContext';
import { redirect } from 'next/navigation';

export default function Library() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // redirect if user null in AuthContext provider (naive approach for now)
    if (!user) {
      redirect('/');
    }
  }, [user]);
  
  return (
    <div className={styles.libraryContainer}>
      <div className={styles.navContainer}>
        <Navbar></Navbar>
      </div>
      <div className={styles.libContentContainer}>
        <StatusBar></StatusBar>
      </div>
    </div>
  );
}
