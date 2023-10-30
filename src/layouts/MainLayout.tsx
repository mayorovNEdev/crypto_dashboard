import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Header, BoardMenu } from '../components';
import { WRAPPER_FOR_CONTENT_HIDED } from '../data/HomeTable.data';
import { selectBoardTab } from '../redux/BoardTab/selectors';

import styles from './MainLayout.module.scss';

const MainLayout: React.FC = () => {
  const { isFullSize } = useSelector(selectBoardTab);
  const [contentStyle, setContentStyle] = useState<React.CSSProperties>({
    maxWidth: '100%',
  });

  useEffect(() => {
    setContentStyle({
      maxWidth: `calc(100% - ${WRAPPER_FOR_CONTENT_HIDED}px)`,
    });
  }, [isFullSize]);

  return (
    <div className={styles.root}>
      <BoardMenu />
      <div className={styles.content} style={contentStyle}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
