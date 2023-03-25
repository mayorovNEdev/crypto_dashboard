import React from 'react';

import { BoardMenuButton } from './BoardMenuButton';

import styles from './BoardMenu.module.scss';

export const BoardMenu: React.FC = () => {
  return (
    <div className={styles.root}>
      <BoardMenuButton/>
    </div>
  );
};