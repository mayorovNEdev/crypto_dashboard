import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import boardTab from './BoardTab/slice';
import currencyData from './CurrencyData/slice';

export const store = configureStore({
  reducer: {
    boardTab,
    currencyData,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
