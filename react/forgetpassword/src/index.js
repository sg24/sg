import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'events-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware }  from 'redux'; 
import { Provider } from 'react-redux';
import  createSagaMiddleware from 'redux-saga';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
 
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';
import auth from './store/reducers/auth';
import form from './store/reducers/form';
import {watchForm} from './store/sagas/index'

const rootReducers = combineReducers({
    auth,
    form
})

const sagaMiddleware = createSagaMiddleware();


const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchForm);

library.add(fas,far)

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.register();
