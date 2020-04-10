import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'events-polyfill';
import 'promise-polyfill/src/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware }  from 'redux'; 
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
import model from './store/reducers/model';
import main from './store/reducers/main';
import groupInfo from './store/reducers/groupInfo';

import { 
        watchAuth,
        watchHeader,
        watchMain,
        watchModel,
        watchGroupInfo
    } from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();


const rootReducers = combineReducers({
    auth,
    header,
    main,
    cnt: model,
    groupInfo
})

const store = createStore(rootReducers, applyMiddleware(reduxThunk, sagaMiddleware));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchHeader);
sagaMiddleware.run(watchMain);
sagaMiddleware.run(watchModel);
sagaMiddleware.run(watchGroupInfo);

library.add(fas,far)

const app = (
    <Provider store={store}>
         <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.register();