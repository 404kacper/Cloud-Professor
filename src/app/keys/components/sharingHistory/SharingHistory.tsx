import React from 'react';
import styles from './SharingHistory.module.scss';

import LogsList from './list/LogsList';

export default function SharingHistory() {
  return (
    <div className={styles.historySpacingContainer}>
      <div className={styles.historyContainer}>
        <div className={styles.title}>
          Sharing History <br />{' '}
          <span className={styles.subtitle}>
            Keep track of your public key usage
          </span>
        </div>
        <div className={styles.historyContent}>
          <LogsList
            firstLabel='User'
            secondLabel='Date'
            thirdLabel='File'
            fourthLabel='Their Public Key'
          />
        </div>
      </div>
    </div>
  );
}
