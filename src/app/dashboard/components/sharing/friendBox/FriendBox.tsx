import React from 'react';
import styles from './FriendBox.module.scss';
import Image from 'next/image';

export default function FriendBox({
  username,
  email,
}: {
  username: string;
  email: string;
}) {
  // For now username = email so...
  // Split the email string at the '@' and take the first part
  const name = email.split('@')[0];

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src='/dash/sharing-placeholder.png' alt='' fill />
      </div>
      <div className={styles.textContainer}>
        {/* capitalize 1st letter of username - just makes it look cleaner & contains query isn't case sensitive anyways*/}
        {name.charAt(0).toUpperCase() + name.slice(1)}
        <br />
        <span className={styles.textThinner}>{email}</span>
      </div>
      <div className={styles.iconContainer}>
        <Image src='/dash/sharing-button.svg' alt='' fill />
      </div>
    </div>
  );
}
