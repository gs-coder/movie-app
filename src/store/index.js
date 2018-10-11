import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './modules';

import ReduxThunk from 'redux-thunk';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;

