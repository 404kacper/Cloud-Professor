import React, { useContext } from 'react';
import styles from './LogsList.module.scss';
import LogsListItem from './item/LogsListItem';
import { ListItemVariants } from './item/LogsListItem';

import DataContext from '@/dataContext/DataContext';

export default function LogsList({
  firstLabel,
  secondLabel,
  thirdLabel,
  fourthLabel,
}: {
  firstLabel: string;
  secondLabel: string;
  thirdLabel: string;
  fourthLabel: string;
}) {
  const { logs } = useContext(DataContext);

  const renderItem = (log: any, index: number) => {
    return index % 2 == 0 ? (
      <LogsListItem
        key={index}
        logUser={log.author.username}
        logDate={log.createdAt}
        logFilename={log.associatedFile}
        logKey={log.author.publicKey}
        variant={ListItemVariants.DARK}
      />
    ) : (
      <LogsListItem
        key={index}
        logUser={log.author.username}
        logDate={log.createdAt}
        logFilename={log.associatedFile}
        logKey={log.author.publicKey}
        variant={ListItemVariants.TRANSPARENT}
      />
    );
  };

  return (
    <div className={styles.listSpacingContainer}>
      <div className={styles.listHeaderContainer}>
        <div className={styles.headerFirstLabel}>{firstLabel}</div>
        <div className={styles.headerSecondLabel}>{secondLabel}</div>
        <div className={styles.headerThirdLabel}>{thirdLabel}</div>
        <div className={styles.headerFourthLabel}>{fourthLabel}</div>
      </div>
      <div className={styles.listContainer}>
        {logs && logs.map((log: any, index: number) => renderItem(log, index))}
      </div>
    </div>
  );
}
