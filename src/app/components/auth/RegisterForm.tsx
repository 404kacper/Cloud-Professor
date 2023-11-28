'use client';
import React, { useState, useContext } from 'react';
import SplineContext from '@/splineContext/SplineContext';

import styles from './RegisterForm.module.scss';
import gradientStyles from '../../components/scss/GradientBorderBox.module.scss';
import Image from 'next/image';

export default function RegisterForm() {
  const {
    handleHeroButtonClicked,
    handleShowModal,
    handleIsLoginScreen,
    handleIsRegisterScreen,
  } = useContext(SplineContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [shouldExit, setShouldExit] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const handleOnClickReverseAnimation = () => {
    handleHeroButtonClicked();

    // wait for animation before showing exit animation
    setTimeout(() => {
      handleShowModal();
    }, 1100);
  };

  const handleOnClickSubmit = () => {};

  const handleOnClickRedirect = () => {
    setShouldExit(true);
    // wait for animation before showing login form
    setTimeout(() => {
      handleIsRegisterScreen();
      handleIsLoginScreen();
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.reverseContainer}>
        <div
          className={styles.reverseSvg}
          onClick={handleOnClickReverseAnimation}
        >
          <Image src='auth/arrow-right.svg' alt='' fill></Image>
        </div>
      </div>
      <div
        className={`${styles.titleContainer} ${
          shouldExit && styles.titleContainerAnimateExit
        }`}
      >
        <div className={styles.title}>Glad You're Here!</div>
        <div className={styles.subtitle}>
          Create your account by typing in your email and password
        </div>
      </div>
      <div
        className={`${styles.emailContainer} ${
          shouldExit && styles.emailContainerAnimateExit
        }`}
      >
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
            required
          />
        </div>
      </div>
      <div
        className={`${styles.passwordContainer} ${
          shouldExit && styles.passwordContainerAnimateExit
        }`}
      >
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
            required
          />
        </div>
      </div>
      <div
        className={`${styles.repeatPasswordContainer} ${
          shouldExit && styles.repeatPasswordContainerAnimateExit
        }`}
      >
        <label htmlFor='password' className={styles.label}>
          Repeat Password
        </label>
        <div className={gradientStyles.gradientBox}>
          <input
            type='password'
            id='repeatPasswordInput'
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            placeholder='Repeat Password'
            className={styles.input}
            // pattern={password}
            required
          />
        </div>
      </div>
      <button
        className={`${styles.submitButton} ${
          shouldExit && styles.submitButtonAnimateExit
        }`}
        onClick={handleOnClickSubmit}
      >
        SIGN UP
      </button>
      <div
        className={`${styles.redirectContainer} ${
          shouldExit && styles.redirectContainerAnimateExit
        }`}
      >
        <span className={styles.redirectLabel}>Don't have an account yet?</span>
        <button
          className={styles.redirectButton}
          onClick={handleOnClickRedirect}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
