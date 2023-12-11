import React from 'react';
import styles from './Indicator.module.scss';
import Image from 'next/image';

export enum IndicatorType {
  TOTAL = 'total',
  DOWNLOAD = 'download',
  UPLOAD = 'upload',
}

export default function Indicator({
  count,
  type,
}: {
  count: string;
  type: IndicatorType;
}) {
  let imageSrc = '/dash/indicator-total.svg'; // default image
  if (type === IndicatorType.DOWNLOAD) {
    imageSrc = '/dash/indicator-down.svg';
  } else if (type === IndicatorType.UPLOAD) {
    imageSrc = '/dash/indicator-up.svg';
  }

  let label = 'Total Files'; // default label title
  if (type === IndicatorType.DOWNLOAD) {
    label = 'Downloaded Files';
  } else if (type === IndicatorType.UPLOAD) {
    label = 'Uploaded Files';
  }

  return (
    <div className={styles.indicatorContainer}>
      <div className={styles.textContainer}>
        {label}
        <br />
        <span className={styles.textBolder}>{count}</span>
      </div>
      <div className={styles.imageContainer}>
        <Image src={imageSrc} alt='' fill />
      </div>
    </div>
  );
}
