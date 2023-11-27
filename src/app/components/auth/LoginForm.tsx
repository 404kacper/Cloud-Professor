'use client';
import React, { useState } from 'react';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
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

  const handleOnClickSubmit = () => {};

  const handleOnClickRedirect = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Glad You're Here</div>
        <div className={styles.subtitle}>
          Enter your email and password to sign in
        </div>
      </div>
      <div className={styles.emailContainer}>
        <label htmlFor='email' className={styles.label}>
          Email
        </label>
        <input
          type='email'
          id='emailInput'
          value={email}
          onChange={handleEmailChange}
          placeholder='Your email goes here...'
          className={styles.input}
        />
      </div>
      <div className={styles.passwordContainer}>
        <label htmlFor='password' className={styles.label}>
          Password
        </label>
        <input
          type='password'
          id='passwordInput'
          value={password}
          onChange={handlePasswordChange}
          placeholder='Your password goes here...'
          className={styles.input}
        />
      </div>
      <div className={styles.switchContainer}>
        <input
          type='checkbox'
          id='switch'
          checked={isChecked}
          onChange={handleToggle}
        />
        <label htmlFor='switch' className={styles.toggleLabel}>
          Remember me
        </label>
      </div>
      <button className={styles.submitButton} onClick={handleOnClickSubmit}>
        SIGN IN
      </button>
      <div className={styles.redirectContainer}>
        <p className={styles.redirectLabel}>Don't have an account yet?</p>
        <button className={styles.redirectButton}>Sign up</button>
      </div>
    </div>
  );
}
