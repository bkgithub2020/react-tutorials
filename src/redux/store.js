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

// REDUX TOOLKIT
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import studentReducer from "./slices/studentSlice";
import hotelSettingReducer from "./slices/hotelSettingsSlice";
import hotelDateReducer from "./slices/hotelDateSlice";
import googleAuthReducer from "./slices/googleAuthSlice";
import calendarReducer from "./slices/calendarSlice";
import userReducer from "./slices/userSlice";
import alertReducer from "./slices/alertSlice";

const rootReducer = combineReducers({
    student: studentReducer,
    hotelSettingReducer,
    hotelDateReducer,
    googleAuthReducer,
    calendarReducer,
    userReducer,
    alertReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;