'use client';
import React, { useContext } from 'react';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import SplineContext from '@/splineContext/SplineContext';

export default function Header() {
  const { handleHeroButtonClicked, handleShowModal, showModal, heroButtonClicked } =
    useContext(SplineContext);

  // Event handler for button click
  const handleButtonClick = () => {
    handleHeroButtonClicked();
    handleShowModal();
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
      <div className={`${styles.button} ${!heroButtonClicked && styles.buttonVisible} ${(!showModal && !heroButtonClicked) && styles.buttonEnableClicks}`} onClick={handleButtonClick}>
        DIVE IN
      </div>
    </div>
  );
}
