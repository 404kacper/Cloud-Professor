import React from 'react';
import styles from './filesContainer.module.scss';
import UploadCentre from './uploads/UploadCentre';
import DownloadCentre from './downloads/DownloadCentre';

export default function FilesContainer() {
  return (
    <div className={styles.filesSpacing}>
      <UploadCentre></UploadCentre>
      <DownloadCentre></DownloadCentre>
    </div>
  );
}
