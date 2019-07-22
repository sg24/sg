import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware }  from 'redux'; 
import { Provider } from 'react-redux';
import  createSagaMiddleware from 'redux-saga';

import App from './App';
import './index.css';
import auth from './store/reducers/auth';
import post from './store/reducers/post';
import question from './store/reducers/question';
import group from './store/reducers/group';
import helpMeQue from './store/reducers/helpme';
import poet from './store/reducers/poet';
import share from './store/reducers/share';
import tags from './store/reducers/tags';
import trend from './store/reducers/trend';
import setQue from './store/reducers/setQue';
import conv from './store/reducers/conv';

import { 
        watchPt, 
        watchQue, 
        watchGrp, 
        watchHelpMeQue, 
        watchPoet ,
        watchShare,
        watchTags,
        watchTrd,
        watchSetQue,
        watchConv
    } from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();


const rootReducers = combineReducers({
    auth,
    pt: post,
    que: question,
    grp: group,
    helpme: helpMeQue,
    pwt: poet,
    share: share,
    tags: tags,
    trd: trend,
    setQue: setQue,
    conv
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducers, composeEnhancer(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchPt);
sagaMiddleware.run(watchQue);
sagaMiddleware.run(watchGrp);
sagaMiddleware.run(watchHelpMeQue);
sagaMiddleware.run(watchPoet)
sagaMiddleware.run(watchShare);
sagaMiddleware.run(watchTags);
sagaMiddleware.run(watchTrd);
sagaMiddleware.run(watchSetQue);
sagaMiddleware.run(watchConv);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
