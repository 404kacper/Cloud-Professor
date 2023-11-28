'use client';
import React, { useState, useContext } from 'react';
import SplineContext from '@/splineContext/SplineContext';

import styles from './LoginForm.module.scss';
import gradientStyles from '../../components/scss/GradientBorderBox.module.scss';
import Image from 'next/image';

export default function LoginForm() {
  const { handleHeroButtonClicked, handleIsLoginScreen } =
    useContext(SplineContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleOnClickReverseAnimation = () => {
    handleHeroButtonClicked();

    // wait for animation before showing exit animation
    setTimeout(() => {
      handleIsLoginScreen();
    }, 1100);
  };

  const handleOnClickSubmit = () => {};

  const handleOnClickRedirect = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.reverseContainer}>
        <div
          className={styles.reverseSvg}
          onClick={handleOnClickReverseAnimation}
        >
          <Image src='auth/arrow-left.svg' alt='' fill></Image>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Glad You're Here!</div>
        <div className={styles.subtitle}>
          Enter your email and password to sign in
        </div>
      </div>
      <div className={styles.emailContainer}>
        <label htmlFor='email' className={styles.label}>
          Email
        </label>
        <div className={gradientStyles.gradientBox}>
          <input
            type='email'
            id='emailInput'
            value={email}
            onChange={handleEmailChange}
            placeholder='Email address'
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.passwordContainer}>
        <label htmlFor='password' className={styles.label}>
          Password
        </label>
        <div className={gradientStyles.gradientBox}>
          <input
            type='password'
            id='passwordInput'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.switchContainer}>
        <input
          type='checkbox'
          id='switch'
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className={styles.toggleBg} onClick={handleToggle}></span>
        <label htmlFor='switch' className={styles.toggleLabel}>
          Remember me
        </label>
      </div>
      <button className={styles.submitButton} onClick={handleOnClickSubmit}>
        SIGN IN
      </button>
      <div className={styles.redirectContainer}>
        <span className={styles.redirectLabel}>Don't have an account yet?</span>
        <button
          className={styles.redirectButton}
          onClick={handleOnClickRedirect}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
