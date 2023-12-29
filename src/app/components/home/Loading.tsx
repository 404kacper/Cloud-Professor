import React from 'react';
import styles from './Loading.module.scss';
import Image from 'next/image';

export default function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={
        isLoading
          ? `${styles.container}`
          : `${styles.container} ${styles.containerExit}`
      }
    >
      <div
        className={
          isLoading
            ? `${styles.textContainer}`
            : `${styles.textContainer} ${styles.textContainerExit}`
        }
      >
        <Image src='/hero/loading-text.svg' alt='' fill />
      </div>
      <div
        className={
          isLoading
            ? `${styles.textContainer}`
            : `${styles.textContainer} ${styles.textContainerExit}`
        }
      >
        <Image src='/hero/loading-text.svg' alt='' fill />
      </div>
    </div>
  );
}
