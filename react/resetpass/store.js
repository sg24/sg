import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import auth from './store/reducers/auth';
import form from './store/reducers/form';
import {watchForm} from './store/sagas/index'

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
    form
});

  const store = createStore(
    rootReducers,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  store.sagaTask = sagaMiddleware.run(watchForm)

  return store
}

export default configureStore