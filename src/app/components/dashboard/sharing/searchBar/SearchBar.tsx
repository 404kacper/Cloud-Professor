import React from 'react';
import styles from './SearchBar.module.scss';
import Image from 'next/image';

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src='/dash/sharing-search.svg' alt='' fill />
      </div>
      <input
        className={styles.textContainer}
        type='text'
        placeholder='Search with username or email address...'
        id='search'
        name='search'
      />
    </div>
  );
}
