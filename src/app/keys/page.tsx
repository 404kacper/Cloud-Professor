// the reason behind this use client...
// I guess you can't perform client side navigation without making all pages client side
// That way I don't have to make requests on each page load
// & make context values persist across each navigation
'use client';
import Navbar from '../dashboard/components/navbar/Navbar';
import StatusBar from '../dashboard/components/statusBar/StatusBar';
import KeysCentre from './components/keysCentre/KeysCentre';
import SharingHistory from './components/sharingHistory/SharingHistory';

import styles from './Keys.module.scss';

export default function Keys() {
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
