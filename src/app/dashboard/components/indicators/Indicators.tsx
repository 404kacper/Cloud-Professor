import React from 'react';
import styles from './Indicators.module.scss';

import Indicator, { IndicatorType } from './indicator/Indicator';

export default function Indicators() {
  return (
    <div className={styles.indicatorsContainer}>
      <Indicator count='26' type={IndicatorType.TOTAL} />
      <Indicator count='123' type={IndicatorType.DOWNLOAD}/>
      <Indicator count='3' type={IndicatorType.UPLOAD}/>
    </div>
  );
}
