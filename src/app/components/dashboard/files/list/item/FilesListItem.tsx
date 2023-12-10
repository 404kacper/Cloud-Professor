import React from 'react';
import styles from './FilesListItem.module.scss';
import Image from 'next/image';
import { ListTypes } from '../FilesList';

export enum ListItemTypes {
  DEFAULT = 'default',
  TXT = 'txt',
  DOCX = 'docx',
}

export default function FilesListItem({
  type,
  itemType,
}: {
  type: ListTypes;
  itemType: ListItemTypes;
}) {
  let iconSrc = '/dash/list-unknown.svg';
  if (itemType === ListItemTypes.TXT) {
    iconSrc = '/dash/list-txt.svg';
  } else if (itemType === ListItemTypes.DOCX) {
    iconSrc = '/dash/list-word.svg';
  }

  return (
    <div className={styles.itemContainer}>
      <div className={styles.fileNameContainer}>
        <div className={styles.fileIconContainer}>
          <Image src={iconSrc} alt='' fill />
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

      {type === ListTypes.UPLOAD ? (
        <div className={styles.fileDate}>28th May 2023</div>
      ) : type === ListTypes.DOWNLOAD ? (
        <div className={styles.fileFromContainer}>
          <div className={styles.fromImageContainer}>
            <Image src='/dash/sharing-placeholder.png' alt='' fill />
          </div>
          <div className={styles.fromEmail}>example@gmail.com</div>
        </div>
      ) : null}

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
