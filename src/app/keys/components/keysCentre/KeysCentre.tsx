import React from 'react';
import styles from './KeysCentre.module.scss';

import KeyCard, { KeyType } from './card/KeyCard';

export default function KeysCentre() {
  return (
    <div className={styles.keysSpacingContainer}>
      <div className={styles.keyCardsContainer}>
        <div className={styles.title}>
          Keys Centre <br />{' '}
          <span className={styles.subtitle}>Your asymmetric keys</span>
        </div>
        <div className={styles.cardsSpacingContainer}>
          <KeyCard type={KeyType.PUBLIC}></KeyCard>
          <KeyCard type={KeyType.PRIVATE}></KeyCard>
        </div>
      </div>
    </div>
  );
}
