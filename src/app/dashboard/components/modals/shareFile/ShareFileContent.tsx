'use client';
import React, { useContext, useState, ChangeEvent } from 'react';
import styles from './ShareFileContent.module.scss';
import Dropbox from '../../navbar/dropbox/Dropbox';

import Image from 'next/image';

import AuthContext from '@/context/AuthContext';
import { ModalTypes } from '@/modalEnums';

export default function ShareContent({ onSubmit }: { onSubmit: () => void }) {
  const { setDisplayModal, clickedFriend } = useContext(AuthContext);
  const [email, setEmail] = useState(clickedFriend.email);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    onSubmit();
    setDisplayModal(ModalTypes.NONE);
  };
  return (
    <div className={styles.shareFileModalContainer}>
      <div className={styles.imageArea}>
        <Image src='/modals/modal-bg-setup.png' alt='' fill></Image>
        <div className={styles.subjectContainer}>
          <Image src='/modals/modal-avatar-file.png' alt='' fill></Image>
        </div>
      </div>
      <div className={styles.textArea}>
        <div className={styles.buttonSizingContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>Send Your Friend a File</div>
            <div className={styles.subtitle}>
              Simply type his email - we will encrypt the file and send it to
              him!
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.inputIconBg}>
                <div className={styles.inputIcon}>
                  <Image src='/modals/modal-email-icon.svg' alt='' fill></Image>
                </div>
              </div>
              <input
                type='text'
                className={styles.emailInput}
                placeholder='Your friend’s email...'
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <Dropbox forModal={true} />
          </div>
          <div className={styles.submitButton} onClick={handleSubmit}>
            SEND
          </div>
        </div>
      </div>
    </div>
  );
}
