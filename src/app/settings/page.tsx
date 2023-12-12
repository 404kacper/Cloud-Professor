import Navbar from '../dashboard/components/navbar/Navbar';
import StatusBar from '../dashboard/components/statusBar/StatusBar';

import styles from './Settings.module.scss';

export default function Settings() {
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
