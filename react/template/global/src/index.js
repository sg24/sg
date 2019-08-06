import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware }  from 'redux'; 
import { Provider } from 'react-redux';
import  createSagaMiddleware from 'redux-saga';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
 
import App from './App';
import './index.css';
import auth from './store/reducers/auth';
import header from './store/reducers/header';

import { 
        watchHeader
    } from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();


const rootReducers = combineReducers({
    auth,
    header
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducers, composeEnhancer(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchHeader);

library.add(fas,far)

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
