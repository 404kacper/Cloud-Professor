import React from 'react';
import styles from './LogsListItem.module.scss';
import Image from 'next/image';

export enum ListItemVariants {
  TRANSPARENT = 'transparent',
  DARK = 'dark',
}

export default function LogsListItem({
  variant,
}: {
  variant: ListItemVariants;
}) {
  const itemContainerClass =
    variant === ListItemVariants.DARK
      ? `${styles.itemContainer} ${styles.itemContainerDark}`
      : styles.itemContainer;

  return (
    <div className={itemContainerClass}>
      <div className={styles.logFromContainer}>
        <div className={styles.fromImageContainer}>
          <Image src='/dash/sharing-placeholder.png' alt='' fill />
        </div>
        <div className={styles.fromEmail}>example@gmail.com</div>
      </div>

      <div className={styles.logDate}>23/11/2023 15:23:11</div>

      <div className={styles.logName}>Brochure.doc</div>

      <div className={styles.keyValue}>
        ultraturbolongkeystringawdawdawd
      </div>

      <div className={styles.copyContainer}>
        <Image src='/dash/list-copy.svg' alt='' fill />
      </div>
    </div>
  );
}
