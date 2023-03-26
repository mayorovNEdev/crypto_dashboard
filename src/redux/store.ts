import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import boardTab from './BoardTab/slice';

export const store = configureStore({
  reducer: {
    boardTab,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
