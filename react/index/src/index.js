import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'events-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware }  from 'redux'; 
import { Provider } from 'react-redux';
import  createSagaMiddleware from 'redux-saga';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';
import auth from './store/reducers/auth';
import cnt from './store/reducers/model';
import filter from './store/reducers/filter';
import share from './store/reducers/share';
import tags from './store/reducers/tags';
import trend from './store/reducers/trend';
import setQue from './store/reducers/setQue';
import conv from './store/reducers/conv';
import header from './store/reducers/header';
import main from './store/reducers/main';
import group from './store/reducers/group';

import { 
        watchAuth,
        watchCnt,
        watchFilter,
        watchShare,
        watchTags,
        watchTrd,
        watchSetQue,
        watchConv,
        watchHeader,
        watchMain,
        watchGroup
    } from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();


const rootReducers = combineReducers({
    auth,
    cnt,
    filter,
    share: share,
    tags: tags,
    trd: trend,
    setQue: setQue,
    conv,
    header,
    grp: group,
    main
})

const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchCnt);
sagaMiddleware.run(watchFilter);
sagaMiddleware.run(watchShare);
sagaMiddleware.run(watchTags);
sagaMiddleware.run(watchTrd);
sagaMiddleware.run(watchSetQue);
sagaMiddleware.run(watchConv);
sagaMiddleware.run(watchHeader);
sagaMiddleware.run(watchMain);
sagaMiddleware.run(watchGroup);

library.add(fas,far,fab)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.register();