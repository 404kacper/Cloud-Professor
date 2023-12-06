import React from 'react';
import styles from './FriendBox.module.scss';
import Image from 'next/image';

export default function FriendBox() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src='/dash/sharing-placeholder.png' alt='' fill />
      </div>
      <div className={styles.textContainer}>
        User1
        <br />
        <span className={styles.textThinner}>example@gmail.com</span>
      </div>
      <div className={styles.iconContainer}>
        <Image src='/dash/sharing-button.svg' alt='' fill/>
      </div>
    </div>
  );
}
