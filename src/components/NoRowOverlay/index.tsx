import React from 'react';

import styles from './NoRowOverlay.module.scss';

export const NoRowOverlay: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>No data</span>
    </div>
  );
};
