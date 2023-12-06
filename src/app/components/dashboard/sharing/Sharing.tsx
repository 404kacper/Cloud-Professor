import React from 'react';
import styles from './Sharing.module.scss';
import SearchBar from './searchBar/SearchBar';

export default function Sharing() {
  return (
    <div className={styles.sharingSpacing}>
      <div className={styles.sharingContainer}>
        <div className={styles.searchSection}>
          <div className={styles.title}>
            Sharing Centre <br />{' '}
            <span className={styles.subtitle}>Send files to your friends</span>
          </div>
          <div className={styles.searchBar}>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}
