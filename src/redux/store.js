// import { createStore, combineReducers } from 'redux';
// import { studentReducer } from './reducers/StudentReducer';

// const reducers = combineReducers({
//     student: studentReducer
// })


// const store = createStore(
//     reducers, /* preloadedState, */
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import studentReducer from "./slices/studentSlice";
import hotelSettingReducer from "./slices/hotelSettingsSlice";
import hotelDateReducer from "./slices/hotelDateSlice";

const rootReducer = combineReducers({
    student: studentReducer,
    hotelSettingReducer,
    hotelDateReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;