/**
 * Redux Store Configuration
 */

import { createStore } from 'redux';
import rootReducer from '../store/reducers/index';

const store = createStore(
    rootReducer, /** All Reducers Combined */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;