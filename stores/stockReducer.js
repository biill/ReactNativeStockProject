import axios from 'axios';
import { convertCryptoData, convertStockData } from './utils';

const GOT_STOCK_SECTOR_FROM_API = 'GOT_STOCK_SECTOR_FROM_API';
const IS_FETCHING = 'IS_FETCHING';
const GOT_DATA = 'GOT_DATA';
const SELECTED_STOCK = 'SELECTED_STOCK';
const GOT_HOMEPAGE_DATA = 'GOT_HOMEPAGE_DATA';
// const ADD_CAMPUS = 'ADD_CAMPUS';
// const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
// const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

export const gotStockBySectorFromAPI = sectors => ({
  type: GOT_STOCK_SECTOR_FROM_API,
  sectors
});

export const gotHomePage = (stocks, crypto) => ({
  type: GOT_HOMEPAGE_DATA,
  stocks,
  crypto
});

export const isFetching = () => ({
  type: IS_FETCHING
});

export const gotData = () => ({
  type: GOT_DATA
});

export const gotSelectedStock = (info, data) => ({
  type: SELECTED_STOCK,
  info,
  data
});

export const fetchStock = symbol => {
  return async dispatch => {
    dispatch(isFetching());
    let res, info;
    try {
      if (symbol) {
        res = await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1y`);
        info = await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/stats`);
        const action = gotSelectedStock(info.data, res.data);
        dispatch(action);
      } else {
        res = await axios.get('https://api.iextrading.com/1.0/stock/market/sector-performance');
        const action = gotStockBySectorFromAPI(res.data);
        dispatch(action);
      }
      dispatch(gotData());
    } catch (error) {
      console.warn('NO Symbol Find, Please Enter a Valid Symbol');
    }
  };
};

export const initialLoading = () => {
  return async dispatch => {
    dispatch(isFetching());
    let stocks = {};
    let crypto = {};
    try {
      const dowRes = await axios.get(
        // 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=dji&apikey=XUKO1LP3IY0YZRJ6'
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo'
      );
      const nasdqaRes = await axios.get(
        // 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NDX&apikey=XUKO1LP3IY0YZRJ6'
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo'
      );
      const sp500Res = await axios.get(
        // 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPX&apikey=XUKO1LP3IY0YZRJ6'
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo'
      );
      const btcRes = await axios.get(
        'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=demo'
      );

      stocks['dow'] = convertStockData(dowRes.data);
      stocks['nasdqa'] = convertStockData(nasdqaRes.data);
      stocks['sp500'] = convertStockData(sp500Res.data);
      crypto['btc'] = convertCryptoData(btcRes.data);

      const action = gotHomePage(stocks, crypto);
      dispatch(action);
      dispatch(gotData());
    } catch (error) {
      console.warn('NO Symbol Find, Please Enter a Valid Symbol');
    }
  };
};

// export const postCampus = campus => {
//   return async dispatch => {
//     const { data } = await axios.post('/api/campuses', campus);
//     const action = addCampus(data);
//     dispatch(action);
//   };
// };

// export const deleteCampus = id => {
//   return async dispatch => {
//     await axios.delete(`/api/campuses/${id}`);
//     const action = removeCampus(id);
//     dispatch(action);
//   };
// };

const initialState = {
  sectors: [],
  isFetching: false,
  selectedStock: { info: {}, data: [] },
  stocks: { dow: {}, nasdqa: {}, sp500: {} },
  crypto: { btc: {} }
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STOCK_SECTOR_FROM_API:
      return { ...state, sectors: action.sectors };
    case GOT_DATA:
      return { ...state, isFetching: false };
    case IS_FETCHING:
      return { ...state, isFetching: true };
    case SELECTED_STOCK:
      return { ...state, selectedStock: { info: action.info, data: action.data } };
    case GOT_HOMEPAGE_DATA:
      return { ...state, stocks: action.stocks, crypto: action.crypto };
    // case UPDATE_CAMPUS:
    //   const oldState = state.filter(campus => campus.id != action.campus.id);
    //   return [...oldState, action.campus];
    default:
      return state;
  }
};

export default reducer;
