import React from 'react';
import styles from './UploadCentre.module.scss';

export default function UploadCentre() {
  return (
    <div className={styles.uploadsContainer}>
      <div className={styles.title}>
        Upload Centre <br />{' '}
        <span className={styles.subtitle}>Your uploaded files</span>
      </div>
    </div>
  );
}
