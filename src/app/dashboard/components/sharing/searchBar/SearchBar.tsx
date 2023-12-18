import React, { useContext, useRef } from 'react';
import styles from './SearchBar.module.scss';
import Image from 'next/image';

import DataContext from '@/dataContext/DataContext';

export default function SearchBar() {
  const { findUsers } = useContext(DataContext);
  const searchInputRef = useRef(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchInputRef.current) {
      findUsers((searchInputRef.current as HTMLInputElement)?.value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src='/dash/sharing-search.svg' alt='' fill />
      </div>
      <input
        ref={searchInputRef}
        className={styles.textContainer}
        type='text'
        placeholder='Search with username or email address...'
        id='search'
        name='search'
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
