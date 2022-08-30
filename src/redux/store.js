import { createStore, combineReducers } from 'redux';
import { studentReducer } from './reducers/StudentReducer';

const reducers = combineReducers({
    student: studentReducer
})


const store = createStore(
    reducers, /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;