import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ICurrency, ICurrencyParams } from './types';
import { environment } from '../../environments/environment';
import { CoinNames } from 'src/data/CoinNames.data';

export const fetchCurrencyData = createAsyncThunk<ICurrency[], ICurrencyParams>(
  'currencyData/fetchCurrencyDataStatus',
  async (params) => {
    const setOfNames: Map<string, string> = new Map<string, string>();
    CoinNames.forEach((element) => {
      setOfNames.set(element.key, element.value);
    });
    const { data } = await axios.get<ICurrency[]>(`${environment.binanceUrlV3}/ticker/24hr`);

    return data
      .filter((element: any) => element.symbol.includes('USDT') && Number(element.bidPrice) !== 0)
      .map((element: any, index: number) => {
        const shortName = element.symbol.replace('USDT', '');
        const longName = setOfNames.get(shortName);
        return {
          ...element,
          id: index,
          name: shortName,
          longName: `${longName ? longName : `${shortName} Coin`}`,
          oneDayPer: element.priceChangePercent,
        };
      });
  }
);
