'use client';
import React, { useContext, useState } from 'react';
import styles from './StatusBar.module.scss';
import Image from 'next/image';

import AuthContext from '@/context/AuthContext';

export default function StatusBar() {
  const { user, logout } = useContext(AuthContext);
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.statusContainer}>
      <div className={styles.imageContainer}>
        <Image src='/dash/status-avatar.png' alt='' fill />
      </div>
      <div className={styles.textContainer}>
        Welcome back,
        <br />
        <span className={styles.textBolder}>
          Professor {user && user.username.split('@')[0]}
        </span>
      </div>
      <div
        className={
          hovered
            ? `${styles.hoverContainer} ${styles.hoverContainerHovered}`
            : `${styles.hoverContainer}`
        }
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
        onClick={() => {
          logout();
        }}
      >
        <div
          className={
            hovered
              ? `${styles.expandableIcon} ${styles.expandableIconHovered}`
              : `${styles.expandableIcon}`
          }
        >
          <Image src='/dash/status-exit.svg' alt='' fill />
        </div>
        <div
          className={
            hovered
              ? `${styles.expandableContents} ${styles.expandableContentsHovered}`
              : `${styles.expandableContents}`
          }
        >
          Logout
        </div>
      </div>
    </div>
  );
}
