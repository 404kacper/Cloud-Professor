'use client';
import React, { useContext, useState, ChangeEvent } from 'react';
import styles from './ShareFileContent.module.scss';

import Image from 'next/image';

export default function ShareContent({ onSubmit }: { onSubmit: () => void }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    onSubmit();
  };
  return (
    <div className={styles.shareFileModalContainer}>
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
            <div className={styles.inputContainer}>
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
                className={styles.emailInput}
                placeholder='Master Password...'
                onChange={handleEmailChange}
              />
            </div>
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
          </div>
          <div className={styles.submitButton} onClick={handleSubmit}>
            SEND
          </div>
        </div>
      </div>
    </div>
  );
}
