import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from "./reducers/index.js";
import thunk from 'redux-thunk';
import actions from './actions';
import operations from './operations';
import selectors from './selectors';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)) );

export {
    actions,
    operations,
    selectors,
    store
}