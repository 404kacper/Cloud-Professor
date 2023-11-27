'use client';
import React, { useContext } from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import SplineContext from '@/splineContext/SplineContext';

export default function Header() {
  const { handleHeroButtonClicked, handleIsLoginScreen, isLoginScreen } =
    useContext(SplineContext);

  // Event handler for button click
  const handleButtonClick = () => {
    handleHeroButtonClicked();

    // immediate execution for showing login screen
    if (!isLoginScreen) {
      handleIsLoginScreen();
      return;
    }

    // wait for animation before showing exit animation
    setTimeout(() => {
      handleIsLoginScreen();
    }, 1100);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          priority
          src='/navbar/logo-horizontal-white.svg'
          alt=''
          fill
        ></Image>
      </div>
      <div className={`${styles.button}`} onClick={handleButtonClick}>
        DIVE IN
      </div>
    </div>
  );
}
