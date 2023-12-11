import React from 'react';
import styles from './UploadCentre.module.scss';
import FilesList, {ListTypes} from '../list/FilesList';

export default function UploadCentre() {
  return (
    <div className={styles.uploadsContainer}>
      <div className={styles.title}>
        Upload Centre <br />{' '}
        <span className={styles.subtitle}>Your uploaded files</span>
      </div>
      <FilesList
        firstLabel='File'
        secondLabel='Symmetric Key'
        thirdLabel='Size'
        fourthLabel='Date'
        typeOfList={ListTypes.UPLOAD}
      ></FilesList>
    </div>
  );
}
