import React, { useContext } from 'react';
import styles from './FriendBox.module.scss';
import Image from 'next/image';

import AuthContext from '@/context/AuthContext';

import { ModalTypes } from '@/modalEnums';

export default function FriendBox({
  username,
  email,
  publicKey,
}: {
  username: string;
  email: string;
  publicKey: string;
}) {
  const { setDisplayModal, setClickedFriend } = useContext(AuthContext);
  // For now username = email so...
  // Split the email string at the '@' and take the first part
  const name = email.split('@')[0];

  const handleOnClick = () => {
    setDisplayModal(ModalTypes.SHARE_FILE);
    setClickedFriend({ email: email, key: publicKey });
  };

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
      <div className={styles.iconContainer} onClick={handleOnClick}>
        <Image src='/dash/sharing-button.svg' alt='' fill />
      </div>
    </div>
  );
}
