import Navbar from '../dashboard/components/navbar/Navbar';
import StatusBar from '../dashboard/components/statusBar/StatusBar';

import styles from './Statistics.module.scss';

export default function Statistics() {
  return (
    <div className={styles.statisticsContainer}>
      <div className={styles.navContainer}>
        <Navbar></Navbar>
      </div>
      <div className={styles.statsContentContainer}>
        <StatusBar></StatusBar>
      </div>
    </div>
  );
}
