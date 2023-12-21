import React, { useContext } from 'react';
import styles from './FilesListItem.module.scss';
import Image from 'next/image';
import { ListTypes } from '../FilesList';

import DataContext from '@/dataContext/DataContext';
import { downloadOriginType } from '@/dataContext/DataTypes';

export enum ListItemTypes {
  DEFAULT = 'default',
  TXT = 'txt',
  DOCX = 'docx',
}

export default function FilesListItem({
  type,
  itemFormat,
  itemId,
  className,
  itemName,
  itemSize,
  itemKeySize,
  itemDate,
  itemKey,
  itemAuthorEmail,
}: {
  type: ListTypes;
  itemFormat: ListItemTypes;
  itemId: number;
  className?: string;
  itemName: string;
  itemSize: number;
  itemKeySize: number;
  itemDate?: string;
  itemKey: string;
  itemAuthorEmail?: string;
}) {
  const { deleteMyFile, downloadMyFile } = useContext(DataContext);

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(itemKey);
      console.log('File key copied to clipboard');
    } catch (err) {
      console.error('Failed to copy the file key:', err);
    }
  };

  // update appropriate state according to the type of list
  const handleDeleteFile = () => {
    if (type === ListTypes.UPLOAD) {
      deleteMyFile(itemId, downloadOriginType.UPLOAD);
    } else if (type === ListTypes.DOWNLOAD) {
      deleteMyFile(itemId, downloadOriginType.DOWNLOAD);
    }
  };

  const handleDownloadFile = async () => {
    console.log('Downloading file...');
    const fileData = await downloadMyFile(itemId);
    console.log('Downloading finished...');
    const blob = new Blob([fileData]);
    const downloadUrl = window.URL.createObjectURL(blob);

    // Download file
    const a = document.createElement('a');
    a.href = downloadUrl;
    console.log(`set filename: ${itemName}.${itemFormat}`);
    a.download = `${itemName}.${itemFormat}`; // Set the file name
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
    a.remove();
  };

  // Helper function to convert bits to appopriate format for displaying
  const formatItemSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes >= 1024 && sizeInBytes < Math.pow(1024, 2)) {
      return `${Math.round(sizeInBytes / 1024)} KB`;
    } else if (
      sizeInBytes >= Math.pow(1024, 2) &&
      sizeInBytes < Math.pow(1024, 3)
    ) {
      return `${(sizeInBytes / Math.pow(1024, 2)).toFixed(1)} MB`;
    } else {
      return `${(sizeInBytes / Math.pow(1024, 3)).toFixed(2)} GB`;
    }
  };

  // Another helper to formate date for output
  const formatDate = (isoDate: string) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const suffixes = ['th', 'st', 'nd', 'rd'];

    const date = new Date(isoDate);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const daySuffix =
      day % 10 <= 3 && ![11, 12, 13].includes(day) ? suffixes[day % 10] : 'th';

    return `${day}${daySuffix} ${months[monthIndex]} ${year}`;
  };

  const formattedItemSize = formatItemSize(itemSize);
  let formattedDate;
  if (itemDate) {
    formattedDate = formatDate(itemDate);
  }

  const itemContainerClass = className
    ? `${styles.itemContainer} ${className}`
    : styles.itemContainer;

  let iconSrc = '/dash/list-unknown.svg';
  if (itemFormat === ListItemTypes.TXT) {
    iconSrc = '/dash/list-txt.svg';
  } else if (itemFormat === ListItemTypes.DOCX) {
    iconSrc = '/dash/list-word.svg';
  }

  return (
    <div className={itemContainerClass}>
      <div className={styles.fileNameContainer}>
        <div className={styles.fileIconContainer}>
          <Image src={iconSrc} alt='' fill />
        </div>
        <div className={styles.fileName}>{itemName}</div>
      </div>

      <div className={styles.keyContainer}>
        <div className={styles.keySize}>{itemKeySize} bits</div>
        <div className={styles.copyContainer} onClick={handleCopyKey}>
          <Image src='/dash/list-copy.svg' alt='' fill />
        </div>
      </div>

      <div className={styles.fileSize}>{formattedItemSize}</div>

      {type === ListTypes.UPLOAD ? (
        <div className={styles.fileDate}>{formattedDate}</div>
      ) : type === ListTypes.DOWNLOAD ? (
        <div className={styles.fileFromContainer}>
          <div className={styles.fromImageContainer}>
            <Image src='/dash/sharing-placeholder.png' alt='' fill />
          </div>
          <div className={styles.fromEmail}>{itemAuthorEmail}</div>
        </div>
      ) : null}

      <div className={styles.actionsContainer}>
        <div className={styles.downloadContainer} onClick={handleDownloadFile}>
          <Image src='/dash/list-down.svg' alt='' fill />
        </div>
        <div className={styles.trashContainer} onClick={handleDeleteFile}>
          <Image src='/dash/list-trash.svg' alt='' fill />
        </div>
      </div>
    </div>
  );
}
