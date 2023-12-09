import React from 'react';
import styles from './DownloadCentre.module.scss';

export default function DownloadCentre() {
  return (
    <div className={styles.downloadsContainer}>
      <div className={styles.title}>
        Downloads Centre <br />{' '}
        <span className={styles.subtitle}>Your friends files</span>
      </div>
    </div>
  );
}
