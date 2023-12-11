import React from 'react';
import styles from './DownloadCentre.module.scss';
import FilesList, { ListTypes } from '../list/FilesList';

export default function DownloadCentre() {
  return (
    <div className={styles.downloadsContainer}>
      <div className={styles.title}>
        Download Centre <br />{' '}
        <span className={styles.subtitle}>Your friends files</span>
      </div>
      <FilesList
        firstLabel='File'
        secondLabel='Symmetric Key'
        thirdLabel='Size'
        fourthLabel='From'
        typeOfList={ListTypes.DOWNLOAD}
      ></FilesList>
    </div>
  );
}
