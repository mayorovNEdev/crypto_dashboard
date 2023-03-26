import { BoardMenuButtonsType } from '../../data/BoardMenu.data';

export interface BoardTabSliceState {
  indexOfTab: number;
  nameOfTab: BoardMenuButtonsType;
  isFullSize: boolean;
}
