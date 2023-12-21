import React from 'react';
import styles from './LogsListItem.module.scss';
import Image from 'next/image';

export enum ListItemVariants {
  TRANSPARENT = 'transparent',
  DARK = 'dark',
}

export default function LogsListItem({
  variant,
  logUser,
  logDate,
  logFilename,
  logKey,
}: {
  variant: ListItemVariants;
  logUser: string;
  logDate: string;
  logFilename: string;
  logKey: string;
}) {
  const itemContainerClass =
    variant === ListItemVariants.DARK
      ? `${styles.itemContainer} ${styles.itemContainerDark}`
      : styles.itemContainer;

  // Same helper as in dashboard/components/files/list/item
  // At this point it should be moved to a shared place
  // But since it's the last thing to do I'll just let it be :)
  // Acutally the difference is that it also includes hh and mm so it's a bit different
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
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const daySuffix =
      day % 10 <= 3 && ![11, 12, 13].includes(day) ? suffixes[day % 10] : 'th';

    // Format minutes to always be two digits (e.g., '09' instead of '9')
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Combine the date with the time
    return `${day}${daySuffix} ${months[monthIndex]} ${year} at ${hours}:${formattedMinutes}`;
  };

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(logKey);
      console.log('File key copied to clipboard');
    } catch (err) {
      console.error('Failed to copy the file key:', err);
    }
  };

  return (
    <div className={itemContainerClass}>
      <div className={styles.logFromContainer}>
        <div className={styles.fromImageContainer}>
          <Image src='/dash/sharing-placeholder.png' alt='' fill />
        </div>
        <div className={styles.fromEmail}>{logUser}</div>
      </div>

      <div className={styles.logDate}>{formatDate(logDate)}</div>

      <div className={styles.logName}>{logFilename}</div>

      <div className={styles.keyValue}>{logKey}</div>

      <div className={styles.copyContainer} onClick={handleCopyKey}>
        <Image src='/dash/list-copy.svg' alt='' fill />
      </div>
    </div>
  );
}
