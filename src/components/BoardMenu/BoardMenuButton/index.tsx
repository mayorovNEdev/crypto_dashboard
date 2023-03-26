import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';

import { BoardMenuButtonsType } from '../../../data/BoardMenu.data';
import { selectBoardTab } from '../../../redux/BoardTab/selectors';
import { setActivatedTab } from '../../../redux/BoardTab/slice';
import { useAppDispatch } from '../../../redux/store';
import { Icon } from '../../Icon';

import styles from './BoardMenuButton.module.scss';

type BoardMenuButtonProps = {
  value: BoardMenuButtonsType;
  index: number;
};

export const BoardMenuButton: React.FC<BoardMenuButtonProps> = ({ value, index }) => {
  const dispatch = useAppDispatch();

  const { indexOfTab, isFullSize } = useSelector(selectBoardTab);
  const onChangePage = (index: number) => {
    dispatch(setActivatedTab(index));
  };
  const buttonClass = classNames(styles.root, {
    'activated-menu-item': indexOfTab === index,
  });

  return (
    <div className={buttonClass} onClick={() => onChangePage(index)}>
      <div className={styles.labelBody}>
        <Icon name={`menu/${value}`} />
        {isFullSize && <span>{value}</span>}
      </div>
      {indexOfTab === index && <div className={styles.activatedRectangle}></div>}
    </div>
  );
};
