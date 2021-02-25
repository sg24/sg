import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import  createSagaMiddleware from 'redux-saga';

import auth from './reducers/auth';
import authForm from './reducers/authForm';
import header from './reducers/header';
import profile from './reducers/profile';
import addForm from './reducers/addForm';
import editForm from './reducers/EditForm';

import { 
    watchAuth,
    watchAuthForm,
    watchHeader,
    watchProfile,
    watchEditForm
} from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    auth,
    authForm,
    header,
    profile,
    addForm,
    editForm
});

let composeEnhancers = compose;
if(__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
}
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)))
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchAuthForm);
sagaMiddleware.run(watchHeader);
sagaMiddleware.run(watchProfile);
sagaMiddleware.run(watchEditForm);

const configureStore = () => {
    return store;
};



export default configureStore;