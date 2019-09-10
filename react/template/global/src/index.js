import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware }  from 'redux'; 
import { Provider } from 'react-redux';
import  createSagaMiddleware from 'redux-saga';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
 
import App from './App';
import './index.css';
import auth from './store/reducers/auth';
import share from './store/reducers/share';
import tags from './store/reducers/tags';
import trend from './store/reducers/trend';
import setQue from './store/reducers/setQue';
import conv from './store/reducers/conv';
import header from './store/reducers/header';
import main from './store/reducers/main';

import { 
        watchShare,
        watchTags,
        watchTrd,
        watchSetQue,
        watchConv,
        watchHeader,
        watchMain
    } from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();


const rootReducers = combineReducers({
    auth,
    share: share,
    tags: tags,
    trd: trend,
    setQue: setQue,
    conv,
    header,
    main
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducers, composeEnhancer(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchShare);
sagaMiddleware.run(watchTags);
sagaMiddleware.run(watchTrd);
sagaMiddleware.run(watchSetQue);
sagaMiddleware.run(watchConv);
sagaMiddleware.run(watchHeader);
sagaMiddleware.run(watchMain);

library.add(fas,far,fab)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
