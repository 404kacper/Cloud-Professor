import React from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src='/navbar/logo-horizontal-white.svg' alt='' fill></Image>
      </div>
      <div className={styles.button}>
        <h1>Sign In</h1>
      </div>
    </div>
  );
}
