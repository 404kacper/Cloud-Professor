import React from 'react';
import styles from './Home.module.scss';

export default function HomePage() {
  return (
      <div className={styles.homePage}>
        <h1>Welcome to My Next.js App!</h1>
        <p>This is the home page.</p>
      </div>
  );
}
