'use client';
import styles from './modalContainer.module.scss';

import { useState, useContext } from 'react';

import SetupContent from './setup/SetupContent';
import PasswordPromptContent from './passwordPrompt/PasswordPromptContent';
import ShareContent from './shareFile/ShareFileContent';

import AuthContext from '@/context/AuthContext';

export enum ModalTypes {
  SETUP = 'setup',
  PASSWORD_PROMPT = 'password_prompt',
  SHARE_FILE = 'share_file',
  NONE = 'none',
}

export default function ModalContainer({ type }: { type: ModalTypes }) {
  const [modalVisible, setModalVisible] = useState(true);
  const { setDisplayModal } = useContext(AuthContext);

  return (
    <div
      className={`${styles.modalContainer}  ${
        modalVisible ? styles.modalContainerVisible : ''
      }`}
      // close modal when clicking outside of modal content
      // doesn't apply for setup modal
      // also set the auth state to none
      onClick={(e) => {
        e.target === e.currentTarget &&
          type !== ModalTypes.SETUP &&
          (setModalVisible(false), setDisplayModal(ModalTypes.NONE));
      }}
    >
      {type === ModalTypes.SETUP ? (
        <SetupContent onSubmit={() => setModalVisible(false)} />
      ) : type === ModalTypes.PASSWORD_PROMPT ? (
        <PasswordPromptContent onSubmit={() => setModalVisible(false)} />
      ) : type === ModalTypes.SHARE_FILE ? (
        <ShareContent onSubmit={() => setModalVisible(false)} />
      ) : null}
    </div>
  );
}
