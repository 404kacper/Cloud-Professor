import React, { useContext } from 'react';
import styles from './Indicators.module.scss';

import AuthContext from '@/context/AuthContext';

import Indicator, { IndicatorType } from './indicator/Indicator';

export default function Indicators() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.indicatorsContainer}>
      <Indicator
        count={user && (user.totalFiles ? user.totalFiles : '0')}
        type={IndicatorType.TOTAL}
      />
      <Indicator count={user && (user.downloadedFiles ? user.downloadedFiles : '0')} type={IndicatorType.DOWNLOAD} />
      <Indicator count={user && (user.uploadedFiles ? user.uploadedFiles : '0')} type={IndicatorType.UPLOAD} />
    </div>
  );
}
