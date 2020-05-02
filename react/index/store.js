import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import auth from './store/reducers/auth';
import cnt   from './store/reducers/model';
import filter from './store/reducers/filter';
import share from './store/reducers/share';
import tags  from './store/reducers/tags';
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


// require('babel-polyfill');

// fetch() polyfill for making API calls.
// require('whatwg-fetch');

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
// if (process.env.NODE_ENV === 'test') {
//   require('raf').polyfill(global);
// }

/**
 * Previously used the polyfill service in addition with the below code;
 * ```jsx
   <!-- The minified version of the polyfill service causes an error in PhantomJS: "Attempting to configurable attribute of unconfigurable property.", ~~but we shouldn't need PhantomJS anymore and it's deprecated anyway.~~ Actually it appears Google's "how a visitor sees the page" uses PhantomJS-like rendering so it does need to be unminified (assuming that part is meaningful, it probably is). -->
   <!-- Do NOT use `unknown=polyfill` as this breaks Googlebot/Headless Chrome -->
   <script src="https://ft-polyfill-service.herokuapp.com/v2/polyfill.js?features=es6" crossorigin="anonymous"></script>
   ```
 * But Googlebot still doesn't work with that. It's unrecognized so needs `unknown=polyfill`, but that breaks React16.
 */

// 'use strict';
//
// if (typeof Promise === 'undefined') {
//   // Rejection tracking prevents a common issue where React gets into an
//   // inconsistent state due to an error, but it gets swallowed by a Promise,
//   // and the user has no idea what causes React's erratic future behavior.
  // require('promise/lib/rejection-tracking').enable();
  // window.Promise = require('promise/lib/es6-extensions.js');
// }
//
// // fetch() polyfill for making API calls.
// require('whatwg-fetch');
//
// // Object.assign() is commonly used with React.
// // It will use the native implementation if it's present and isn't buggy.
// Object.assign = require('object-assign');
//
// // react-tooltip requires Symbol.iterator
// require('core-js/fn/symbol/iterator.js');
// require('core-js/modules/es7.object.values.js');
// require('core-js/modules/es7.object.entries.js');