'use client';
import React, { useState, useContext } from 'react';
import SplineContext from '@/splineContext/SplineContext';
import AuthContext from '@/context/AuthContext';

import styles from './LoginForm.module.scss';
import gradientStyles from '../../components/scss/GradientBorderBox.module.scss';
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const {
    handleHeroButtonClicked,
    handleShowModal,
    handleIsLoginScreen,
    handleIsRegisterScreen,
  } = useContext(SplineContext);

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);

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
      handleShowModal();
    }, 1100);
  };

  const handleOnClickSubmit = () => {
    if (email == '' || password == '') {
      toast.error(`Please don't leave any fields blank`);
    } else {
      login({ email, password });
    }
  };

  const handleOnClickRedirect = () => {
    setShouldExit(true);
    // wait for animation before showing register form
    setTimeout(() => {
      handleIsLoginScreen();
      handleIsRegisterScreen();
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
        <div className={styles.title}>Welcome Professor!</div>
        <div className={styles.subtitle}>
          Enter your email and password to sign in
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
        className={`${styles.switchContainer} ${
          shouldExit && styles.switchContainerAnimateExit
        } `}
      >
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
      <button
        className={`${styles.submitButton} ${
          shouldExit && styles.submitButtonAnimateExit
        }`}
        onClick={handleOnClickSubmit}
      >
        SIGN IN
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
          Sign up
        </button>
      </div>
    </div>
  );
}
