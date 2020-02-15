import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import './react/index/index.css';
import auth from './react/index/store/reducers/auth';
import cnt   from './react/index/store/reducers/model';
import filter from './react/index/store/reducers/filter';
import share from './react/index/store/reducers/share';
import tags  from './react/index/store/reducers/tags';
import trend from './react/index/store/reducers/trend';
import setQue from './react/index/store/reducers/setQue';
import conv from './react/index/store/reducers/conv';
import header from './react/index/store/reducers/header';
import main from './react/index/store/reducers/main';

import { 
    rootSaga
} from './react/index/store/sagas/index';


const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    // const { composeWithDevTools } = require('redux-devtools-extension')
    // return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}


function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()
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
    main
});

  const store = createStore(
    rootReducers,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore