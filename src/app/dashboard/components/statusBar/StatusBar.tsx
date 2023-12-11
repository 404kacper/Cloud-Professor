import React from 'react';
import styles from './StatusBar.module.scss';
import Image from 'next/image';

export default function StatusBar() {
  return (
    <div className={styles.statusContainer}>
      <div className={styles.textContainer}>
        Welcome back,
        <br />
        <span className={styles.textBolder}>Professor Tomek </span>
      </div>
      <div className={styles.imageContainer}>
        <Image src='/dash/status-avatar.png' alt='' fill />
      </div>
    </div>
  );
}
