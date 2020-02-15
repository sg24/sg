module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./global/global.js":
/*!**************************!*\
  !*** ./global/global.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

let Global = {
  userDet: {},
  io: {},
  app: {},
  url: 'http://localhost:3000'
};
module.exports = Global;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@fortawesome/fontawesome-svg-core/styles.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-svg-core/styles.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/next/dist/next-server/lib/utils.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  let result = null;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(App, ctx) {
  var _a;

  if (true) {
    if ((_a = App.prototype) === null || _a === void 0 ? void 0 : _a.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/zeit/next.js/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/zeit/next.js/empty-object-getInitialProps`);
    }
  }

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (exports.urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "./node_modules/next/dist/next-server/lib/utils.js");

exports.AppInitialProps = _utils.AppInitialProps;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

async function appGetInitialProps(_ref) {
  var {
    Component,
    ctx
  } = _ref;
  var pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
  return {
    pageProps
  };
}

class App extends _react.default.Component {
  // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`.
  // @deprecated This method is no longer needed. Errors are caught at the top level
  componentDidCatch(error, _errorInfo) {
    throw error;
  }

  render() {
    var {
      router,
      Component,
      pageProps
    } = this.props;
    var url = createUrl(router);
    return _react.default.createElement(Component, Object.assign({}, pageProps, {
      url: url
    }));
  }

}

exports.default = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
var warnContainer;
var warnUrl;

if (true) {
  warnContainer = (0, _utils.execOnce)(() => {
    console.warn("Warning: the `Container` in `_app` has been deprecated and should be removed. https://err.sh/zeit/next.js/app-container-deprecated");
  });
  warnUrl = (0, _utils.execOnce)(() => {
    console.error("Warning: the 'url' property is deprecated. https://err.sh/zeit/next.js/url-deprecated");
  });
} // @deprecated noop for now until removal


function Container(p) {
  if (true) warnContainer();
  return p.children;
}

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  var {
    pathname,
    asPath,
    query
  } = router;
  return {
    get query() {
      if (true) warnUrl();
      return query;
    },

    get pathname() {
      if (true) warnUrl();
      return pathname;
    },

    get asPath() {
      if (true) warnUrl();
      return asPath;
    },

    back: () => {
      if (true) warnUrl();
      router.back();
    },
    push: (url, as) => {
      if (true) warnUrl();
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (true) warnUrl();
      var pushRoute = as ? href : '';
      var pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (true) warnUrl();
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (true) warnUrl();
      var replaceRoute = as ? href : '';
      var replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-redux-wrapper */ "next-redux-wrapper");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_redux_saga__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-redux-saga */ "next-redux-saga");
/* harmony import */ var next_redux_saga__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_redux_saga__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "@fortawesome/fontawesome-svg-core");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "@fortawesome/free-regular-svg-icons");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ "@fortawesome/free-brands-svg-icons");
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core/styles.css */ "./node_modules/@fortawesome/fontawesome-svg-core/styles.css");
/* harmony import */ var _fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core_styles_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../store */ "./store.js");
var _jsxFileName = "C:\\Users\\g\\my-sg final deploy\\pages\\_app.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }











const serviceWorker = false ? undefined : null;

_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_5__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__["fas"], _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_7__["far"], _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_8__["fab"]);

class MyApp extends next_app__WEBPACK_IMPORTED_MODULE_0___default.a {
  static async getInitialProps({
    Component,
    ctx
  }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ctx
      });
    }

    return {
      pageProps
    };
  }

  render() {
    const {
      Component,
      pageProps,
      store
    } = this.props;

    if (false) {}

    return __jsx(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
      store: store,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: this
    }, __jsx(Component, _extends({}, pageProps, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    })));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (next_redux_wrapper__WEBPACK_IMPORTED_MODULE_3___default()(_store__WEBPACK_IMPORTED_MODULE_10__["default"])(next_redux_saga__WEBPACK_IMPORTED_MODULE_4___default()(MyApp)));

/***/ }),

/***/ "./react/index/axios.js":
/*!******************************!*\
  !*** ./react/index/axios.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../global/global */ "./global/global.js");
/* harmony import */ var _global_global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_global_global__WEBPACK_IMPORTED_MODULE_1__);


const instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: _global_global__WEBPACK_IMPORTED_MODULE_1___default.a.url
});
instance.defaults.headers.common['authorization'] = 'authorization';
/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./react/index/index.css":
/*!*******************************!*\
  !*** ./react/index/index.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./react/index/shared/utility.js":
/*!***************************************!*\
  !*** ./react/index/shared/utility.js ***!
  \***************************************/
/*! exports provided: updateObject, transformNumber, transformString, changeFav, engStrings, changeMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateObject", function() { return updateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformNumber", function() { return transformNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformString", function() { return transformString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFav", function() { return changeFav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "engStrings", function() { return engStrings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeMode", function() { return changeMode; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const updateObject = (oldObject, updatedProperties) => {
  return _objectSpread({}, oldObject, {}, updatedProperties);
};
const transformNumber = favNumber => {
  const favNumArray = String(favNumber).split("");

  if (favNumArray.length === 4) {
    return `${favNumArray[0]}K`;
  }

  if (favNumArray.length === 5) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}K`;
  }

  if (favNumArray.length === 6) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}K`;
  }

  if (favNumArray.length === 7) {
    const favNum = favNumArray[0];
    return `${favNum}M`;
  }

  if (favNumArray.length === 8) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}M`;
  }

  if (favNumArray.length === 9) {
    const favNum = favNumArray[0] + favNumArray[1] + favNumArray[2];
    return `${favNum}M`;
  }

  if (favNumArray.length === 10) {
    const favNum = favNumArray[0];
    return `${favNum}B`;
  }

  if (favNumArray.length === 11) {
    const favNum = favNumArray[0] + favNumArray[1];
    return `${favNum}B`;
  }

  return favNumber;
};
const transformString = val => {
  const curVal = String(val).substr(0, 115);
  return curVal;
};
function changeFav(id, liked, favAdd, changedFav) {
  let changedFavorites = [...changedFav];
  let favDets = changedFavorites.filter(fav => fav.id === id);

  for (let favDet of favDets) {
    return updateFavs(favDet);
  }

  let newChangedFav = {
    id,
    liked,
    favAdd
  };
  return updateFavs(newChangedFav);

  function updateFavs(favDet) {
    favDet = updateObject(favDet, {
      liked: !favDet.liked
    });

    if (favDet.liked) {
      favDet = updateObject(favDet, {
        favAdd: favDet.favAdd + 1
      });
    } else {
      favDet = updateObject(favDet, {
        favAdd: favDet.favAdd - 1
      });
    }

    let updateChangeFav = changedFavorites.filter(fav => fav.id !== id);
    updateChangeFav.push(favDet);
    return {
      favDet,
      updateChangeFav
    };
  }
}
;
const engStrings = {
  suffixAgo: 'ago',
  seconds: 'sec',
  minute: '%d min',
  minutes: '%d min',
  hour: '%d hr',
  hours: '%d hrs',
  day: '%d day',
  days: '%d days',
  month: '%d month',
  months: '%d months',
  year: '%d yr',
  years: '%d yrs'
};
function changeMode(oldCnts, changeCntStart, field, isUpdate) {
  let cnts = [...oldCnts];
  let curIndex;
  let user = cnts.filter((userFnd, index) => {
    if (userFnd.id === changeCntStart.id) {
      curIndex = index;
      return true;
    }

    return false;
  });

  if (user.length > 0) {
    let updateUser = _objectSpread({}, user[0]);

    updateUser['pending'] = false;
    updateUser['request'] = false;
    updateUser['accept'] = false;
    updateUser[field] = isUpdate;
    cnts[curIndex] = updateUser;
    return cnts;
  }

  return oldCnts;
}

/***/ }),

/***/ "./react/index/store/actions/actionTypes.js":
/*!**************************************************!*\
  !*** ./react/index/store/actions/actionTypes.js ***!
  \**************************************************/
/*! exports provided: CHECK_AUTH_INIT, CHECK_AUTH, CHECK_USERIMG, CHECK_USERNAME, HEADER_FORM_EXPAND, HEADER_FORM_SM, HEADER_NAV_DEFAULT, HEADER_FILTER_INIT, HEADER_FILTER_START, HEADER_FILTER_FAIL, HEADER_FILTER, HEADER_FILTER_CLOSE, HEADER_ADD_NEW, FETCH_CNT_INIT, FETCH_CNT_START, FETCH_CNT_RESET, FETCH_CNT_FAIL, FETCH_CNT, CHANGE_CNT_INIT, CHANGE_CNT_FAIL, CHANGE_CNT_START, CHANGE_CNT_CANCEL, CHANGE_CNT_RESET, CHANGE_CNT, FILTER_POST, FETCH_CNTCATEG_INIT, FETCH_CNTCATEG_START, FETCH_CNTCATEG, FETCH_VIDEO_INIT, FETCH_VIDEO_START, FETCH_VIDEO_FAIL, FETCH_VIDEO, CHANGE_FAVORITE_INIT, CHANGE_FAVORITE_PT_START, CHANGE_FAVORITE_PT_FAIL, CHANGE_FAVORITE, FETCH_USERS_INIT, FETCH_USERS_START, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL, FETCH_USERS, USER_SELECT, VIEW_USERS, REMOVE_USER, FILTER_USER_INIT, FILTER_USER, FILTER_USER_SELECT_INIT, FILTER_USER_SELECT, SHARE_ID, SHARE_USER_INIT, SHARE_USER_START, SHARE_USER_FAIL, SHARE_USER, CHANGE_TAGS_PATH, FETCH_TAGS_INIT, FETCH_TAGS_START, FETCH_TAGS_SUCCESS, FETCH_TAGS_FAIL, FETCH_TAGS, FETCH_TRD_INIT, FETCH_TRD_START, FETCH_TRD_SUCCESS, FETCH_TRD_FAIL, FETCH_TRD, FETCH_CATEG_INIT, FETCH_CATEG_START, FETCH_CATEG_SUCCESS, FETCH_CATEG_FAIL, FETCH_CATEG, FETCH_CONV_INIT, FETCH_CONV_START, FETCH_CONV_SUCCESS, FETCH_CONV_FAIL, FETCH_CONV, FETCH_NOTIFY_INIT, FETCH_NOTIFY_START, FETCH_NOTIFY_SUCCESS, FETCH_NOTIFY_FAIL, FETCH_NOTIFY, CHANGE_MAINFAVORITE_START, CHANGE_MAINFAVORITE_RESET, CHANGE_FAVORITE_NOTIFY_INIT, CHANGE_FAVORITE_NOTIFY_START, CHANGE_FAVORITE_NOTIFY_FAIL, CHANGE_FAVORITE_NOTIFY, SHOW_NAV_LIST, FETCH_NAVLIST_INIT, FETCH_NAVLIST_START, FETCH_NAVLIST_SUCCESS, FETCH_NAVLIST_FAIL, FETCH_NAVLIST, SHOW_USER_OPTION, FETCH_PT_ACTIVE_INIT, FETCH_PT_ACTIVE, FETCH_QUE_ACTIVE_INIT, FETCH_QUE_ACTIVE, FETCH_CNT_ACTIVE_INIT, FETCH_CNT_ACTIVE, FETCH_REQ_ACTIVE_INIT, FETCH_REQ_ACTIVE, FETCH_SHARE_ACTIVE_INIT, FETCH_SHARE_ACTIVE, FETCH_SHARECNT_ACTIVE_INIT, FETCH_SHARECNT_ACTIVE, RESET_ACTIVE_INIT, RESET_ACTIVE, SHOW_MAIN_BACKDROP, HIDE_MAIN_BACKDROP, FETCH_NOTIFY_ACTIVE_INIT, FETCH_NOTIFY_ACTIVE, DEFAULT_NOTIFYACTIVE_INIT, DEFAULT_NOTIFYACTIVE, FILTER_CONTENT_INIT, FILTER_CONTENT_START, FILTER_CONTENT_FAIL, FILTER_CONTENT, RESET_FILTER, RESET_MODEL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_AUTH_INIT", function() { return CHECK_AUTH_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_AUTH", function() { return CHECK_AUTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_USERIMG", function() { return CHECK_USERIMG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHECK_USERNAME", function() { return CHECK_USERNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_FORM_EXPAND", function() { return HEADER_FORM_EXPAND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_FORM_SM", function() { return HEADER_FORM_SM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_NAV_DEFAULT", function() { return HEADER_NAV_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_FILTER_INIT", function() { return HEADER_FILTER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_FILTER_START", function() { return HEADER_FILTER_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_FILTER_FAIL", function() { return HEADER_FILTER_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_FILTER", function() { return HEADER_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_FILTER_CLOSE", function() { return HEADER_FILTER_CLOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_ADD_NEW", function() { return HEADER_ADD_NEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNT_INIT", function() { return FETCH_CNT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNT_START", function() { return FETCH_CNT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNT_RESET", function() { return FETCH_CNT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNT_FAIL", function() { return FETCH_CNT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNT", function() { return FETCH_CNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_CNT_INIT", function() { return CHANGE_CNT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_CNT_FAIL", function() { return CHANGE_CNT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_CNT_START", function() { return CHANGE_CNT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_CNT_CANCEL", function() { return CHANGE_CNT_CANCEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_CNT_RESET", function() { return CHANGE_CNT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_CNT", function() { return CHANGE_CNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_POST", function() { return FILTER_POST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNTCATEG_INIT", function() { return FETCH_CNTCATEG_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNTCATEG_START", function() { return FETCH_CNTCATEG_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNTCATEG", function() { return FETCH_CNTCATEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_VIDEO_INIT", function() { return FETCH_VIDEO_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_VIDEO_START", function() { return FETCH_VIDEO_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_VIDEO_FAIL", function() { return FETCH_VIDEO_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_VIDEO", function() { return FETCH_VIDEO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_FAVORITE_INIT", function() { return CHANGE_FAVORITE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_FAVORITE_PT_START", function() { return CHANGE_FAVORITE_PT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_FAVORITE_PT_FAIL", function() { return CHANGE_FAVORITE_PT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_FAVORITE", function() { return CHANGE_FAVORITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_USERS_INIT", function() { return FETCH_USERS_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_USERS_START", function() { return FETCH_USERS_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_USERS_SUCCESS", function() { return FETCH_USERS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_USERS_FAIL", function() { return FETCH_USERS_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_USERS", function() { return FETCH_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_SELECT", function() { return USER_SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEW_USERS", function() { return VIEW_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_USER", function() { return REMOVE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_USER_INIT", function() { return FILTER_USER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_USER", function() { return FILTER_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_USER_SELECT_INIT", function() { return FILTER_USER_SELECT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_USER_SELECT", function() { return FILTER_USER_SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARE_ID", function() { return SHARE_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARE_USER_INIT", function() { return SHARE_USER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARE_USER_START", function() { return SHARE_USER_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARE_USER_FAIL", function() { return SHARE_USER_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHARE_USER", function() { return SHARE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_TAGS_PATH", function() { return CHANGE_TAGS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TAGS_INIT", function() { return FETCH_TAGS_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TAGS_START", function() { return FETCH_TAGS_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TAGS_SUCCESS", function() { return FETCH_TAGS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TAGS_FAIL", function() { return FETCH_TAGS_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TAGS", function() { return FETCH_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TRD_INIT", function() { return FETCH_TRD_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TRD_START", function() { return FETCH_TRD_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TRD_SUCCESS", function() { return FETCH_TRD_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TRD_FAIL", function() { return FETCH_TRD_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_TRD", function() { return FETCH_TRD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CATEG_INIT", function() { return FETCH_CATEG_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CATEG_START", function() { return FETCH_CATEG_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CATEG_SUCCESS", function() { return FETCH_CATEG_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CATEG_FAIL", function() { return FETCH_CATEG_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CATEG", function() { return FETCH_CATEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CONV_INIT", function() { return FETCH_CONV_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CONV_START", function() { return FETCH_CONV_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CONV_SUCCESS", function() { return FETCH_CONV_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CONV_FAIL", function() { return FETCH_CONV_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CONV", function() { return FETCH_CONV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NOTIFY_INIT", function() { return FETCH_NOTIFY_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NOTIFY_START", function() { return FETCH_NOTIFY_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NOTIFY_SUCCESS", function() { return FETCH_NOTIFY_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NOTIFY_FAIL", function() { return FETCH_NOTIFY_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NOTIFY", function() { return FETCH_NOTIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_MAINFAVORITE_START", function() { return CHANGE_MAINFAVORITE_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_MAINFAVORITE_RESET", function() { return CHANGE_MAINFAVORITE_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_FAVORITE_NOTIFY_INIT", function() { return CHANGE_FAVORITE_NOTIFY_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_FAVORITE_NOTIFY_START", function() { return CHANGE_FAVORITE_NOTIFY_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_FAVORITE_NOTIFY_FAIL", function() { return CHANGE_FAVORITE_NOTIFY_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_FAVORITE_NOTIFY", function() { return CHANGE_FAVORITE_NOTIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_NAV_LIST", function() { return SHOW_NAV_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NAVLIST_INIT", function() { return FETCH_NAVLIST_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NAVLIST_START", function() { return FETCH_NAVLIST_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NAVLIST_SUCCESS", function() { return FETCH_NAVLIST_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NAVLIST_FAIL", function() { return FETCH_NAVLIST_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NAVLIST", function() { return FETCH_NAVLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_USER_OPTION", function() { return SHOW_USER_OPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_PT_ACTIVE_INIT", function() { return FETCH_PT_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_PT_ACTIVE", function() { return FETCH_PT_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_QUE_ACTIVE_INIT", function() { return FETCH_QUE_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_QUE_ACTIVE", function() { return FETCH_QUE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNT_ACTIVE_INIT", function() { return FETCH_CNT_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_CNT_ACTIVE", function() { return FETCH_CNT_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_REQ_ACTIVE_INIT", function() { return FETCH_REQ_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_REQ_ACTIVE", function() { return FETCH_REQ_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SHARE_ACTIVE_INIT", function() { return FETCH_SHARE_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SHARE_ACTIVE", function() { return FETCH_SHARE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SHARECNT_ACTIVE_INIT", function() { return FETCH_SHARECNT_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_SHARECNT_ACTIVE", function() { return FETCH_SHARECNT_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_ACTIVE_INIT", function() { return RESET_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_ACTIVE", function() { return RESET_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHOW_MAIN_BACKDROP", function() { return SHOW_MAIN_BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIDE_MAIN_BACKDROP", function() { return HIDE_MAIN_BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NOTIFY_ACTIVE_INIT", function() { return FETCH_NOTIFY_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FETCH_NOTIFY_ACTIVE", function() { return FETCH_NOTIFY_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NOTIFYACTIVE_INIT", function() { return DEFAULT_NOTIFYACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_NOTIFYACTIVE", function() { return DEFAULT_NOTIFYACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_CONTENT_INIT", function() { return FILTER_CONTENT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_CONTENT_START", function() { return FILTER_CONTENT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_CONTENT_FAIL", function() { return FILTER_CONTENT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_CONTENT", function() { return FILTER_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_FILTER", function() { return RESET_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESET_MODEL", function() { return RESET_MODEL; });
const CHECK_AUTH_INIT = 'CHECK_AUTH_INIT';
const CHECK_AUTH = 'CHECK_AUTH';
const CHECK_USERIMG = 'CHECK_USERIMG';
const CHECK_USERNAME = 'CHECK_USERNAME';
const HEADER_FORM_EXPAND = 'HEADER_FORM_EXPAND';
const HEADER_FORM_SM = 'HEADER_FORM_SM';
const HEADER_NAV_DEFAULT = 'HEADER_NAV_DEFAULT';
const HEADER_FILTER_INIT = 'HEADER_FILTER_INIT';
const HEADER_FILTER_START = 'HEADER_FILTER_START';
const HEADER_FILTER_FAIL = 'HEADER_FILTER_FAIL';
const HEADER_FILTER = 'HEADER_FILTER';
const HEADER_FILTER_CLOSE = 'HEADER_FILTER_CLOSE';
const HEADER_ADD_NEW = 'HEADER_ADD_NEW';
const FETCH_CNT_INIT = 'FETCH_CNT_INIT';
const FETCH_CNT_START = 'FETCH_CNT_START';
const FETCH_CNT_RESET = 'FETCH_CNT_RESET';
const FETCH_CNT_FAIL = 'FETCH_CNT_FAIL';
const FETCH_CNT = 'FETCH_CNT';
const CHANGE_CNT_INIT = 'CHANGE_CNT_INIT';
const CHANGE_CNT_FAIL = 'CHANGE_CNT_FAIL';
const CHANGE_CNT_START = 'CHANGE_CNT_START';
const CHANGE_CNT_CANCEL = 'CHANGE_CNT_CANCEL';
const CHANGE_CNT_RESET = 'CHANGE_CNT_RESET';
const CHANGE_CNT = 'CHANGE_CNT';
const FILTER_POST = 'FILTER_POST';
const FETCH_CNTCATEG_INIT = 'FETCH_CNTCATEG_INIT';
const FETCH_CNTCATEG_START = 'FETCH_CNTCATEG_START';
const FETCH_CNTCATEG = 'FETCH_CNTCATEG';
const FETCH_VIDEO_INIT = 'FETCH_VIDEO_INIT';
const FETCH_VIDEO_START = 'FETCH_VIDEO_START';
const FETCH_VIDEO_FAIL = 'FETCH_VIDEO_FAIL';
const FETCH_VIDEO = 'FETCH_VIDEO';
const CHANGE_FAVORITE_INIT = 'CHANGE_FAVORITE_INIT';
const CHANGE_FAVORITE_PT_START = 'CHANGE_FAVORITE_PT_START';
const CHANGE_FAVORITE_PT_FAIL = 'CHANGE_FAVORITE_PT_FAIL';
const CHANGE_FAVORITE = 'CHANGE_FAVORITE';
const FETCH_USERS_INIT = 'FETCH_USERS_INIT';
const FETCH_USERS_START = 'FETCH_USERS_START';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
const FETCH_USERS = 'FETCH_USERS';
const USER_SELECT = 'USER_SELECT';
const VIEW_USERS = 'VIEW_USERS';
const REMOVE_USER = 'REMOVE_USER';
const FILTER_USER_INIT = 'FILTER_USER_INIT';
const FILTER_USER = 'FILTER_USER';
const FILTER_USER_SELECT_INIT = 'FILTER_USER_SELECT_INIT';
const FILTER_USER_SELECT = 'FILTER_USER_SELECT';
const SHARE_ID = 'SHARE_ID';
const SHARE_USER_INIT = 'SHARE_USER_INIT';
const SHARE_USER_START = 'SHARE_USER_START';
const SHARE_USER_FAIL = 'SHARE_USER_FAIL';
const SHARE_USER = 'SHARE_USER';
const CHANGE_TAGS_PATH = 'CHANGE_TAGS_PATH';
const FETCH_TAGS_INIT = 'FETCH_TAGS_INIT';
const FETCH_TAGS_START = 'FETCH_TAGS_START';
const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
const FETCH_TAGS_FAIL = 'FETCH_TAGS_FAIL';
const FETCH_TAGS = 'FETCH_TAGS';
const FETCH_TRD_INIT = 'FETCH_TRD_INIT';
const FETCH_TRD_START = 'FETCH_TRD_START';
const FETCH_TRD_SUCCESS = 'FETCH_TRD_SUCCESS';
const FETCH_TRD_FAIL = 'FETCH_TRD_FAIL';
const FETCH_TRD = 'FETCH_TRD';
const FETCH_CATEG_INIT = 'FETCH_CATEG_INIT';
const FETCH_CATEG_START = 'FETCH_CATEG_START';
const FETCH_CATEG_SUCCESS = 'FETCH_CATEG_SUCCESS';
const FETCH_CATEG_FAIL = 'FETCH_CATEG_FAIL';
const FETCH_CATEG = 'FETCH_CATEG';
const FETCH_CONV_INIT = 'FETCH_CONV_INIT';
const FETCH_CONV_START = 'FETCH_CONV_START';
const FETCH_CONV_SUCCESS = 'FETCH_CONV_SUCCESS';
const FETCH_CONV_FAIL = 'FETCH_CONV_FAIL';
const FETCH_CONV = 'FETCH_CONV';
const FETCH_NOTIFY_INIT = 'FETCH_NOTIFY_INIT';
const FETCH_NOTIFY_START = 'FETCH_NOTIFY_START';
const FETCH_NOTIFY_SUCCESS = 'FETCH_NOTIFY_SUCCESS';
const FETCH_NOTIFY_FAIL = 'FETCH_NOTIFY_FAIL';
const FETCH_NOTIFY = 'FETCH_NOTIFY';
const CHANGE_MAINFAVORITE_START = 'CHANGE_MAINFAVORITE_START';
const CHANGE_MAINFAVORITE_RESET = 'CHANGE_MAINFAVORITE_RESET';
const CHANGE_FAVORITE_NOTIFY_INIT = 'CHANGE_FAVORITE_NOTIFY_INIT';
const CHANGE_FAVORITE_NOTIFY_START = 'CHANGE_FAVORITE_NOTIFY_START';
const CHANGE_FAVORITE_NOTIFY_FAIL = 'CHANGE_FAVORITE_NOTIFY_FAIL';
const CHANGE_FAVORITE_NOTIFY = 'CHANGE_FAVORITE_NOTIFY';
const SHOW_NAV_LIST = 'SHOW_NAV_LIST';
const FETCH_NAVLIST_INIT = 'FETCH_NAVLIST_INIT';
const FETCH_NAVLIST_START = 'FETCH_NAVLIST_START';
const FETCH_NAVLIST_SUCCESS = 'FETCH_NAVLIST_SUCCESS';
const FETCH_NAVLIST_FAIL = 'FETCH_NAVLIST_FAIL';
const FETCH_NAVLIST = 'FETCH_NAVLIST';
const SHOW_USER_OPTION = 'SHOW_USER_OPTION';
const FETCH_PT_ACTIVE_INIT = 'FETCH_PT_ACTIVE_INIT';
const FETCH_PT_ACTIVE = 'FETCH_PT_ACTIVE';
const FETCH_QUE_ACTIVE_INIT = 'FETCH_QUE_ACTIVE_INIT';
const FETCH_QUE_ACTIVE = 'FETCH_QUE_ACTIVE';
const FETCH_CNT_ACTIVE_INIT = 'FETCH_CNT_ACTIVE_INIT';
const FETCH_CNT_ACTIVE = 'FETCH_CNT_ACTIVE';
const FETCH_REQ_ACTIVE_INIT = 'FETCH_REQ_ACTIVE_INIT';
const FETCH_REQ_ACTIVE = 'FETCH_REQ_ACTIVE';
const FETCH_SHARE_ACTIVE_INIT = 'FETCH_SHARE_ACTIVE_INIT';
const FETCH_SHARE_ACTIVE = 'FETCH_SHARE_ACTIVE';
const FETCH_SHARECNT_ACTIVE_INIT = 'FETCH_SHARECNT_ACTIVE_INIT';
const FETCH_SHARECNT_ACTIVE = 'FETCH_SHARECNT_ACTIVE';
const RESET_ACTIVE_INIT = 'RESET_ACTIVE_INIT';
const RESET_ACTIVE = 'RESET_ACTIVE';
const SHOW_MAIN_BACKDROP = 'SHOW_MAIN_BACKDROP';
const HIDE_MAIN_BACKDROP = 'HIDE_MAIN_BACKDROP';
const FETCH_NOTIFY_ACTIVE_INIT = 'FETCH_NOTIFY_ACTIVE_INIT';
const FETCH_NOTIFY_ACTIVE = 'FETCH_NOTIFY_ACTIVE';
const DEFAULT_NOTIFYACTIVE_INIT = 'DEFAULT_NOTIFYACTIVE_INIT';
const DEFAULT_NOTIFYACTIVE = 'DEFAULT_NOTIFYACTIVE';
const FILTER_CONTENT_INIT = 'FILTER_CONTENT_INIT';
const FILTER_CONTENT_START = 'FILTER_CONTENT_START';
const FILTER_CONTENT_FAIL = 'FILTER_CONTENT_FAIL';
const FILTER_CONTENT = 'FILTER_CONTENT';
const RESET_FILTER = 'RESET_FILTER';
const RESET_MODEL = 'RESET_MODEL';

/***/ }),

/***/ "./react/index/store/actions/auth.js":
/*!*******************************************!*\
  !*** ./react/index/store/actions/auth.js ***!
  \*******************************************/
/*! exports provided: checkAuthInit, checkAuth, checkUserImg, checkUserName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkAuthInit", function() { return checkAuthInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkAuth", function() { return checkAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkUserImg", function() { return checkUserImg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkUserName", function() { return checkUserName; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const checkAuthInit = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHECK_AUTH_INIT"]
  };
};
const checkAuth = status => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHECK_AUTH"],
    status
  };
};
const checkUserImg = img => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHECK_USERIMG"],
    img
  };
};
const checkUserName = name => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHECK_USERNAME"],
    name
  };
};

/***/ }),

/***/ "./react/index/store/actions/conv.js":
/*!*******************************************!*\
  !*** ./react/index/store/actions/conv.js ***!
  \*******************************************/
/*! exports provided: fetchConvInit, fetchConvStart, fetchConvSuccess, fetchConvFail, fetchConv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchConvInit", function() { return fetchConvInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchConvStart", function() { return fetchConvStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchConvSuccess", function() { return fetchConvSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchConvFail", function() { return fetchConvFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchConv", function() { return fetchConv; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const fetchConvInit = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CONV_INIT"]
  };
};
const fetchConvStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CONV_START"]
  };
};
const fetchConvSuccess = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CONV_SUCCESS"]
  };
};
const fetchConvFail = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CONV_FAIL"]
  };
};
const fetchConv = conv => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CONV"],
    conv
  };
};

/***/ }),

/***/ "./react/index/store/actions/filter.js":
/*!*********************************************!*\
  !*** ./react/index/store/actions/filter.js ***!
  \*********************************************/
/*! exports provided: fetchCntCategInit, fetchCntCategStart, fetchCntCateg, filterContentInit, filterContentStart, filterContentFail, filterContent, resetFilter, filterPost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntCategInit", function() { return fetchCntCategInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntCategStart", function() { return fetchCntCategStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntCateg", function() { return fetchCntCateg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterContentInit", function() { return filterContentInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterContentStart", function() { return filterContentStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterContentFail", function() { return filterContentFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterContent", function() { return filterContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFilter", function() { return resetFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterPost", function() { return filterPost; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const fetchCntCategInit = categ => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNTCATEG_INIT"],
    categ
  };
};
const fetchCntCategStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNTCATEG_START"]
  };
};
const fetchCntCateg = categ => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNTCATEG"],
    categ
  };
};
const filterContentInit = content => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_CONTENT_INIT"],
    content
  };
};
const filterContentStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_CONTENT_START"]
  };
};
const filterContentFail = err => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_CONTENT_FAIL"],
    err
  };
};
const filterContent = totalFound => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_CONTENT"],
    totalFound
  };
};
const resetFilter = totalFound => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["RESET_FILTER"]
  };
};
const filterPost = filterDet => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_POST"],
    filterDet
  };
};

/***/ }),

/***/ "./react/index/store/actions/header.js":
/*!*********************************************!*\
  !*** ./react/index/store/actions/header.js ***!
  \*********************************************/
/*! exports provided: headerFormExpand, headerFormSm, headerNavDefault, headerAddNew, fetchNotifyInit, fetchNotifyStart, fetchNotifySuccess, fetchNotifyFail, fetchNotify, changeFavNotifyInit, changeFavNotifyStart, changeFavNotifyFail, changeFavNotify, showNavList, fetchNavlistInit, fetchNavlistStart, fetchNavlist, showUserOption, fetchNotifyactiveInit, fetchNotifyActive, defaultNotifyactiveInit, defaultNotifyActive, changeMainFavoriteStart, changeMainFavoriteReset, headerFilterInit, headerFilterStart, headerFilterFail, headerFilter, headerFilterClose */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerFormExpand", function() { return headerFormExpand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerFormSm", function() { return headerFormSm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerNavDefault", function() { return headerNavDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerAddNew", function() { return headerAddNew; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyInit", function() { return fetchNotifyInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyStart", function() { return fetchNotifyStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotifySuccess", function() { return fetchNotifySuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyFail", function() { return fetchNotifyFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotify", function() { return fetchNotify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFavNotifyInit", function() { return changeFavNotifyInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFavNotifyStart", function() { return changeFavNotifyStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFavNotifyFail", function() { return changeFavNotifyFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFavNotify", function() { return changeFavNotify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showNavList", function() { return showNavList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNavlistInit", function() { return fetchNavlistInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNavlistStart", function() { return fetchNavlistStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNavlist", function() { return fetchNavlist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showUserOption", function() { return showUserOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyactiveInit", function() { return fetchNotifyactiveInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyActive", function() { return fetchNotifyActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultNotifyactiveInit", function() { return defaultNotifyactiveInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultNotifyActive", function() { return defaultNotifyActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeMainFavoriteStart", function() { return changeMainFavoriteStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeMainFavoriteReset", function() { return changeMainFavoriteReset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerFilterInit", function() { return headerFilterInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerFilterStart", function() { return headerFilterStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerFilterFail", function() { return headerFilterFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerFilter", function() { return headerFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerFilterClose", function() { return headerFilterClose; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const headerFormExpand = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FORM_EXPAND"]
  };
};
const headerFormSm = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FORM_SM"]
  };
};
const headerNavDefault = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_NAV_DEFAULT"]
  };
};
const headerAddNew = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_ADD_NEW"]
  };
};
const fetchNotifyInit = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY_INIT"]
  };
};
const fetchNotifyStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY_START"]
  };
};
const fetchNotifySuccess = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY_SUCCESS"]
  };
};
const fetchNotifyFail = err => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY_FAIL"],
    err
  };
};
const fetchNotify = notify => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY"],
    notify
  };
};
const changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_NOTIFY_INIT"],
    notify,
    notifyID
  };
};
const changeFavNotifyStart = notify => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_NOTIFY_START"],
    notify
  };
};
const changeFavNotifyFail = notify => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_NOTIFY_FAIL"],
    notify
  };
};
const changeFavNotify = notify => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_NOTIFY"],
    notify
  };
};
const showNavList = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHOW_NAV_LIST"]
  };
};
const fetchNavlistInit = category => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NAVLIST_INIT"],
    category
  };
};
const fetchNavlistStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NAVLIST_START"]
  };
};
const fetchNavlist = (category, navList) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NAVLIST"],
    category,
    navList
  };
};
const showUserOption = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHOW_USER_OPTION"]
  };
};
const fetchNotifyactiveInit = userID => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY_ACTIVE_INIT"],
    userID
  };
};
const fetchNotifyActive = notifyActive => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY_ACTIVE"],
    notifyActive
  };
};
const defaultNotifyactiveInit = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_NOTIFYACTIVE_INIT"]
  };
};
const defaultNotifyActive = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_NOTIFYACTIVE"]
  };
};
const changeMainFavoriteStart = isLiked => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_MAINFAVORITE_START"],
    isLiked
  };
};
const changeMainFavoriteReset = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_MAINFAVORITE_RESET"]
  };
};
const headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FILTER_INIT"],
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FILTER_START"],
    filterPos,
    filterLastPos
  };
};
const headerFilterFail = searchCntErr => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FILTER_FAIL"],
    searchCntErr
  };
};
const headerFilter = searchCnt => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FILTER"],
    searchCnt
  };
};
const headerFilterClose = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FILTER_CLOSE"]
  };
};

/***/ }),

/***/ "./react/index/store/actions/index.js":
/*!********************************************!*\
  !*** ./react/index/store/actions/index.js ***!
  \********************************************/
/*! exports provided: checkAuthInit, checkAuth, checkUserImg, checkUserName, headerFormExpand, headerFormSm, headerNavDefault, headerAddNew, changeMainFavoriteStart, changeMainFavoriteReset, fetchNotifyInit, fetchNotifyStart, fetchNotifyFail, fetchNotify, changeFavNotifyInit, changeFavNotifyStart, changeFavNotifyFail, changeFavNotify, showNavList, fetchNavlistInit, fetchNavlistStart, fetchNavlist, showUserOption, fetchNotifyactiveInit, fetchNotifyActive, defaultNotifyactiveInit, defaultNotifyActive, headerFilterInit, headerFilterStart, headerFilterFail, headerFilter, headerFilterClose, fetchCntInit, fetchCntFail, fetchCntStart, fetchCntReset, fetchCnt, changeCntInit, changeCntStart, changeCntFail, changeCntCancel, changeCntReset, changeCnt, fetchVideo, changeFavInit, changeFavPtStart, changeFavPtFail, changeFav, resetModel, fetchCntCategInit, fetchCntCategStart, fetchCntCateg, filterContentInit, filterContentStart, filterContentFail, filterContent, resetFilter, filterPost, fetchUsersInit, fetchUsersFail, fetchUsers, userSelect, viewUsers, removeUser, filterUserInit, filterUserSelectInit, filterUser, filterUserSelect, shareID, shareUserInit, shareUserStart, shareUserfail, shareUser, changeTagsPath, fetchTagsInit, fetchTagsStart, fetchTagsFail, fetchTags, fetchTagsSuccess, fetchTrdInit, fetchTrd, fetchCategInit, fetchCateg, fetchConvInit, fetchConv, fetchPtActiveInit, fetchPtActive, fetchQueActiveInit, fetchQueActive, fetchCntActiveInit, fetchCntActive, fetchShareCntactiveInit, fetchShareCntActive, fetchShareactiveInit, fetchShareActive, fetchReqActiveInit, fetchReqActive, resetActiveInit, resetActive, showMainBackdrop, hideMainBackdrop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "./react/index/store/actions/auth.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkAuthInit", function() { return _auth__WEBPACK_IMPORTED_MODULE_0__["checkAuthInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkAuth", function() { return _auth__WEBPACK_IMPORTED_MODULE_0__["checkAuth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkUserImg", function() { return _auth__WEBPACK_IMPORTED_MODULE_0__["checkUserImg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkUserName", function() { return _auth__WEBPACK_IMPORTED_MODULE_0__["checkUserName"]; });

/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./react/index/store/actions/header.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headerFormExpand", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["headerFormExpand"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headerFormSm", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["headerFormSm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headerNavDefault", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["headerNavDefault"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headerAddNew", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["headerAddNew"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeMainFavoriteStart", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["changeMainFavoriteStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeMainFavoriteReset", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["changeMainFavoriteReset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyInit", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["fetchNotifyInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyStart", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["fetchNotifyStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyFail", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["fetchNotifyFail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchNotify", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["fetchNotify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeFavNotifyInit", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["changeFavNotifyInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeFavNotifyStart", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["changeFavNotifyStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeFavNotifyFail", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["changeFavNotifyFail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeFavNotify", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["changeFavNotify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "showNavList", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["showNavList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchNavlistInit", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["fetchNavlistInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchNavlistStart", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["fetchNavlistStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchNavlist", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["fetchNavlist"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "showUserOption", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["showUserOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyactiveInit", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["fetchNotifyactiveInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyActive", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["fetchNotifyActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultNotifyactiveInit", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["defaultNotifyactiveInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultNotifyActive", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["defaultNotifyActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headerFilterInit", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["headerFilterInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headerFilterStart", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["headerFilterStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headerFilterFail", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["headerFilterFail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headerFilter", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["headerFilter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "headerFilterClose", function() { return _header__WEBPACK_IMPORTED_MODULE_1__["headerFilterClose"]; });

/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model */ "./react/index/store/actions/model.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCntInit", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["fetchCntInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCntFail", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["fetchCntFail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCntStart", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["fetchCntStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCntReset", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["fetchCntReset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCnt", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["fetchCnt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeCntInit", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeCntInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeCntStart", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeCntStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeCntFail", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeCntFail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeCntCancel", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeCntCancel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeCntReset", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeCntReset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeCnt", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeCnt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchVideo", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["fetchVideo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeFavInit", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeFavInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeFavPtStart", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeFavPtStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeFavPtFail", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeFavPtFail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeFav", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["changeFav"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetModel", function() { return _model__WEBPACK_IMPORTED_MODULE_2__["resetModel"]; });

/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filter */ "./react/index/store/actions/filter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCntCategInit", function() { return _filter__WEBPACK_IMPORTED_MODULE_3__["fetchCntCategInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCntCategStart", function() { return _filter__WEBPACK_IMPORTED_MODULE_3__["fetchCntCategStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCntCateg", function() { return _filter__WEBPACK_IMPORTED_MODULE_3__["fetchCntCateg"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterContentInit", function() { return _filter__WEBPACK_IMPORTED_MODULE_3__["filterContentInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterContentStart", function() { return _filter__WEBPACK_IMPORTED_MODULE_3__["filterContentStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterContentFail", function() { return _filter__WEBPACK_IMPORTED_MODULE_3__["filterContentFail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterContent", function() { return _filter__WEBPACK_IMPORTED_MODULE_3__["filterContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetFilter", function() { return _filter__WEBPACK_IMPORTED_MODULE_3__["resetFilter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterPost", function() { return _filter__WEBPACK_IMPORTED_MODULE_3__["filterPost"]; });

/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./share */ "./react/index/store/actions/share.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchUsersInit", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["fetchUsersInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchUsersFail", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["fetchUsersFail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchUsers", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["fetchUsers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "userSelect", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["userSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "viewUsers", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["viewUsers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeUser", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["removeUser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterUserInit", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["filterUserInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterUserSelectInit", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["filterUserSelectInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterUser", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["filterUser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterUserSelect", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["filterUserSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shareID", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["shareID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shareUserInit", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["shareUserInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shareUserStart", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["shareUserStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shareUserfail", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["shareUserfail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shareUser", function() { return _share__WEBPACK_IMPORTED_MODULE_4__["shareUser"]; });

/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tags */ "./react/index/store/actions/tags.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "changeTagsPath", function() { return _tags__WEBPACK_IMPORTED_MODULE_5__["changeTagsPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchTagsInit", function() { return _tags__WEBPACK_IMPORTED_MODULE_5__["fetchTagsInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchTagsStart", function() { return _tags__WEBPACK_IMPORTED_MODULE_5__["fetchTagsStart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchTagsFail", function() { return _tags__WEBPACK_IMPORTED_MODULE_5__["fetchTagsFail"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchTags", function() { return _tags__WEBPACK_IMPORTED_MODULE_5__["fetchTags"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchTagsSuccess", function() { return _tags__WEBPACK_IMPORTED_MODULE_5__["fetchTagsSuccess"]; });

/* harmony import */ var _trend__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./trend */ "./react/index/store/actions/trend.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchTrdInit", function() { return _trend__WEBPACK_IMPORTED_MODULE_6__["fetchTrdInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchTrd", function() { return _trend__WEBPACK_IMPORTED_MODULE_6__["fetchTrd"]; });

/* harmony import */ var _setQue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./setQue */ "./react/index/store/actions/setQue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCategInit", function() { return _setQue__WEBPACK_IMPORTED_MODULE_7__["fetchCategInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCateg", function() { return _setQue__WEBPACK_IMPORTED_MODULE_7__["fetchCateg"]; });

/* harmony import */ var _conv__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./conv */ "./react/index/store/actions/conv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchConvInit", function() { return _conv__WEBPACK_IMPORTED_MODULE_8__["fetchConvInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchConv", function() { return _conv__WEBPACK_IMPORTED_MODULE_8__["fetchConv"]; });

/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./main */ "./react/index/store/actions/main.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchPtActiveInit", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchPtActiveInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchPtActive", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchPtActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchQueActiveInit", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchQueActiveInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchQueActive", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchQueActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCntActiveInit", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchCntActiveInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchCntActive", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchCntActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchShareCntactiveInit", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchShareCntactiveInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchShareCntActive", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchShareCntActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchShareactiveInit", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchShareactiveInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchShareActive", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchShareActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchReqActiveInit", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchReqActiveInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fetchReqActive", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["fetchReqActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetActiveInit", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["resetActiveInit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetActive", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["resetActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "showMainBackdrop", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["showMainBackdrop"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hideMainBackdrop", function() { return _main__WEBPACK_IMPORTED_MODULE_9__["hideMainBackdrop"]; });












/***/ }),

/***/ "./react/index/store/actions/main.js":
/*!*******************************************!*\
  !*** ./react/index/store/actions/main.js ***!
  \*******************************************/
/*! exports provided: fetchPtActiveInit, fetchPtActive, fetchQueActiveInit, fetchQueActive, fetchCntActiveInit, fetchCntActive, fetchShareactiveInit, fetchShareActive, fetchReqActiveInit, fetchReqActive, fetchShareCntactiveInit, fetchShareCntActive, resetActiveInit, resetActive, showMainBackdrop, hideMainBackdrop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPtActiveInit", function() { return fetchPtActiveInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPtActive", function() { return fetchPtActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchQueActiveInit", function() { return fetchQueActiveInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchQueActive", function() { return fetchQueActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntActiveInit", function() { return fetchCntActiveInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntActive", function() { return fetchCntActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchShareactiveInit", function() { return fetchShareactiveInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchShareActive", function() { return fetchShareActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchReqActiveInit", function() { return fetchReqActiveInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchReqActive", function() { return fetchReqActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchShareCntactiveInit", function() { return fetchShareCntactiveInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchShareCntActive", function() { return fetchShareCntActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetActiveInit", function() { return resetActiveInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetActive", function() { return resetActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showMainBackdrop", function() { return showMainBackdrop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideMainBackdrop", function() { return hideMainBackdrop; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const fetchPtActiveInit = userID => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_PT_ACTIVE_INIT"],
    userID
  };
};
const fetchPtActive = ptActive => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_PT_ACTIVE"],
    ptActive
  };
};
const fetchQueActiveInit = queActive => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_QUE_ACTIVE_INIT"],
    queActive
  };
};
const fetchQueActive = queActive => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_QUE_ACTIVE"],
    queActive
  };
};
const fetchCntActiveInit = userID => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_ACTIVE_INIT"],
    userID
  };
};
const fetchCntActive = cntActive => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_ACTIVE"],
    cntActive
  };
};
const fetchShareactiveInit = userID => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_SHARE_ACTIVE_INIT"],
    userID
  };
};
const fetchShareActive = shareActive => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_SHARE_ACTIVE"],
    shareActive
  };
};
const fetchReqActiveInit = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_REQ_ACTIVE_INIT"]
  };
};
const fetchReqActive = reqActive => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_REQ_ACTIVE"],
    reqActive
  };
};
const fetchShareCntactiveInit = userID => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_SHARECNT_ACTIVE_INIT"],
    userID
  };
};
const fetchShareCntActive = shareCntActive => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_SHARECNT_ACTIVE"],
    shareCntActive
  };
};
const resetActiveInit = (userID, curTab) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["RESET_ACTIVE_INIT"],
    userID,
    curTab
  };
};
const resetActive = curTab => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["RESET_ACTIVE"],
    curTab
  };
};
const showMainBackdrop = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHOW_MAIN_BACKDROP"]
  };
};
const hideMainBackdrop = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["HIDE_MAIN_BACKDROP"]
  };
};

/***/ }),

/***/ "./react/index/store/actions/model.js":
/*!********************************************!*\
  !*** ./react/index/store/actions/model.js ***!
  \********************************************/
/*! exports provided: fetchCntInit, fetchCntStart, fetchCntReset, fetchCntFail, fetchCnt, changeCntInit, changeCntStart, changeCntCancel, changeCntReset, changeCntFail, changeCnt, fetchVideo, changeFavInit, changeFavPtStart, changeFavPtFail, changeFav, resetModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntInit", function() { return fetchCntInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntStart", function() { return fetchCntStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntReset", function() { return fetchCntReset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntFail", function() { return fetchCntFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCnt", function() { return fetchCnt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCntInit", function() { return changeCntInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCntStart", function() { return changeCntStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCntCancel", function() { return changeCntCancel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCntReset", function() { return changeCntReset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCntFail", function() { return changeCntFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCnt", function() { return changeCnt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchVideo", function() { return fetchVideo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFavInit", function() { return changeFavInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFavPtStart", function() { return changeFavPtStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFavPtFail", function() { return changeFavPtFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFav", function() { return changeFav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetModel", function() { return resetModel; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const fetchCntInit = (userID, fetchType, fetchLimit, skipCnt, cntTotal) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_INIT"],
    userID,
    fetchType,
    fetchLimit,
    skipCnt,
    cntTotal
  };
};
const fetchCntStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_START"]
  };
};
const fetchCntReset = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_RESET"]
  };
};
const fetchCntFail = err => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_FAIL"],
    err
  };
};
const fetchCnt = (cnt, skipCnt, cntTotal) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT"],
    cnt,
    skipCnt,
    cntTotal
  };
};
const changeCntInit = (id, title, det, confirm, modelType) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT_INIT"],
    id,
    title,
    det,
    confirm,
    modelType
  };
};
const changeCntStart = (title, id, det, modelType) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT_START"],
    title,
    id,
    det,
    modelType
  };
};
const changeCntCancel = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT_CANCEL"]
  };
};
const changeCntReset = changed => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT_RESET"],
    changed
  };
};
const changeCntFail = err => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT_FAIL"],
    err
  };
};
const changeCnt = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT"]
  };
};
const fetchVideo = (id, url) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_VIDEO"],
    id,
    url
  };
};
const changeFavInit = (id, liked, favAdd, changedFav, userID, cntGrp) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_INIT"],
    id,
    liked,
    favAdd,
    changedFav,
    userID,
    cntGrp
  };
};
const changeFavPtStart = (id, isLiked) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_PT_START"],
    id,
    isLiked
  };
};
const changeFavPtFail = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_PT_FAIL"]
  };
};
const changeFav = changedFav => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE"],
    changedFav
  };
};
const resetModel = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["RESET_MODEL"]
  };
};

/***/ }),

/***/ "./react/index/store/actions/setQue.js":
/*!*********************************************!*\
  !*** ./react/index/store/actions/setQue.js ***!
  \*********************************************/
/*! exports provided: fetchCategInit, fetchCategStart, fetchCategSuccess, fetchCategFail, fetchCateg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCategInit", function() { return fetchCategInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCategStart", function() { return fetchCategStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCategSuccess", function() { return fetchCategSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCategFail", function() { return fetchCategFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCateg", function() { return fetchCateg; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const fetchCategInit = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CATEG_INIT"]
  };
};
const fetchCategStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CATEG_START"]
  };
};
const fetchCategSuccess = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CATEG_SUCCESS"]
  };
};
const fetchCategFail = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CATEG_FAIL"]
  };
};
const fetchCateg = categ => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CATEG"],
    categ
  };
};

/***/ }),

/***/ "./react/index/store/actions/share.js":
/*!********************************************!*\
  !*** ./react/index/store/actions/share.js ***!
  \********************************************/
/*! exports provided: fetchUsersInit, fetchUsersStart, fetchUsersFail, fetchUsers, userSelect, viewUsers, removeUser, filterUserInit, filterUser, filterUserSelectInit, filterUserSelect, shareID, shareUserInit, shareUserStart, shareUserfail, shareUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUsersInit", function() { return fetchUsersInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUsersStart", function() { return fetchUsersStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUsersFail", function() { return fetchUsersFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUsers", function() { return fetchUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userSelect", function() { return userSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewUsers", function() { return viewUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeUser", function() { return removeUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterUserInit", function() { return filterUserInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterUser", function() { return filterUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterUserSelectInit", function() { return filterUserSelectInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterUserSelect", function() { return filterUserSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareID", function() { return shareID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareUserInit", function() { return shareUserInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareUserStart", function() { return shareUserStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareUserfail", function() { return shareUserfail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareUser", function() { return shareUser; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const fetchUsersInit = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_USERS_INIT"]
  };
};
const fetchUsersStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_USERS_SUCCESS"]
  };
};
const fetchUsersFail = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_USERS_FAIL"]
  };
};
const fetchUsers = users => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_USERS"],
    users
  };
};
const userSelect = userSelect => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["USER_SELECT"],
    userSelect
  };
};
const viewUsers = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["VIEW_USERS"]
  };
};
const removeUser = users => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["REMOVE_USER"],
    users
  };
};
const filterUserInit = (users, filterContent) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_USER_INIT"],
    users,
    filterContent
  };
};
const filterUser = users => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_USER"],
    users
  };
};
const filterUserSelectInit = (filterContent, userSelect) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_USER_SELECT_INIT"],
    filterContent,
    userSelect
  };
};
const filterUserSelect = userSelect => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_USER_SELECT"],
    userSelect
  };
};
const shareID = (shareID, cntType) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHARE_ID"],
    shareID,
    cntType
  };
};
const shareUserInit = (userSelect, shareID, cntType) => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHARE_USER_INIT"],
    userSelect,
    shareID,
    cntType
  };
};
const shareUserStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHARE_USER_START"]
  };
};
const shareUserfail = err => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHARE_USER_FAIL"],
    err
  };
};
const shareUser = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHARE_USER"]
  };
};

/***/ }),

/***/ "./react/index/store/actions/tags.js":
/*!*******************************************!*\
  !*** ./react/index/store/actions/tags.js ***!
  \*******************************************/
/*! exports provided: changeTagsPath, fetchTagsInit, fetchTagsStart, fetchTagsSuccess, fetchTagsFail, fetchTags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeTagsPath", function() { return changeTagsPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTagsInit", function() { return fetchTagsInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTagsStart", function() { return fetchTagsStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTagsSuccess", function() { return fetchTagsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTagsFail", function() { return fetchTagsFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTags", function() { return fetchTags; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const changeTagsPath = path => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_TAGS_PATH"],
    path
  };
};
const fetchTagsInit = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TAGS_INIT"]
  };
};
const fetchTagsStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TAGS_START"]
  };
};
const fetchTagsSuccess = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TAGS_SUCCESS"]
  };
};
const fetchTagsFail = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TAGS_FAIL"]
  };
};
const fetchTags = tags => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TAGS"],
    tags
  };
};

/***/ }),

/***/ "./react/index/store/actions/trend.js":
/*!********************************************!*\
  !*** ./react/index/store/actions/trend.js ***!
  \********************************************/
/*! exports provided: fetchTrdInit, fetchTrdStart, fetchTrdSuccess, fetchTrdFail, fetchTrd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTrdInit", function() { return fetchTrdInit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTrdStart", function() { return fetchTrdStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTrdSuccess", function() { return fetchTrdSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTrdFail", function() { return fetchTrdFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTrd", function() { return fetchTrd; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./react/index/store/actions/actionTypes.js");

const fetchTrdInit = userID => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TRD_INIT"],
    userID
  };
};
const fetchTrdStart = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TRD_START"]
  };
};
const fetchTrdSuccess = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TRD_SUCCESS"]
  };
};
const fetchTrdFail = () => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TRD_FAIL"]
  };
};
const fetchTrd = trd => {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TRD"],
    trd
  };
};

/***/ }),

/***/ "./react/index/store/reducers/auth.js":
/*!********************************************!*\
  !*** ./react/index/store/reducers/auth.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");


const initialState = {
  status: false,
  img: null,
  username: null
};

const checkAuth = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    status: action.status
  });
};

const checkUserImg = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    img: action.img
  });
};

const checkUserName = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    username: action.name
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHECK_AUTH"]:
      return checkAuth(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHECK_USERIMG"]:
      return checkUserImg(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHECK_USERNAME"]:
      return checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/reducers/conv.js":
/*!********************************************!*\
  !*** ./react/index/store/reducers/conv.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");


const initialState = {
  conv: null
};

const fetchConv = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    conv: action.conv
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CONV"]:
      return fetchConv(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/reducers/filter.js":
/*!**********************************************!*\
  !*** ./react/index/store/reducers/filter.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");


const initialState = {
  cntCateg: null,
  filterStart: false,
  totalFound: null,
  filterErr: null
};

const fetchCntCateg = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    cntCateg: action.categ
  });
};

const filterContentStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    filterStart: true,
    filterErr: null
  });
};

const filterContentFail = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    filterErr: action.err
  });
};

const filterContent = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    totalFound: action.totalFound
  });
};

const resetFilter = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    totalFound: null,
    filterErr: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNTCATEG"]:
      return fetchCntCateg(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_CONTENT_START"]:
      return filterContentStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_CONTENT_FAIL"]:
      return filterContentFail(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_CONTENT"]:
      return filterContent(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["RESET_FILTER"]:
      return resetFilter(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/reducers/header.js":
/*!**********************************************!*\
  !*** ./react/index/store/reducers/header.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");


const initialState = {
  expand: false,
  hideFormSm: false,
  addNew: false,
  favChange: null,
  notify: null,
  hidNotify: false,
  navList: null,
  navListCateg: null,
  hidNavList: false,
  hidUserOption: false,
  notifyActive: null,
  default: false,
  searchCnt: null,
  filterPos: 0,
  filterLastPos: 0,
  searchCntErr: null,
  filterStart: false
};

const formExpand = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const formSm = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    hideFormSm: false,
    default: false
  });
};

const navDefault = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    expand: false,
    hideFormSm: true,
    addNew: false,
    hidNotify: true,
    hidNavList: true,
    hidUserOption: true,
    default: true
  });
};

const addNew = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    addNew: !state.addNew,
    default: false
  });
};

const changeMainFavStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    favChange: action.isLiked
  });
};

const changeMainFavReset = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    favChange: null
  });
};

const fetchNotify = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const fetchNotifyStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const changeFavNotifyStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    notify: action.notify
  });
};

const changeFavNotify = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    notify: action.notify
  });
};

const showNavList = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const fetchNavListStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    navList: null,
    navListCateg: null
  });
};

const fetchNavList = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const showUserOption = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const fetchNotifyActive = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    notifyActive: action.notifyActive
  });
};

const defaultNotifyActive = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    notifyActive: null
  });
};

const headerFilterStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const headerFilterFail = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    searchCntErr: action.searchCntErr
  });
};

const headerFilter = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    searchCnt: action.searchCnt
  });
};

const headerFilterClose = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    searchCnt: null,
    filterStart: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FORM_EXPAND"]:
      return formExpand(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FORM_SM"]:
      return formSm(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_NAV_DEFAULT"]:
      return navDefault(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_ADD_NEW"]:
      return addNew(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_MAINFAVORITE_START"]:
      return changeMainFavStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_MAINFAVORITE_RESET"]:
      return changeMainFavReset(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY_START"]:
      return fetchNotifyStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY"]:
      return fetchNotify(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_NOTIFY_START"]:
      return changeFavNotifyStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_NOTIFY"]:
      return changeFavNotify(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHOW_NAV_LIST"]:
      return showNavList(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NAVLIST_START"]:
      return fetchNavListStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NAVLIST"]:
      return fetchNavList(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHOW_USER_OPTION"]:
      return showUserOption(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_NOTIFY_ACTIVE"]:
      return fetchNotifyActive(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_NOTIFYACTIVE"]:
      return defaultNotifyActive(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FILTER_START"]:
      return headerFilterStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FILTER_FAIL"]:
      return headerFilterFail(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FILTER_CLOSE"]:
      return headerFilterClose(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["HEADER_FILTER"]:
      return headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/reducers/main.js":
/*!********************************************!*\
  !*** ./react/index/store/reducers/main.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const initialState = {
  showBackdrop: false,
  cntActive: null,
  ptActive: null,
  queActive: null,
  reqActive: null,
  shareActive: null,
  shareCntActive: null
};

const fetchPtActive = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    ptActive: action.ptActive
  });
};

const fetchQueActive = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    queActive: action.queActive
  });
};

const fetchCntActive = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    cntActive: action.cntActive
  });
};

const fetchReqActive = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    reqActive: action.reqActive
  });
};

const fetchShareActive = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    shareActive: action.shareActive
  });
};

const fetchShareCntActive = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    shareCntActive: action.shareCntActive
  });
};

const resetActive = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, _objectSpread({}, state));
};

const showMainBackdrop = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    showBackdrop: true
  });
};

const hideMainBackdrop = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    showBackdrop: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_PT_ACTIVE"]:
      return fetchPtActive(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_QUE_ACTIVE"]:
      return fetchQueActive(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_ACTIVE"]:
      return fetchCntActive(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_SHARECNT_ACTIVE"]:
      return fetchShareCntActive(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_SHARE_ACTIVE"]:
      return fetchShareActive(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_REQ_ACTIVE"]:
      return fetchReqActive(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["RESET_ACTIVE"]:
      return resetActive(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHOW_MAIN_BACKDROP"]:
      return showMainBackdrop(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["HIDE_MAIN_BACKDROP"]:
      return hideMainBackdrop(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/reducers/model.js":
/*!*********************************************!*\
  !*** ./react/index/store/reducers/model.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");


const initialState = {
  cnts: null,
  cntErr: null,
  skipCnt: null,
  cntTotal: null,
  showLoader: false,
  changedFav: [],
  favChange: null,
  postVideo: {
    id: null
  },
  videoErr: null,
  filterDet: null,
  modelType: null,
  changeCnt: false,
  changeCntErr: null,
  changeCntStart: null
};

const fetchCnt = (state, action) => {
  let cnts = !state.cnts ? action.cnt : state.cnts.concat(...action.cnt);
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    cnts,
    skipCnt: action.skipCnt,
    cntTotal: action.cntTotal,
    showLoader: false
  });
};

const fetchCntReset = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    cnts: null,
    skipCnt: null,
    cntTotal: null,
    curTab: null,
    showLoader: false
  });
};

const fetchCntStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    showLoader: true
  });
};

const fetchPostFail = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    cntErr: action.err,
    showLoader: false
  });
};

const changeCntStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    changeCntStart: {
      title: action.title,
      id: action.id,
      det: action.det,
      modelType: action.modelType
    },
    changeCntErr: null
  });
};

const changeCntCancel = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const changeCntReset = (state, action) => {
  let cnts = [...state.cnts];

  if (action.changed) {
    if (state.changeCntStart.det === 'addUser') {
      let updateCnts = Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["changeMode"])(cnts, state.changeCntStart, 'pending', true);
      return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'acceptUser') {
      let updateCnts = Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["changeMode"])(cnts, state.changeCntStart, 'accept', true);
      return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'rejUser') {
      let updateCnts = Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["changeMode"])(cnts, state.changeCntStart, 'request', false);
      return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'cancelReq') {
      let updateCnts = Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["changeMode"])(cnts, state.changeCntStart, 'pending', false);
      return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'unfriend') {
      let updateCnts = Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["changeMode"])(cnts, state.changeCntStart, 'accept', false);
      return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'blockUser') {
      let updateCnt = cnts.filter(cnt => cnt.id !== state.changeCntStart.id);
      return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
        cnts: updateCnt,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    let updateCnt = cnts.filter(cnt => cnt._id !== state.changeCntStart.id);
    return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
      cnts: updateCnt,
      changeCntStart: null,
      changeCntErr: null,
      changeCnt: false
    });
  }

  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    cnts,
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const changeCntFail = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    changeCntErr: action.err
  });
};

const changeCnt = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    changeCnt: true
  });
};

const fetchVideo = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    postVideo: {
      id: action.id,
      url: action.url
    }
  });
};

const changeFavPtStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    favChange: {
      id: action.id,
      isLiked: action.isLiked
    }
  });
};

const changeFavPtFail = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    favChange: null
  });
};

const changeFav = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    changedFav: action.changedFav,
    favChange: null
  });
};

const filterPost = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    filterDet: action.filterDet
  });
};

const resetModel = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    cntErr: null,
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT"]:
      return fetchCnt(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_START"]:
      return fetchCntStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_RESET"]:
      return fetchCntReset(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CNT_FAIL"]:
      return fetchPostFail(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT_START"]:
      return changeCntStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT_CANCEL"]:
      return changeCntCancel(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT_RESET"]:
      return changeCntReset(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT_FAIL"]:
      return changeCntFail(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_CNT"]:
      return changeCnt(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_VIDEO"]:
      return fetchVideo(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE"]:
      return changeFav(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_PT_START"]:
      return changeFavPtStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_FAVORITE_PT_FAIL"]:
      return changeFavPtFail(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_POST"]:
      return filterPost(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["RESET_MODEL"]:
      return resetModel(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/reducers/setQue.js":
/*!**********************************************!*\
  !*** ./react/index/store/reducers/setQue.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");


const initialState = {
  categ: null
};

const fetchCateg = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    categ: action.categ
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_CATEG"]:
      return fetchCateg(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/reducers/share.js":
/*!*********************************************!*\
  !*** ./react/index/store/reducers/share.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");


const initialState = {
  users: null,
  userSelect: null,
  filterUser: null,
  filterUserSelect: null,
  viewAllUsers: true,
  shareID: null,
  cntType: null,
  start: false,
  shareErr: null
};

const fetchUsers = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    users: action.users,
    filterUser: null
  });
};

const userSelect = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    userSelect: action.userSelect
  });
};

const viewUsers = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    viewAllUsers: !state.viewAllUsers
  });
};

const removeUser = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    userSelect: action.users,
    viewAllUsers: action.users && !action.users.length > 0
  });
};

const filterUser = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    filterUser: action.users
  });
};

const filterUserSelect = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    filterUserSelect: action.userSelect
  });
};

const shareID = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    shareID: String(action.shareID),
    cntType: action.cntType
  });
};

const shareUserStart = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    start: true
  });
};

const shareUserFail = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    shareErr: action.err
  });
};

const shareUser = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    users: null,
    userSelect: null,
    filterUser: null,
    filterUserSelect: null,
    viewAllUsers: true,
    shareID: null,
    share: false,
    start: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_USERS"]:
      return fetchUsers(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["USER_SELECT"]:
      return userSelect(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["VIEW_USERS"]:
      return viewUsers(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["REMOVE_USER"]:
      return removeUser(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_USER"]:
      return filterUser(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FILTER_USER_SELECT"]:
      return filterUserSelect(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHARE_ID"]:
      return shareID(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHARE_USER_START"]:
      return shareUserStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHARE_USER_FAIL"]:
      return shareUserFail(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["SHARE_USER"]:
      return shareUser(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/reducers/tags.js":
/*!********************************************!*\
  !*** ./react/index/store/reducers/tags.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");


const initialState = {
  path: null,
  tags: null
};

const fetchTags = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    tags: action.tags
  });
};

const changeTagsPath = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    path: action.path
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_TAGS_PATH"]:
      return changeTagsPath(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TAGS"]:
      return fetchTags(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/reducers/trend.js":
/*!*********************************************!*\
  !*** ./react/index/store/reducers/trend.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");


const initialState = {
  trends: null
};

const fetchTrds = (state, action) => {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["updateObject"])(state, {
    trends: action.trd
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_0__["FETCH_TRD"]:
      return fetchTrds(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./react/index/store/sagas/auth.js":
/*!*****************************************!*\
  !*** ./react/index/store/sagas/auth.js ***!
  \*****************************************/
/*! exports provided: checkAuthInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkAuthInitSaga", function() { return checkAuthInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../axios */ "./react/index/axios.js");



function* checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["checkAuth"](true));

    try {
      let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["checkUserImg"](response.data.url));
      } else {
        yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["checkUserName"](response.data.name));
      }
    } catch (err) {}
  }
}

/***/ }),

/***/ "./react/index/store/sagas/conv.js":
/*!*****************************************!*\
  !*** ./react/index/store/sagas/conv.js ***!
  \*****************************************/
/*! exports provided: fetchConvInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchConvInitSaga", function() { return fetchConvInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");


function* fetchConvInitSaga(action) {
  const data = [{
    id: '63763637737',
    type: 'grpChat',
    groupImage: '/',
    title: 'The real community for programmers The real community for programmers The real community for programmers',
    lastMsg: 'Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while',
    online: '5353535',
    offline: '63636363'
  }, {
    id: '7575848839939',
    type: 'pvtChat',
    userImage: '/',
    status: true,
    user: 'user user',
    convCreated: '2m ago',
    lastMsg: 'Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while'
  }];
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchConv"]([...data]));
}

/***/ }),

/***/ "./react/index/store/sagas/filter.js":
/*!*******************************************!*\
  !*** ./react/index/store/sagas/filter.js ***!
  \*******************************************/
/*! exports provided: fetchCntCategInitSaga, filterContentInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntCategInitSaga", function() { return fetchCntCategInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterContentInitSaga", function() { return filterContentInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../axios */ "./react/index/axios.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");




function* fetchCntCategInitSaga(action) {
  try {
    if (action.categ && action.categ.length > 0) {
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchCntCateg"]([...action.categ]));
    } else {
      let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/header', {
        categ: 'question'
      }, {
        headers: {
          'data-categ': 'category'
        }
      });
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchCntCateg"](response.data));
    }
  } catch (e) {}
}
function* filterContentInitSaga(action) {
  let categs = [];

  for (let categ of action.content.category) {
    categs.push(categ.category);
  }

  let filterDet = Object(_shared_utility__WEBPACK_IMPORTED_MODULE_3__["updateObject"])(action.content, {
    category: categs
  });
  let filterCnt = JSON.stringify(filterDet);

  if (!action.content.apply) {
    try {
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["filterContentStart"]());
      let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/header', {
        filterCnt,
        model: 'question'
      }, {
        headers: {
          'data-categ': 'cntSearch'
        }
      });
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["filterContent"](response.data));
    } catch (err) {
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["filterContentFail"](err));
    }

    return;
  }

  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["filterPost"](filterCnt));
}

/***/ }),

/***/ "./react/index/store/sagas/header.js":
/*!*******************************************!*\
  !*** ./react/index/store/sagas/header.js ***!
  \*******************************************/
/*! exports provided: fetchNotifyInitSaga, changeFavNotifySaga, fetchNavlistInitSaga, fetchNotifyActiveInitSaga, defaultNotifyActiveInitSaga, headerFilterInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyInitSaga", function() { return fetchNotifyInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFavNotifySaga", function() { return changeFavNotifySaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNavlistInitSaga", function() { return fetchNavlistInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchNotifyActiveInitSaga", function() { return fetchNotifyActiveInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultNotifyActiveInitSaga", function() { return defaultNotifyActiveInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerFilterInitSaga", function() { return headerFilterInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../axios */ "./react/index/axios.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");




function* fetchNotifyInitSaga(action) {
  try {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["fetchNotifyStart"]());
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_1__["default"].post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["fetchNotify"](response.data.coll));
    } else {
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["fetchNotify"]([]));
    }
  } catch (err) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["fetchNotifyFail"](err));
  }
}
function* changeFavNotifySaga(action) {
  let notify = Object(_shared_utility__WEBPACK_IMPORTED_MODULE_2__["changeFav"])(action.notify, action.notifyID);
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["changeFavNotifyStart"](notify.updateStartArray));
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["changeFavNotify"](notify.updateDataArray));
}
function* fetchNavlistInitSaga(action) {
  try {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["fetchNavlistStart"]());
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_1__["default"].post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["fetchNavlist"](action.category, response.data));
  } catch (e) {}
}
function* fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_1__["default"].post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["fetchNotifyActive"](response.data.collTotal));
  } catch (err) {}
}
function* defaultNotifyActiveInitSaga(action) {
  try {
    yield _axios__WEBPACK_IMPORTED_MODULE_1__["default"].post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["defaultNotifyActive"]());
  } catch (err) {}
}
function* headerFilterInitSaga(action) {
  try {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["headerFilterStart"](action.filterPos, action.filterLastPos));
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_1__["default"].post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["headerFilter"](response.data));
  } catch (err) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_3__["headerFilterFail"](err));
  }
}

/***/ }),

/***/ "./react/index/store/sagas/index.js":
/*!******************************************!*\
  !*** ./react/index/store/sagas/index.js ***!
  \******************************************/
/*! exports provided: watchAuth, watchCnt, watchFilter, watchShare, watchTags, watchTrd, watchSetQue, watchConv, watchHeader, watchMain, rootSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchAuth", function() { return watchAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchCnt", function() { return watchCnt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchFilter", function() { return watchFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchShare", function() { return watchShare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchTags", function() { return watchTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchTrd", function() { return watchTrd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchSetQue", function() { return watchSetQue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchConv", function() { return watchConv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchHeader", function() { return watchHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watchMain", function() { return watchMain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rootSaga", function() { return rootSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/actions/actionTypes */ "./react/index/store/actions/actionTypes.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth */ "./react/index/store/sagas/auth.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model */ "./react/index/store/sagas/model.js");
/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter */ "./react/index/store/sagas/filter.js");
/* harmony import */ var _share__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./share */ "./react/index/store/sagas/share.js");
/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tags */ "./react/index/store/sagas/tags.js");
/* harmony import */ var _trend__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./trend */ "./react/index/store/sagas/trend.js");
/* harmony import */ var _setQue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./setQue */ "./react/index/store/sagas/setQue.js");
/* harmony import */ var _conv__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./conv */ "./react/index/store/sagas/conv.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./header */ "./react/index/store/sagas/header.js");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./main */ "./react/index/store/sagas/main.js");












function* watchAuth() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["CHECK_AUTH_INIT"], _auth__WEBPACK_IMPORTED_MODULE_2__["checkAuthInitSaga"])]);
}
function* watchCnt() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_CNT_INIT"], _model__WEBPACK_IMPORTED_MODULE_3__["fetchCntInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["CHANGE_FAVORITE_INIT"], _model__WEBPACK_IMPORTED_MODULE_3__["changeFavSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["CHANGE_CNT_INIT"], _model__WEBPACK_IMPORTED_MODULE_3__["changeCntInitSaga"])]);
}
function* watchFilter() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_CNTCATEG_INIT"], _filter__WEBPACK_IMPORTED_MODULE_4__["fetchCntCategInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FILTER_CONTENT_INIT"], _filter__WEBPACK_IMPORTED_MODULE_4__["filterContentInitSaga"])]);
}
function* watchShare() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_USERS_INIT"], _share__WEBPACK_IMPORTED_MODULE_5__["fetchUsersInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FILTER_USER_INIT"], _share__WEBPACK_IMPORTED_MODULE_5__["filterUserInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FILTER_USER_SELECT_INIT"], _share__WEBPACK_IMPORTED_MODULE_5__["filterUserSelectInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["SHARE_USER_INIT"], _share__WEBPACK_IMPORTED_MODULE_5__["shareUserInitSaga"])]);
}
function* watchTags() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_TAGS_INIT"], _tags__WEBPACK_IMPORTED_MODULE_6__["fetchTagsInitSaga"]);
}
function* watchTrd() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_TRD_INIT"], _trend__WEBPACK_IMPORTED_MODULE_7__["fetchTrdInitSaga"])]);
}
function* watchSetQue() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_CATEG_INIT"], _setQue__WEBPACK_IMPORTED_MODULE_8__["fetchCategInitSaga"]);
}
function* watchConv() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_CONV_INIT"], _conv__WEBPACK_IMPORTED_MODULE_9__["fetchConvInitSaga"]);
}
function* watchHeader() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_NOTIFY_INIT"], _header__WEBPACK_IMPORTED_MODULE_10__["fetchNotifyInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["CHANGE_FAVORITE_NOTIFY_INIT"], _header__WEBPACK_IMPORTED_MODULE_10__["changeFavNotifySaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_NAVLIST_INIT"], _header__WEBPACK_IMPORTED_MODULE_10__["fetchNavlistInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_NOTIFY_ACTIVE_INIT"], _header__WEBPACK_IMPORTED_MODULE_10__["fetchNotifyActiveInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_NOTIFYACTIVE_INIT"], _header__WEBPACK_IMPORTED_MODULE_10__["defaultNotifyActiveInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_SHARE_ACTIVE_INIT"], _main__WEBPACK_IMPORTED_MODULE_11__["fetchShareActiveInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["HEADER_FILTER_INIT"], _header__WEBPACK_IMPORTED_MODULE_10__["headerFilterInitSaga"])]);
}
function* watchMain() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_PT_ACTIVE_INIT"], _main__WEBPACK_IMPORTED_MODULE_11__["fetchPtActiveInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_QUE_ACTIVE_INIT"], _main__WEBPACK_IMPORTED_MODULE_11__["fetchQueActiveInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_CNT_ACTIVE_INIT"], _main__WEBPACK_IMPORTED_MODULE_11__["fetchCntActiveInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_SHARE_ACTIVE_INIT"], _main__WEBPACK_IMPORTED_MODULE_11__["fetchShareActiveInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_SHARECNT_ACTIVE_INIT"], _main__WEBPACK_IMPORTED_MODULE_11__["fetchShareCntActiveInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["FETCH_REQ_ACTIVE_INIT"], _main__WEBPACK_IMPORTED_MODULE_11__["fetchReqActiveInitSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])(_store_actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["RESET_ACTIVE_INIT"], _main__WEBPACK_IMPORTED_MODULE_11__["resetActiveInitSaga"])]);
}
function* rootSaga() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([watchAuth(), watchCnt(), watchFilter(), watchShare(), watchTags(), watchTrd(), watchSetQue(), watchHeader(), watchConv(), watchMain()]);
}

/***/ }),

/***/ "./react/index/store/sagas/main.js":
/*!*****************************************!*\
  !*** ./react/index/store/sagas/main.js ***!
  \*****************************************/
/*! exports provided: fetchPtActiveInitSaga, fetchQueActiveInitSaga, fetchCntActiveInitSaga, fetchShareCntActiveInitSaga, fetchReqActiveInitSaga, fetchShareActiveInitSaga, resetActiveInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPtActiveInitSaga", function() { return fetchPtActiveInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchQueActiveInitSaga", function() { return fetchQueActiveInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntActiveInitSaga", function() { return fetchCntActiveInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchShareCntActiveInitSaga", function() { return fetchShareCntActiveInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchReqActiveInitSaga", function() { return fetchReqActiveInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchShareActiveInitSaga", function() { return fetchShareActiveInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetActiveInitSaga", function() { return resetActiveInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../axios */ "./react/index/axios.js");



function* fetchPtActiveInitSaga(action) {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/header', {
      model: 'post'
    }, {
      headers: {
        'data-categ': ' modelNotify'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchPtActive"](response.data));
    return;
  } catch (err) {}
}
function* fetchQueActiveInitSaga(action) {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/header', {
      model: 'question'
    }, {
      headers: {
        'data-categ': ' modelNotify'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchQueActive"](response.data));
    return;
  } catch (err) {}
}
function* fetchCntActiveInitSaga(action) {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/header', {
      model: 'poet'
    }, {
      headers: {
        'data-categ': ' modelNotify'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchCntActive"](response.data));
  } catch (err) {}
}
function* fetchShareCntActiveInitSaga(action) {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/header', {
      model: 'question'
    }, {
      headers: {
        'data-categ': 'share'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchShareCntActive"](response.data));
  } catch (err) {}
}
function* fetchReqActiveInitSaga(action) {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/users', null, {
      headers: {
        'data-categ': 'request-activeOnly'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchReqActive"](response.data));
  } catch (err) {}
}
function* fetchShareActiveInitSaga(action) {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchShareActive"](response.data));
  } catch (err) {}
}
function* resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'helpme') {
      yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].patch('/header', {
        model: 'question'
      }, {
        headers: {
          'data-categ': 'share'
        }
      });
    } else {
      yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].patch('/header', {
        model: action.curTab
      }, {
        headers: {
          'data-categ': 'modelNotify'
        }
      });
    }

    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["resetActive"](action.curTab));
  } catch (err) {}
}

/***/ }),

/***/ "./react/index/store/sagas/model.js":
/*!******************************************!*\
  !*** ./react/index/store/sagas/model.js ***!
  \******************************************/
/*! exports provided: fetchCntInitSaga, changeFavSaga, changeCntInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCntInitSaga", function() { return fetchCntInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFavSaga", function() { return changeFavSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeCntInitSaga", function() { return changeCntInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/utility */ "./react/index/shared/utility.js");
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../axios */ "./react/index/axios.js");




function* fetchCntInitSaga(action) {
  let model = action.fetchType === 'post' ? '/post' : action.fetchType === 'question' || action.fetchType === 'shared' ? '/question' : '/' + action.fetchType;
  let categ = action.fetchType === 'shared' ? `shared-${action.userID}` : action.fetchType;

  if (action.cntTotal > action.skipCnt) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["fetchCntStart"]());
  }

  try {
    if (action.cntTotal === 0 || action.cntTotal > action.skipCnt) {
      let response = yield _axios__WEBPACK_IMPORTED_MODULE_3__["default"].post(model, null, {
        headers: {
          'data-categ': categ,
          'limit': action.fetchLimit,
          'skip': action.skipCnt
        }
      });
      yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["fetchCnt"](response.data.cnt, action.skipCnt, response.data.cntTotal));
    }
  } catch (err) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["fetchCntFail"](err));
  }
}
function* changeFavSaga(action) {
  let updateFav = Object(_shared_utility__WEBPACK_IMPORTED_MODULE_1__["changeFav"])(action.id, action.liked, action.favAdd, action.changedFav);
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeMainFavoriteStart"](updateFav.favDet.liked));
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeFavPtStart"](updateFav.favDet.id, updateFav.favDet.liked));

  try {
    let field = action.cntGrp === 'post' ? 'postID' : action.cntGrp === 'question' ? 'queID' : 'pwtID';
    yield _axios__WEBPACK_IMPORTED_MODULE_3__["default"].patch('/header', {
      id: updateFav.favDet.id,
      model: action.cntGrp,
      field
    }, {
      headers: {
        'data-categ': 'changefavorite'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["delay"])(500);
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeMainFavoriteReset"]());
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeFav"](updateFav.updateChangeFav));
  } catch (err) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["delay"])(500);
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeMainFavoriteReset"]());
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeFavPtFail"]());
  }
}
function* changeCntInitSaga(action) {
  let field = action.modelType === 'post' ? 'postID' : action.modelType === 'question' ? 'queID' : 'pwtID';

  if (!action.confirm) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeCntStart"](action.title, action.id, action.det, action.modelType));
    return;
  }

  if (action.det === 'addUser') {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeCntStart"](action.title, action.id, action.det, action.modelType));
  }

  try {
    if (action.det === 'delete') {
      let payload = JSON.stringify({
        id: action.id,
        model: action.modelType,
        field
      });
      yield _axios__WEBPACK_IMPORTED_MODULE_3__["default"].delete('/header', {
        headers: {
          'data-categ': `deletecnt-${payload}`
        }
      });
    } else if (action.modelType === 'user') {
      yield _axios__WEBPACK_IMPORTED_MODULE_3__["default"].patch('/users', {
        id: action.id
      }, {
        headers: {
          'data-categ': action.det
        }
      });
    } else {
      yield _axios__WEBPACK_IMPORTED_MODULE_3__["default"].patch('/header', {
        id: action.id,
        model: action.modelType,
        field
      }, {
        headers: {
          'data-categ': 'draftmode'
        }
      });
    }

    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeCnt"]());
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["delay"])(1000);
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeCntReset"](true));
  } catch (err) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeCntFail"](err));
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["delay"])(1000);
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["changeCntReset"](false));
  }
}

/***/ }),

/***/ "./react/index/store/sagas/setQue.js":
/*!*******************************************!*\
  !*** ./react/index/store/sagas/setQue.js ***!
  \*******************************************/
/*! exports provided: fetchCategInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchCategInitSaga", function() { return fetchCategInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");


const CATEG = ['post', 'question', 'social', 'writers', 'poet', 'poeters', 'poem', 'post', 'question', 'social', 'writers', 'poet', 'poeters', 'poem'];
function* fetchCategInitSaga() {
  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchCateg"](CATEG));
}

/***/ }),

/***/ "./react/index/store/sagas/share.js":
/*!******************************************!*\
  !*** ./react/index/store/sagas/share.js ***!
  \******************************************/
/*! exports provided: fetchUsersInitSaga, filterUserInitSaga, filterUserSelectInitSaga, shareUserInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUsersInitSaga", function() { return fetchUsersInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterUserInitSaga", function() { return filterUserInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterUserSelectInitSaga", function() { return filterUserSelectInitSaga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareUserInitSaga", function() { return shareUserInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../axios */ "./react/index/axios.js");



function* fetchUsersInitSaga() {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].post('/users', null, {
      headers: {
        'data-categ': `allteacher-notab`
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchUsers"](response.data));
  } catch (err) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["fetchUsersFail"](err));
  }
}
function* filterUserInitSaga(action) {
  let filterUser = null;

  if (!action.filterContent) {
    filterUser = action.users;
  } else {
    filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
  }

  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["filterUser"](filterUser));
}
function* filterUserSelectInitSaga(action) {
  let filterUser = null;

  if (!action.filterContent) {
    filterUser = action.userSelect;
  } else {
    filterUser = action.userSelect.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
  }

  yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["filterUserSelect"](filterUser));
}
function* shareUserInitSaga(action) {
  let shareUser = [];

  for (let user of [...action.userSelect]) {
    shareUser.push(user.id);
  }

  try {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["shareUserStart"]());
    let field = action.cntType === 'post' ? 'postID' : action.cntType === 'question' ? 'queID' : 'pwtID';
    yield _axios__WEBPACK_IMPORTED_MODULE_2__["default"].patch('/header', {
      users: JSON.stringify(shareUser),
      id: action.shareID,
      model: action.cntType,
      field
    }, {
      headers: {
        'data-categ': 'shareuser'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["delay"])(1000);
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["shareUser"]());
  } catch (err) {
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["shareUserfail"](err));
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["delay"])(1000);
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_1__["shareUser"]());
  }
}

/***/ }),

/***/ "./react/index/store/sagas/tags.js":
/*!*****************************************!*\
  !*** ./react/index/store/sagas/tags.js ***!
  \*****************************************/
/*! exports provided: fetchTagsInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTagsInitSaga", function() { return fetchTagsInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../axios */ "./react/index/axios.js");
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");



function* fetchTagsInitSaga() {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_1__["default"].post('/post', null, {
      headers: {
        'data-categ': 'postCateg'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["fetchTags"](response.data));
  } catch (e) {}
}

/***/ }),

/***/ "./react/index/store/sagas/trend.js":
/*!******************************************!*\
  !*** ./react/index/store/sagas/trend.js ***!
  \******************************************/
/*! exports provided: fetchTrdInitSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchTrdInitSaga", function() { return fetchTrdInitSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../axios */ "./react/index/axios.js");
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../store/actions/index */ "./react/index/store/actions/index.js");



function* fetchTrdInitSaga(action) {
  try {
    let response = yield _axios__WEBPACK_IMPORTED_MODULE_1__["default"].post('/header', {}, {
      headers: {
        'data-categ': 'trend'
      }
    });
    yield Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_store_actions_index__WEBPACK_IMPORTED_MODULE_2__["fetchTrd"](response.data));
  } catch (e) {}
}

/***/ }),

/***/ "./store.js":
/*!******************!*\
  !*** ./store.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga */ "redux-saga");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _react_index_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./react/index/index.css */ "./react/index/index.css");
/* harmony import */ var _react_index_index_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_react_index_index_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _react_index_store_reducers_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./react/index/store/reducers/auth */ "./react/index/store/reducers/auth.js");
/* harmony import */ var _react_index_store_reducers_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./react/index/store/reducers/model */ "./react/index/store/reducers/model.js");
/* harmony import */ var _react_index_store_reducers_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./react/index/store/reducers/filter */ "./react/index/store/reducers/filter.js");
/* harmony import */ var _react_index_store_reducers_share__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./react/index/store/reducers/share */ "./react/index/store/reducers/share.js");
/* harmony import */ var _react_index_store_reducers_tags__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./react/index/store/reducers/tags */ "./react/index/store/reducers/tags.js");
/* harmony import */ var _react_index_store_reducers_trend__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./react/index/store/reducers/trend */ "./react/index/store/reducers/trend.js");
/* harmony import */ var _react_index_store_reducers_setQue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./react/index/store/reducers/setQue */ "./react/index/store/reducers/setQue.js");
/* harmony import */ var _react_index_store_reducers_conv__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./react/index/store/reducers/conv */ "./react/index/store/reducers/conv.js");
/* harmony import */ var _react_index_store_reducers_header__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./react/index/store/reducers/header */ "./react/index/store/reducers/header.js");
/* harmony import */ var _react_index_store_reducers_main__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./react/index/store/reducers/main */ "./react/index/store/reducers/main.js");
/* harmony import */ var _react_index_store_sagas_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./react/index/store/sagas/index */ "./react/index/store/sagas/index.js");















const bindMiddleware = middleware => {
  if (true) {// const { composeWithDevTools } = require('redux-devtools-extension')
    // return composeWithDevTools(applyMiddleware(...middleware))
  }

  return Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(...middleware);
};

function configureStore(initialState = {}) {
  const sagaMiddleware = redux_saga__WEBPACK_IMPORTED_MODULE_1___default()();
  const rootReducers = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
    auth: _react_index_store_reducers_auth__WEBPACK_IMPORTED_MODULE_3__["default"],
    cnt: _react_index_store_reducers_model__WEBPACK_IMPORTED_MODULE_4__["default"],
    filter: _react_index_store_reducers_filter__WEBPACK_IMPORTED_MODULE_5__["default"],
    share: _react_index_store_reducers_share__WEBPACK_IMPORTED_MODULE_6__["default"],
    tags: _react_index_store_reducers_tags__WEBPACK_IMPORTED_MODULE_7__["default"],
    trd: _react_index_store_reducers_trend__WEBPACK_IMPORTED_MODULE_8__["default"],
    setQue: _react_index_store_reducers_setQue__WEBPACK_IMPORTED_MODULE_9__["default"],
    conv: _react_index_store_reducers_conv__WEBPACK_IMPORTED_MODULE_10__["default"],
    header: _react_index_store_reducers_header__WEBPACK_IMPORTED_MODULE_11__["default"],
    main: _react_index_store_reducers_main__WEBPACK_IMPORTED_MODULE_12__["default"]
  });
  const store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(rootReducers, initialState, bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(_react_index_store_sagas_index__WEBPACK_IMPORTED_MODULE_13__["rootSaga"]);
  return store;
}

/* harmony default export */ __webpack_exports__["default"] = (configureStore);

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "@fortawesome/fontawesome-svg-core":
/*!****************************************************!*\
  !*** external "@fortawesome/fontawesome-svg-core" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-svg-core");

/***/ }),

/***/ "@fortawesome/free-brands-svg-icons":
/*!*****************************************************!*\
  !*** external "@fortawesome/free-brands-svg-icons" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-brands-svg-icons");

/***/ }),

/***/ "@fortawesome/free-regular-svg-icons":
/*!******************************************************!*\
  !*** external "@fortawesome/free-regular-svg-icons" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-regular-svg-icons");

/***/ }),

/***/ "@fortawesome/free-solid-svg-icons":
/*!****************************************************!*\
  !*** external "@fortawesome/free-solid-svg-icons" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "next-redux-saga":
/*!**********************************!*\
  !*** external "next-redux-saga" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-redux-saga");

/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-saga":
/*!*****************************!*\
  !*** external "redux-saga" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "redux-saga/effects":
/*!*************************************!*\
  !*** external "redux-saga/effects" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map