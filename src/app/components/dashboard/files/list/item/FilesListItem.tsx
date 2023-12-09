import React from 'react';
import styles from './FilesListItem.module.scss';
import Image from 'next/image';

export default function FilesListItem() {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.fileNameContainer}>
        <div className={styles.fileIconContainer}>
          <Image src='/dash/list-txt.svg' alt='' fill />
        </div>
        <div className={styles.fileName}>Car Inspection Report</div>
      </div>

      <div className={styles.keyContainer}>
        <div className={styles.keySize}>2048 bytes</div>
        <div className={styles.copyContainer}>
          <Image src='/dash/list-copy.svg' alt='' fill />
        </div>
      </div>

      <div className={styles.fileSize}>356 kB</div>

      <div className={styles.fileDate}>28th May 2023</div>

      <div className={styles.actionsContainer}>
        <div className={styles.downloadContainer}>
          <Image src='/dash/list-down.svg' alt='' fill />
        </div>
        <div className={styles.trashContainer}>
          <Image src='/dash/list-trash.svg' alt='' fill />
        </div>
      </div>
    </div>
  );
}
