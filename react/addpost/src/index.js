import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware }  from 'redux'; 
import { Provider } from 'react-redux';
import  createSagaMiddleware from 'redux-saga';
import reduxThunk from 'redux-thunk';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
 
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';
import auth from './store/reducers/auth';
import header from './store/reducers/header';
import form from './store/reducers/form';
import main from './store/reducers/main';

import { 
        watchHeader,
        watchMain,
        watchForm
    } from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();


const rootReducers = combineReducers({
    auth,
    header,
    main,
    form
})

const store = createStore(rootReducers, applyMiddleware(reduxThunk, sagaMiddleware));

sagaMiddleware.run(watchHeader);
sagaMiddleware.run(watchMain);
sagaMiddleware.run(watchForm);

library.add(fas,far)

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.register();