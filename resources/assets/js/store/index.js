import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'MCT/store/reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension';

/**
 * Redux Store Configuration
 */
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    )
}