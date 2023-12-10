import React from 'react';
import styles from './FilesList.module.scss';
import FilesListItem from './item/FilesListItem';
import { ListItemTypes } from './item/FilesListItem';

export enum ListTypes {
  DOWNLOAD = 'download',
  UPLOAD = 'upload',
}

export default function FilesList({
  firstLabel,
  secondLabel,
  thirdLabel,
  fourthLabel,
  typeOfList,
}: {
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
  fourthLabel: string;
  typeOfList: ListTypes;
}) {
  // array simulating data from context
  const items = new Array(5).fill(null);
  // ultimately we have 2 lists so the population will need to be dependant on context values
  // 2 different states for 2 different lists - then another variable passed as prop to this list element

  const renderItem = (index: number) => {
    if (typeOfList === ListTypes.UPLOAD) {
      return index % 2 == 0 ? (
        <FilesListItem
          key={index}
          type={ListTypes.UPLOAD}
          itemType={ListItemTypes.DOCX}
        />
      ) : (
        <FilesListItem
          key={index}
          type={ListTypes.UPLOAD}
          itemType={ListItemTypes.TXT}
        />
      );
    } else if (typeOfList === ListTypes.DOWNLOAD) {
      return index % 3 == 0 ? (
        <FilesListItem
          key={index}
          type={ListTypes.UPLOAD}
          itemType={ListItemTypes.TXT}
        />
      ) : (
        <FilesListItem
          key={index}
          type={ListTypes.UPLOAD}
          itemType={ListItemTypes.DOCX}
        />
      );
    }
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.headerNameLabel}>{firstLabel}</div>
        <div className={styles.headerKeyLabel}>{secondLabel}</div>
        <div className={styles.headerSizeLabel}>{thirdLabel}</div>
        <div className={styles.headerDateLabel}>{fourthLabel}</div>
      </div>
      {items.map((_, index) => renderItem(index))}
    </div>
  );
}
