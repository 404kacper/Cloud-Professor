'use client';
import styles from './modalContainer.module.scss';

import { useState } from 'react';

import SetupModalContent from './setup/setupModalContent';

export enum ModalTypes {
  SETUP = 'setup',
  PASSWORD_PROMPT = 'password_prompt',
}

export default function ModalContainer({ type }: { type: ModalTypes }) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <div
      className={`${styles.modalContainer}  ${
        modalVisible ? styles.modalContainerVisible : ''
      }`}
      // close modal when clicking outside of modal content
      // doesn't apply for setup modal
      onClick={(e) => {
        e.target === e.currentTarget &&
          type !== ModalTypes.SETUP &&
          setModalVisible(false);
      }}
    >
      {type === ModalTypes.SETUP ? (
        <SetupModalContent onSubmit={() => setModalVisible(false)}/>
      ) : type === ModalTypes.PASSWORD_PROMPT ? (
        <div>Password Prompt</div>
      ) : null}
    </div>
  );
}
