'use client';
import React from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import Dropbox from './dropbox/Dropbox';
import { usePathname } from 'next/navigation';

// notes for this component
// - nav clicks probably need a smooth transistion between each click (selector on the right moving up/down & gradient moving along with it & active button elements transforming)
export default function Header() {
  const pathname = usePathname();

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
        <div
          className={`${styles.selector} ${
            pathname == '/keys'
              ? styles.selectorKeys
              : pathname == '/statistics'
              ? styles.selectorStatistics
              : pathname == '/library'
              ? styles.selectorLibrary
              : pathname == '/settings'
              ? styles.selectorSettings
              : ''
          }`}
        >
          <Image src='/dash/nav-selector.svg' alt='' fill />
        </div>
        <li className={styles.navItem}>
          <div
            className={`${styles.navButton} ${
              pathname == '/dashboard' ? styles.navButtonActive : ''
            }`}
          >
            <div className={styles.icon}>
              <Image src='/dash/nav-dash.svg' alt='' fill />
            </div>
            <Link href='/dashboard'>DASHBOARD</Link>
          </div>
        </li>
        <li className={styles.navItem}>
          <div
            className={`${styles.navButton} ${
              pathname == '/keys' ? styles.navButtonActive : ''
            }`}
          >
            <div className={styles.icon}>
              <Image src='/dash/nav-key.svg' alt='' fill />
            </div>
            <Link href='/keys'>KEYS</Link>
          </div>
        </li>
        <li className={styles.navItem}>
          <div
            className={`${styles.navButton} ${
              pathname == '/statistics' ? styles.navButtonActive : ''
            }`}
          >
            <div className={styles.icon}>
              <Image src='/dash/nav-stats.svg' alt='' fill />
            </div>
            <Link href='/statistics'>STATISTICS</Link>
          </div>
        </li>
        <li className={styles.navItem}>
          <div
            className={`${styles.navButton} ${
              pathname == '/library' ? styles.navButtonActive : ''
            }`}
          >
            <div className={styles.icon}>
              <Image src='/dash/nav-lib.svg' alt='' fill />
            </div>
            <Link href='/library'>LIBRARY</Link>
          </div>
        </li>
        <li className={styles.navItem}>
          <div
            className={`${styles.navButton} ${
              pathname == '/settings' ? styles.navButtonActive : ''
            }`}
          >
            <div className={styles.icon}>
              <Image src='/dash/nav-set.svg' alt='' fill />
            </div>
            <Link href='/settings'>SETTINGS</Link>
          </div>
        </li>
      </ul>
      {/* Animate the border so that it's moving whenever user drags mouse over the dropbox */}
      {/* Perhaps animate the svg to have similar effect to the one on hero? */}
      <Dropbox />
    </nav>
  );
}
