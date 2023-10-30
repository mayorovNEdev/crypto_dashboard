import React, { useCallback, useEffect, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { Icon } from '../../components/Icon';

import styles from './Home.module.scss';
import classNames from 'classnames';
import { FiatCurrency, ICurrency, Status } from 'src/redux/CurrencyData/types';
import { fetchCurrencyData } from 'src/redux/CurrencyData/asyncActions';
import { useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { selectCurrencyData } from 'src/redux/CurrencyData/selectors';
import { LoadingOverlay } from 'src/components/LoadingOverlay';
import { NoRowOverlay } from 'src/components/NoRowOverlay';

interface ITickerMessage {
  stream: string;
  data: any;
}
const currencySymbol = '$';

const columns: GridColDef[] = [
  {
    field: 'icon',
    headerName: 'Name',
    sortable: false,
    width: 42,
    renderCell: (params) => {
      return (
        <Icon
          className={styles.icon}
          name={params.row.name?.split(' ')[0].toLowerCase()}
          additionalPath={'svg/color/'}
        />
      );
    },
  },
  {
    field: 'name',
    headerName: '',
    sortable: false,
    width: 70,
    cellClassName: (_) => classNames(styles.shortName),
  },
  {
    field: 'longName',
    headerName: '',
    sortable: false,
    minWidth: 180,
    cellClassName: (_) => classNames(styles.longName),
  },
  {
    field: 'bidPrice',
    headerName: 'Price',
    sortable: false,
    flex: 1,
    renderCell: (params) => {
      return (
        <span>
          {currencySymbol} {Number(params.value)?.toFixed(2)}
        </span>
      );
    },
  },
  {
    field: 'oneHourPer',
    headerName: '1h',
    sortable: false,
    flex: 1,
    cellClassName: (params: GridCellParams<any>) => {
      return classNames({
        'positive-color-cell': Number(params.value) > 0,
        'negative-color-cell': Number(params.value) < 0,
      });
    },
    renderCell: (params) => {
      const value = Math.round(Number(params.value) * 100) / 100;
      return params.value ? <span>{`${value > 0 ? '+' : ''}${value}%`}</span> : <span>-</span>;
    },
  },
  {
    field: 'fourHourPer',
    headerName: '4h',
    sortable: false,
    flex: 1,
    cellClassName: (params: GridCellParams<any>) => {
      return classNames({
        'positive-color-cell': Number(params.value) > 0,
        'negative-color-cell': Number(params.value) < 0,
      });
    },
    renderCell: (params) => {
      const value = Math.round(Number(params.value) * 100) / 100;
      return params.value ? <span>{`${value > 0 ? '+' : ''}${value}%`}</span> : <span>-</span>;
    },
  },
  {
    field: 'oneDayPer',
    headerName: '24h',
    sortable: false,
    flex: 1,
    cellClassName: (params: GridCellParams<any>) => {
      return classNames({
        'positive-color-cell': Number(params.value) > 0,
        'negative-color-cell': Number(params.value) < 0,
      });
    },
    renderCell: (params) => {
      const value = Math.round(Number(params.value) * 100) / 100;
      return params.value ? <span>{`${value > 0 ? '+' : ''}${value}%`}</span> : <span>-</span>;
    },
  },
];

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dataCurrency, status } = useSelector(selectCurrencyData);

  const [socketUrl, setSocketUrl] = useState('wss://stream.binance.com/stream');
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [dataTable, setDataTable] = useState<ICurrency[]>([]);

  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = JSON.parse(lastMessage.data);
      if (
        messageData.stream !== '!ticker_1h@arr@3000ms' &&
        messageData.stream !== '!ticker_1d@arr@3000ms' &&
        messageData.stream !== '!ticker_4h@arr@3000ms'
      ) {
        return;
      }
      const newData = dataTable.map((element) => {
        const symbolOfMessage = messageData.data.find((symbol: any) => symbol.s === element.symbol);
        return symbolOfMessage
          ? messageData.stream === '!ticker_1h@arr@3000ms'
            ? {
                ...element,
                oneHourPer: symbolOfMessage.P,
              }
            : messageData.stream === '!ticker_4h@arr@3000ms'
            ? {
                ...element,
                fourHourPer: symbolOfMessage.P,
              }
            : {
                ...element,
                oneDayPer: symbolOfMessage.P,
              }
          : element;
      });
      setDataTable(newData);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(
        JSON.stringify({
          id: 1,
          method: 'SUBSCRIBE',
          params: ['!ticker_1h@arr@3000ms', '!ticker_4h@arr@3000ms', '!ticker_1d@arr@3000ms'],
        })
      );
    }
  }, [readyState]);

  const getCurrencyData = async () => {
    dispatch(
      fetchCurrencyData({
        fiatCurrency: FiatCurrency[0],
      })
    );
  };

  const setCurrencyData = (newData: ICurrency[]) => {
    setDataTable(newData);
  };

  useEffect(() => {
    getCurrencyData();
  }, []);

  useEffect(() => {
    setCurrencyData(dataCurrency);
  }, [dataCurrency]);

  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: 'Connecting',
  //   [ReadyState.OPEN]: 'Open',
  //   [ReadyState.CLOSING]: 'Closing',
  //   [ReadyState.CLOSED]: 'Closed',
  //   [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  // }[readyState];

  return (
    <div className={styles.root}>
      <div className={styles.label}>
        <label>Today's Cryptocurrency Prices</label>
      </div>

      <div className={styles.body}>
        <DataGrid
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          slots={{
            noRowsOverlay: status === Status.LOADING ? LoadingOverlay : NoRowOverlay,
          }}
          className={styles.MuiDataGridRoot}
          rows={JSON.parse(JSON.stringify(dataTable))}
          columns={columns}
          autoPageSize
        />
      </div>
    </div>
  );
};

export default Home;
