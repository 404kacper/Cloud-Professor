'use client';
import React, { useContext, useState, ChangeEvent } from 'react';
import styles from './SetupContent.module.scss';

import KeysContext from '@/keysContext/KeysContext';

import Image from 'next/image';

export default function SetupContent({ onSubmit }: { onSubmit: () => void }) {
  const { setupKeys } = useContext(KeysContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatching, setIsMatching] = useState(true);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async () => {
    // check if passwords match
    if (
      password === confirmPassword &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      // api method that returns boolean
      const isSetupDone = await setupKeys(password);
      // if response is successfull close modal
      if (isSetupDone) {
        // run the passed function - sets css styles to display none
        onSubmit();
      }
    } else {
      // else highlight password fields
      // and show error message
      setIsMatching(false);
      // clear the message after 3s
      setTimeout(() => setIsMatching(true), 3000);
    }
  };
  return (
    <div className={styles.setupModalContainer}>
      <div className={styles.imageArea}>
        <Image src='/modals/modal-bg-setup.png' alt='' fill></Image>
        <div className={styles.subjectContainer}>
          <Image src='/modals/modal-avatar-setup.png' alt='' fill></Image>
        </div>
      </div>
      <div className={styles.textArea}>
        <div className={styles.buttonSizingContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              Your Master Password Is Not Set Up
            </div>
            <div className={styles.subtitle}>
              In order to encrypt files you need a master password
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <div
              className={
                isMatching
                  ? styles.inputContainer
                  : `${styles.inputContainer} ${styles.inputContainerError}`
              }
            >
              <div className={styles.inputIconBg}>
                <div className={styles.inputIcon}>
                  <Image
                    src='/modals/modal-inputIcon-password.svg'
                    alt=''
                    fill
                  ></Image>
                </div>
              </div>
              <input
                type='password'
                className={styles.passwordInput}
                placeholder='Master Password...'
                onChange={handlePasswordChange}
              />
            </div>
            <div
              className={
                isMatching
                  ? styles.inputContainer
                  : `${styles.inputContainer} ${styles.inputContainerError}`
              }
            >
              <div className={styles.inputIconBg}>
                <div className={styles.inputIcon}>
                  <Image
                    src='/modals/modal-inputIcon-password.svg'
                    alt=''
                    fill
                  ></Image>
                </div>
              </div>
              <input
                type='password'
                className={styles.passwordInput}
                placeholder='Repeat Master Password...'
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {isMatching && (
              <div className={styles.alertContainer}>
                <div className={styles.alertIconContainer}>
                  <Image
                    src='/modals/modal-alertIcon-password.svg'
                    alt=''
                    fill
                  ></Image>
                </div>
                Make sure to remember it!
              </div>
            )}
            {!isMatching && (
              <div
                className={`${styles.alertContainer} ${styles.alertContainerError}`}
              >
                <div className={styles.alertIconContainer}>
                  <Image
                    src='/modals/modal-alertIconError-password.svg'
                    alt=''
                    fill
                  ></Image>
                </div>
                Passwords must match & can't be empty.
              </div>
            )}
          </div>
          <div className={styles.submitButton} onClick={handleSubmit}>
            SEND
          </div>
        </div>
      </div>
    </div>
  );
}
