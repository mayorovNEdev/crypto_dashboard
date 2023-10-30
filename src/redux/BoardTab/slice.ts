import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardMenuButtons } from '../../data/BoardMenu.data';
import { BoardTabSliceState } from './types';

const initialState: BoardTabSliceState = {
  indexOfTab: 0,
  nameOfTab: BoardMenuButtons[0],
  isFullSize: false,
};

const BoardTabSlice = createSlice({
  name: 'boardTab',
  initialState,
  reducers: {
    setActivatedTab(state, action: PayloadAction<number>) {
      state.indexOfTab = action.payload;
      state.nameOfTab = BoardMenuButtons[action.payload];
    },
    changeModeOfMenu(state) {
      state.isFullSize = !state.isFullSize;
    },
  },
});

export const { setActivatedTab, changeModeOfMenu } = BoardTabSlice.actions;

export default BoardTabSlice.reducer;
