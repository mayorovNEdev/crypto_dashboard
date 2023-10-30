import React from 'react';

import { Icon } from '../Icon';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.routing}>
        <span>Dashboard / Home</span>
      </div>
      <div className={styles.profile}>
        <Icon name={'ProfileTest'} />
      </div>
    </div>
  );
};
