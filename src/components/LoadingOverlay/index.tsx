import React from 'react';

import styles from './LoadingOverlay.module.scss';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className={styles.root}>
      <img src={require('../../assets/loading/LoadingDog.gif')} alt="Loading dog..." className={styles.icon}></img>
    </div>
  );
};
