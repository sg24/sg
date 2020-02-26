import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxThunk from 'redux-thunk';

import auth from './store/reducers/auth';
import cnt from './store/reducers/model';
import tags from './store/reducers/tags';
import share from './store/reducers/share';
import trend from './store/reducers/trend';
import setQue from './store/reducers/setQue';
import conv from './store/reducers/conv';
import header from './store/reducers/header';
import main from './store/reducers/main';

import { 
    rootSaga
} from './store/sagas/index';


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
    tags: tags,
    trd: trend,
    share,
    setQue: setQue,
    conv,
    header,
    main
})

  const store = createStore(
    rootReducers,
    initialState,
    bindMiddleware([reduxThunk, sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore