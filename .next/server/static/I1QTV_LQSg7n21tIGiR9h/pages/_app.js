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

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1TCz");


/***/ }),

/***/ "0fJA":
/***/ (function(module, exports) {

let Global = {
  userDet: {},
  io: {},
  app: {},
  url: 'http://localhost:3000'
};
module.exports = Global;

/***/ }),

/***/ "1TCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__("8Bbg");
var app_default = /*#__PURE__*/__webpack_require__.n(app);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__("JMOJ");
var external_next_redux_wrapper_default = /*#__PURE__*/__webpack_require__.n(external_next_redux_wrapper_);

// EXTERNAL MODULE: external "next-redux-saga"
var external_next_redux_saga_ = __webpack_require__("pEZS");
var external_next_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_next_redux_saga_);

// EXTERNAL MODULE: external "@fortawesome/fontawesome-svg-core"
var fontawesome_svg_core_ = __webpack_require__("sLJp");

// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__("No/t");

// EXTERNAL MODULE: external "@fortawesome/free-regular-svg-icons"
var free_regular_svg_icons_ = __webpack_require__("s7eq");

// EXTERNAL MODULE: external "@fortawesome/free-brands-svg-icons"
var free_brands_svg_icons_ = __webpack_require__("JVe5");

// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-svg-core/styles.css
var styles = __webpack_require__("VAPu");

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__("1fKG");
var external_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_redux_saga_);

// EXTERNAL MODULE: ./react/index/index.css
var index = __webpack_require__("JbdL");

// EXTERNAL MODULE: ./react/index/store/actions/actionTypes.js
var actionTypes = __webpack_require__("E+sZ");

// EXTERNAL MODULE: ./react/index/shared/utility.js
var utility = __webpack_require__("5U8D");

// CONCATENATED MODULE: ./react/index/store/reducers/auth.js


const auth_initialState = {
  status: false,
  img: null,
  username: null
};

const checkAuth = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    status: action.status
  });
};

const checkUserImg = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    img: action.img
  });
};

const checkUserName = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    username: action.name
  });
};

const reducer = (state = auth_initialState, action) => {
  switch (action.type) {
    case actionTypes["r" /* CHECK_AUTH */]:
      return checkAuth(state, action);

    case actionTypes["t" /* CHECK_USERIMG */]:
      return checkUserImg(state, action);

    case actionTypes["u" /* CHECK_USERNAME */]:
      return checkUserName(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var auth = (reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/model.js


const model_initialState = {
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
  return Object(utility["f" /* updateObject */])(state, {
    cnts,
    skipCnt: action.skipCnt,
    cntTotal: action.cntTotal,
    showLoader: false
  });
};

const fetchCntReset = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cnts: null,
    skipCnt: null,
    cntTotal: null,
    curTab: null,
    showLoader: false
  });
};

const fetchCntStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    showLoader: true
  });
};

const fetchPostFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cntErr: action.err,
    showLoader: false
  });
};

const changeCntStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
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
  return Object(utility["f" /* updateObject */])(state, {
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const changeCntReset = (state, action) => {
  let cnts = [...state.cnts];

  if (action.changed) {
    if (state.changeCntStart.det === 'addUser') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'pending', true);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'acceptUser') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'accept', true);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'rejUser') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'request', false);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'cancelReq') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'pending', false);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'unfriend') {
      let updateCnts = Object(utility["b" /* changeMode */])(cnts, state.changeCntStart, 'accept', false);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnts,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    if (state.changeCntStart.det === 'blockUser') {
      let updateCnt = cnts.filter(cnt => cnt.id !== state.changeCntStart.id);
      return Object(utility["f" /* updateObject */])(state, {
        cnts: updateCnt,
        changeCntStart: null,
        changeCntErr: null,
        changeCnt: false
      });
    }

    let updateCnt = cnts.filter(cnt => cnt._id !== state.changeCntStart.id);
    return Object(utility["f" /* updateObject */])(state, {
      cnts: updateCnt,
      changeCntStart: null,
      changeCntErr: null,
      changeCnt: false
    });
  }

  return Object(utility["f" /* updateObject */])(state, {
    cnts,
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const changeCntFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    changeCntErr: action.err
  });
};

const changeCnt = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    changeCnt: true
  });
};

const fetchVideo = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    postVideo: {
      id: action.id,
      url: action.url
    }
  });
};

const changeFavPtStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    favChange: {
      id: action.id,
      isLiked: action.isLiked
    }
  });
};

const changeFavPtFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    favChange: null
  });
};

const changeFav = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    changedFav: action.changedFav,
    favChange: null
  });
};

const filterPost = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterDet: action.filterDet
  });
};

const resetModel = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cntErr: null,
    changeCntStart: null,
    changeCntErr: null,
    changeCnt: false
  });
};

const model_reducer = (state = model_initialState, action) => {
  switch (action.type) {
    case actionTypes["C" /* FETCH_CNT */]:
      return fetchCnt(state, action);

    case actionTypes["L" /* FETCH_CNT_START */]:
      return fetchCntStart(state, action);

    case actionTypes["K" /* FETCH_CNT_RESET */]:
      return fetchCntReset(state, action);

    case actionTypes["I" /* FETCH_CNT_FAIL */]:
      return fetchPostFail(state, action);

    case actionTypes["f" /* CHANGE_CNT_START */]:
      return changeCntStart(state, action);

    case actionTypes["b" /* CHANGE_CNT_CANCEL */]:
      return changeCntCancel(state, action);

    case actionTypes["e" /* CHANGE_CNT_RESET */]:
      return changeCntReset(state, action);

    case actionTypes["c" /* CHANGE_CNT_FAIL */]:
      return changeCntFail(state, action);

    case actionTypes["a" /* CHANGE_CNT */]:
      return changeCnt(state, action);

    case actionTypes["zb" /* FETCH_VIDEO */]:
      return fetchVideo(state, action);

    case actionTypes["g" /* CHANGE_FAVORITE */]:
      return changeFav(state, action);

    case actionTypes["n" /* CHANGE_FAVORITE_PT_START */]:
      return changeFavPtStart(state, action);

    case actionTypes["m" /* CHANGE_FAVORITE_PT_FAIL */]:
      return changeFavPtFail(state, action);

    case actionTypes["Eb" /* FILTER_POST */]:
      return filterPost(state, action);

    case actionTypes["Xb" /* RESET_MODEL */]:
      return resetModel(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var reducers_model = (model_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/filter.js


const filter_initialState = {
  cntCateg: null,
  filterStart: false,
  totalFound: null,
  filterErr: null
};

const fetchCntCateg = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cntCateg: action.categ
  });
};

const filterContentStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterStart: true,
    filterErr: null
  });
};

const filterContentFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterErr: action.err
  });
};

const filterContent = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    totalFound: action.totalFound
  });
};

const resetFilter = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    totalFound: null,
    filterErr: null
  });
};

const filter_reducer = (state = filter_initialState, action) => {
  switch (action.type) {
    case actionTypes["D" /* FETCH_CNTCATEG */]:
      return fetchCntCateg(state, action);

    case actionTypes["Db" /* FILTER_CONTENT_START */]:
      return filterContentStart(state, action);

    case actionTypes["Bb" /* FILTER_CONTENT_FAIL */]:
      return filterContentFail(state, action);

    case actionTypes["Ab" /* FILTER_CONTENT */]:
      return filterContent(state, action);

    case actionTypes["Wb" /* RESET_FILTER */]:
      return resetFilter(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var filter = (filter_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/share.js


const share_initialState = {
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
  return Object(utility["f" /* updateObject */])(state, {
    users: action.users,
    filterUser: null
  });
};

const userSelect = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    userSelect: action.userSelect
  });
};

const viewUsers = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    viewAllUsers: !state.viewAllUsers
  });
};

const removeUser = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    userSelect: action.users,
    viewAllUsers: action.users && !action.users.length > 0
  });
};

const share_filterUser = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterUser: action.users
  });
};

const filterUserSelect = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    filterUserSelect: action.userSelect
  });
};

const shareID = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    shareID: String(action.shareID),
    cntType: action.cntType
  });
};

const shareUserStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    start: true
  });
};

const shareUserFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    shareErr: action.err
  });
};

const share_shareUser = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
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

const share_reducer = (state = share_initialState, action) => {
  switch (action.type) {
    case actionTypes["vb" /* FETCH_USERS */]:
      return fetchUsers(state, action);

    case actionTypes["gc" /* USER_SELECT */]:
      return userSelect(state, action);

    case actionTypes["hc" /* VIEW_USERS */]:
      return viewUsers(state, action);

    case actionTypes["Tb" /* REMOVE_USER */]:
      return removeUser(state, action);

    case actionTypes["Fb" /* FILTER_USER */]:
      return share_filterUser(state, action);

    case actionTypes["Hb" /* FILTER_USER_SELECT */]:
      return filterUserSelect(state, action);

    case actionTypes["Yb" /* SHARE_ID */]:
      return shareID(state, action);

    case actionTypes["cc" /* SHARE_USER_START */]:
      return shareUserStart(state, action);

    case actionTypes["ac" /* SHARE_USER_FAIL */]:
      return shareUserFail(state, action);

    case actionTypes["Zb" /* SHARE_USER */]:
      return share_shareUser(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var share = (share_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/tags.js


const tags_initialState = {
  path: null,
  tags: null
};

const fetchTags = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    tags: action.tags
  });
};

const changeTagsPath = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    path: action.path
  });
};

const tags_reducer = (state = tags_initialState, action) => {
  switch (action.type) {
    case actionTypes["q" /* CHANGE_TAGS_PATH */]:
      return changeTagsPath(state, action);

    case actionTypes["lb" /* FETCH_TAGS */]:
      return fetchTags(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var tags = (tags_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/trend.js


const trend_initialState = {
  trends: null
};

const fetchTrds = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    trends: action.trd
  });
};

const trend_reducer = (state = trend_initialState, action) => {
  switch (action.type) {
    case actionTypes["qb" /* FETCH_TRD */]:
      return fetchTrds(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var trend = (trend_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/setQue.js


const setQue_initialState = {
  categ: null
};

const fetchCateg = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    categ: action.categ
  });
};

const setQue_reducer = (state = setQue_initialState, action) => {
  switch (action.type) {
    case actionTypes["x" /* FETCH_CATEG */]:
      return fetchCateg(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var setQue = (setQue_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/conv.js


const conv_initialState = {
  conv: null
};

const fetchConv = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    conv: action.conv
  });
};

const conv_reducer = (state = conv_initialState, action) => {
  switch (action.type) {
    case actionTypes["M" /* FETCH_CONV */]:
      return fetchConv(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var conv = (conv_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/header.js


const header_initialState = {
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
  return Object(utility["f" /* updateObject */])(state, {
    expand: state.expend ? state.expand : true,
    default: false
  });
};

const formSm = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    hideFormSm: false,
    default: false
  });
};

const navDefault = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
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
  return Object(utility["f" /* updateObject */])(state, {
    addNew: !state.addNew,
    default: false
  });
};

const changeMainFavStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    favChange: action.isLiked
  });
};

const changeMainFavReset = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    favChange: null
  });
};

const fetchNotify = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notify: action.notify,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const fetchNotifyStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notify: null,
    hidNotify: false,
    hidNavList: true,
    hidUserOption: true,
    default: false
  });
};

const changeFavNotifyStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notify: action.notify
  });
};

const changeFavNotify = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notify: action.notify
  });
};

const showNavList = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    hidNotify: true,
    hidNavList: false,
    hidUserOption: true,
    default: false
  });
};

const fetchNavListStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    navList: null,
    navListCateg: null
  });
};

const fetchNavList = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    navList: action.navList,
    navListCateg: action.category
  });
};

const showUserOption = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    hidNotify: true,
    hidNavList: true,
    hidUserOption: false,
    default: false
  });
};

const fetchNotifyActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notifyActive: action.notifyActive
  });
};

const defaultNotifyActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    notifyActive: null
  });
};

const headerFilterStart = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    searchCnt: null,
    filterPos: action.filterPos,
    filterLastPos: action.filterLastPos,
    searchCntErr: null,
    filterStart: true
  });
};

const headerFilterFail = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    searchCntErr: action.searchCntErr
  });
};

const headerFilter = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    searchCnt: action.searchCnt
  });
};

const headerFilterClose = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    searchCnt: null,
    filterStart: false
  });
};

const header_reducer = (state = header_initialState, action) => {
  switch (action.type) {
    case actionTypes["Pb" /* HEADER_FORM_EXPAND */]:
      return formExpand(state, action);

    case actionTypes["Qb" /* HEADER_FORM_SM */]:
      return formSm(state, action);

    case actionTypes["Rb" /* HEADER_NAV_DEFAULT */]:
      return navDefault(state, action);

    case actionTypes["Jb" /* HEADER_ADD_NEW */]:
      return addNew(state, action);

    case actionTypes["p" /* CHANGE_MAINFAVORITE_START */]:
      return changeMainFavStart(state, action);

    case actionTypes["o" /* CHANGE_MAINFAVORITE_RESET */]:
      return changeMainFavReset(state, action);

    case actionTypes["Z" /* FETCH_NOTIFY_START */]:
      return fetchNotifyStart(state, action);

    case actionTypes["U" /* FETCH_NOTIFY */]:
      return fetchNotify(state, action);

    case actionTypes["l" /* CHANGE_FAVORITE_NOTIFY_START */]:
      return changeFavNotifyStart(state, action);

    case actionTypes["i" /* CHANGE_FAVORITE_NOTIFY */]:
      return changeFavNotify(state, action);

    case actionTypes["ec" /* SHOW_NAV_LIST */]:
      return showNavList(state, action);

    case actionTypes["T" /* FETCH_NAVLIST_START */]:
      return fetchNavListStart(state, action);

    case actionTypes["R" /* FETCH_NAVLIST */]:
      return fetchNavList(state, action);

    case actionTypes["fc" /* SHOW_USER_OPTION */]:
      return showUserOption(state, action);

    case actionTypes["V" /* FETCH_NOTIFY_ACTIVE */]:
      return fetchNotifyActive(state, action);

    case actionTypes["v" /* DEFAULT_NOTIFYACTIVE */]:
      return defaultNotifyActive(state, action);

    case actionTypes["Ob" /* HEADER_FILTER_START */]:
      return headerFilterStart(state, action);

    case actionTypes["Mb" /* HEADER_FILTER_FAIL */]:
      return headerFilterFail(state, action);

    case actionTypes["Lb" /* HEADER_FILTER_CLOSE */]:
      return headerFilterClose(state, action);

    case actionTypes["Kb" /* HEADER_FILTER */]:
      return headerFilter(state, action);

    default:
      return state;
  }

  ;
};

/* harmony default export */ var header = (header_reducer);
// CONCATENATED MODULE: ./react/index/store/reducers/main.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const main_initialState = {
  showBackdrop: false,
  cntActive: null,
  ptActive: null,
  queActive: null,
  reqActive: null,
  shareActive: null,
  shareCntActive: null
};

const fetchPtActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    ptActive: action.ptActive
  });
};

const fetchQueActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    queActive: action.queActive
  });
};

const fetchCntActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    cntActive: action.cntActive
  });
};

const fetchReqActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    reqActive: action.reqActive
  });
};

const fetchShareActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    shareActive: action.shareActive
  });
};

const fetchShareCntActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    shareCntActive: action.shareCntActive
  });
};

const resetActive = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, _objectSpread({}, state));
};

const showMainBackdrop = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    showBackdrop: true
  });
};

const hideMainBackdrop = (state, action) => {
  return Object(utility["f" /* updateObject */])(state, {
    showBackdrop: false
  });
};

const main_reducer = (state = main_initialState, action) => {
  switch (action.type) {
    case actionTypes["bb" /* FETCH_PT_ACTIVE */]:
      return fetchPtActive(state, action);

    case actionTypes["db" /* FETCH_QUE_ACTIVE */]:
      return fetchQueActive(state, action);

    case actionTypes["G" /* FETCH_CNT_ACTIVE */]:
      return fetchCntActive(state, action);

    case actionTypes["hb" /* FETCH_SHARECNT_ACTIVE */]:
      return fetchShareCntActive(state, action);

    case actionTypes["jb" /* FETCH_SHARE_ACTIVE */]:
      return fetchShareActive(state, action);

    case actionTypes["fb" /* FETCH_REQ_ACTIVE */]:
      return fetchReqActive(state, action);

    case actionTypes["Ub" /* RESET_ACTIVE */]:
      return resetActive(state, action);

    case actionTypes["dc" /* SHOW_MAIN_BACKDROP */]:
      return showMainBackdrop(state, action);

    case actionTypes["Sb" /* HIDE_MAIN_BACKDROP */]:
      return hideMainBackdrop(state, action);

    default:
      return state;
  }
};

/* harmony default export */ var main = (main_reducer);
// EXTERNAL MODULE: external "redux-saga/effects"
var effects_ = __webpack_require__("RmXt");

// EXTERNAL MODULE: ./react/index/store/actions/index.js + 10 modules
var actions = __webpack_require__("DhbN");

// EXTERNAL MODULE: ./react/index/axios.js
var axios = __webpack_require__("MEIi");

// CONCATENATED MODULE: ./react/index/store/sagas/auth.js



function* checkAuthInitSaga(action) {
  let expiresIn = document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  if (expiresIn && new Date(new Date(expiresIn * 1000).getTime()) >= new Date().getTime()) {
    yield Object(effects_["put"])(actions["q" /* checkAuth */](true));

    try {
      let response = yield axios["a" /* default */].post('/header', {}, {
        headers: {
          'data-categ': 'userimg'
        }
      });

      if (response.data.url) {
        yield Object(effects_["put"])(actions["r" /* checkUserImg */](response.data.url));
      } else {
        yield Object(effects_["put"])(actions["s" /* checkUserName */](response.data.name));
      }
    } catch (err) {}
  }
}
// CONCATENATED MODULE: ./react/index/store/sagas/model.js




function* fetchCntInitSaga(action) {
  let model = action.fetchType === 'post' ? '/post' : action.fetchType === 'question' || action.fetchType === 'shared' ? '/question' : '/' + action.fetchType;
  let categ = action.fetchType === 'shared' ? `shared-${action.userID}` : action.fetchType;

  if (action.cntTotal > action.skipCnt) {
    yield Object(effects_["put"])(actions["D" /* fetchCntStart */]());
  }

  try {
    if (action.cntTotal === 0 || action.cntTotal > action.skipCnt) {
      let response = yield axios["a" /* default */].post(model, null, {
        headers: {
          'data-categ': categ,
          'limit': action.fetchLimit,
          'skip': action.skipCnt
        }
      });
      yield Object(effects_["put"])(actions["w" /* fetchCnt */](response.data.cnt, action.skipCnt, response.data.cntTotal));
    }
  } catch (err) {
    yield Object(effects_["put"])(actions["A" /* fetchCntFail */](err));
  }
}
function* changeFavSaga(action) {
  let updateFav = Object(utility["a" /* changeFav */])(action.id, action.liked, action.favAdd, action.changedFav);
  yield Object(effects_["put"])(actions["o" /* changeMainFavoriteStart */](updateFav.favDet.liked));
  yield Object(effects_["put"])(actions["m" /* changeFavPtStart */](updateFav.favDet.id, updateFav.favDet.liked));

  try {
    let field = action.cntGrp === 'post' ? 'postID' : action.cntGrp === 'question' ? 'queID' : 'pwtID';
    yield axios["a" /* default */].patch('/header', {
      id: updateFav.favDet.id,
      model: action.cntGrp,
      field
    }, {
      headers: {
        'data-categ': 'changefavorite'
      }
    });
    yield Object(effects_["delay"])(500);
    yield Object(effects_["put"])(actions["n" /* changeMainFavoriteReset */]());
    yield Object(effects_["put"])(actions["g" /* changeFav */](updateFav.updateChangeFav));
  } catch (err) {
    yield Object(effects_["delay"])(500);
    yield Object(effects_["put"])(actions["n" /* changeMainFavoriteReset */]());
    yield Object(effects_["put"])(actions["l" /* changeFavPtFail */]());
  }
}
function* changeCntInitSaga(action) {
  let field = action.modelType === 'post' ? 'postID' : action.modelType === 'question' ? 'queID' : 'pwtID';

  if (!action.confirm) {
    yield Object(effects_["put"])(actions["f" /* changeCntStart */](action.title, action.id, action.det, action.modelType));
    return;
  }

  if (action.det === 'addUser') {
    yield Object(effects_["put"])(actions["f" /* changeCntStart */](action.title, action.id, action.det, action.modelType));
  }

  try {
    if (action.det === 'delete') {
      let payload = JSON.stringify({
        id: action.id,
        model: action.modelType,
        field
      });
      yield axios["a" /* default */].delete('/header', {
        headers: {
          'data-categ': `deletecnt-${payload}`
        }
      });
    } else if (action.modelType === 'user') {
      yield axios["a" /* default */].patch('/users', {
        id: action.id
      }, {
        headers: {
          'data-categ': action.det
        }
      });
    } else {
      yield axios["a" /* default */].patch('/header', {
        id: action.id,
        model: action.modelType,
        field
      }, {
        headers: {
          'data-categ': 'draftmode'
        }
      });
    }

    yield Object(effects_["put"])(actions["a" /* changeCnt */]());
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(actions["e" /* changeCntReset */](true));
  } catch (err) {
    yield Object(effects_["put"])(actions["c" /* changeCntFail */](err));
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(actions["e" /* changeCntReset */](false));
  }
}
// CONCATENATED MODULE: ./react/index/store/sagas/filter.js




function* fetchCntCategInitSaga(action) {
  try {
    if (action.categ && action.categ.length > 0) {
      yield Object(effects_["put"])(actions["z" /* fetchCntCateg */]([...action.categ]));
    } else {
      let response = yield axios["a" /* default */].post('/header', {
        categ: 'question'
      }, {
        headers: {
          'data-categ': 'category'
        }
      });
      yield Object(effects_["put"])(actions["z" /* fetchCntCateg */](response.data));
    }
  } catch (e) {}
}
function* filterContentInitSaga(action) {
  let categs = [];

  for (let categ of action.content.category) {
    categs.push(categ.category);
  }

  let filterDet = Object(utility["f" /* updateObject */])(action.content, {
    category: categs
  });
  let filterCnt = JSON.stringify(filterDet);

  if (!action.content.apply) {
    try {
      yield Object(effects_["put"])(actions["hb" /* filterContentStart */]());
      let response = yield axios["a" /* default */].post('/header', {
        filterCnt,
        model: 'question'
      }, {
        headers: {
          'data-categ': 'cntSearch'
        }
      });
      yield Object(effects_["put"])(actions["fb" /* filterContent */](response.data));
    } catch (err) {
      yield Object(effects_["put"])(actions["gb" /* filterContentFail */](err));
    }

    return;
  }

  yield Object(effects_["put"])(actions["ib" /* filterPost */](filterCnt));
}
// CONCATENATED MODULE: ./react/index/store/sagas/share.js



function* fetchUsersInitSaga() {
  try {
    let response = yield axios["a" /* default */].post('/users', null, {
      headers: {
        'data-categ': `allteacher-notab`
      }
    });
    yield Object(effects_["put"])(actions["cb" /* fetchUsers */](response.data));
  } catch (err) {
    yield Object(effects_["put"])(actions["db" /* fetchUsersFail */](err));
  }
}
function* filterUserInitSaga(action) {
  let filterUser = null;

  if (!action.filterContent) {
    filterUser = action.users;
  } else {
    filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
  }

  yield Object(effects_["put"])(actions["jb" /* filterUser */](filterUser));
}
function* filterUserSelectInitSaga(action) {
  let filterUser = null;

  if (!action.filterContent) {
    filterUser = action.userSelect;
  } else {
    filterUser = action.userSelect.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
  }

  yield Object(effects_["put"])(actions["kb" /* filterUserSelect */](filterUser));
}
function* shareUserInitSaga(action) {
  let shareUser = [];

  for (let user of [...action.userSelect]) {
    shareUser.push(user.id);
  }

  try {
    yield Object(effects_["put"])(actions["zb" /* shareUserStart */]());
    let field = action.cntType === 'post' ? 'postID' : action.cntType === 'question' ? 'queID' : 'pwtID';
    yield axios["a" /* default */].patch('/header', {
      users: JSON.stringify(shareUser),
      id: action.shareID,
      model: action.cntType,
      field
    }, {
      headers: {
        'data-categ': 'shareuser'
      }
    });
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(actions["yb" /* shareUser */]());
  } catch (err) {
    yield Object(effects_["put"])(actions["Ab" /* shareUserfail */](err));
    yield Object(effects_["delay"])(1000);
    yield Object(effects_["put"])(actions["yb" /* shareUser */]());
  }
}
// CONCATENATED MODULE: ./react/index/store/sagas/tags.js



function* fetchTagsInitSaga() {
  try {
    let response = yield axios["a" /* default */].post('/post', null, {
      headers: {
        'data-categ': 'postCateg'
      }
    });
    yield Object(effects_["put"])(actions["Z" /* fetchTags */](response.data));
  } catch (e) {}
}
// CONCATENATED MODULE: ./react/index/store/sagas/trend.js



function* fetchTrdInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'trend'
      }
    });
    yield Object(effects_["put"])(actions["ab" /* fetchTrd */](response.data));
  } catch (e) {}
}
// CONCATENATED MODULE: ./react/index/store/sagas/setQue.js


const CATEG = ['post', 'question', 'social', 'writers', 'poet', 'poeters', 'poem', 'post', 'question', 'social', 'writers', 'poet', 'poeters', 'poem'];
function* fetchCategInitSaga() {
  yield Object(effects_["put"])(actions["v" /* fetchCateg */](CATEG));
}
// CONCATENATED MODULE: ./react/index/store/sagas/conv.js


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
  yield Object(effects_["put"])(actions["E" /* fetchConv */]([...data]));
}
// CONCATENATED MODULE: ./react/index/store/sagas/header.js




function* fetchNotifyInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions["N" /* fetchNotifyStart */]());
    let response = yield axios["a" /* default */].post('/header', {
      fetchCnt: true
    }, {
      headers: {
        'data-categ': 'allnotification'
      }
    });

    if (response.data.collTotal > 0) {
      yield Object(effects_["put"])(actions["J" /* fetchNotify */](response.data.coll));
    } else {
      yield Object(effects_["put"])(actions["J" /* fetchNotify */]([]));
    }
  } catch (err) {
    yield Object(effects_["put"])(actions["L" /* fetchNotifyFail */](err));
  }
}
function* changeFavNotifySaga(action) {
  let notify = Object(utility["a" /* changeFav */])(action.notify, action.notifyID);
  yield Object(effects_["put"])(actions["k" /* changeFavNotifyStart */](notify.updateStartArray));
  yield Object(effects_["put"])(actions["i" /* changeFavNotify */](notify.updateDataArray));
}
function* fetchNavlistInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions["I" /* fetchNavlistStart */]());
    let response = yield axios["a" /* default */].post('/header', {
      categ: action.category
    }, {
      headers: {
        'data-categ': 'category'
      }
    });
    yield Object(effects_["put"])(actions["G" /* fetchNavlist */](action.category, response.data));
  } catch (e) {}
}
function* fetchNotifyActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'allnotification'
      }
    });
    yield Object(effects_["put"])(actions["K" /* fetchNotifyActive */](response.data.collTotal));
  } catch (err) {}
}
function* defaultNotifyActiveInitSaga(action) {
  try {
    yield axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'resetnotification'
      }
    });
    yield Object(effects_["put"])(actions["t" /* defaultNotifyActive */]());
  } catch (err) {}
}
function* headerFilterInitSaga(action) {
  try {
    yield Object(effects_["put"])(actions["qb" /* headerFilterStart */](action.filterPos, action.filterLastPos));
    let response = yield axios["a" /* default */].post('/header', {
      filterCnt: action.filterCnt
    }, {
      headers: {
        'data-categ': 'headerfilter'
      }
    });
    yield Object(effects_["put"])(actions["mb" /* headerFilter */](response.data));
  } catch (err) {
    yield Object(effects_["put"])(actions["ob" /* headerFilterFail */](err));
  }
}
// CONCATENATED MODULE: ./react/index/store/sagas/main.js



function* fetchPtActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {
      model: 'post'
    }, {
      headers: {
        'data-categ': ' modelNotify'
      }
    });
    yield Object(effects_["put"])(actions["P" /* fetchPtActive */](response.data));
    return;
  } catch (err) {}
}
function* fetchQueActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {
      model: 'question'
    }, {
      headers: {
        'data-categ': ' modelNotify'
      }
    });
    yield Object(effects_["put"])(actions["R" /* fetchQueActive */](response.data));
    return;
  } catch (err) {}
}
function* fetchCntActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {
      model: 'poet'
    }, {
      headers: {
        'data-categ': ' modelNotify'
      }
    });
    yield Object(effects_["put"])(actions["x" /* fetchCntActive */](response.data));
  } catch (err) {}
}
function* fetchShareCntActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {
      model: 'question'
    }, {
      headers: {
        'data-categ': 'share'
      }
    });
    yield Object(effects_["put"])(actions["W" /* fetchShareCntActive */](response.data));
  } catch (err) {}
}
function* fetchReqActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/users', null, {
      headers: {
        'data-categ': 'request-activeOnly'
      }
    });
    yield Object(effects_["put"])(actions["T" /* fetchReqActive */](response.data));
  } catch (err) {}
}
function* fetchShareActiveInitSaga(action) {
  try {
    let response = yield axios["a" /* default */].post('/header', {}, {
      headers: {
        'data-categ': 'notification'
      }
    });
    yield Object(effects_["put"])(actions["V" /* fetchShareActive */](response.data));
  } catch (err) {}
}
function* resetActiveInitSaga(action) {
  try {
    if (action.curTab === 'helpme') {
      yield axios["a" /* default */].patch('/header', {
        model: 'question'
      }, {
        headers: {
          'data-categ': 'share'
        }
      });
    } else {
      yield axios["a" /* default */].patch('/header', {
        model: action.curTab
      }, {
        headers: {
          'data-categ': 'modelNotify'
        }
      });
    }

    yield Object(effects_["put"])(actions["ub" /* resetActive */](action.curTab));
  } catch (err) {}
}
// CONCATENATED MODULE: ./react/index/store/sagas/index.js












function* watchAuth() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["s" /* CHECK_AUTH_INIT */], checkAuthInitSaga)]);
}
function* watchCnt() {
  yield Object(effects_["all"])([Object(effects_["takeLatest"])(actionTypes["J" /* FETCH_CNT_INIT */], fetchCntInitSaga), Object(effects_["takeEvery"])(actionTypes["h" /* CHANGE_FAVORITE_INIT */], changeFavSaga), Object(effects_["takeLatest"])(actionTypes["d" /* CHANGE_CNT_INIT */], changeCntInitSaga)]);
}
function* watchFilter() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["E" /* FETCH_CNTCATEG_INIT */], fetchCntCategInitSaga), Object(effects_["takeEvery"])(actionTypes["Cb" /* FILTER_CONTENT_INIT */], filterContentInitSaga)]);
}
function* watchShare() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["xb" /* FETCH_USERS_INIT */], fetchUsersInitSaga), Object(effects_["takeEvery"])(actionTypes["Gb" /* FILTER_USER_INIT */], filterUserInitSaga), Object(effects_["takeEvery"])(actionTypes["Ib" /* FILTER_USER_SELECT_INIT */], filterUserSelectInitSaga), Object(effects_["takeEvery"])(actionTypes["bc" /* SHARE_USER_INIT */], shareUserInitSaga)]);
}
function* watchTags() {
  yield Object(effects_["takeEvery"])(actionTypes["nb" /* FETCH_TAGS_INIT */], fetchTagsInitSaga);
}
function* watchTrd() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["sb" /* FETCH_TRD_INIT */], fetchTrdInitSaga)]);
}
function* watchSetQue() {
  yield Object(effects_["takeEvery"])(actionTypes["z" /* FETCH_CATEG_INIT */], fetchCategInitSaga);
}
function* watchConv() {
  yield Object(effects_["takeEvery"])(actionTypes["O" /* FETCH_CONV_INIT */], fetchConvInitSaga);
}
function* watchHeader() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["Y" /* FETCH_NOTIFY_INIT */], fetchNotifyInitSaga), Object(effects_["takeEvery"])(actionTypes["k" /* CHANGE_FAVORITE_NOTIFY_INIT */], changeFavNotifySaga), Object(effects_["takeEvery"])(actionTypes["S" /* FETCH_NAVLIST_INIT */], fetchNavlistInitSaga), Object(effects_["takeEvery"])(actionTypes["W" /* FETCH_NOTIFY_ACTIVE_INIT */], fetchNotifyActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["w" /* DEFAULT_NOTIFYACTIVE_INIT */], defaultNotifyActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["kb" /* FETCH_SHARE_ACTIVE_INIT */], fetchShareActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["Nb" /* HEADER_FILTER_INIT */], headerFilterInitSaga)]);
}
function* watchMain() {
  yield Object(effects_["all"])([Object(effects_["takeEvery"])(actionTypes["cb" /* FETCH_PT_ACTIVE_INIT */], fetchPtActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["eb" /* FETCH_QUE_ACTIVE_INIT */], fetchQueActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["H" /* FETCH_CNT_ACTIVE_INIT */], fetchCntActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["kb" /* FETCH_SHARE_ACTIVE_INIT */], fetchShareActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["ib" /* FETCH_SHARECNT_ACTIVE_INIT */], fetchShareCntActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["gb" /* FETCH_REQ_ACTIVE_INIT */], fetchReqActiveInitSaga), Object(effects_["takeEvery"])(actionTypes["Vb" /* RESET_ACTIVE_INIT */], resetActiveInitSaga)]);
}
function* rootSaga() {
  yield Object(effects_["all"])([watchAuth(), watchCnt(), watchFilter(), watchShare(), watchTags(), watchTrd(), watchSetQue(), watchHeader(), watchConv(), watchMain()]);
}
// CONCATENATED MODULE: ./store.js













false ? undefined : null;


const bindMiddleware = middleware => {
  if (false) {}

  return Object(external_redux_["applyMiddleware"])(...middleware);
};

function configureStore(initialState = {}) {
  const sagaMiddleware = external_redux_saga_default()();
  const rootReducers = Object(external_redux_["combineReducers"])({
    auth: auth,
    cnt: reducers_model,
    filter: filter,
    share: share,
    tags: tags,
    trd: trend,
    setQue: setQue,
    conv: conv,
    header: header,
    main: main
  });
  const store = Object(external_redux_["createStore"])(rootReducers, initialState, bindMiddleware([sagaMiddleware]));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

/* harmony default export */ var store_0 = (configureStore);
// CONCATENATED MODULE: ./pages/_app.js
var __jsx = external_react_default.a.createElement;










const serviceWorker = false ? undefined : null;

fontawesome_svg_core_["library"].add(free_solid_svg_icons_["fas"], free_regular_svg_icons_["far"], free_brands_svg_icons_["fab"]);

class _app_MyApp extends app_default.a {
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

    return __jsx(external_react_redux_["Provider"], {
      store: store
    }, __jsx(Component, pageProps));
  }

}

/* harmony default export */ var _app = __webpack_exports__["default"] = (external_next_redux_wrapper_default()(store_0)(external_next_redux_saga_default()(_app_MyApp)));

/***/ }),

/***/ "1fKG":
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "5U8D":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return updateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return transformNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return transformString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changeFav; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return engStrings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return changeMode; });
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

/***/ "8Bbg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("B5Ud")


/***/ }),

/***/ "B5Ud":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("KI45");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _utils = __webpack_require__("g/15");

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

if (false) {} // @deprecated noop for now until removal


function Container(p) {
  if (false) {}
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
      if (false) {}
      return query;
    },

    get pathname() {
      if (false) {}
      return pathname;
    },

    get asPath() {
      if (false) {}
      return asPath;
    },

    back: () => {
      if (false) {}
      router.back();
    },
    push: (url, as) => {
      if (false) {}
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (false) {}
      var pushRoute = as ? href : '';
      var pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (false) {}
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (false) {}
      var replaceRoute = as ? href : '';
      var replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "DhbN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./react/index/store/actions/actionTypes.js
var actionTypes = __webpack_require__("E+sZ");

// CONCATENATED MODULE: ./react/index/store/actions/auth.js

const checkAuthInit = () => {
  return {
    type: actionTypes["s" /* CHECK_AUTH_INIT */]
  };
};
const checkAuth = status => {
  return {
    type: actionTypes["r" /* CHECK_AUTH */],
    status
  };
};
const checkUserImg = img => {
  return {
    type: actionTypes["t" /* CHECK_USERIMG */],
    img
  };
};
const checkUserName = name => {
  return {
    type: actionTypes["u" /* CHECK_USERNAME */],
    name
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/header.js

const headerFormExpand = () => {
  return {
    type: actionTypes["Pb" /* HEADER_FORM_EXPAND */]
  };
};
const headerFormSm = () => {
  return {
    type: actionTypes["Qb" /* HEADER_FORM_SM */]
  };
};
const headerNavDefault = () => {
  return {
    type: actionTypes["Rb" /* HEADER_NAV_DEFAULT */]
  };
};
const headerAddNew = () => {
  return {
    type: actionTypes["Jb" /* HEADER_ADD_NEW */]
  };
};
const fetchNotifyInit = () => {
  return {
    type: actionTypes["Y" /* FETCH_NOTIFY_INIT */]
  };
};
const fetchNotifyStart = () => {
  return {
    type: actionTypes["Z" /* FETCH_NOTIFY_START */]
  };
};
const fetchNotifySuccess = () => {
  return {
    type: actionTypes["ab" /* FETCH_NOTIFY_SUCCESS */]
  };
};
const fetchNotifyFail = err => {
  return {
    type: actionTypes["X" /* FETCH_NOTIFY_FAIL */],
    err
  };
};
const fetchNotify = notify => {
  return {
    type: actionTypes["U" /* FETCH_NOTIFY */],
    notify
  };
};
const changeFavNotifyInit = (notify, notifyID) => {
  return {
    type: actionTypes["k" /* CHANGE_FAVORITE_NOTIFY_INIT */],
    notify,
    notifyID
  };
};
const changeFavNotifyStart = notify => {
  return {
    type: actionTypes["l" /* CHANGE_FAVORITE_NOTIFY_START */],
    notify
  };
};
const changeFavNotifyFail = notify => {
  return {
    type: actionTypes["j" /* CHANGE_FAVORITE_NOTIFY_FAIL */],
    notify
  };
};
const changeFavNotify = notify => {
  return {
    type: actionTypes["i" /* CHANGE_FAVORITE_NOTIFY */],
    notify
  };
};
const showNavList = () => {
  return {
    type: actionTypes["ec" /* SHOW_NAV_LIST */]
  };
};
const fetchNavlistInit = category => {
  return {
    type: actionTypes["S" /* FETCH_NAVLIST_INIT */],
    category
  };
};
const fetchNavlistStart = () => {
  return {
    type: actionTypes["T" /* FETCH_NAVLIST_START */]
  };
};
const fetchNavlist = (category, navList) => {
  return {
    type: actionTypes["R" /* FETCH_NAVLIST */],
    category,
    navList
  };
};
const showUserOption = () => {
  return {
    type: actionTypes["fc" /* SHOW_USER_OPTION */]
  };
};
const fetchNotifyactiveInit = userID => {
  return {
    type: actionTypes["W" /* FETCH_NOTIFY_ACTIVE_INIT */],
    userID
  };
};
const fetchNotifyActive = notifyActive => {
  return {
    type: actionTypes["V" /* FETCH_NOTIFY_ACTIVE */],
    notifyActive
  };
};
const defaultNotifyactiveInit = () => {
  return {
    type: actionTypes["w" /* DEFAULT_NOTIFYACTIVE_INIT */]
  };
};
const defaultNotifyActive = () => {
  return {
    type: actionTypes["v" /* DEFAULT_NOTIFYACTIVE */]
  };
};
const changeMainFavoriteStart = isLiked => {
  return {
    type: actionTypes["p" /* CHANGE_MAINFAVORITE_START */],
    isLiked
  };
};
const changeMainFavoriteReset = () => {
  return {
    type: actionTypes["o" /* CHANGE_MAINFAVORITE_RESET */]
  };
};
const headerFilterInit = (filterCnt, filterPos, filterLastPos) => {
  return {
    type: actionTypes["Nb" /* HEADER_FILTER_INIT */],
    filterCnt,
    filterPos,
    filterLastPos
  };
};
const headerFilterStart = (filterPos, filterLastPos) => {
  return {
    type: actionTypes["Ob" /* HEADER_FILTER_START */],
    filterPos,
    filterLastPos
  };
};
const headerFilterFail = searchCntErr => {
  return {
    type: actionTypes["Mb" /* HEADER_FILTER_FAIL */],
    searchCntErr
  };
};
const headerFilter = searchCnt => {
  return {
    type: actionTypes["Kb" /* HEADER_FILTER */],
    searchCnt
  };
};
const headerFilterClose = () => {
  return {
    type: actionTypes["Lb" /* HEADER_FILTER_CLOSE */]
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/model.js

const fetchCntInit = (userID, fetchType, fetchLimit, skipCnt, cntTotal) => {
  return {
    type: actionTypes["J" /* FETCH_CNT_INIT */],
    userID,
    fetchType,
    fetchLimit,
    skipCnt,
    cntTotal
  };
};
const fetchCntStart = () => {
  return {
    type: actionTypes["L" /* FETCH_CNT_START */]
  };
};
const fetchCntReset = () => {
  return {
    type: actionTypes["K" /* FETCH_CNT_RESET */]
  };
};
const fetchCntFail = err => {
  return {
    type: actionTypes["I" /* FETCH_CNT_FAIL */],
    err
  };
};
const fetchCnt = (cnt, skipCnt, cntTotal) => {
  return {
    type: actionTypes["C" /* FETCH_CNT */],
    cnt,
    skipCnt,
    cntTotal
  };
};
const changeCntInit = (id, title, det, confirm, modelType) => {
  return {
    type: actionTypes["d" /* CHANGE_CNT_INIT */],
    id,
    title,
    det,
    confirm,
    modelType
  };
};
const changeCntStart = (title, id, det, modelType) => {
  return {
    type: actionTypes["f" /* CHANGE_CNT_START */],
    title,
    id,
    det,
    modelType
  };
};
const changeCntCancel = () => {
  return {
    type: actionTypes["b" /* CHANGE_CNT_CANCEL */]
  };
};
const changeCntReset = changed => {
  return {
    type: actionTypes["e" /* CHANGE_CNT_RESET */],
    changed
  };
};
const changeCntFail = err => {
  return {
    type: actionTypes["c" /* CHANGE_CNT_FAIL */],
    err
  };
};
const changeCnt = () => {
  return {
    type: actionTypes["a" /* CHANGE_CNT */]
  };
};
const fetchVideo = (id, url) => {
  return {
    type: actionTypes["zb" /* FETCH_VIDEO */],
    id,
    url
  };
};
const changeFavInit = (id, liked, favAdd, changedFav, userID, cntGrp) => {
  return {
    type: actionTypes["h" /* CHANGE_FAVORITE_INIT */],
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
    type: actionTypes["n" /* CHANGE_FAVORITE_PT_START */],
    id,
    isLiked
  };
};
const changeFavPtFail = () => {
  return {
    type: actionTypes["m" /* CHANGE_FAVORITE_PT_FAIL */]
  };
};
const changeFav = changedFav => {
  return {
    type: actionTypes["g" /* CHANGE_FAVORITE */],
    changedFav
  };
};
const resetModel = () => {
  return {
    type: actionTypes["Xb" /* RESET_MODEL */]
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/filter.js

const fetchCntCategInit = categ => {
  return {
    type: actionTypes["E" /* FETCH_CNTCATEG_INIT */],
    categ
  };
};
const fetchCntCategStart = () => {
  return {
    type: actionTypes["F" /* FETCH_CNTCATEG_START */]
  };
};
const fetchCntCateg = categ => {
  return {
    type: actionTypes["D" /* FETCH_CNTCATEG */],
    categ
  };
};
const filterContentInit = content => {
  return {
    type: actionTypes["Cb" /* FILTER_CONTENT_INIT */],
    content
  };
};
const filterContentStart = () => {
  return {
    type: actionTypes["Db" /* FILTER_CONTENT_START */]
  };
};
const filterContentFail = err => {
  return {
    type: actionTypes["Bb" /* FILTER_CONTENT_FAIL */],
    err
  };
};
const filter_filterContent = totalFound => {
  return {
    type: actionTypes["Ab" /* FILTER_CONTENT */],
    totalFound
  };
};
const resetFilter = totalFound => {
  return {
    type: actionTypes["Wb" /* RESET_FILTER */]
  };
};
const filterPost = filterDet => {
  return {
    type: actionTypes["Eb" /* FILTER_POST */],
    filterDet
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/share.js

const fetchUsersInit = () => {
  return {
    type: actionTypes["xb" /* FETCH_USERS_INIT */]
  };
};
const fetchUsersStart = () => {
  return {
    type: actionTypes["yb" /* FETCH_USERS_SUCCESS */]
  };
};
const fetchUsersFail = () => {
  return {
    type: actionTypes["wb" /* FETCH_USERS_FAIL */]
  };
};
const fetchUsers = users => {
  return {
    type: actionTypes["vb" /* FETCH_USERS */],
    users
  };
};
const share_userSelect = userSelect => {
  return {
    type: actionTypes["gc" /* USER_SELECT */],
    userSelect
  };
};
const viewUsers = () => {
  return {
    type: actionTypes["hc" /* VIEW_USERS */]
  };
};
const removeUser = users => {
  return {
    type: actionTypes["Tb" /* REMOVE_USER */],
    users
  };
};
const filterUserInit = (users, filterContent) => {
  return {
    type: actionTypes["Gb" /* FILTER_USER_INIT */],
    users,
    filterContent
  };
};
const filterUser = users => {
  return {
    type: actionTypes["Fb" /* FILTER_USER */],
    users
  };
};
const filterUserSelectInit = (filterContent, userSelect) => {
  return {
    type: actionTypes["Ib" /* FILTER_USER_SELECT_INIT */],
    filterContent,
    userSelect
  };
};
const filterUserSelect = userSelect => {
  return {
    type: actionTypes["Hb" /* FILTER_USER_SELECT */],
    userSelect
  };
};
const share_shareID = (shareID, cntType) => {
  return {
    type: actionTypes["Yb" /* SHARE_ID */],
    shareID,
    cntType
  };
};
const shareUserInit = (userSelect, shareID, cntType) => {
  return {
    type: actionTypes["bc" /* SHARE_USER_INIT */],
    userSelect,
    shareID,
    cntType
  };
};
const shareUserStart = () => {
  return {
    type: actionTypes["cc" /* SHARE_USER_START */]
  };
};
const shareUserfail = err => {
  return {
    type: actionTypes["ac" /* SHARE_USER_FAIL */],
    err
  };
};
const shareUser = () => {
  return {
    type: actionTypes["Zb" /* SHARE_USER */]
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/tags.js

const changeTagsPath = path => {
  return {
    type: actionTypes["q" /* CHANGE_TAGS_PATH */],
    path
  };
};
const fetchTagsInit = () => {
  return {
    type: actionTypes["nb" /* FETCH_TAGS_INIT */]
  };
};
const fetchTagsStart = () => {
  return {
    type: actionTypes["ob" /* FETCH_TAGS_START */]
  };
};
const fetchTagsSuccess = () => {
  return {
    type: actionTypes["pb" /* FETCH_TAGS_SUCCESS */]
  };
};
const fetchTagsFail = () => {
  return {
    type: actionTypes["mb" /* FETCH_TAGS_FAIL */]
  };
};
const fetchTags = tags => {
  return {
    type: actionTypes["lb" /* FETCH_TAGS */],
    tags
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/trend.js

const fetchTrdInit = userID => {
  return {
    type: actionTypes["sb" /* FETCH_TRD_INIT */],
    userID
  };
};
const fetchTrdStart = () => {
  return {
    type: actionTypes["tb" /* FETCH_TRD_START */]
  };
};
const fetchTrdSuccess = () => {
  return {
    type: actionTypes["ub" /* FETCH_TRD_SUCCESS */]
  };
};
const fetchTrdFail = () => {
  return {
    type: actionTypes["rb" /* FETCH_TRD_FAIL */]
  };
};
const fetchTrd = trd => {
  return {
    type: actionTypes["qb" /* FETCH_TRD */],
    trd
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/setQue.js

const fetchCategInit = () => {
  return {
    type: actionTypes["z" /* FETCH_CATEG_INIT */]
  };
};
const fetchCategStart = () => {
  return {
    type: actionTypes["A" /* FETCH_CATEG_START */]
  };
};
const fetchCategSuccess = () => {
  return {
    type: actionTypes["B" /* FETCH_CATEG_SUCCESS */]
  };
};
const fetchCategFail = () => {
  return {
    type: actionTypes["y" /* FETCH_CATEG_FAIL */]
  };
};
const fetchCateg = categ => {
  return {
    type: actionTypes["x" /* FETCH_CATEG */],
    categ
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/conv.js

const fetchConvInit = () => {
  return {
    type: actionTypes["O" /* FETCH_CONV_INIT */]
  };
};
const fetchConvStart = () => {
  return {
    type: actionTypes["P" /* FETCH_CONV_START */]
  };
};
const fetchConvSuccess = () => {
  return {
    type: actionTypes["Q" /* FETCH_CONV_SUCCESS */]
  };
};
const fetchConvFail = () => {
  return {
    type: actionTypes["N" /* FETCH_CONV_FAIL */]
  };
};
const fetchConv = conv => {
  return {
    type: actionTypes["M" /* FETCH_CONV */],
    conv
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/main.js

const fetchPtActiveInit = userID => {
  return {
    type: actionTypes["cb" /* FETCH_PT_ACTIVE_INIT */],
    userID
  };
};
const fetchPtActive = ptActive => {
  return {
    type: actionTypes["bb" /* FETCH_PT_ACTIVE */],
    ptActive
  };
};
const fetchQueActiveInit = queActive => {
  return {
    type: actionTypes["eb" /* FETCH_QUE_ACTIVE_INIT */],
    queActive
  };
};
const fetchQueActive = queActive => {
  return {
    type: actionTypes["db" /* FETCH_QUE_ACTIVE */],
    queActive
  };
};
const fetchCntActiveInit = userID => {
  return {
    type: actionTypes["H" /* FETCH_CNT_ACTIVE_INIT */],
    userID
  };
};
const fetchCntActive = cntActive => {
  return {
    type: actionTypes["G" /* FETCH_CNT_ACTIVE */],
    cntActive
  };
};
const fetchShareactiveInit = userID => {
  return {
    type: actionTypes["kb" /* FETCH_SHARE_ACTIVE_INIT */],
    userID
  };
};
const fetchShareActive = shareActive => {
  return {
    type: actionTypes["jb" /* FETCH_SHARE_ACTIVE */],
    shareActive
  };
};
const fetchReqActiveInit = () => {
  return {
    type: actionTypes["gb" /* FETCH_REQ_ACTIVE_INIT */]
  };
};
const fetchReqActive = reqActive => {
  return {
    type: actionTypes["fb" /* FETCH_REQ_ACTIVE */],
    reqActive
  };
};
const fetchShareCntactiveInit = userID => {
  return {
    type: actionTypes["ib" /* FETCH_SHARECNT_ACTIVE_INIT */],
    userID
  };
};
const fetchShareCntActive = shareCntActive => {
  return {
    type: actionTypes["hb" /* FETCH_SHARECNT_ACTIVE */],
    shareCntActive
  };
};
const resetActiveInit = (userID, curTab) => {
  return {
    type: actionTypes["Vb" /* RESET_ACTIVE_INIT */],
    userID,
    curTab
  };
};
const resetActive = curTab => {
  return {
    type: actionTypes["Ub" /* RESET_ACTIVE */],
    curTab
  };
};
const showMainBackdrop = () => {
  return {
    type: actionTypes["dc" /* SHOW_MAIN_BACKDROP */]
  };
};
const hideMainBackdrop = () => {
  return {
    type: actionTypes["Sb" /* HIDE_MAIN_BACKDROP */]
  };
};
// CONCATENATED MODULE: ./react/index/store/actions/index.js
/* unused concated harmony import checkAuthInit */
/* concated harmony reexport checkAuth */__webpack_require__.d(__webpack_exports__, "q", function() { return checkAuth; });
/* concated harmony reexport checkUserImg */__webpack_require__.d(__webpack_exports__, "r", function() { return checkUserImg; });
/* concated harmony reexport checkUserName */__webpack_require__.d(__webpack_exports__, "s", function() { return checkUserName; });
/* concated harmony reexport headerFormExpand */__webpack_require__.d(__webpack_exports__, "rb", function() { return headerFormExpand; });
/* concated harmony reexport headerFormSm */__webpack_require__.d(__webpack_exports__, "sb", function() { return headerFormSm; });
/* concated harmony reexport headerNavDefault */__webpack_require__.d(__webpack_exports__, "tb", function() { return headerNavDefault; });
/* concated harmony reexport headerAddNew */__webpack_require__.d(__webpack_exports__, "lb", function() { return headerAddNew; });
/* concated harmony reexport changeMainFavoriteStart */__webpack_require__.d(__webpack_exports__, "o", function() { return changeMainFavoriteStart; });
/* concated harmony reexport changeMainFavoriteReset */__webpack_require__.d(__webpack_exports__, "n", function() { return changeMainFavoriteReset; });
/* concated harmony reexport fetchNotifyInit */__webpack_require__.d(__webpack_exports__, "M", function() { return fetchNotifyInit; });
/* concated harmony reexport fetchNotifyStart */__webpack_require__.d(__webpack_exports__, "N", function() { return fetchNotifyStart; });
/* concated harmony reexport fetchNotifyFail */__webpack_require__.d(__webpack_exports__, "L", function() { return fetchNotifyFail; });
/* concated harmony reexport fetchNotify */__webpack_require__.d(__webpack_exports__, "J", function() { return fetchNotify; });
/* concated harmony reexport changeFavNotifyInit */__webpack_require__.d(__webpack_exports__, "j", function() { return changeFavNotifyInit; });
/* concated harmony reexport changeFavNotifyStart */__webpack_require__.d(__webpack_exports__, "k", function() { return changeFavNotifyStart; });
/* unused concated harmony import changeFavNotifyFail */
/* concated harmony reexport changeFavNotify */__webpack_require__.d(__webpack_exports__, "i", function() { return changeFavNotify; });
/* concated harmony reexport showNavList */__webpack_require__.d(__webpack_exports__, "Bb", function() { return showNavList; });
/* concated harmony reexport fetchNavlistInit */__webpack_require__.d(__webpack_exports__, "H", function() { return fetchNavlistInit; });
/* concated harmony reexport fetchNavlistStart */__webpack_require__.d(__webpack_exports__, "I", function() { return fetchNavlistStart; });
/* concated harmony reexport fetchNavlist */__webpack_require__.d(__webpack_exports__, "G", function() { return fetchNavlist; });
/* concated harmony reexport showUserOption */__webpack_require__.d(__webpack_exports__, "Cb", function() { return showUserOption; });
/* concated harmony reexport fetchNotifyactiveInit */__webpack_require__.d(__webpack_exports__, "O", function() { return fetchNotifyactiveInit; });
/* concated harmony reexport fetchNotifyActive */__webpack_require__.d(__webpack_exports__, "K", function() { return fetchNotifyActive; });
/* concated harmony reexport defaultNotifyactiveInit */__webpack_require__.d(__webpack_exports__, "u", function() { return defaultNotifyactiveInit; });
/* concated harmony reexport defaultNotifyActive */__webpack_require__.d(__webpack_exports__, "t", function() { return defaultNotifyActive; });
/* concated harmony reexport headerFilterInit */__webpack_require__.d(__webpack_exports__, "pb", function() { return headerFilterInit; });
/* concated harmony reexport headerFilterStart */__webpack_require__.d(__webpack_exports__, "qb", function() { return headerFilterStart; });
/* concated harmony reexport headerFilterFail */__webpack_require__.d(__webpack_exports__, "ob", function() { return headerFilterFail; });
/* concated harmony reexport headerFilter */__webpack_require__.d(__webpack_exports__, "mb", function() { return headerFilter; });
/* concated harmony reexport headerFilterClose */__webpack_require__.d(__webpack_exports__, "nb", function() { return headerFilterClose; });
/* concated harmony reexport fetchCntInit */__webpack_require__.d(__webpack_exports__, "B", function() { return fetchCntInit; });
/* concated harmony reexport fetchCntFail */__webpack_require__.d(__webpack_exports__, "A", function() { return fetchCntFail; });
/* concated harmony reexport fetchCntStart */__webpack_require__.d(__webpack_exports__, "D", function() { return fetchCntStart; });
/* concated harmony reexport fetchCntReset */__webpack_require__.d(__webpack_exports__, "C", function() { return fetchCntReset; });
/* concated harmony reexport fetchCnt */__webpack_require__.d(__webpack_exports__, "w", function() { return fetchCnt; });
/* concated harmony reexport changeCntInit */__webpack_require__.d(__webpack_exports__, "d", function() { return changeCntInit; });
/* concated harmony reexport changeCntStart */__webpack_require__.d(__webpack_exports__, "f", function() { return changeCntStart; });
/* concated harmony reexport changeCntFail */__webpack_require__.d(__webpack_exports__, "c", function() { return changeCntFail; });
/* concated harmony reexport changeCntCancel */__webpack_require__.d(__webpack_exports__, "b", function() { return changeCntCancel; });
/* concated harmony reexport changeCntReset */__webpack_require__.d(__webpack_exports__, "e", function() { return changeCntReset; });
/* concated harmony reexport changeCnt */__webpack_require__.d(__webpack_exports__, "a", function() { return changeCnt; });
/* concated harmony reexport fetchVideo */__webpack_require__.d(__webpack_exports__, "eb", function() { return fetchVideo; });
/* concated harmony reexport changeFavInit */__webpack_require__.d(__webpack_exports__, "h", function() { return changeFavInit; });
/* concated harmony reexport changeFavPtStart */__webpack_require__.d(__webpack_exports__, "m", function() { return changeFavPtStart; });
/* concated harmony reexport changeFavPtFail */__webpack_require__.d(__webpack_exports__, "l", function() { return changeFavPtFail; });
/* concated harmony reexport changeFav */__webpack_require__.d(__webpack_exports__, "g", function() { return changeFav; });
/* concated harmony reexport resetModel */__webpack_require__.d(__webpack_exports__, "wb", function() { return resetModel; });
/* unused concated harmony import fetchCntCategInit */
/* unused concated harmony import fetchCntCategStart */
/* concated harmony reexport fetchCntCateg */__webpack_require__.d(__webpack_exports__, "z", function() { return fetchCntCateg; });
/* unused concated harmony import filterContentInit */
/* concated harmony reexport filterContentStart */__webpack_require__.d(__webpack_exports__, "hb", function() { return filterContentStart; });
/* concated harmony reexport filterContentFail */__webpack_require__.d(__webpack_exports__, "gb", function() { return filterContentFail; });
/* concated harmony reexport filterContent */__webpack_require__.d(__webpack_exports__, "fb", function() { return filter_filterContent; });
/* unused concated harmony import resetFilter */
/* concated harmony reexport filterPost */__webpack_require__.d(__webpack_exports__, "ib", function() { return filterPost; });
/* unused concated harmony import fetchUsersInit */
/* concated harmony reexport fetchUsersFail */__webpack_require__.d(__webpack_exports__, "db", function() { return fetchUsersFail; });
/* concated harmony reexport fetchUsers */__webpack_require__.d(__webpack_exports__, "cb", function() { return fetchUsers; });
/* unused concated harmony import userSelect */
/* unused concated harmony import viewUsers */
/* unused concated harmony import removeUser */
/* unused concated harmony import filterUserInit */
/* unused concated harmony import filterUserSelectInit */
/* concated harmony reexport filterUser */__webpack_require__.d(__webpack_exports__, "jb", function() { return filterUser; });
/* concated harmony reexport filterUserSelect */__webpack_require__.d(__webpack_exports__, "kb", function() { return filterUserSelect; });
/* concated harmony reexport shareID */__webpack_require__.d(__webpack_exports__, "xb", function() { return share_shareID; });
/* unused concated harmony import shareUserInit */
/* concated harmony reexport shareUserStart */__webpack_require__.d(__webpack_exports__, "zb", function() { return shareUserStart; });
/* concated harmony reexport shareUserfail */__webpack_require__.d(__webpack_exports__, "Ab", function() { return shareUserfail; });
/* concated harmony reexport shareUser */__webpack_require__.d(__webpack_exports__, "yb", function() { return shareUser; });
/* concated harmony reexport changeTagsPath */__webpack_require__.d(__webpack_exports__, "p", function() { return changeTagsPath; });
/* unused concated harmony import fetchTagsInit */
/* unused concated harmony import fetchTagsStart */
/* unused concated harmony import fetchTagsFail */
/* concated harmony reexport fetchTags */__webpack_require__.d(__webpack_exports__, "Z", function() { return fetchTags; });
/* unused concated harmony import fetchTagsSuccess */
/* concated harmony reexport fetchTrdInit */__webpack_require__.d(__webpack_exports__, "bb", function() { return fetchTrdInit; });
/* concated harmony reexport fetchTrd */__webpack_require__.d(__webpack_exports__, "ab", function() { return fetchTrd; });
/* unused concated harmony import fetchCategInit */
/* concated harmony reexport fetchCateg */__webpack_require__.d(__webpack_exports__, "v", function() { return fetchCateg; });
/* concated harmony reexport fetchConvInit */__webpack_require__.d(__webpack_exports__, "F", function() { return fetchConvInit; });
/* concated harmony reexport fetchConv */__webpack_require__.d(__webpack_exports__, "E", function() { return fetchConv; });
/* concated harmony reexport fetchPtActiveInit */__webpack_require__.d(__webpack_exports__, "Q", function() { return fetchPtActiveInit; });
/* concated harmony reexport fetchPtActive */__webpack_require__.d(__webpack_exports__, "P", function() { return fetchPtActive; });
/* concated harmony reexport fetchQueActiveInit */__webpack_require__.d(__webpack_exports__, "S", function() { return fetchQueActiveInit; });
/* concated harmony reexport fetchQueActive */__webpack_require__.d(__webpack_exports__, "R", function() { return fetchQueActive; });
/* concated harmony reexport fetchCntActiveInit */__webpack_require__.d(__webpack_exports__, "y", function() { return fetchCntActiveInit; });
/* concated harmony reexport fetchCntActive */__webpack_require__.d(__webpack_exports__, "x", function() { return fetchCntActive; });
/* concated harmony reexport fetchShareCntactiveInit */__webpack_require__.d(__webpack_exports__, "X", function() { return fetchShareCntactiveInit; });
/* concated harmony reexport fetchShareCntActive */__webpack_require__.d(__webpack_exports__, "W", function() { return fetchShareCntActive; });
/* concated harmony reexport fetchShareactiveInit */__webpack_require__.d(__webpack_exports__, "Y", function() { return fetchShareactiveInit; });
/* concated harmony reexport fetchShareActive */__webpack_require__.d(__webpack_exports__, "V", function() { return fetchShareActive; });
/* concated harmony reexport fetchReqActiveInit */__webpack_require__.d(__webpack_exports__, "U", function() { return fetchReqActiveInit; });
/* concated harmony reexport fetchReqActive */__webpack_require__.d(__webpack_exports__, "T", function() { return fetchReqActive; });
/* concated harmony reexport resetActiveInit */__webpack_require__.d(__webpack_exports__, "vb", function() { return resetActiveInit; });
/* concated harmony reexport resetActive */__webpack_require__.d(__webpack_exports__, "ub", function() { return resetActive; });
/* unused concated harmony import showMainBackdrop */
/* unused concated harmony import hideMainBackdrop */











/***/ }),

/***/ "E+sZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return CHECK_AUTH_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return CHECK_AUTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return CHECK_USERIMG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return CHECK_USERNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pb", function() { return HEADER_FORM_EXPAND; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Qb", function() { return HEADER_FORM_SM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rb", function() { return HEADER_NAV_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nb", function() { return HEADER_FILTER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ob", function() { return HEADER_FILTER_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mb", function() { return HEADER_FILTER_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kb", function() { return HEADER_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lb", function() { return HEADER_FILTER_CLOSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Jb", function() { return HEADER_ADD_NEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return FETCH_CNT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return FETCH_CNT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return FETCH_CNT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return FETCH_CNT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return FETCH_CNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CHANGE_CNT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CHANGE_CNT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CHANGE_CNT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CHANGE_CNT_CANCEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CHANGE_CNT_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHANGE_CNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Eb", function() { return FILTER_POST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return FETCH_CNTCATEG_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return FETCH_CNTCATEG_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return FETCH_CNTCATEG; });
/* unused harmony export FETCH_VIDEO_INIT */
/* unused harmony export FETCH_VIDEO_START */
/* unused harmony export FETCH_VIDEO_FAIL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zb", function() { return FETCH_VIDEO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CHANGE_FAVORITE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return CHANGE_FAVORITE_PT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return CHANGE_FAVORITE_PT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CHANGE_FAVORITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xb", function() { return FETCH_USERS_INIT; });
/* unused harmony export FETCH_USERS_START */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yb", function() { return FETCH_USERS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wb", function() { return FETCH_USERS_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vb", function() { return FETCH_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gc", function() { return USER_SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hc", function() { return VIEW_USERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tb", function() { return REMOVE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gb", function() { return FILTER_USER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fb", function() { return FILTER_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ib", function() { return FILTER_USER_SELECT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hb", function() { return FILTER_USER_SELECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Yb", function() { return SHARE_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bc", function() { return SHARE_USER_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cc", function() { return SHARE_USER_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ac", function() { return SHARE_USER_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Zb", function() { return SHARE_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return CHANGE_TAGS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nb", function() { return FETCH_TAGS_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ob", function() { return FETCH_TAGS_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pb", function() { return FETCH_TAGS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mb", function() { return FETCH_TAGS_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lb", function() { return FETCH_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sb", function() { return FETCH_TRD_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tb", function() { return FETCH_TRD_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ub", function() { return FETCH_TRD_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rb", function() { return FETCH_TRD_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "qb", function() { return FETCH_TRD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return FETCH_CATEG_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return FETCH_CATEG_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return FETCH_CATEG_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return FETCH_CATEG_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return FETCH_CATEG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return FETCH_CONV_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return FETCH_CONV_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return FETCH_CONV_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return FETCH_CONV_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return FETCH_CONV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return FETCH_NOTIFY_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return FETCH_NOTIFY_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ab", function() { return FETCH_NOTIFY_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return FETCH_NOTIFY_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "U", function() { return FETCH_NOTIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return CHANGE_MAINFAVORITE_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return CHANGE_MAINFAVORITE_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return CHANGE_FAVORITE_NOTIFY_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return CHANGE_FAVORITE_NOTIFY_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return CHANGE_FAVORITE_NOTIFY_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CHANGE_FAVORITE_NOTIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ec", function() { return SHOW_NAV_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return FETCH_NAVLIST_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return FETCH_NAVLIST_START; });
/* unused harmony export FETCH_NAVLIST_SUCCESS */
/* unused harmony export FETCH_NAVLIST_FAIL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return FETCH_NAVLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fc", function() { return SHOW_USER_OPTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cb", function() { return FETCH_PT_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bb", function() { return FETCH_PT_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eb", function() { return FETCH_QUE_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "db", function() { return FETCH_QUE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return FETCH_CNT_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return FETCH_CNT_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gb", function() { return FETCH_REQ_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fb", function() { return FETCH_REQ_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kb", function() { return FETCH_SHARE_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jb", function() { return FETCH_SHARE_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ib", function() { return FETCH_SHARECNT_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hb", function() { return FETCH_SHARECNT_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vb", function() { return RESET_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ub", function() { return RESET_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dc", function() { return SHOW_MAIN_BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sb", function() { return HIDE_MAIN_BACKDROP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return FETCH_NOTIFY_ACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V", function() { return FETCH_NOTIFY_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return DEFAULT_NOTIFYACTIVE_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return DEFAULT_NOTIFYACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cb", function() { return FILTER_CONTENT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Db", function() { return FILTER_CONTENT_START; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bb", function() { return FILTER_CONTENT_FAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ab", function() { return FILTER_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wb", function() { return RESET_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Xb", function() { return RESET_MODEL; });
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

/***/ "JMOJ":
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "JVe5":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-brands-svg-icons");

/***/ }),

/***/ "JbdL":
/***/ (function(module, exports) {



/***/ }),

/***/ "KI45":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "MEIi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _global_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0fJA");
/* harmony import */ var _global_global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_global_global__WEBPACK_IMPORTED_MODULE_1__);


const instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: _global_global__WEBPACK_IMPORTED_MODULE_1___default.a.url
});
instance.defaults.headers.common['authorization'] = 'authorization';
/* harmony default export */ __webpack_exports__["a"] = (instance);

/***/ }),

/***/ "No/t":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "RmXt":
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "VAPu":
/***/ (function(module, exports) {



/***/ }),

/***/ "bzos":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__("bzos");
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

  if (false) {} // when called from _app `ctx` is nested in `ctx`


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

  if (false) {}

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (false) {}

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "pEZS":
/***/ (function(module, exports) {

module.exports = require("next-redux-saga");

/***/ }),

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "s7eq":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-regular-svg-icons");

/***/ }),

/***/ "sLJp":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-svg-core");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });