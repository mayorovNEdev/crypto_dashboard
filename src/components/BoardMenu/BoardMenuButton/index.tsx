import React from 'react';

import styles from './BoardMenuButton.module.scss';

import Home_logo from '../../../assets/menu/Home.svg';

export const BoardMenuButton: React.FC = () => {
  return (
    <div className={styles.root}>
      <img className={styles.icon} width="20" src={Home_logo} alt="" />
      <span>Home</span>
    </div>
  );
};