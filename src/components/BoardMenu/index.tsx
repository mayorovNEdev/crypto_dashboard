import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { BoardMenuButton } from './BoardMenuButton';
import { BoardMenuButtons, BoardMenuButtonsType } from '../../data/BoardMenu.data';
import { changeModeOfMenu } from '../../redux/BoardTab/slice';
import { selectBoardTab } from '../../redux/BoardTab/selectors';
import { useAppDispatch } from '../../redux/store';
import { Icon } from '../Icon';

import styles from './BoardMenu.module.scss';

export const BoardMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isFullSize } = useSelector(selectBoardTab);
  const boardMenuButtons = BoardMenuButtons;
  const onChangePanelMode = () => {
    dispatch(changeModeOfMenu());
  };

  const panelClass = classNames(styles.root, {
    'small-size-board-panel': !isFullSize,
  });

  const changeModeButtonClass = classNames({
    'rotate-180': !isFullSize,
  });

  return (
    <div className={panelClass}>
      <div className={styles.body}>
        <div className={styles.header}>
          <Icon name={'logo'} />
          {isFullSize && (
            <div>
              <span>Crypto</span>
              <span className={styles.boldLogo}>Board</span>
            </div>
          )}
        </div>
        {boardMenuButtons.map((button: BoardMenuButtonsType, index: number) => (
          <BoardMenuButton key={index} value={button} index={index} />
        ))}
      </div>
      <div className={styles.footer}>
        <div onClick={() => onChangePanelMode()}>
          <Icon className={changeModeButtonClass} name={'CloseArrow'} />
        </div>
      </div>
    </div>
  );
};
