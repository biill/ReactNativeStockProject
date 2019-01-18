import axios from 'axios';

const GOT_STOCK_SECTOR_FROM_API = 'GOT_STOCK_SECTOR_FROM_API';
const IS_FETCHING = 'IS_FETCHING';
const GOT_DATA = 'GOT_DATA';
// const ADD_CAMPUS = 'ADD_CAMPUS';
// const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
// const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

export const gotStockBySectorFromAPI = sectors => ({
  type: GOT_STOCK_SECTOR_FROM_API,
  sectors
});

// export const addCampus = campus => ({
//   type: ADD_CAMPUS,
//   campus
// });

// export const removeCampus = id => ({
//   type: REMOVE_CAMPUS,
//   id
// });

// export const refreshCampus = campus => ({
//   type: UPDATE_CAMPUS,
//   campus
// });

export const isFetching = () => ({
  type: IS_FETCHING
});

export const gotData = () => ({
  type: GOT_DATA
});

export const fetchStockBySector = () => {
  console.log('reach here');
  return async dispatch => {
    // dispatch(isFetching());
    const { data } = await axios.get(
      'https://api.iextrading.com/1.0/stock/market/sector-performance'
    );
    console.log(data, 'nothing');
    const action = gotStockBySectorFromAPI(data);
    dispatch(action);
    dispatch(gotData());
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
  isFetching: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STOCK_SECTOR_FROM_API:
      return { ...state, sectors: action.sectors };
    case GOT_DATA:
      return { ...state, isFetching: false };
    case IS_FETCHING:
      return { ...state, isFetching: true };
    // case ADD_CAMPUS:
    //   console.log(action.campus);
    //   if (state.filter(campus => campus.name == action.campus.name).length === 1) return [...state];
    //   else return [...state, action.campus];
    // case REMOVE_CAMPUS:
    //   const newState = state.filter(campus => campus.id != action.id);
    //   return newState;
    // case UPDATE_CAMPUS:
    //   const oldState = state.filter(campus => campus.id != action.campus.id);
    //   return [...oldState, action.campus];
    default:
      return state;
  }
};

export default reducer;
