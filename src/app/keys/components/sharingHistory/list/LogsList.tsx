import React from 'react';
import styles from './LogsList.module.scss';
import LogsListItem from './item/LogsListItem';
import { ListItemVariants } from './item/LogsListItem';

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
  // array simulating data from context
  const items = new Array(20).fill(null);

  const renderItem = (index: number) => {
    return index % 2 == 0 ? (
      <LogsListItem key={index} variant={ListItemVariants.DARK} />
    ) : (
      <LogsListItem key={index} variant={ListItemVariants.TRANSPARENT} />
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
        {items.map((_, index) => renderItem(index))}
      </div>
    </div>
  );
}
