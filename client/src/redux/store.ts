import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
