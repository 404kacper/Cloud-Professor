import React from 'react';
import styles from './FilesList.module.scss';
import FilesListItem from './item/FilesListItem';

export default function FilesList() {
  // array simulating data from context
  const items = new Array(5).fill(null);

  return (
    <div className={styles.listContainer}>
      {items.map((_, index) => (
        <FilesListItem key={index}></FilesListItem>
      ))}
    </div>
  );
}
