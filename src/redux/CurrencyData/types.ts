export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export const FiatCurrency = ['USDT', 'EUR', 'RUB'] as const;

export interface ICurrency {
  id: number;
  firstId: number;
  lastId: number;
  symbol: string;
  bidPrice: number;
  oneHourPer?: number;
  fourHourPer?: number;
  oneDayPer?: number;
  name?: string;
  longName?: string;
}

export interface ICurrencyParams {
  fiatCurrency: FiatCurrencyType;
}

export declare type FiatCurrencyType = typeof FiatCurrency[number];

export interface CurrencyDataSliceState {
  dataCurrency: ICurrency[];
  status: Status;
}
