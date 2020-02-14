import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import './react/index/index.css';
import auth, { initialAuthState } from './react/index/store/reducers/auth';
import cnt, { initialModelState } from './react/index/store/reducers/model';
import filter, { initialFilterState } from './react/index/store/reducers/filter';
import share, { initialShareState } from './react/index/store/reducers/share';
import tags, { initialTagState } from './react/index/store/reducers/tags';
import trend, {initialTrdState } from './react/index/store/reducers/trend';
import setQue, { initialSetqueState } from './react/index/store/reducers/setQue';
import conv, {initialConvState } from './react/index/store/reducers/conv';
import header, { initialHeaderState } from './react/index/store/reducers/header';
import main, { initialMainState } from './react/index/store/reducers/main';
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
    watchMain
} from './react/index/store/sagas/index';

// import { 
//     rootSaga
// } from './react/index/store/sagas/index';


const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    // const { composeWithDevTools } = require('redux-devtools-extension')
    // return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

let initialState ={
  ...initialAuthState,
  ...initialModelState,
  ...initialFilterState,
  ...initialShareState,
  ...initialTagState,
  ...initialTrdState,
  ...initialSetqueState,
  ...initialConvState,
  ...initialHeaderState,
  ...initialMainState
}

function configureStore(initialState = initialState) {
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

    //   store.sagaTask = sagaMiddleware.run(rootSaga)
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

  return store
}

export default configureStore