import React, { useContext } from 'react';
import styles from './Sharing.module.scss';
import SearchBar from './searchBar/SearchBar';
import FriendBox from './friendBox/FriendBox';

import DataContext from '@/dataContext/DataContext';

export default function Sharing() {
  const { users } = useContext(DataContext);
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
        <div className={styles.friendsSection}>
          {users
            ? users.map((user: any) => (
                <FriendBox
                  key={user.id}
                  username={user.username}
                  email={user.email}
                  publicKey={user.publicKey}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
