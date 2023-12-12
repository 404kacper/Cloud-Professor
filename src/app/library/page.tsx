import Navbar from '../dashboard/components/navbar/Navbar';
import StatusBar from '../dashboard/components/statusBar/StatusBar';

import styles from './library.module.scss';

export default function Library() {
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
