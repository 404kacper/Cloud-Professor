import Navbar from '../dashboard/components/navbar/Navbar';
import StatusBar from '../dashboard/components/statusBar/StatusBar';

import styles from './Keys.module.scss';

export default function Keys() {
  return (
    <div className={styles.keysContainer}>
      <div className={styles.navContainer}>
        <Navbar></Navbar>
      </div>
      <div className={styles.keysContentContainer}>
        <StatusBar></StatusBar>
      </div>
    </div>
  );
}
