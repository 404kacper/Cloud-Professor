'use client';
import { useState, useContext } from 'react';
import styles from './KeyField.module.scss';
import Image from 'next/image';

import { KeyType } from '../KeyCard';

import KeysContext from '@/keysContext/KeysContext';

export default function KeyField({ type }: { type: KeyType }) {
  const { publicKey, privateKey } = useContext(KeysContext);

  const [revealPassword, setRevealPassword] = useState(false);
  // the private key here will still be the encrypted one
  const keyValue = type == KeyType.PUBLIC ? publicKey : privateKey;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Handle the success - will be throwing toasts later on
      console.log('Key copied to clipboard');
    } catch (err) {
      // Handle the error
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageBgBorder}>
        <div className={styles.imageContainer}>
          <Image src='/keys/centre-keys-icon.svg' alt='' fill />
        </div>
      </div>

      <input
        className={`${styles.textField} ${
          type == KeyType.PRIVATE ? styles.textFieldPrivate : ''
        }`}
        type={type == KeyType.PRIVATE && !revealPassword ? 'password' : 'text'}
        value={keyValue}
        id={`field-${type}`}
        readOnly
      />

      {type == KeyType.PRIVATE ? (
        <div
          className={`${styles.imageContainerAction} ${styles.imageContainerActionReveal}`}
          onClick={() => setRevealPassword(!revealPassword)}
        >
          <Image src='/keys/centre-reveal.svg' alt='' fill />
        </div>
      ) : null}

      <div
        className={styles.imageContainerAction}
        onClick={() => copyToClipboard(keyValue)}
      >
        <Image src='/dash/list-copy.svg' alt='' fill />
      </div>
    </div>
  );
}
