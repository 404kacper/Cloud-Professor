import React from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';

import Dropbox from './Dropbox/Dropbox';

// notes for this component
// - nav clicks probably need a smooth transistion between each click (selector on the right moving up/down & gradient moving along with it & active button elements transforming)
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
        {/* Still not how to make selector appear between bg and navButtonActive element & maintain it's mix-blend-mode */}
        <div className={styles.selector}>
          <Image src='/dash/nav-selector.svg' alt='' fill />
        </div>
        <li className={styles.navItem}>
          <div className={`${styles.navButton} ${styles.navButtonActive}`}>
            <div className={styles.icon}>
              <Image src='/dash/nav-dash.svg' alt='' fill />
            </div>
            <span>DASHBOARD</span>
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navButton}>
            <div className={styles.icon}>
              <Image src='/dash/nav-key.svg' alt='' fill />
            </div>
            <span>KEYS</span>
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navButton}>
            <div className={styles.icon}>
              <Image src='/dash/nav-stats.svg' alt='' fill />
            </div>
            <span>STATISTICS</span>
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navButton}>
            <div className={styles.icon}>
              <Image src='/dash/nav-lib.svg' alt='' fill />
            </div>
            <span>LIBRARY</span>
          </div>
        </li>
        <li className={styles.navItem}>
          <div className={styles.navButton}>
            <div className={styles.icon}>
              <Image src='/dash/nav-set.svg' alt='' fill />
            </div>
            <span>SETTINGS</span>
          </div>
        </li>
      </ul>
      {/* Animate the border so that it's moving whenever user drags mouse over the dropbox */}
      {/* Perhaps animate the svg to have similar effect to the one on hero? */}
      <Dropbox />
    </nav>
  );
}
