import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxThunk from 'redux-thunk';

import auth from './store/reducers/auth';
import header from './store/reducers/header';
import form from './store/reducers/form';
import main from './store/reducers/main'

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
    header,
    main,
    form
});

  const store = createStore(
    rootReducers,
    initialState,
    bindMiddleware([reduxThunk, sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore