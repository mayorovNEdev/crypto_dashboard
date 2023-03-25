import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header, BoardMenu } from '../components';

import styles from './MainLayout.module.scss';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.root}>
      <BoardMenu />
      <div className="content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
