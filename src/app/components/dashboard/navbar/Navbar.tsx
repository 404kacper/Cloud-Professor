import React from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';

export default function Header() {
  return (
    <nav className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          {/* Logo once vertical orientation design is rdy */}
          {/* <Image
          src='/path/to/cloud_professor_logo.png'
          alt='Cloud Professor'
          width={100}
          height={50}
        /> */}
          <h1>
            CLOUD <br /> PROFESSOR
          </h1>
        </div>
      </div>

      {/* Navigation links */}
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <div className={styles.icon}>
            <Image src='/dash/nav-dash.svg' alt='' fill />
          </div>
          <span>DASHBOARD</span>
        </li>
        <li className={styles.navItem}>
          <div className={styles.icon}>
            <Image src='/dash/nav-key.svg' alt='' fill />
          </div>
          <span>KEYS</span>
        </li>
        <li className={styles.navItem}>
          <div className={styles.icon}>
            <Image src='/dash/nav-stats.svg' alt='' fill />
          </div>
          <span>STATISTICS</span>
        </li>
        <li className={styles.navItem}>
          <div className={styles.icon}>
            <Image src='/dash/nav-lib.svg' alt='' fill />
          </div>
          <span>LIBRARY</span>
        </li>
        <li className={styles.navItem}>
          <div className={styles.icon}>
            <Image src='/dash/nav-set.svg' alt='' fill />
          </div>
          <span>SETTINGS</span>
        </li>
      </ul>
    </nav>
  );
}
