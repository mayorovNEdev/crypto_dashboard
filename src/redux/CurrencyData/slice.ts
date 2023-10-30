import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrencyData } from './asyncActions';
import { CurrencyDataSliceState, ICurrency, Status } from './types';

const initialState: CurrencyDataSliceState = {
  dataCurrency: [],
  status: Status.LOADING, // loading | success | error
};

const currencyDataSlice = createSlice({
  name: 'currencyData',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<ICurrency[]>) {
      state.dataCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencyData.pending, (state) => {
      state.status = Status.LOADING;
      state.dataCurrency = [];
    });

    builder.addCase(fetchCurrencyData.fulfilled, (state, action) => {
      state.dataCurrency = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchCurrencyData.rejected, (state) => {
      state.status = Status.ERROR;
      state.dataCurrency = [];
    });
  },
});

export const { setData } = currencyDataSlice.actions;

export default currencyDataSlice.reducer;
