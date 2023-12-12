import React from 'react';
import styles from './KeyCard.module.scss';

import Image from 'next/image';

import KeyField from './keyField/KeyField';

export enum KeyType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export default function KeyCard({ type }: { type: KeyType }) {
  const titleString: string =
    type == KeyType.PUBLIC ? 'Public Key' : 'Private Key';

  const sceneSrc: string =
    type == KeyType.PUBLIC
      ? '/keys/centre-public.png'
      : '/keys/centre-private.png';

  const iconSrc =
    type == KeyType.PUBLIC
      ? '/keys/centre-public-icon.svg'
      : '/keys/centre-private-icon.svg';

  const fieldType: KeyType =
    type == KeyType.PUBLIC ? KeyType.PUBLIC : KeyType.PRIVATE;

  const publicKeyInfo = (
    <>
      <br />
      <p>
        This key allows other users to securely encrypt and send files to you.
        <br />
        <br />
      </p>
      <p>It is publicly available to everyone in the network.</p>
    </>
  );
  const privateKeyInfo = (
    <>
      <br />
      <p>
        This is the key that allows you to decrypt what others share with you.
        <br />
        Passphrase for this key is your master password set-up after
        registration.
      </p>
      <p>Don't ever share it with anyone.</p>
    </>
  );

  return (
    <div className={styles.keyCardContainer}>
      <div className={styles.cardTitleContainer}>
        <div className={styles.imageContainer}>
          <Image src={iconSrc} alt='' fill />
        </div>
        <div className={styles.cardTitle}>{titleString}</div>
      </div>

      <div className={styles.cardSubtitle}>
        Automatically generated for your account
      </div>

      <div className={styles.infoContainer}>
        {type == KeyType.PRIVATE ? privateKeyInfo : publicKeyInfo}
      </div>

      <KeyField type={fieldType}></KeyField>

      <div
        className={`${styles.sceneContainer} ${
          type == KeyType.PUBLIC
            ? styles.sceneContainerPublic
            : styles.sceneContainerPrivate
        }`}
      >
        <Image src={sceneSrc} alt='' fill />
      </div>
    </div>
  );
}
