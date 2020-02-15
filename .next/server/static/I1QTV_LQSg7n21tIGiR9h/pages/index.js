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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+rGQ":
/***/ (function(module, exports) {

module.exports = require("react-avatar");

/***/ }),

/***/ "/QUN":
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__("cDcd");

function Logo (props) {
    return React.createElement("svg",props,[React.createElement("defs",{"key":0}),React.createElement("g",{"key":1},[React.createElement("polygon",{"fill":"#FF1600","points":"93.414,11.649 128.272,0.703 159.832,11.649 126.623,22.595 \t","key":0}),React.createElement("path",{"fill":"#FF1600","d":"M106.644,31.01V17.363c0,0,16.585,7.051,19.647,6.823c3.062-0.227,18.353-4.776,20.353-6.823V31.01\n\t\tc0,0-6.383,3.294-20,3.867C114.632,35.382,106.644,31.01,106.644,31.01z","key":1}),React.createElement("path",{"fill":"#FF1600","d":"M94.702,11.677","key":2}),React.createElement("path",{"fill":"#FF1600","d":"M94.363,41.927","key":3}),React.createElement("g",{"key":4},React.createElement("g",null,React.createElement("path",{"fill":"#FF1600","d":"M98.744,14.634c-0.192,2.978,0.003,5.952-0.04,8.932c-0.02,1.391-0.207,2.774-0.467,4.139\n\t\t\t\tc-0.07,0.351-0.162,0.697-0.276,1.036c1.561,0.2,1.862-0.314,0.904-1.542c-0.538-1.531-3.014-1.376-2.946,0.399\n\t\t\t\tc0.093,2.437,1.2,3.461,3.62,3.547c1.612,0.057,1.884-1.986,0.757-2.795c-0.886-0.636-1.423-1.122-2.478-1.516\n\t\t\t\tc0.119,0.914,0.239,1.828,0.358,2.742c0.856-0.434,1.43-1.249,2.07-1.94c1.325-1.431-0.669-3.384-2.121-2.121\n\t\t\t\tc-0.506,0.44-0.849,0.721-0.974,1.388c-0.128,0.681,0.079,1.318,0.689,1.694c0.215,0.13,0.428,0.265,0.638,0.404\n\t\t\t\tc1.374,1.364,3.496-0.757,2.121-2.121c-0.394-0.391-0.781-0.588-1.245-0.873c0.23,0.565,0.46,1.129,0.689,1.694\n\t\t\t\tc0.067-0.021,0.135-0.043,0.202-0.064c-0.707-0.707-1.414-1.414-2.121-2.121c-0.444,0.48-0.868,1.17-1.463,1.471\n\t\t\t\tc-1.261,0.639-0.757,2.325,0.358,2.742c0.554,0.207,1.244,0.842,1.761,1.213c0.252-0.932,0.505-1.863,0.757-2.795\n\t\t\t\tc-0.792,0.202-0.998,0.02-0.62-0.547c-0.982,0.133-1.964,0.266-2.946,0.399c0.4,1.139,0.873,2.997,2.238,3.373\n\t\t\t\tc1.159,0.319,2.046-0.414,2.476-1.435c1.969-4.67,0.742-10.395,1.058-15.301C101.869,12.701,98.868,12.713,98.744,14.634\n\t\t\t\tL98.744,14.634z"})))]),React.createElement("path",{"fill":"#05578b","d":"M17.644,2c0,0-19.5,6.5-17.5,27.5s10,23,13.5,24s50,0,50,0s2.641,12.336,9,21.5\n\tc6.359,9.164,15.435,15.155,19,15.5c15.5,1.5,55,0.5,55,0.5V36l-39.5,0.5L94.644,54l31,1l0.5,13l-30.5,1c0,0-5.741-1.158-8.5-5.5\n\tc-2.431-3.825-1.753-8.689-2.638-13.436c-0.951-5.099-11.184-12.397-26.602-12.13l-36.76-1.684c0,0-4.5-10.25,0.5-10.25s40,0,40,0\n\ts13-19.5,16.5-24S17.644,2,17.644,2z","key":2}),React.createElement("path",{"fill":"#05578b","d":"M10.05,69.904","key":3}),React.createElement("path",{"fill":"#05578b","d":"M0.106,91.422L13.457,70h58.174c0,0,10.198,13.751,12.483,15.788c2.285,2.036-6.557,4.345-9.651,5.634","key":4})]);
}

Logo.defaultProps = {"version":"1.1","xmlnsa":"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/","x":"0px","y":"0px","width":"50px","height":"32px","viewBox":"0 0 159.832 91.422","enableBackground":"new 0 0 159.832 91.422","xmlSpace":"preserve"};

module.exports = Logo;

Logo.default = Logo;


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

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("RNiq");


/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

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

/***/ "8Xpf":
/***/ (function(module, exports) {



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

/***/ "Fm2y":
/***/ (function(module, exports) {

module.exports = require("react-timeago/lib/formatters/buildFormatter");

/***/ }),

/***/ "Lsyi":
/***/ (function(module, exports) {



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

/***/ "PgEx":
/***/ (function(module, exports) {

module.exports = require("array-sort");

/***/ }),

/***/ "RNiq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: external "array-sort"
var external_array_sort_ = __webpack_require__("PgEx");
var external_array_sort_default = /*#__PURE__*/__webpack_require__.n(external_array_sort_);

// EXTERNAL MODULE: external "react-timeago"
var external_react_timeago_ = __webpack_require__("YVJH");
var external_react_timeago_default = /*#__PURE__*/__webpack_require__.n(external_react_timeago_);

// EXTERNAL MODULE: external "react-timeago/lib/formatters/buildFormatter"
var buildFormatter_ = __webpack_require__("Fm2y");
var buildFormatter_default = /*#__PURE__*/__webpack_require__.n(buildFormatter_);

// EXTERNAL MODULE: external "react-avatar"
var external_react_avatar_ = __webpack_require__("+rGQ");
var external_react_avatar_default = /*#__PURE__*/__webpack_require__.n(external_react_avatar_);

// EXTERNAL MODULE: ./global/global.js
var global = __webpack_require__("0fJA");
var global_default = /*#__PURE__*/__webpack_require__.n(global);

// EXTERNAL MODULE: ./react/index/components/Main/Post/PostContent/PostContent.css
var PostContent = __webpack_require__("uk0Q");

// EXTERNAL MODULE: ./react/index/components/UI/ShareIcn/ShareIcn.css
var ShareIcn = __webpack_require__("iswe");

// EXTERNAL MODULE: ./react/index/shared/utility.js
var utility = __webpack_require__("5U8D");

// CONCATENATED MODULE: ./react/index/hoc/Auxs/Aux.js
const aux = props => props.children;

/* harmony default export */ var Aux = (aux);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__("uhWA");

// CONCATENATED MODULE: ./react/index/components/UI/FavoriteActive/FavoriteActive.js
var __jsx = external_react_default.a.createElement;



const favoriteActive = props => {
  let favChangeClass = ['site-main__content--fav-change'];

  if (props.isHeader) {
    favChangeClass.push('site-main__content--fav-change__main');
  }

  return __jsx("div", {
    className: favChangeClass.join(' ')
  }, __jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: props.liked ? ['fas', 'heart'] : ['far', 'heart'],
    className: "icon icon__site-main--content__fav"
  }));
};

/* harmony default export */ var FavoriteActive = (favoriteActive);
// CONCATENATED MODULE: ./react/index/components/Main/Post/PostContent/PostContent.js
var PostContent_jsx = external_react_default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













const postContent = props => {
  const formatter = buildFormatter_default()(utility["c" /* engStrings */]);
  let userOpt = null;
  let userOptDetClass = ['reuse-pt__footer--details'];
  let userOptClass = ['reuse-pt__footer--details__options'];
  let favAdd = null;
  let isLiked = null;
  let mediaTotal = props.pt.snapshot.length + props.pt.image.length;

  let userOptMode = PostContent_jsx("li", {
    className: "reuse-pt__footer--details__options--status",
    onClick: props.changePt
  }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['far', 'eye-slash'],
    className: "icon icon__reuse-pt--options__dft"
  }), "Draft");

  let fav = PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['far', 'heart'],
    className: "icon icon__reuse-pt--footer__heart"
  });

  let userImage = PostContent_jsx("img", {
    src: props.pt.userImage,
    alt: ""
  });

  if (props.pt.mode === 'draft') {
    userOptMode = PostContent_jsx("li", {
      className: "reuse-pt__footer--details__options--status",
      onClick: props.changePtPublish
    }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'eye'],
      className: "icon icon__reuse-pt--options__dft"
    }), "Publish");
  }

  if (props.pt.username && !props.pt.userImage) {
    userImage = PostContent_jsx(external_react_avatar_default.a, {
      name: props.pt.username,
      size: "36",
      round: true
    });
  }

  for (let changedFav of props.changedFav) {
    if (props.pt._id === changedFav.id) {
      favAdd = changedFav.favAdd;
      isLiked = changedFav.liked;
    }
  }

  let media = null;
  let mediaCnt = [...props.pt.snapshot, ...props.pt.image];
  let playVideo = null;
  let mediaWrapperClass = ['reuse-pt__media--wrapper'];

  if (mediaCnt.length > 0) {
    let isShowned = false;

    for (let mediaItm of props.mediaItms) {
      if (mediaItm.id === props.pt._id) {
        isShowned = true;

        if (props.animateItm.id === props.pt._id) {
          if (props.animateItm.direction === 'next' && !props.removePrevAnim) {
            mediaWrapperClass.push('reuse-pt__media--wrapper__anim');
          }

          if (props.animateItm.direction === 'prev' && !props.removePrevAnim) {
            mediaWrapperClass.push('reuse-pt__media--wrapper__anim-rev');
          }
        } // if (props.animateItm === null) {
        //     mediaWrapperClass.push('reuse-pt__media--wrapper__anim');
        // }


        if (props.removePrevMedia && props.removePrevMedia.id === props.pt._id) {
          showPrevAnim(props.removePrevMedia);
        }

        displayMedia(mediaItm.position);
      }
    }

    if (!isShowned) {
      if (props.removePrevMedia && props.removePrevMedia.id === props.pt._id) {
        showPrevAnim(props.removePrevMedia);
      }

      displayMedia(0);
    }
  }

  function showPrevAnim(prevAnim) {
    if (prevAnim.type === 'next') {
      mediaWrapperClass.push('reuse-pt__media--wrapper__anim-exit');
    } else {
      mediaWrapperClass.push('reuse-pt__media--wrapper__anim-exit-rev');
    }
  }

  function displayMedia(position) {
    let updateMedia = mediaCnt[position];
    let curMedia = updateMedia.videoCnt ? _objectSpread({
      url: `${global_default.a.url}/media/image/${updateMedia.id}`
    }, updateMedia, {
      mediaType: 'snapshot'
    }) : _objectSpread({
      url: `${global_default.a.url}/media/image/${updateMedia.id}`
    }, updateMedia, {
      mediaType: 'image'
    });

    if (curMedia && curMedia.mediaType === 'snapshot') {
      playVideo = props.video && props.video.id !== curMedia.id ? PostContent_jsx("div", {
        className: props.playerIcnId && props.playerIcnId === props.pt._id ? 'reuse-pt__media--wrapper__icn reuse-pt__media--wrapper__icn-move' : 'reuse-pt__media--wrapper__icn',
        onClick: props.playVideo.bind(this, curMedia)
      }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'play-circle'],
        className: "icon icon__reuse-pt--media__play"
      })) : null;
    }

    media = PostContent_jsx("div", {
      className: "reuse-pt__media"
    }, PostContent_jsx("div", {
      className: props.video && props.video.id === curMedia.id ? 'reuse-pt__media--main-wrapper reuse-pt__media--main-wrapper__load' : 'reuse-pt__media--main-wrapper'
    }, PostContent_jsx("div", {
      onDragStart: () => false,
      "touch-action": "pan-y",
      className: props.disableAnim ? 'reuse-pt__media--wrapper' : mediaWrapperClass.join(' '),
      onAnimationEnd: props.removeAnim
    }, playVideo, props.video && props.video.id === curMedia.id && props.video.url ? PostContent_jsx("video", {
      onPointerDown: event => props.slidePlay(props.pt._id, mediaTotal, event),
      onPointerMove: event => props.moveSlidePlay(props.pt._id, mediaTotal, event),
      onPointerUp: event => props.clearSlidePlay(event),
      src: props.video.url,
      controls: true,
      autoPlay: true
    }, PostContent_jsx("p", null, "our browser doesn't support embedded videos")) : props.video && props.video.id === curMedia.id ? null : PostContent_jsx("img", {
      draggable: "false",
      onDragStart: () => false,
      src: curMedia.url,
      alt: "post",
      onPointerDown: event => props.slidePlay(props.pt._id, mediaTotal, event),
      onPointerMove: event => props.moveSlidePlay(props.pt._id, mediaTotal, event),
      onPointerUp: event => props.clearSlidePlay(event)
    }), props.videoErr && props.videoErr.id === curMedia.id ? PostContent_jsx("div", {
      className: "reuse-pt__video-err",
      onPointerDown: event => props.slidePlay(props.pt._id, mediaTotal, event),
      onPointerMove: event => props.moveSlidePlay(props.pt._id, mediaTotal, event),
      onPointerUp: event => props.clearSlidePlay(event)
    }, PostContent_jsx("div", {
      className: "reuse-pt__video-err--icn",
      onClick: props.playVideo.bind(this, curMedia.id, props.pt.video)
    }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'redo'],
      className: "icon icon__reuse-pt--video-err__icn"
    })), PostContent_jsx("h3", null, " ", props.videoErr.err.message, " ")) : null)), mediaCnt && mediaCnt.length > 1 ? PostContent_jsx(Aux, null, PostContent_jsx("div", {
      className: "reuse-pt__media--cnt reuse-pt__media--cnt__nxt",
      onClick: props.nextMedia
    }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'angle-right'],
      className: "icon icon__reuse-pt--media__nxt"
    })), PostContent_jsx("div", {
      className: "reuse-pt__media--cnt reuse-pt__media--cnt__prev",
      onClick: props.prevMedia
    }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'angle-left'],
      className: "icon icon__reuse-pt--media__prev"
    }))) : null);
  }

  if (props.showPt && props.showPt.visible && props.pt._id === props.showPt.id) {
    userOptDetClass.push('reuse-pt__footer--details__clk');
    userOptClass.push('reuse-pt__footer--details__options--visible');
  }

  if (props.pt.userOpt) {
    userOpt = PostContent_jsx("div", {
      className: userOptDetClass.join(' '),
      onClick: props.userOpt
    }, PostContent_jsx("div", {
      className: "reuse-pt__footer--details__mid"
    }), PostContent_jsx("ul", {
      className: userOptClass.join(' ')
    }, PostContent_jsx("li", null, PostContent_jsx("a", {
      href: `/edit/post/${props.pt._id}`
    }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'edit'],
      className: "icon icon__reuse-pt--options"
    }), "Edit")), userOptMode, PostContent_jsx("li", {
      onClick: props.deletePt
    }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'trash-alt'],
      className: "icon icon__reuse-pt--options"
    }), "Delete")));
  }

  if (props.pt.liked && isLiked === null) {
    fav = PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'heart'],
      className: "icon icon__reuse-pt--footer__heart"
    });
  }

  if (isLiked) {
    fav = PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'heart'],
      className: "icon icon__reuse-pt--footer__heart"
    });
  }

  return PostContent_jsx("div", {
    className: "reuse-pt"
  }, PostContent_jsx("div", {
    className: "reuse-pt__overlaywrapper"
  }, PostContent_jsx("div", {
    className: "reuse-pt__wrapper"
  }, PostContent_jsx("ul", {
    className: "reuse-pt__header"
  }, PostContent_jsx("li", null, PostContent_jsx("div", {
    className: "reuse-pt__header--category__img"
  }, userImage), PostContent_jsx("div", {
    className: "reuse-pt__header--category__det"
  }, PostContent_jsx("div", {
    className: "reuse-pt__header--category__det--name"
  }, PostContent_jsx("a", {
    href: `/user/profile/${props.pt.authorID}`
  }, " ", props.pt.username, " ")), PostContent_jsx("div", {
    className: "reuse-pt__header--category__det--timePosted"
  }, "@ ", PostContent_jsx(external_react_timeago_default.a, {
    date: props.pt.postCreated,
    live: false,
    formatter: formatter
  })))), PostContent_jsx("li", null, PostContent_jsx("p", {
    className: "reuse-pt__header--share__category"
  }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: props.pt.category.length > 1 ? ['fas', 'tags'] : ['fas', 'tag'],
    className: "icon icon__reuse-pt--header__tag"
  }), props.pt.category[0]), PostContent_jsx("div", {
    className: "reuse-share"
  }, PostContent_jsx("div", {
    className: "reuse-share__icn",
    onClick: props.share
  }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['fas', 'location-arrow'],
    className: "icon icon__reuse-share--icn"
  }))))), media, PostContent_jsx("p", {
    className: "reuse-pt__title"
  }, " ", PostContent_jsx("a", {
    href: "/view/post/" + props.pt._id
  }, props.pt.title)), PostContent_jsx("p", {
    className: "reuse-pt__description"
  }, PostContent_jsx("a", {
    href: "/view/post/" + props.pt._id
  }, String(props.pt.desc).length > 149 ? String(props.pt.desc).substr(0, 150) + '...' : props.pt.desc)), PostContent_jsx("div", {
    className: "reuse-pt__footer"
  }, PostContent_jsx("ul", {
    className: "reuse-pt__footer--list"
  }, PostContent_jsx("li", null, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['far', 'eye'],
    className: "icon icon__reuse-pt--footer__eye"
  }), Object(utility["d" /* transformNumber */])(props.pt.view)), PostContent_jsx("li", {
    className: "reuse-pt__footer--list__item-middle"
  }, PostContent_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['far', 'comments'],
    className: "icon icon__reuse-pt--footer__chats"
  }), Object(utility["d" /* transformNumber */])(props.pt.comment)), PostContent_jsx("li", null, PostContent_jsx("span", {
    onClick: props.fav
  }, fav), Object(utility["d" /* transformNumber */])(favAdd !== null ? favAdd : props.pt.favorite), props.favChange && props.favChange.id === props.pt._id ? PostContent_jsx(FavoriteActive, {
    liked: props.favChange.isLiked
  }) : null)), userOpt))));
};

/* harmony default export */ var PostContent_PostContent = (postContent);
// CONCATENATED MODULE: ./react/index/components/Main/Post/Post.js
var Post_jsx = external_react_default.a.createElement;




const post = props => {
  let content = external_array_sort_default()(props.content, 'postCreated', {
    reverse: true
  });
  const allPost = content.map((pt, index) => Post_jsx(PostContent_PostContent, {
    key: index,
    pt: pt,
    media: props.media,
    userOpt: props.userOpt.bind(undefined, pt._id),
    showPt: props.showCntOpt,
    fav: props.fav.bind(undefined, pt._id, pt.liked, pt.favorite, 'post'),
    changedFav: props.changedFav,
    favChange: props.favChange,
    share: props.share.bind(undefined, pt._id),
    nextMedia: props.nextMedia.bind(undefined, pt._id, pt.snapshot.length + pt.image.length, 'next'),
    prevMedia: props.prevMedia.bind(undefined, pt._id, pt.snapshot.length + pt.image.length, 'prev'),
    mediaItms: props.mediaItms,
    removeAnim: props.removeAnim,
    disableAnim: props.disableAnim,
    animateItm: props.animateItm,
    removePrevMedia: props.removePrevMedia,
    playVideo: props.playVideo,
    videoErr: props.videoErr,
    playerIcnId: props.playerIcnId,
    slidePlay: props.slidePlay,
    moveSlidePlay: props.moveSlidePlay,
    clearSlidePlay: props.clearSlidePlay,
    video: props.video,
    deletePt: props.changeCnt.bind(undefined, pt._id, pt.title, 'delete', 'post'),
    changePt: props.changeCnt.bind(undefined, pt._id, pt.title, 'draft', 'post')
  }));
  return allPost;
};

/* harmony default export */ var Post = (post);
// EXTERNAL MODULE: ./react/index/components/UI/Loader/Loader.css
var Loader = __webpack_require__("8Xpf");

// CONCATENATED MODULE: ./react/index/components/UI/Loader/Loader.js
var Loader_jsx = external_react_default.a.createElement;



const loader = props => {
  let cnt = 'Loading ....';

  if (props.cnt) {
    cnt = props.cnt;
  }

  return Loader_jsx("section", {
    className: "global"
  }, Loader_jsx("div", {
    className: "global__wrapper"
  }, Loader_jsx("div", null, Loader_jsx("div", {
    className: "top mask"
  }, Loader_jsx("div", {
    className: "plane"
  })), Loader_jsx("div", {
    className: "middle mask"
  }, Loader_jsx("div", {
    className: "plane"
  })), Loader_jsx("div", {
    className: "bottom mask"
  }, Loader_jsx("div", {
    className: "plane"
  }))), Loader_jsx("p", null, cnt)));
};

/* harmony default export */ var Loader_Loader = (loader);
// EXTERNAL MODULE: ./react/index/components/Main/NoAcc/NoAcc.css
var NoAcc = __webpack_require__("ckee");

// CONCATENATED MODULE: ./react/index/components/Main/NoAcc/NoAcc.js
var NoAcc_jsx = external_react_default.a.createElement;




const noAcc = props => {
  let cntClass = ['reuse-no-acc__cnt--title'];

  let noAccContent = NoAcc_jsx("div", {
    className: "reuse-no-acc__cnt"
  }, NoAcc_jsx("h4", {
    className: "reuse-no-acc__cnt--title"
  }, "You are not logged in."), NoAcc_jsx("ul", null, NoAcc_jsx("li", null, NoAcc_jsx("a", {
    href: "/login",
    className: "reuse-no-acc__cnt--login"
  }, "login in"), " "), NoAcc_jsx("li", null, NoAcc_jsx("a", {
    href: "/signup",
    className: "reuse-no-acc__cnt--sign"
  }, "sign up"))));

  if (!props.filter) {
    cntClass.push('reuse-no-acc__cnt--title__add-grp');
  }

  if (props.isAuth) {
    noAccContent = NoAcc_jsx("div", {
      className: "reuse-no-acc__cnt"
    }, NoAcc_jsx("h4", {
      className: cntClass.join(' ')
    }, " ", props.det, " "));
  }

  return NoAcc_jsx("div", {
    className: "reuse-no-acc"
  }, NoAcc_jsx("div", {
    className: "reuse-no-acc__wrapper"
  }, NoAcc_jsx("div", {
    className: "reuse-no-acc__icn"
  }, NoAcc_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['fas', `${props.icn}`],
    className: props.icnClass
  })), noAccContent));
};

/* harmony default export */ var NoAcc_NoAcc = (noAcc);
// EXTERNAL MODULE: ./react/index/store/actions/index.js + 10 modules
var actions = __webpack_require__("DhbN");

// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__("xnum");
var head_default = /*#__PURE__*/__webpack_require__.n(head_);

// EXTERNAL MODULE: ./react/index/components/UI/Logo/Logo.svg
var Logo = __webpack_require__("/QUN");
var Logo_default = /*#__PURE__*/__webpack_require__.n(Logo);

// CONCATENATED MODULE: ./react/index/components/UI/Logo/Logo.js
var Logo_jsx = external_react_default.a.createElement;



const logo = props => Logo_jsx("div", {
  className: "site-header__logo"
}, Logo_jsx("div", {
  className: "site-header__logo--graphics"
}, Logo_jsx(Logo_default.a, null)));

/* harmony default export */ var Logo_Logo = (logo);
// CONCATENATED MODULE: ./react/index/containers/Header/NavigationInput/NavigationInput.js
var NavigationInput_jsx = external_react_default.a.createElement;

function NavigationInput_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class NavigationInput_NavigationInput extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    NavigationInput_defineProperty(this, "state", {
      value: '',
      isExpand: false
    });

    NavigationInput_defineProperty(this, "expandFormHandler", () => {
      this.props.onFormExpand();
    });

    NavigationInput_defineProperty(this, "filterContentHandler", event => {
      this.setState({
        value: event.target.value
      });
      let inputElem = window.document.querySelector('.site-header__form');
      let inputLastElem = window.document.querySelector('.site-header__user');
      let updateInputLastElem = window.innerWidth - inputLastElem.offsetLeft - 30;
      let updateInputElem = inputElem.offsetLeft;

      if (window.innerWidth > 1200) {
        updateInputElem = 220;
        updateInputLastElem = 100;
      }

      this.props.onHeaderFilter(event.target.value, updateInputElem, updateInputLastElem);

      if (!this.state.isExpand) {
        this.setState({
          isExpand: true
        });
      }
    });
  }

  componentDidUpdate() {
    if (!this.props.expand && this.state.isExpand) {
      this.setState({
        value: '',
        isExpand: false
      });
    }
  }

  render() {
    let formClass = ["site-header__form"];

    if (this.props.expand) {
      formClass.push("site-header__form--expand");
    }

    return NavigationInput_jsx("form", {
      className: formClass.join(' ')
    }, NavigationInput_jsx("input", {
      type: "text",
      className: "site-header__form--input",
      autoComplete: "on",
      onClick: this.expandFormHandler,
      onChange: this.filterContentHandler,
      value: this.state.value
    }), NavigationInput_jsx("div", {
      className: "site-header__form--search"
    }, NavigationInput_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'search'],
      className: "icon icon__site-header--search"
    })));
  }

}

;

const mapStateToProps = state => {
  return {
    expand: state.header.expand
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFormExpand: () => dispatch(actions["rb" /* headerFormExpand */]()),
    onHeaderFilter: (filterCnt, filterPos, filterLastpos) => dispatch(actions["pb" /* headerFilterInit */](filterCnt, filterPos, filterLastpos))
  };
};

/* harmony default export */ var Header_NavigationInput_NavigationInput = (Object(external_react_redux_["connect"])(mapStateToProps, mapDispatchToProps)(NavigationInput_NavigationInput));
// EXTERNAL MODULE: ./react/index/containers/Header/NavigationList/NavigationList.css
var NavigationList_NavigationList = __webpack_require__("bpod");

// CONCATENATED MODULE: ./react/index/components/Navigation/NavigationLists/NavigationList/NavigationList.js
var NavigationList_jsx = external_react_default.a.createElement;


const navigationList = props => NavigationList_jsx("li", null, NavigationList_jsx("a", {
  href: '/' + props.category + '/' + props.navList
}, " ", props.navList));

/* harmony default export */ var NavigationLists_NavigationList_NavigationList = (navigationList);
// CONCATENATED MODULE: ./react/index/components/Navigation/NavigationLists/NavigationLists.js
var NavigationLists_jsx = external_react_default.a.createElement;



const navigationLists = props => {
  const allNavLists = props.content.map((navList, index) => NavigationLists_jsx(NavigationLists_NavigationList_NavigationList, {
    key: index,
    navList: navList,
    category: props.category
  }));
  return allNavLists;
};

/* harmony default export */ var NavigationLists = (navigationLists);
// CONCATENATED MODULE: ./react/index/containers/Header/NavigationList/NavigationList.js
var NavigationList_NavigationList_jsx = external_react_default.a.createElement;

function NavigationList_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class NavigationList_NavigationList_NavigationList extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    NavigationList_defineProperty(this, "state", {
      show: false,
      showNavList: false,
      showNavItm: false,
      default: false,
      category: null
    });

    NavigationList_defineProperty(this, "showNavTipHandler", () => {
      if (!this.state.showNavList) {
        this.setState({
          show: true
        });
      }
    });

    NavigationList_defineProperty(this, "hidNavTipHandler", () => {
      this.setState({
        show: false
      });
    });

    NavigationList_defineProperty(this, "showNavListHandler", () => {
      this.props.onshowNavList();
      this.setState((prevState, props) => {
        return {
          show: false,
          default: false,
          showNavList: prevState.showNavItm ? true : !prevState.showNavList,
          showNavItm: false
        };
      });
    });

    NavigationList_defineProperty(this, "showNavItmHandler", () => {
      this.props.onshowNavList();
      this.setState((prevState, props) => {
        return {
          showNavItm: true,
          show: false,
          default: false,
          showNavList: prevState.showNavItm ? !prevState.showNavList : true
        };
      });
    });

    NavigationList_defineProperty(this, "fetchNavListHandler", category => {
      this.props.onFetchNavList(category);
      this.setState({
        category
      });
    });
  }

  componentDidUpdate() {
    if (this.state.showNavList && !this.state.default && this.props.hidNavList) {
      this.setState({
        default: true,
        show: false,
        showNavList: false
      });
    }
  }

  render() {
    let navTipClass = ["site-header__tool-tip site-header__tool-tip--nav"];
    let navClass = ["site-header__menu--nav__opt"];
    let navList = null;
    let navOptClass = ["site-header__menu--nav__opt--det"];

    if (this.state.show) {
      navTipClass.push("site-header__tool-tip--nav__visible");
    }

    if (this.state.showNavList) {
      navClass.push("site-header__menu--nav__opt--visible");
    }

    if (this.state.showNavList && this.state.category) {
      let navOptCateg = this.state.category === 'post' ? 'site-header__menu--nav__opt--det__pt' : null;
      navOptCateg = this.state.category === 'question' ? 'site-header__menu--nav__opt--det__que' : navOptCateg;
      navOptCateg = this.state.category === 'onlineque' ? 'site-header__menu--nav__opt--det__pwt' : navOptCateg;
      navOptCateg = this.state.category === 'group' ? 'site-header__menu--nav__opt--det__grp' : navOptCateg;
      navOptCateg = this.state.category === 'poet' ? 'site-header__menu--nav__opt--det__onlineque' : navOptCateg;
      navOptClass.push(navOptCateg);
      navList = this.props.navList ? NavigationList_NavigationList_jsx("ul", {
        className: navOptClass.join(' ')
      }, NavigationList_NavigationList_jsx(NavigationLists, {
        content: this.props.navList,
        category: this.props.navListCateg
      })) : NavigationList_NavigationList_jsx("div", {
        className: `${navOptClass.join(' ')} site-header__menu--nav__opt--det__loading`
      }, NavigationList_NavigationList_jsx(Loader_Loader, null));
    }

    let navItm = NavigationList_NavigationList_jsx(Aux, null, navList, NavigationList_NavigationList_jsx("ul", {
      className: "site-header__menu--nav__opt--itm"
    }, NavigationList_NavigationList_jsx("li", {
      onMouseEnter: this.fetchNavListHandler.bind(this, 'post'),
      className: this.state.category === 'post' ? 'active-header-nav' : null
    }, NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'newspaper'],
      className: "icon icon__site-header--nav__itm"
    }), "News Feed", NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'caret-right'],
      className: "icon icon__site-header--nav__angle"
    })), NavigationList_NavigationList_jsx("li", {
      onMouseEnter: this.fetchNavListHandler.bind(this, 'question'),
      className: this.state.category === 'question' ? 'active-header-nav' : null
    }, NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'question'],
      className: "icon icon__site-header--nav__itm"
    }), "Questions", NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'caret-right'],
      className: "icon icon__site-header--nav__angle"
    })), NavigationList_NavigationList_jsx("li", {
      onMouseEnter: this.fetchNavListHandler.bind(this, 'poet'),
      className: this.state.category === 'poet' ? 'active-header-nav' : null
    }, NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'book'],
      className: "icon icon__site-header--nav__itm"
    }), "Writers", NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'caret-right'],
      className: "icon icon__site-header--nav__angle"
    }))));

    if (this.state.showNavItm) {
      navItm = NavigationList_NavigationList_jsx("ul", {
        className: "site-header__menu--nav__opt--itm__sm-categ--cnt"
      }, NavigationList_NavigationList_jsx("li", null, NavigationList_NavigationList_jsx("a", {
        href: "/post"
      }, NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'newspaper'],
        className: "icon icon__site-header--nav__itm"
      }), "News Feed")), NavigationList_NavigationList_jsx("li", null, NavigationList_NavigationList_jsx("a", {
        href: "/question"
      }, NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'question'],
        className: "icon icon__site-header--nav__itm"
      }), "Questions")), NavigationList_NavigationList_jsx("li", null, NavigationList_NavigationList_jsx("a", {
        href: "/poet"
      }, NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'book'],
        className: "icon icon__site-header--nav__itm"
      }), "Writers")), NavigationList_NavigationList_jsx("li", null, NavigationList_NavigationList_jsx("a", {
        href: "/users"
      }, NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'users'],
        className: "icon icon__site-header--nav__itm"
      }), "Scholars")));
    }

    return NavigationList_NavigationList_jsx("div", {
      className: "site-header__menu--nav"
    }, NavigationList_NavigationList_jsx("div", {
      className: "site-header__menu--nav__icn",
      onMouseEnter: this.showNavTipHandler,
      onMouseLeave: this.hidNavTipHandler,
      onClick: this.showNavListHandler
    }, NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'bars'],
      className: "icon icon__site-header--list"
    })), NavigationList_NavigationList_jsx("div", {
      className: navTipClass.join(' ')
    }, "Options"), NavigationList_NavigationList_jsx("div", {
      className: "site-header__menu--nav__opt--itm__sm-categ",
      onClick: this.showNavItmHandler
    }, NavigationList_NavigationList_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'external-link-alt']
    })), NavigationList_NavigationList_jsx("nav", {
      className: navClass.join(' ')
    }, navItm));
  }

}

;

const NavigationList_mapStateToProps = state => {
  return {
    navListCateg: state.header.navListCateg,
    navList: state.header.navList,
    hidNavList: state.header.hidNavList
  };
};

const NavigationList_mapDispatchToProps = dispatch => {
  return {
    onshowNavList: () => dispatch(actions["Bb" /* showNavList */]()),
    onFetchNavList: category => dispatch(actions["H" /* fetchNavlistInit */](category))
  };
};

/* harmony default export */ var Header_NavigationList_NavigationList = (Object(external_react_redux_["connect"])(NavigationList_mapStateToProps, NavigationList_mapDispatchToProps)(NavigationList_NavigationList_NavigationList));
// CONCATENATED MODULE: ./react/index/components/Navigation/NotifyItems/NotifyItem/NotifyItem.js
var NotifyItem_jsx = external_react_default.a.createElement;



const notifyItem = props => {
  let icn = props.notify.category === 'post' || props.notify.category === 'question' ? 'clone' : 'book';
  return NotifyItem_jsx("div", {
    className: "reuse-notify"
  }, NotifyItem_jsx("div", {
    className: "reuse-notify__categ"
  }, NotifyItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['fas', `${icn}`],
    className: "icon icon__reuse-notify--categ"
  }), props.notify.category, NotifyItem_jsx("div", {
    className: "reuse-notify__categ--active"
  }, props.notify.total)), NotifyItem_jsx("div", {
    className: "reuse-notify__title"
  }, NotifyItem_jsx("div", null, "Latest"), NotifyItem_jsx("h4", null, NotifyItem_jsx("a", {
    href: `/view/${props.notify.category}/${props.notify.id}`
  }, props.notify.title))));
};

/* harmony default export */ var NotifyItem = (notifyItem);
// CONCATENATED MODULE: ./react/index/components/Navigation/NotifyItems/NotifyItems.js
var NotifyItems_jsx = external_react_default.a.createElement;



const notifyItems = props => {
  const allTrends = props.content.map((notify, index) => NotifyItems_jsx(NotifyItem, {
    key: index,
    notify: notify
  }));
  return allTrends;
};

/* harmony default export */ var NotifyItems = (notifyItems);
// CONCATENATED MODULE: ./react/index/containers/Header/NavigationNotify/NavigationNotify.js
var NavigationNotify_jsx = external_react_default.a.createElement;

function NavigationNotify_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class NavigationNotify_NavigationNotify extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    NavigationNotify_defineProperty(this, "state", {
      show: false,
      showNotify: false,
      default: false
    });

    NavigationNotify_defineProperty(this, "showNotifyTipHandler", () => {
      if (!this.state.showNotify) {
        this.setState({
          show: true
        });
      }
    });

    NavigationNotify_defineProperty(this, "hidNotifyTipHandler", () => {
      this.setState({
        show: false
      });
    });

    NavigationNotify_defineProperty(this, "fetchNotifyHandler", () => {
      this.props.onFetchNotify();
      this.setState((prevState, props) => {
        return {
          show: false,
          default: false,
          showNotify: !prevState.showNotify
        };
      });
    });

    NavigationNotify_defineProperty(this, "changeFavoriteHandler", notifyID => {
      this.props.onChangeFav(this.props.notify, notifyID);
    });
  }

  componentDidMount() {
    this.props.onFetchNotifyActive();
  }

  componentDidUpdate() {
    if (this.state.showNotify && !this.state.default && this.props.hidNotify) {
      this.setState({
        default: true,
        show: false,
        showNotify: false
      });
      this.props.onDefaultNotifyactive();
    }
  }

  render() {
    let notifyTipClass = ["site-header__tool-tip site-header__tool-tip--notify"];
    let notify = null;
    let notifyCntClass = ["site-header__menu--notify__cnt"];
    let notifyActiveCnt = null;

    if (this.props.notifyActive && this.props.notifyActive > 0) {
      notifyActiveCnt = NavigationNotify_jsx("div", {
        className: "active__main active__main--header site-header__menu--notify__num"
      }, NavigationNotify_jsx("div", null, this.props.notifyActive));
    }

    if (this.state.show) {
      notifyTipClass.push("site-header__tool-tip--notify__visible");
    }

    if (this.state.showNotify) {
      notifyCntClass.push("site-header__menu--notify__cnt--visible");
      notify = NavigationNotify_jsx(Loader_Loader, null);
    }

    if (this.props.notify && this.props.notify.length < 1 && this.state.showNotify) {
      notifyCntClass.push("site-header__menu--notify__cnt--visible");
      notify = NavigationNotify_jsx(NoAcc_NoAcc, {
        isAuth: this.props.status,
        det: "No Notification found!",
        icn: "bell",
        isNotify: true
      });
    }

    if (this.props.notify && this.props.notify.length > 0 && this.state.showNotify) {
      notify = NavigationNotify_jsx(NotifyItems, {
        content: this.props.notify,
        fav: this.changeFavoriteHandler
      });
      notifyCntClass.push("site-header__menu--notify__cnt--visible");
    }

    return NavigationNotify_jsx("div", {
      className: "site-header__menu--notify"
    }, notifyActiveCnt, NavigationNotify_jsx("div", {
      className: "site-header__menu--notify__icn",
      onMouseEnter: this.showNotifyTipHandler,
      onMouseLeave: this.hidNotifyTipHandler,
      onClick: this.fetchNotifyHandler
    }, NavigationNotify_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'bell'],
      className: "icon icon__site-header--bell"
    })), NavigationNotify_jsx("div", {
      className: notifyTipClass.join(' ')
    }, "Notifications"), NavigationNotify_jsx("div", {
      className: notifyCntClass.join(' ')
    }, NavigationNotify_jsx("div", {
      className: "site-header__menu--notify__cnt--det"
    }, NavigationNotify_jsx("div", {
      className: "reuse-trd"
    }, NavigationNotify_jsx("div", {
      className: "reuse-trd__cnt reuse-trd__cnt--notify"
    }, notify)))));
  }

}

;

const NavigationNotify_mapStateToProps = state => {
  return {
    status: state.auth.status,
    notify: state.header.notify,
    notifyStart: state.header.notifyStart,
    notifyErr: state.header.notifyErr,
    hidNotify: state.header.hidNotify,
    notifyActive: state.header.notifyActive
  };
};

const NavigationNotify_mapDispatchToProps = dispatch => {
  return {
    onFetchNotify: () => dispatch(actions["M" /* fetchNotifyInit */]()),
    onChangeFav: (notify, notifyID) => dispatch(actions["j" /* changeFavNotifyInit */](notify, notifyID)),
    onFetchNotifyActive: () => dispatch(actions["O" /* fetchNotifyactiveInit */]()),
    onDefaultNotifyactive: () => dispatch(actions["u" /* defaultNotifyactiveInit */]())
  };
};

/* harmony default export */ var Header_NavigationNotify_NavigationNotify = (Object(external_react_redux_["connect"])(NavigationNotify_mapStateToProps, NavigationNotify_mapDispatchToProps)(NavigationNotify_NavigationNotify));
// CONCATENATED MODULE: ./react/index/components/Navigation/NavigationItems/NavigationItem/NavigationItem.js
var NavigationItem_jsx = external_react_default.a.createElement;


const navigationItem = props => NavigationItem_jsx("li", null, NavigationItem_jsx("a", {
  href: props.path
}, props.children));

/* harmony default export */ var NavigationItem = (navigationItem);
// CONCATENATED MODULE: ./react/index/components/Navigation/NavigationItems/NavigationItems.js
var NavigationItems_jsx = external_react_default.a.createElement;



const navigationItems = props => {
  let addNewOptClass = ["site-header__add-new--opt"];

  if (props.show) {
    addNewOptClass.push("site-header__add-new--opt__visible");
  }

  return NavigationItems_jsx("ul", {
    className: addNewOptClass.join(' ')
  }, NavigationItems_jsx(NavigationItem, {
    path: "/add/post"
  }, "News Feed"), NavigationItems_jsx(NavigationItem, {
    path: "/add/question"
  }, "Question"), NavigationItems_jsx(NavigationItem, {
    path: "/question"
  }, "Answer"), NavigationItems_jsx(NavigationItem, {
    path: "/add/poet"
  }, "Writers"));
};

/* harmony default export */ var NavigationItems = (navigationItems);
// CONCATENATED MODULE: ./react/index/components/Navigation/NavigationOptions/NavigationOptions.js
var NavigationOptions_jsx = external_react_default.a.createElement;



const navigationOptions = props => {
  return NavigationOptions_jsx("ul", {
    className: "site-header__nav-opt"
  }, NavigationOptions_jsx(NavigationItem, {
    path: "/post"
  }, "News Feed"), NavigationOptions_jsx(NavigationItem, {
    path: "/question"
  }, "Question"), NavigationOptions_jsx(NavigationItem, {
    path: "/poet"
  }, "Writers"), NavigationOptions_jsx(NavigationItem, {
    path: "/users"
  }, "Scholars"));
};

/* harmony default export */ var NavigationOptions = (navigationOptions);
// CONCATENATED MODULE: ./react/index/containers/Header/Favorite/Favorite.js
var Favorite_jsx = external_react_default.a.createElement;

function Favorite_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class Favorite_Favorite extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    Favorite_defineProperty(this, "state", {
      show: false
    });

    Favorite_defineProperty(this, "showFavTipHandler", () => {
      this.setState({
        show: true
      });
    });

    Favorite_defineProperty(this, "hidFavTipHandler", () => {
      this.setState({
        show: false
      });
    });
  }

  render() {
    let favTipClass = ["site-header__tool-tip site-header__tool-tip--fav"];

    if (this.state.show) {
      favTipClass.push("site-header__tool-tip--fav__visible");
    }

    return Favorite_jsx("a", {
      className: "site-header__menu--fav",
      href: "/favorite",
      onMouseEnter: this.showFavTipHandler,
      onMouseLeave: this.hidFavTipHandler
    }, this.props.favChange === null ? Favorite_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'heart'],
      className: "icon icon__site-header--favorites"
    }) : Favorite_jsx(FavoriteActive, {
      liked: this.props.favChange,
      isHeader: true
    }), Favorite_jsx("div", {
      className: favTipClass.join(' ')
    }, "Favorites"));
  }

}

;

const Favorite_mapStateToProps = state => {
  return {
    favChange: state.header.favChange
  };
};

/* harmony default export */ var Header_Favorite_Favorite = (Object(external_react_redux_["connect"])(Favorite_mapStateToProps, null)(Favorite_Favorite));
// CONCATENATED MODULE: ./react/index/containers/Header/Share/Share.js
var Share_jsx = external_react_default.a.createElement;

function Share_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class Share_Share extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    Share_defineProperty(this, "state", {
      show: false
    });

    Share_defineProperty(this, "showShareTipHandler", () => {
      this.setState({
        show: true
      });
    });

    Share_defineProperty(this, "hidShareTipHandler", () => {
      this.setState({
        show: false
      });
    });
  }

  render() {
    let shareTipClass = ["site-header__tool-tip site-header__tool-tip--share"];
    let shareActiveCnt = null;

    if (this.props.shareActive && this.props.shareActive > 0) {
      shareActiveCnt = Share_jsx("div", {
        className: "active__main active__main--header"
      }, Share_jsx("div", null, this.props.shareActive));
    }

    if (this.state.show) {
      shareTipClass.push("site-header__tool-tip--share__visible");
    }

    return Share_jsx("a", {
      className: "site-header__menu--share",
      href: "/acc/shared",
      onMouseEnter: this.showShareTipHandler,
      onMouseLeave: this.hidShareTipHandler
    }, shareActiveCnt, Share_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'location-arrow'],
      className: "icon icon__site-header--shares"
    }), Share_jsx("div", {
      className: shareTipClass.join(' ')
    }, "Shared with me"));
  }

}

;

const Share_mapStateToProps = state => {
  return {
    shareActive: state.main.shareActive
  };
};

/* harmony default export */ var Header_Share_Share = (Object(external_react_redux_["connect"])(Share_mapStateToProps, null)(Share_Share));
// EXTERNAL MODULE: ./react/index/containers/Header/UserOption/UserOption.css
var UserOption_UserOption = __webpack_require__("v99J");

// CONCATENATED MODULE: ./react/index/containers/Header/UserOption/UserOption.js
var UserOption_jsx = external_react_default.a.createElement;

function UserOption_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class UserOption_UserOption_UserOption extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    UserOption_defineProperty(this, "state", {
      show: false,
      default: false,
      id: document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
      showAddOpt: false
    });

    UserOption_defineProperty(this, "showUserOptionHandler", () => {
      this.props.onShowUserOption();
      this.setState((prevState, props) => {
        return {
          default: false,
          show: prevState.showAddOpt ? true : !prevState.show,
          showAddOpt: false
        };
      });
    });

    UserOption_defineProperty(this, "showAddCntHandler", () => {
      this.props.onShowUserOption();
      this.setState((prevState, Props) => {
        return {
          showAddOpt: true,
          default: false,
          show: prevState.showAddOpt ? !prevState.show : true
        };
      });
    });
  }

  componentDidUpdate() {
    if (this.state.show && !this.state.default && this.props.hidUserOption) {
      this.setState({
        default: true,
        show: false
      });
    }
  }

  render() {
    let userDetClass = ["site-header__user--det"];

    let userImg = UserOption_jsx("img", {
      className: "site-header__user--img",
      src: this.props.img,
      alt: this.props.username
    });

    let profile = null;

    if (this.state.show) {
      userDetClass.push("site-header__user--det__visible");
    }

    ;

    if (this.props.username && !this.props.img) {
      userImg = UserOption_jsx(external_react_avatar_default.a, {
        name: this.props.username,
        size: "30",
        round: true
      });
    }

    if (this.state.id) {
      profile = UserOption_jsx("li", {
        className: "site-header__user--det__portal"
      }, UserOption_jsx("a", {
        href: `/user/profile/${this.state.id}`
      }, UserOption_jsx("div", null, UserOption_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'user'],
        className: "icon icon__site-header--user__set"
      })), "My Profile"));
    }

    let cnt = UserOption_jsx(Aux, null, profile, UserOption_jsx("li", {
      className: "site-header__user--det__logout"
    }, UserOption_jsx("a", {
      href: "/auth/logout"
    }, UserOption_jsx("div", null, UserOption_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'angle-double-right'],
      className: "icon icon__site-header--user__log"
    })), "Logout")));

    if (this.state.showAddOpt) {
      cnt = UserOption_jsx(Aux, null, UserOption_jsx("li", {
        className: "site-header__user--det__logout"
      }, UserOption_jsx("a", {
        href: "/add/post"
      }, UserOption_jsx("div", null, UserOption_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'newspaper']
      })), "News Feed")), UserOption_jsx("li", {
        className: "site-header__user--det__logout"
      }, UserOption_jsx("a", {
        href: "/add/question"
      }, UserOption_jsx("div", null, UserOption_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'question']
      })), "Question")), UserOption_jsx("li", {
        className: "site-header__user--det__logout"
      }, UserOption_jsx("a", {
        href: "/question"
      }, UserOption_jsx("div", null, UserOption_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'clone']
      })), "Answer")), UserOption_jsx("li", {
        className: "site-header__user--det__logout"
      }, UserOption_jsx("a", {
        href: "/add/poet"
      }, UserOption_jsx("div", null, UserOption_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'book']
      })), "Writer")));
    }

    return UserOption_jsx("div", {
      className: "site-header__user"
    }, UserOption_jsx("div", {
      className: "site-header__user--det__addNew",
      onClick: this.showAddCntHandler
    }, UserOption_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'plus']
    })), UserOption_jsx("div", null, userImg), UserOption_jsx("ul", {
      className: userDetClass.join(' ')
    }, cnt), UserOption_jsx("div", {
      className: "site-header__user--det__opt",
      onClick: this.showUserOptionHandler
    }, UserOption_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'caret-down']
    })));
  }

}

const UserOption_mapStateToProps = state => {
  return {
    hidUserOption: state.header.hidUserOption,
    img: state.auth.img,
    username: state.auth.username
  };
};

const UserOption_mapDispatchToProps = dispatch => {
  return {
    onShowUserOption: () => dispatch(actions["Cb" /* showUserOption */]())
  };
};

/* harmony default export */ var Header_UserOption_UserOption = (Object(external_react_redux_["connect"])(UserOption_mapStateToProps, UserOption_mapDispatchToProps)(UserOption_UserOption_UserOption));
// CONCATENATED MODULE: ./react/index/containers/Header/Header.js
var Header_jsx = external_react_default.a.createElement;

function Header_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















class Header_Header extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    Header_defineProperty(this, "state", {
      showFormSm: false,
      default: false,
      inputValue: ''
    });

    Header_defineProperty(this, "showFormSmHandler", () => {
      this.setState((prevState, props) => {
        return {
          showFormSm: !prevState.showFormSm,
          default: false,
          inputValue: ''
        };
      });
      this.props.onShowForm();
      this.props.onCloseHeaderFilter();
    });

    Header_defineProperty(this, "filterContentHandler", event => {
      if (false) {}
    });
  }

  componentDidUpdate() {
    if (this.state.showFormSm && !this.state.default && this.props.hideFormSm) {
      this.setState({
        showFormSm: false,
        inputValue: '',
        default: true
      });
    }
  }

  render() {
    let addNewClass = ["site-header__add-new"];
    let formSmClass = ["site-header__sm-form"];

    let navOpt = Header_jsx(NavigationOptions, null);

    let userDet = Header_jsx("ul", {
      className: "site-header__no-acc site-header__no-acc--visible"
    }, Header_jsx("li", null, Header_jsx("a", {
      href: "/login",
      className: "site-header__no-acc--login"
    }, Header_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'lock'],
      className: "icon icon__site-header--no-acc"
    }), "Login")), Header_jsx("li", null, Header_jsx("a", {
      href: "/signup",
      className: "site-header__no-acc--sign"
    }, "Signup")));

    let isAuth = null;

    if (this.props.expand) {
      addNewClass.push("site-header__add-new--hidden");
      navOpt = null;
    }

    if (this.state.showFormSm && !this.props.hideFormSm) {
      formSmClass.push('site-header__sm-form--visible');
    }

    if (this.props.addNew) {
      addNewClass.push("icon--rotate");
    }

    if (this.props.status) {
      userDet = Header_jsx(Header_UserOption_UserOption, null);
      isAuth = Header_jsx(Aux, null, Header_jsx(Header_Favorite_Favorite, null), Header_jsx(Header_Share_Share, null), Header_jsx(Header_NavigationNotify_NavigationNotify, null));
    }

    return Header_jsx("header", {
      className: "site-header"
    }, Header_jsx(head_default.a, null, Header_jsx("meta", {
      charSet: "utf-8"
    }), Header_jsx("meta", {
      name: "viewport",
      content: "width=device-width, user-scalable=no, initial-scale=1.0"
    }), Header_jsx("meta", {
      httpEquiv: "X-UA-Compatible",
      content: "ie=edge"
    }), Header_jsx("link", {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }), Header_jsx("link", {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/favicon/android-icon-192x192.png"
    }), Header_jsx("link", {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/favicon/favicon-96x96.png"
    }), Header_jsx("link", {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png"
    }), Header_jsx("link", {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png"
    }), Header_jsx("link", {
      rel: "mask-icon",
      href: "/favicon/safari-pinned-tab.svg",
      color: "#5bbad5"
    }), Header_jsx("meta", {
      name: "apple-mobile-web-app-capable",
      content: "yes"
    }), Header_jsx("meta", {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black"
    }), Header_jsx("meta", {
      name: "apple-mobile-web-app-title",
      content: "Connecting scholars"
    }), Header_jsx("link", {
      rel: "apple-touch-icon",
      href: "/icons/sg-icon-apple-57x57.png",
      sizes: "57x57"
    }), Header_jsx("link", {
      rel: "apple-touch-icon",
      href: "/icons/sg-icon-apple-60x60.png",
      sizes: "60x60"
    }), Header_jsx("link", {
      rel: "apple-touch-icon",
      href: "/icons/sg-icon-apple-72x72.png",
      sizes: "72x72"
    }), Header_jsx("link", {
      rel: "apple-touch-icon",
      href: "/icons/sg-icon-apple-76x76.png",
      sizes: "76x76"
    }), Header_jsx("link", {
      rel: "apple-touch-icon",
      href: "/icons/sg-icon-apple-114x114.png",
      sizes: "114x114"
    }), Header_jsx("link", {
      rel: "apple-touch-icon",
      href: "/icons/sg-icon-apple-120x120.png",
      sizes: "120x120"
    }), Header_jsx("link", {
      rel: "apple-touch-icon",
      href: "/icons/sg-icon-apple-144x144.png",
      sizes: "144x144"
    }), Header_jsx("link", {
      rel: "apple-touch-icon",
      href: "/icons/sg-icon-apple-152x152.png",
      sizes: "152x152"
    }), Header_jsx("link", {
      rel: "apple-touch-icon",
      href: "/icons/sg-icon-apple-180x180.png",
      sizes: "180x180"
    }), Header_jsx("link", {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700"
    }), Header_jsx("meta", {
      name: "msapplication-TileImage",
      content: "/icons/sg-icon-apple-144x144.png"
    }), Header_jsx("meta", {
      name: "msapplication-TileColor",
      content: "#fff"
    }), Header_jsx("meta", {
      name: "msapplication-config",
      content: "/favicon/browserconfig.xml"
    }), Header_jsx("meta", {
      name: "theme-color",
      content: "#05578b"
    }), Header_jsx("link", {
      rel: "manifest",
      href: "/manifest.json"
    }), Header_jsx("title", null, "Slodge24 | knowledge sharing platform"), Header_jsx("script", {
      "data-ad-client": "ca-pub-2645721953100564",
      async: true,
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    })), Header_jsx("div", {
      className: "wrapper"
    }, Header_jsx("a", {
      href: "/index/post"
    }, Header_jsx(Logo_Logo, null)), Header_jsx(Header_NavigationInput_NavigationInput, null), Header_jsx("div", {
      className: "site-header__form-sm",
      onClick: this.showFormSmHandler
    }, Header_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'search'],
      className: "icon icon__site-header--search"
    })), Header_jsx("div", {
      className: addNewClass.join(' '),
      onClick: this.props.onAddNew
    }, Header_jsx("h4", {
      className: "site-header__add-new--title"
    }, "Add", Header_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'angle-down'],
      className: "icon__site-header--add-new"
    })), Header_jsx(NavigationItems, {
      show: this.props.addNew
    })), navOpt, Header_jsx("div", {
      className: "site-header__menu"
    }, isAuth, Header_jsx(Header_NavigationList_NavigationList, null)), userDet, Header_jsx("form", {
      className: formSmClass.join(' ')
    }, Header_jsx("div", {
      className: "site-header__sm-form--logo"
    }, Header_jsx("div", {
      className: "site-header__sm-form--logo__graphics"
    }, Header_jsx(Logo_Logo, null))), Header_jsx("div", {
      className: "site-header__sm-form--srch"
    }, Header_jsx("input", {
      type: "text",
      className: "site-header__sm-form--srch__input",
      autoComplete: "on",
      onChange: this.filterContentHandler,
      value: this.state.inputValue
    }), Header_jsx("div", {
      className: "site-header__sm-form--srch__icn"
    }, Header_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'search'],
      className: "icon icon__site-header--search"
    }))), Header_jsx("div", {
      className: "site-header__sm-form--close",
      onClick: this.showFormSmHandler
    }, Header_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'times'],
      className: "icon icon__site-header--sm-form__close"
    })))));
  }

}

const Header_mapStateToProps = state => {
  return {
    expand: state.header.expand,
    addNew: state.header.addNew,
    hideFormSm: state.header.hideFormSm,
    status: state.auth.status
  };
};

const Header_mapDispatchToProps = dispatch => {
  return {
    onAddNew: () => dispatch(actions["lb" /* headerAddNew */]()),
    onShowForm: () => dispatch(actions["sb" /* headerFormSm */]()),
    onHeaderFilter: (filterCnt, filterPos, filterLastPost) => dispatch(actions["pb" /* headerFilterInit */](filterCnt, filterPos, filterLastPost)),
    onCloseHeaderFilter: () => dispatch(actions["nb" /* headerFilterClose */]())
  };
};

/* harmony default export */ var containers_Header_Header = (Object(external_react_redux_["connect"])(Header_mapStateToProps, Header_mapDispatchToProps)(Header_Header));
// EXTERNAL MODULE: ./react/index/axios.js
var axios = __webpack_require__("MEIi");

// CONCATENATED MODULE: ./react/index/containers/Footer/Notification/Notification.js

let publickey = false ? undefined : null;

function displayConfirmNotification() {
  return new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      var options = {
        body: 'You successfully subscribed to Slodge24 Notification service!',
        icon: '/icons/sg-icon-96x96.png',
        dir: 'ltr',
        lang: 'en-US',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        requireInteraction: true,
        badge: '/icons/sg-icon-96x96.png',
        tag: 'confirm-notification',
        renotify: true,
        actions: [{
          action: 'confirm',
          title: 'Okay'
        }, {
          action: 'cancel',
          title: 'Cancel'
        }]
      };
      navigator.serviceWorker.ready.then(function (swreg) {
        swreg.showNotification('Successfully subscribed!', options);
        resolve();
      });
    } else {
      reject();
    }
  });
}

function configurePushSub() {
  return new Promise((resolve, reject) => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    var reg;
    navigator.serviceWorker.ready.then(function (swreg) {
      reg = swreg;
      return swreg.pushManager.getSubscription();
    }).then(function (sub) {
      if (sub === null) {
        let vapidPublicKey = publickey;
        let convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        });
      } else {
        return sub;
      }
    }).then(function (newSub) {
      let sub = JSON.stringify(newSub);
      return axios["a" /* default */].post('/users', null, {
        headers: {
          'data-categ': `subscribe==${sub}`
        }
      });
    }).then(function (res) {
      if (res.status === 200) {
        displayConfirmNotification().then(() => {
          resolve();
        });
      }
    }).catch(function (err) {
      reject(err);
    });
  });
}

function requestPermission() {
  return new Promise((resolve, reject) => {
    Notification.requestPermission(function (result) {
      if (result !== 'granted') {
        reject(result);
      } else {
        configurePushSub().then(() => {
          resolve();
        });
      }
    });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
// CONCATENATED MODULE: ./react/index/containers/Footer/Footer.js
var Footer_jsx = external_react_default.a.createElement;

function Footer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class Footer_Footer extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    Footer_defineProperty(this, "state", {
      isNotify: true
    });

    Footer_defineProperty(this, "askPermissionHandler", () => {
      requestPermission().then(() => {
        this.setState({
          isNotify: true
        });
      });
    });
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(swreg => {
        return swreg.pushManager.getSubscription();
      }).then(sub => {
        if (sub === null) {
          this.setState({
            isNotify: false
          });
        }
      });
    }
  }

  render() {
    let checkNotify = null;

    if (!this.state.isNotify) {
      checkNotify = Footer_jsx("div", {
        className: "site-footer__notify"
      }, Footer_jsx(react_fontawesome_["FontAwesomeIcon"], {
        icon: ['fas', 'bell'],
        className: "icon icon__site-footer--notify"
      }), "To receive or send Notifications to teachers/students, Please click the button", Footer_jsx("div", {
        className: "site-footer__notify--enable",
        onClick: this.askPermissionHandler
      }, "Enable Notification"));
    }

    return Footer_jsx("footer", {
      className: "site-footer"
    }, checkNotify, Footer_jsx("ul", null, Footer_jsx("li", null, Footer_jsx("a", {
      href: "/term"
    }, "Term of service")), Footer_jsx("li", null, "\xA9 Slodge24 , 2019"), Footer_jsx("li", null, Footer_jsx("a", {
      href: "/privacy"
    }, "Privacy policy"))));
  }

}

/* harmony default export */ var containers_Footer_Footer = (Footer_Footer);
// CONCATENATED MODULE: ./react/index/hoc/Layout/Layout.js
var Layout_jsx = external_react_default.a.createElement;


 // import SiteHero from '../../containers/SiteHero/SiteHero';



const layout = props => Layout_jsx(Aux, null, Layout_jsx(containers_Header_Header, null), props.children, Layout_jsx(containers_Footer_Footer, null));

/* harmony default export */ var Layout = (layout);
// CONCATENATED MODULE: ./react/index/components/MainNavigations/MainNavigation/ActiveLink.js
var ActiveLink_jsx = external_react_default.a.createElement;




const activeLink = props => {
  const handleClick = e => {
    e.preventDefault();
    props.router.push(props.href);
  };

  return ActiveLink_jsx("a", {
    href: props.href,
    onClick: handleClick,
    className: props.router.pathname === props.href ? 'active-content-tab' : null
  }, ActiveLink_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['fas', props.icnGrp],
    className: props.icnClass
  }), props.children);
};

/* harmony default export */ var ActiveLink = (Object(router_["withRouter"])(activeLink));
// CONCATENATED MODULE: ./react/index/components/MainNavigations/MainNavigation/MainNavigation.js
var MainNavigation_jsx = external_react_default.a.createElement;



const mainNavigation = props => {
  let active = null;

  if (props.active && props.active > 0) {
    active = MainNavigation_jsx("div", {
      className: "active__main active__main--tab"
    }, MainNavigation_jsx("div", null, props.active < 100 ? props.active : '99'));
  }

  return MainNavigation_jsx("li", {
    onClick: props.removeActive
  }, MainNavigation_jsx(ActiveLink, {
    href: props.path,
    icnGrp: props.icnGrp,
    icnClass: props.icnClass
  }, props.children, active));
};

/* harmony default export */ var MainNavigation = (mainNavigation);
// CONCATENATED MODULE: ./react/index/components/MainNavigations/MainNavigations.js
var MainNavigations_jsx = external_react_default.a.createElement;

function MainNavigations_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function MainNavigations_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { MainNavigations_ownKeys(Object(source), true).forEach(function (key) { MainNavigations_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { MainNavigations_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function MainNavigations_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const mainNavigations = props => {
  const allMainNav = [MainNavigations_objectSpread({}, props.content)].map(mainNav => MainNavigations_jsx(MainNavigation, {
    key: mainNav.path,
    path: mainNav.path,
    icnGrp: mainNav.icnGrp,
    icnClass: mainNav.icnClass,
    active: props.active,
    removeActive: props.removeActive
  }, mainNav.title));
  return allMainNav;
};

/* harmony default export */ var MainNavigations = (mainNavigations);
// CONCATENATED MODULE: ./react/index/containers/SiteMain/MainContent/MainContent.js
var MainContent_jsx = external_react_default.a.createElement;

function MainContent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class MainContent_MainContent extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    MainContent_defineProperty(this, "state", {
      post: {
        path: '/index/post',
        icnGrp: 'newspaper',
        icnClass: 'icon icon__site-main__content--tab',
        title: 'News feed'
      },
      questions: {
        path: '/index/question',
        icnGrp: 'question',
        icnClass: 'icon icon__site-main__content--tab',
        title: 'Questions'
      },
      // group: {
      //     path: '/index/group',
      //     icnGrp: 'users',
      //     icnClass: 'icon icon__site-main__content--tab',
      //     title: 'Groups'
      // },
      user: {
        path: '/index/user',
        icnGrp: 'users',
        icnClass: 'icon icon__site-main__content--tab',
        title: 'Scholars'
      },
      helpme: {
        path: '/index/helpme',
        icnGrp: 'hand-paper',
        icnClass: 'icon icon__site-main__content--tab',
        title: 'Q Chat'
      },
      poet: {
        path: '/index/poet',
        icnGrp: 'book',
        icnClass: 'icon icon__site-main__content--tab',
        title: 'Writers'
      },
      curTab: this.props.router.pathname.split('/')[2] ? this.props.router.pathname.split('/')[2] : 'post',
      cntFetch: false
    });

    MainContent_defineProperty(this, "removeActiveHandler", curTab => {
      if (this.state.curTab !== curTab) {
        this.props.onResetActive(this.props.userID, curTab);
        this.setState({
          curTab
        });
      }
    });
  }

  componentDidUpdate() {
    if (this.props.cntFetch && !this.state.cntFetch) {
      this.props.onResetActive(this.props.userID, this.state.curTab);
      this.setState({
        cntFetch: true
      });
    }
  }

  render() {
    let loaderCnt = null;

    if (this.props.showLoader) {
      loaderCnt = MainContent_jsx("div", {
        className: "site-main__content--loader"
      }, MainContent_jsx(Loader_Loader, null));
    }

    return MainContent_jsx("div", {
      className: "site-main__content"
    }, MainContent_jsx("div", {
      className: "site-main__content--wrapper"
    }, MainContent_jsx("ul", {
      className: "site-main__content--tab"
    }, MainContent_jsx(MainNavigations, {
      content: this.state.post,
      removeActive: this.removeActiveHandler.bind(this, 'post'),
      active: this.state.curTab !== 'post' ? this.props.ptActive : null
    }), MainContent_jsx(MainNavigations, {
      content: this.state.questions,
      removeActive: this.removeActiveHandler.bind(this, 'question'),
      active: this.state.curTab !== 'question' ? this.props.queActive : null
    }), MainContent_jsx(MainNavigations, {
      content: this.state.helpme,
      removeActive: this.removeActiveHandler.bind(this, 'helpme'),
      active: this.state.curTab !== 'helpme' ? this.props.shareCntActive : null
    }), MainContent_jsx(MainNavigations, {
      content: this.state.user,
      removeActive: this.removeActiveHandler.bind(this, 'user'),
      active: this.state.curTab !== 'user' ? this.props.reqActive : null
    }), MainContent_jsx(MainNavigations, {
      content: this.state.poet,
      removeActive: this.removeActiveHandler.bind(this, 'poet'),
      active: this.state.curTab !== 'poet' ? this.props.cntActive : null
    })), this.props.children, loaderCnt));
  }

}

const MainContent_mapStateToProps = state => {
  return {
    userID: state.auth.userID,
    shareCntActive: state.main.shareCntActive,
    cntActive: state.main.cntActive,
    ptActive: state.main.ptActive,
    queActive: state.main.queActive,
    reqActive: state.main.reqActive,
    cntFetch: state.cnt.cnts !== null,
    showLoader: state.cnt.showLoader
  };
};

const MainContent_mapDispatchToProps = dispatch => {
  return {
    onResetActive: (userID, curTab) => dispatch(actions["vb" /* resetActiveInit */](userID, curTab))
  };
};

/* harmony default export */ var SiteMain_MainContent_MainContent = (Object(router_["withRouter"])(Object(external_react_redux_["connect"])(MainContent_mapStateToProps, MainContent_mapDispatchToProps)(MainContent_MainContent)));
// CONCATENATED MODULE: ./react/index/components/Main/Nav/TrendItems/TrendItem/TrendItem.js
var TrendItem_jsx = external_react_default.a.createElement;





const trendItem = props => {
  let trend = null;
  let favAdd = null;
  let isLiked = null;

  for (let changedFav of props.changedFav) {
    if (props.trd.id === changedFav.id) {
      favAdd = changedFav.favAdd;
      isLiked = changedFav.liked;
    }
  }

  let fav = TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['far', 'heart'],
    className: "icon icon__reuse-trd--fav"
  });

  if (props.trd.liked && isLiked === null) {
    fav = TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'heart'],
      className: "icon icon__reuse-trd--fav"
    });
  }

  if (isLiked) {
    fav = TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'heart'],
      className: "icon icon__reuse-trd--fav"
    });
  }

  if (props.trd.cntGrp === 'post') {
    trend = TrendItem_jsx("div", {
      className: "reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav"
    }, TrendItem_jsx("div", {
      className: "reuse-trd__cnt--categ"
    }, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'clone'],
      className: "icon icon__reuse-trd--categ"
    }), props.trd.category), TrendItem_jsx("h4", {
      className: "reuse-trd__cnt--title"
    }, TrendItem_jsx("a", {
      href: '/view/post/' + props.trd.id
    }, Object(utility["e" /* transformString */])(props.trd.title))), TrendItem_jsx("ul", {
      className: "reuse-trd__cnt--footer"
    }, TrendItem_jsx("li", null, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'eye'],
      className: "icon icon__reuse-trd--view"
    }), Object(utility["d" /* transformNumber */])(props.trd.view)), TrendItem_jsx("li", null, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'comments'],
      className: "icon icon__reuse-trd--comment"
    }), Object(utility["d" /* transformNumber */])(props.trd.comment)), TrendItem_jsx("li", null, TrendItem_jsx("span", {
      onClick: props.fav
    }, fav), Object(utility["d" /* transformNumber */])(favAdd !== null ? favAdd : props.trd.favorite), props.favChange && props.favChange.id === props.trd.id ? TrendItem_jsx(FavoriteActive, {
      liked: props.favChange.isLiked
    }) : null)));
  }

  if (props.trd.cntGrp === 'poet') {
    trend = TrendItem_jsx("div", {
      className: "reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav"
    }, TrendItem_jsx("div", {
      className: "reuse-trd__cnt--categ"
    }, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'book'],
      className: "icon icon__reuse-trd--categ"
    }), props.trd.category), TrendItem_jsx("h4", {
      className: "reuse-trd__cnt--title"
    }, TrendItem_jsx("a", {
      href: '/view/poet/' + props.trd.id
    }, Object(utility["e" /* transformString */])(props.trd.title))), TrendItem_jsx("ul", {
      className: "reuse-trd__cnt--footer"
    }, TrendItem_jsx("li", null, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'smile'],
      className: "icon icon__reuse-trd--smile"
    }), Object(utility["d" /* transformNumber */])(props.trd.helpFull)), TrendItem_jsx("li", null, TrendItem_jsx("span", {
      onClick: props.fav
    }, fav), Object(utility["d" /* transformNumber */])(favAdd !== null ? favAdd : props.trd.favorite), props.favChange && props.favChange.id === props.trd.id ? TrendItem_jsx(FavoriteActive, {
      liked: props.favChange.isLiked
    }) : null), TrendItem_jsx("li", null, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'comment-dots'],
      className: "icon icon__reuse-trd--pwt-comment"
    }), Object(utility["d" /* transformNumber */])(props.trd.comment))));
  }

  if (props.trd.cntGrp === 'question') {
    trend = TrendItem_jsx("div", {
      className: "reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav"
    }, TrendItem_jsx("div", {
      className: "reuse-trd__cnt--categ"
    }, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'book'],
      className: "icon icon__reuse-trd--categ"
    }), props.trd.category), TrendItem_jsx("h4", {
      className: "reuse-trd__cnt--title"
    }, TrendItem_jsx("a", {
      href: '/view/question/' + props.trd.id
    }, Object(utility["e" /* transformString */])(props.trd.title))), TrendItem_jsx("ul", {
      className: "reuse-trd__cnt--footer"
    }, TrendItem_jsx("li", null, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'thumbs-up'],
      className: "icon icon__reuse-trd--smile"
    }), Object(utility["d" /* transformNumber */])(props.trd.helpFull)), TrendItem_jsx("li", null, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'thumbs-down'],
      className: "icon icon__reuse-trd--view"
    }), Object(utility["d" /* transformNumber */])(props.trd.notHelpFull)), TrendItem_jsx("li", null, TrendItem_jsx("span", {
      onClick: props.fav
    }, fav), Object(utility["d" /* transformNumber */])(favAdd !== null ? favAdd : props.trd.favorite), props.favChange && props.favChange.id === props.trd.id ? TrendItem_jsx(FavoriteActive, {
      liked: props.favChange.isLiked
    }) : null)));
  }

  if (props.trd.cntGrp === 'group') {
    trend = TrendItem_jsx("div", {
      className: "reuse-trd__cnt--wrapper reuse-trd__cnt--wrapper__nav"
    }, TrendItem_jsx("div", {
      className: "reuse-trd__cnt--categ"
    }, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'users'],
      className: "icon icon__reuse-trd--categ"
    }), props.trd.category), TrendItem_jsx("h4", {
      className: "reuse-trd__cnt--title"
    }, TrendItem_jsx("a", {
      href: '/view/' + props.trd.id
    }, Object(utility["e" /* transformString */])(props.trd.desc))), TrendItem_jsx("ul", {
      className: "reuse-trd__cnt--footer"
    }, TrendItem_jsx("li", null, TrendItem_jsx("div", {
      className: "reuse-trd__cnt--footer__det"
    }, TrendItem_jsx("div", null, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'users'],
      className: "icon icon__reuse-trd--users"
    })), Object(utility["d" /* transformNumber */])(props.trd.users))), TrendItem_jsx("li", null, TrendItem_jsx("div", {
      className: "reuse-trd__cnt--footer__det"
    }, TrendItem_jsx("div", {
      className: "reuse-trd__cnt--footer__det--status"
    }, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'user-friends'],
      className: "icon icon__reuse-trd--user-frnd"
    })), Object(utility["d" /* transformNumber */])(props.trd.userOnline))), TrendItem_jsx("li", {
      className: "reuse-trd__cnt--footer__add-grp"
    }, TrendItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'plus'],
      className: "icon icon__reuse-trd--add"
    }), "Join")));
  }

  return trend;
};

/* harmony default export */ var TrendItem = (trendItem);
// CONCATENATED MODULE: ./react/index/components/Main/Nav/TrendItems/TrendItems.js
var TrendItems_jsx = external_react_default.a.createElement;



const trendItems = props => {
  const allTrends = props.content.map((trd, index) => TrendItems_jsx(TrendItem, {
    key: index,
    trd: trd,
    fav: props.fav.bind(undefined, trd.id, trd.liked, trd.favorite, trd.cntGrp),
    changedFav: props.changedFav,
    favChange: props.favChange
  }));
  return allTrends;
};

/* harmony default export */ var TrendItems = (trendItems);
// CONCATENATED MODULE: ./react/index/containers/SiteMain/MainNav/TopTrending/TopTrending.js
var TopTrending_jsx = external_react_default.a.createElement;

function TopTrending_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class TopTrending_TopTrending extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    TopTrending_defineProperty(this, "changeFavoriteHandler", (id, isLiked, favAdd, cntGrp) => {
      this.props.onChangeFav(id, isLiked, favAdd, this.props.changedFav, this.props.userID, cntGrp);
    });
  }

  render() {
    let trends = TopTrending_jsx(Loader_Loader, null);

    if (this.props.trd) {
      trends = TopTrending_jsx(TrendItems, {
        content: this.props.trd,
        fav: this.changeFavoriteHandler,
        changedFav: this.props.changedFav,
        favChange: this.props.favChange
      });
    }

    return TopTrending_jsx("div", {
      className: "reuse-trd reuse-trd__nav"
    }, TopTrending_jsx("h3", null, " Top Trendings"), TopTrending_jsx("div", {
      className: "reuse-trd__cnt reuse-trd__cnt--nav"
    }, trends));
  }

}

const TopTrending_mapStateToProps = state => {
  return {
    trd: state.trd.trends,
    changedFav: state.cnt.changedFav,
    favChange: state.cnt.favChange,
    userID: state.auth.userID
  };
};

const TopTrending_mapDispatchToProps = dispatch => {
  return {
    onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions["h" /* changeFavInit */](id, liked, favAdd, changedFav, userID, cntGrp))
  };
};

/* harmony default export */ var MainNav_TopTrending_TopTrending = (Object(external_react_redux_["connect"])(TopTrending_mapStateToProps, TopTrending_mapDispatchToProps)(TopTrending_TopTrending));
// CONCATENATED MODULE: ./react/index/components/Main/Nav/ConvItems/ConvItem/ConvItem.js
var ConvItem_jsx = external_react_default.a.createElement;




const convItem = props => {
  let conv = null;

  let userStatus = ConvItem_jsx("div", {
    className: "reuse-pvt-chat__img--status reuse-pvt-chat__img--status__on"
  });

  let pvtUserOptDetClass = ['reuse-pvt-chat__opt'];
  let pvtUserOptClass = ['reuse-pvt-chat__opt--det'];
  let grpUserOptDetClass = ['reuse-grp-chat__opt'];
  let grpUserOptClass = ['reuse-grp-chat__opt--det'];

  if (!props.conv.status) {
    userStatus = ConvItem_jsx("div", {
      className: "reuse-pvt-chat__img--status reuse-pvt-chat__img--status__off"
    });
  }

  if (props.showConv && props.showConv.visible && props.index === props.showConv.index && props.conv.type === 'pvtChat') {
    pvtUserOptDetClass.push('reuse-pvt-chat__opt--clk');
    pvtUserOptClass.push('reuse-pvt-chat__opt--det__visible');
  }

  if (props.showConv && props.showConv.visible && props.index === props.showConv.index && props.conv.type === 'grpChat') {
    grpUserOptDetClass.push('reuse-grp-chat__opt--clk');
    grpUserOptClass.push('reuse-grp-chat__opt--det__visible');
  }

  if (props.conv.type === 'pvtChat') {
    conv = ConvItem_jsx("div", {
      className: "reuse-pvt-chat reuse-pvt-chat__nav"
    }, ConvItem_jsx("div", {
      className: "active__main active__main--chat-cnt"
    }, ConvItem_jsx("div", null, "9")), ConvItem_jsx("div", {
      className: "reuse-pvt-chat__img"
    }, ConvItem_jsx("img", {
      src: props.conv.userImage,
      alt: ""
    }), userStatus), ConvItem_jsx("ul", {
      className: "reuse-pvt-chat__det"
    }, ConvItem_jsx("li", null, ConvItem_jsx("a", {
      href: "/"
    }, props.conv.user, " ", ConvItem_jsx("span", null, "@ ", props.conv.convCreated))), ConvItem_jsx("li", null, ConvItem_jsx("a", {
      href: "/"
    }, props.conv.lastMsg))), ConvItem_jsx("div", {
      className: pvtUserOptDetClass.join(' '),
      onClick: props.userOpt
    }, ConvItem_jsx("div", {
      className: "reuse-pvt-chat__opt--mid"
    }), ConvItem_jsx("ul", {
      className: pvtUserOptClass.join(' ')
    }, ConvItem_jsx("li", null, ConvItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'eye-slash'],
      className: "icon icon__reuse-conv--blk"
    }), "Block"), ConvItem_jsx("li", null, ConvItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'trash-alt'],
      className: "icon icon__reuse-conv--del"
    }), "Delete"))));
  }

  if (props.conv.type === 'grpChat') {
    conv = ConvItem_jsx("div", {
      className: "reuse-grp-chat reuse-grp-chat__nav"
    }, ConvItem_jsx("div", {
      className: "active__main active__main--chat-cnt"
    }, ConvItem_jsx("div", null, "9")), ConvItem_jsx("div", {
      className: "reuse-grp-chat__img"
    }, ConvItem_jsx("img", {
      src: props.conv.groupImage,
      alt: ""
    })), ConvItem_jsx("ul", {
      className: "reuse-grp-chat__det"
    }, ConvItem_jsx("li", {
      className: "reuse-grp-chat__det--title"
    }, ConvItem_jsx("a", {
      href: "/"
    }, props.conv.title)), ConvItem_jsx("li", {
      className: "reuse-grp-chat__det--last-msg"
    }, props.conv.lastMsg), ConvItem_jsx("li", {
      className: "reuse-grp-chat__det--status"
    }, ConvItem_jsx("div", {
      className: "reuse-grp-chat__det--status__on reuse-grp-chat__det--status__on--nav"
    }, " online ", ConvItem_jsx("span", null, Object(utility["d" /* transformNumber */])(props.conv.online))), " ", ConvItem_jsx("div", {
      className: "reuse-grp-chat__det--status__off"
    }, " offline ", ConvItem_jsx("span", null, Object(utility["d" /* transformNumber */])(props.conv.offline))), " ")), ConvItem_jsx("div", {
      className: grpUserOptDetClass.join(' '),
      onClick: props.userOpt
    }, ConvItem_jsx("div", {
      className: "reuse-grp-chat__opt--mid"
    }), ConvItem_jsx("ul", {
      className: grpUserOptClass.join(' ')
    }, ConvItem_jsx("li", null, ConvItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'eye-slash'],
      className: "icon icon__reuse-conv--blk"
    }), "Block"), ConvItem_jsx("li", null, ConvItem_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'trash-alt'],
      className: "icon icon__reuse-conv--del"
    }), "Delete"))));
  }

  return conv;
};

/* harmony default export */ var ConvItem = (convItem);
// CONCATENATED MODULE: ./react/index/components/Main/Nav/ConvItems/ConvItems.js
var ConvItems_jsx = external_react_default.a.createElement;



const convItems = props => {
  const allConv = props.convs.map((conversation, index) => ConvItems_jsx(ConvItem, {
    key: index,
    conv: conversation,
    userOpt: props.userOpt.bind(undefined, index),
    showConv: props.showConvOpt,
    index: index
  }));
  return allConv;
};

/* harmony default export */ var ConvItems = (convItems);
// CONCATENATED MODULE: ./react/index/containers/SiteMain/MainNav/Conversation/Conversation.js
var Conversation_jsx = external_react_default.a.createElement;

function Conversation_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class Conversation_Conversation extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    Conversation_defineProperty(this, "state", {
      convOpt: null
    });

    Conversation_defineProperty(this, "showUserOptHandler", index => {
      if (this.state.convOpt && this.state.convOpt.index === index) {
        this.setState((prevState, props) => {
          return {
            convOpt: Object(utility["f" /* updateObject */])(prevState.convOpt, {
              visible: !prevState.convOpt.visible
            })
          };
        });
        return;
      }

      const newConvOpt = {
        visible: true,
        index
      };
      this.setState({
        convOpt: newConvOpt
      });
    });
  }

  componentDidMount() {
    this.props.onFetchConv();
  }

  render() {
    let convs = null;

    if (this.props.conv) {
      convs = Conversation_jsx(ConvItems, {
        convs: this.props.conv,
        userOpt: this.showUserOptHandler,
        showConvOpt: this.state.convOpt
      });
    }

    return Conversation_jsx("div", {
      className: "reuse-conv"
    }, Conversation_jsx("div", {
      className: "reuse-conv__title"
    }, Conversation_jsx("div", {
      className: "reuse-conv__title--wrapper"
    }, Conversation_jsx("div", null, Conversation_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['far', 'comment-dots'],
      className: "icon icon__reuse-conv--comment"
    })), "Conversations")), convs);
  }

}

const mapStateToPros = state => {
  return {
    conv: state.conv.conv
  };
};

const Conversation_mapDispatchToProps = dispatch => {
  return {
    onFetchConv: () => dispatch(actions["F" /* fetchConvInit */]())
  };
};

/* harmony default export */ var MainNav_Conversation_Conversation = (Object(external_react_redux_["connect"])(mapStateToPros, Conversation_mapDispatchToProps)(Conversation_Conversation));
// CONCATENATED MODULE: ./react/index/containers/SiteMain/MainNav/MainNav.js
var MainNav_jsx = external_react_default.a.createElement;

function MainNav_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

 // import Tags from './Tags/Tags';


 // import SetQue from './SetQue/SetQue';

class MainNav_MainNav extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    MainNav_defineProperty(this, "state", {
      showConv: false
    });

    MainNav_defineProperty(this, "showConvHandler", () => {
      this.setState((prevState, props) => {
        return {
          showConv: !prevState.showConv
        };
      });
    });
  }

  render() {
    let mainNavItm = MainNav_jsx(Aux, null, MainNav_jsx(MainNav_TopTrending_TopTrending, null));

    let navExchangeClass = [];

    if (this.state.showConv) {
      mainNavItm = MainNav_jsx(MainNav_Conversation_Conversation, null);
      navExchangeClass.push('active-site-nav-exch ');
    }

    return MainNav_jsx("div", {
      className: "site-main__nav site-main__nav--sticky"
    }, MainNav_jsx("div", {
      className: "site-main__nav--wrapper"
    }, MainNav_jsx("ul", {
      className: "site-main__nav--header"
    }), mainNavItm));
  }

}

/* harmony default export */ var SiteMain_MainNav_MainNav = (MainNav_MainNav);
// CONCATENATED MODULE: ./react/index/components/UI/Backdrop/Backdrop.js
var Backdrop_jsx = external_react_default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



const backdrop = props => {
  return Backdrop_jsx("div", {
    className: "site-main__content--overlay"
  }, Backdrop_jsx("div", {
    className: "site-main__content--overlay__close",
    onClick: props.close
  }), Backdrop_jsx(props.component, _extends({}, props, {
    changePost: props.changePost,
    closeChangePost: props.closeChangePost
  })));
};

/* harmony default export */ var Backdrop = (backdrop);
// CONCATENATED MODULE: ./react/index/components/UI/Modal/Modal.js
var Modal_jsx = external_react_default.a.createElement;




const modal = props => {
  let modalCnt = Modal_jsx("h3", null, props.err ? props.err.response ? 'Network Error' : 'Network Error' : null);

  if (!props.err && props.warn && props.warn.cnt && props.exit && !props.exit.close) {
    modalCnt = Modal_jsx("div", {
      className: "reuse-modal__warn"
    }, Modal_jsx("h4", null, props.warn.msg), Modal_jsx("p", null, props.warn.cnt), Modal_jsx("div", {
      className: "reuse-modal__btn"
    }, Modal_jsx("button", {
      className: "reuse-modal__btn--cancel",
      type: "button",
      onClick: props.closeChangeCnt
    }, Modal_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: ['fas', 'times'],
      className: "icon icon__reuse-modal--btn"
    }), "Cancel"), Modal_jsx("button", {
      className: props.warn.det && (props.warn.det === 'publish' || props.warn.det === 'acceptUser') ? "reuse-modal__btn--success" : "reuse-modal__btn--del",
      type: "button",
      onClick: props.changeCnt
    }, Modal_jsx(react_fontawesome_["FontAwesomeIcon"], {
      icon: props.warn.det && props.warn.det === 'delete' ? ['far', 'trash-alt'] : props.warn.det && props.warn.det === 'publish' ? ['fas', 'eye'] : props.warn.det && props.warn.det === 'draft' ? ['fas', 'eye-slash'] : props.warn.det && props.warn.det === 'blockUser' ? ['fas', 'eye-slash'] : props.warn.det && props.warn.det === 'acceptUser' ? ['fas', 'user-friends'] : props.warn.det && props.warn.det === 'rejUser' ? ['fas', 'user-slash'] : ['fas', 'user-slash'],
      className: "icon icon__reuse-modal--btn"
    }), props.warn.det && props.warn.det === 'delete' ? 'Delete' : props.warn.det && (props.warn.det === 'draft' || props.warn.det === 'publish') ? 'Change' : props.warn.det && props.warn.det === 'blockUser' ? 'Block' : props.warn.det && props.warn.det === 'acceptUser' ? 'Accept' : props.warn.det && props.warn.det === 'rejUser' ? 'Reject' : props.warn.det && props.warn.det === 'cancelReq' ? 'Cancel' : 'Unfriend')));
  }

  if (!props.err && props.exit && props.exit.close) {
    modalCnt = Modal_jsx("p", {
      className: "reuse-modal__success"
    }, props.exit.msg);
  }

  return Modal_jsx("div", {
    className: "reuse-modal"
  }, props.err ? Modal_jsx("div", {
    className: "reuse-modal__icn"
  }, Modal_jsx(react_fontawesome_["FontAwesomeIcon"], {
    icon: ['fas', 'times'],
    className: "icon icon__reuse-modal--icn"
  })) : null, !props.err && !props.warn.cnt ? Modal_jsx(Loader_Loader, {
    cnt: props.warn.det === 'addUser' ? 'Adding ....' : 'Loading ....'
  }) : null, modalCnt);
};

/* harmony default export */ var Modal = (modal);
// CONCATENATED MODULE: ./react/index/components/MainFilter/Filter/Filter.js
var Filter_jsx = external_react_default.a.createElement;


const filter = props => {
  let filterClass = props.filterRes.grp === 'post' ? ['site-main__content--filter__wrapper--pt'] : props.filterRes.grp === 'question' ? ['site-main__content--filter__wrapper--que'] : ['site-main__content--filter__wrapper--pwt'];
  return Filter_jsx("li", {
    onClick: props.viewCnt
  }, Filter_jsx("div", {
    style: {
      paddingLeft: props.filterPos,
      paddingRight: props.filterLastPos
    }
  }, Filter_jsx("span", {
    className: filterClass.join('')
  }, props.filterRes.grp), props.filterRes.title));
};

/* harmony default export */ var Filter = (filter);
// CONCATENATED MODULE: ./react/index/components/MainFilter/MainFilter.js
var MainFilter_jsx = external_react_default.a.createElement;



const mainFilter = props => {
  let allFilterRes = props.filterResults.map((filterRes, index) => MainFilter_jsx(Filter, {
    key: index,
    filterRes: filterRes,
    filterPos: props.filterPos,
    filterLastPos: props.filterLastPos,
    viewCnt: props.viewCnt.bind(undefined, filterRes)
  }));
  return allFilterRes;
};

/* harmony default export */ var MainFilter = (mainFilter);
// CONCATENATED MODULE: ./react/index/containers/SiteMain/SiteMain.js
var SiteMain_jsx = external_react_default.a.createElement;

function SiteMain_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










 // const AsyncShare= asyncComponent(() => {
//     return import ('./Share/Share');
// });

class SiteMain_SiteMain extends external_react_["Component"] {
  constructor(...args) {
    super(...args);

    SiteMain_defineProperty(this, "checkHeaderDefault", () => {
      if (!this.props.default) {
        this.props.onNavDefault();
      }
    });

    SiteMain_defineProperty(this, "closeHeaderFilterHandler", () => {
      this.props.onCloseHeaderFilter();
    });

    SiteMain_defineProperty(this, "viewCntHandler", searchDet => {
      window.location.assign('/view/' + searchDet.grp + '/' + searchDet.id);
    });

    SiteMain_defineProperty(this, "changeCntHandler", () => {
      this.props.onChangeCnt(this.props.changeCntStart.id, null, this.props.changeCntStart.det, true, this.props.changeCntStart.modelType);
    });

    SiteMain_defineProperty(this, "closeChangeCntHandler", () => {
      this.props.onCloseChangeCnt();
    });

    SiteMain_defineProperty(this, "closeModelBackdropHandler", () => {
      this.props.onCloseModelBackdrop();
    });
  }

  render() {
    let filterCnt = SiteMain_jsx(Loader_Loader, null);

    if (!this.props.searchCntErr && this.props.searchCnt && this.props.searchCnt.length > 0) {
      filterCnt = SiteMain_jsx("ul", null, SiteMain_jsx(MainFilter, {
        filterResults: this.props.searchCnt,
        filterPos: this.props.filterPos,
        filterLastPos: this.props.filterLastPos,
        viewCnt: this.viewCntHandler
      }));
    }

    if (!this.props.searchCntErr && this.props.searchCnt && this.props.searchCnt.length === 0) {
      filterCnt = SiteMain_jsx(NoAcc_NoAcc, {
        isAuth: this.props.userID !== null,
        det: "No content found!",
        icn: "clone",
        filter: true
      });
    }

    if (this.props.searchCntErr) {
      filterCnt = SiteMain_jsx("div", {
        className: "site-main__content--filter__err"
      }, this.props.searchCntErr.message);
    }

    return SiteMain_jsx("div", {
      className: "site-main site-main__expage",
      onClick: this.checkHeaderDefault
    }, SiteMain_jsx("div", {
      className: "wrapper__exmain"
    }, this.props.cntErr ? SiteMain_jsx(Backdrop, {
      component: Modal,
      close: this.closeModelBackdropHandler,
      err: this.props.cntErr
    }) : null, SiteMain_jsx(SiteMain_MainContent_MainContent, null, this.props.children), SiteMain_jsx(SiteMain_MainNav_MainNav, null)), this.props.filterStart ? SiteMain_jsx("div", {
      className: "site-main__content--filter",
      onClick: this.closeHeaderFilterHandler
    }, SiteMain_jsx("div", {
      className: "site-main__content--filter__wrapper"
    }, filterCnt)) : null, this.props.changeCntStart !== null ? SiteMain_jsx(Backdrop, {
      show: this.props.showBackdrop,
      component: Modal,
      close: this.closeModelBackdropHandler,
      err: this.props.changeCntErr,
      warn: {
        msg: this.props.changeCntStart.det === 'delete' ? 'Are you sure you want to delete this ' : this.props.changeCntStart.det === 'draft' || this.props.changeCntStart.det === 'publish' ? 'Are you sure you want to change the mode' : this.props.changeCntStart.det === 'blockUser' ? 'Are you sure you want to block this user' : this.props.changeCntStart.det === 'rejUser' ? 'Are you sure you want to reject this user' : this.props.changeCntStart.det === 'acceptUser' ? 'Are you sure you want to accept this user' : this.props.changeCntStart.det === 'cancelReq' ? 'Are you sure you want to Cancel the request, sent to this user' : 'Are you sure you want to remove this user',
        cnt: this.props.changeCntStart.title,
        det: this.props.changeCntStart.det
      },
      exit: {
        msg: this.props.changeCntStart.det === 'delete' ? 'Deleted Successfully' : this.props.changeCntStart.det === 'draft' || this.props.changeCntStart.det === 'publish' ? 'Mode change successfully' : this.props.changeCntStart.det === 'authUser' ? 'user added Successfully' : 'Mode change successfully',
        close: this.props.changeCnt
      },
      changeCnt: this.changeCntHandler,
      closeChangeCnt: this.closeChangeCntHandler
    }) : null);
  }

}

const SiteMain_mapStateToProps = state => {
  return {
    userID: state.auth.userID,
    default: state.header.default,
    showBackdrop: state.main.showBackdrop,
    cntErr: state.cnt.cntErr,
    filterStart: state.header.filterStart,
    searchCnt: state.header.searchCnt,
    searchCntErr: state.header.searchCntErr,
    filterPos: state.header.filterPos,
    filterLastPos: state.header.filterLastPos,
    changeCntStart: state.cnt.changeCntStart,
    changeCntErr: state.cnt.changeCntErr,
    changeCnt: state.cnt.changeCnt,
    cntType: state.share.cntType
  };
};

const SiteMain_mapDispatchToProps = dispatch => {
  return {
    onNavDefault: () => dispatch(actions["tb" /* headerNavDefault */]()),
    onCloseHeaderFilter: () => dispatch(actions["nb" /* headerFilterClose */]()),
    onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions["d" /* changeCntInit */](id, title, det, confirm, modelType)),
    onCloseChangeCnt: () => dispatch(actions["b" /* changeCntCancel */]()),
    onCloseModelBackdrop: () => dispatch(actions["wb" /* resetModel */]())
  };
};

/* harmony default export */ var containers_SiteMain_SiteMain = (Object(external_react_redux_["connect"])(SiteMain_mapStateToProps, SiteMain_mapDispatchToProps)(SiteMain_SiteMain));
// EXTERNAL MODULE: ./react/index/App.css
var index_App = __webpack_require__("Lsyi");

// CONCATENATED MODULE: ./react/index/App.js
var App_jsx = external_react_default.a.createElement;






class App_App extends external_react_["Component"] {
  static async getInitialProps({
    store
  }) {
    store.dispatch(actions["C" /* fetchCntReset */]());
    return {};
  }

  render() {
    return App_jsx(Layout, null, App_jsx(containers_SiteMain_SiteMain, null, this.props.children));
  }

}

/* harmony default export */ var react_index_App = (App_App);
// CONCATENATED MODULE: ./pages/index.js
var pages_jsx = external_react_default.a.createElement;

function pages_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











let IS_ANIMATED = true;
let pages_limit = 0;

if (false) {}

class pages_Posts extends external_react_["Component"] {
  static async getInitialProps(props) {
    const {
      store,
      isServer
    } = props.ctx;
    store.dispatch(actions["C" /* fetchCntReset */]());

    if (!store.getState().cnt.cnts) {
      store.dispatch(actions["B" /* fetchCntInit */](null, 'post', pages_limit, 0, 0));
      store.dispatch(actions["p" /* changeTagsPath */]('/post'));
      store.dispatch(actions["bb" /* fetchTrdInit */](null));
    }

    return {
      cnts: store.getState().cnt.cnts
    };
  }

  constructor(props) {
    super(props);

    pages_defineProperty(this, "onScroll", () => {
      if (false) {}
    });

    pages_defineProperty(this, "showUserOptHandler", id => {
      if (this.state.cntOpt && this.state.cntOpt.id === id) {
        this.setState((prevState, props) => {
          return {
            cntOpt: Object(utility["f" /* updateObject */])(prevState.cntOpt, {
              visible: !prevState.cntOpt.visible
            })
          };
        });
        return;
      }

      const newCntOpt = {
        visible: true,
        id
      };
      this.setState({
        cntOpt: newCntOpt
      });
    });

    pages_defineProperty(this, "changeFavoriteHandler", (id, isLiked, favAdd, cntGrp) => {
      this.props.onChangeFav(id, isLiked, favAdd, this.props.changedFav, this.props.userID, cntGrp);
    });

    pages_defineProperty(this, "showShareHandler", shareID => {
      this.props.onChangeShareID(shareID, 'post');
      this.props.router.push('/index/post/share');
    });

    pages_defineProperty(this, "changeMediaHandler", (id, maxLength, type) => {
      this.setState({
        removePrevMedia: {
          id,
          type
        },
        removeAnim: false
      });
      this.animateSlider(id, maxLength, type, 900);
    });

    pages_defineProperty(this, "removeAnimHandler", event => {
      if (!this.state.removePrevMedia) {
        this.setState({
          removeAnim: true
        });
      }
    });

    pages_defineProperty(this, "playVideoHandler", snapshot => {
      this.props.onFetchVideo(snapshot.id, `${global_default.a.url}/media/video/${snapshot.videoCnt}`);
    });

    pages_defineProperty(this, "slidePlayHandler", (id, maxLength, event) => {
      let slide = event.target;
      slide.setPointerCapture(event.pointerId);
      this.setState({
        playerIcnId: id
      });
    });

    pages_defineProperty(this, "clearSlidePlayhandler", event => {
      let slide = event.target;
      slide.releasePointerCapture(event.pointerId);
      slide.style.left = 0 + 'px';
      let videoPlayerIcn = document.querySelector('.reuse-pt__media--wrapper__icn-move');

      if (videoPlayerIcn) {
        videoPlayerIcn.style.left = 45 + '%';
      }
    });

    pages_defineProperty(this, "moveSlidePlayHandler", (id, maxLength, event) => {
      let slide = event.target;

      if (slide.hasPointerCapture && slide.hasPointerCapture(event.pointerId)) {
        let newpos = event.clientX - slide.parentElement.offsetLeft - slide.offsetWidth / 2;

        if (newpos < -(slide.offsetWidth / 2 + slide.offsetWidth / 4)) {
          if (IS_ANIMATED) {
            IS_ANIMATED = false;
            this.animateSlider(id, maxLength, 'next', 0);
          }
        } else if (newpos > slide.offsetWidth / 2 + slide.offsetWidth / 4) {
          if (IS_ANIMATED) {
            IS_ANIMATED = false;
            this.animateSlider(id, maxLength, 'prev', 0);
          }
        }

        let videoPlayerIcn = document.querySelector('.reuse-pt__media--wrapper__icn-move');

        if (videoPlayerIcn) {
          let playerIcnHeight = newpos / slide.offsetWidth * 100;
          videoPlayerIcn.style.left = playerIcnHeight + 45 + '%';
        }

        slide.style.left = newpos + 'px';
      }
    });

    pages_defineProperty(this, "animateSlider", (id, maxLength, type, timeFrame) => {
      setTimeout(() => {
        let mediaItms = [...this.state.mediaItms];
        let filterMedia = mediaItms.filter(media => media.id === id);
        let mediaDet = {
          id,
          position: type === 'next' ? maxLength > 1 ? 1 : 0 : maxLength - 1
        };

        if (filterMedia.length > 0) {
          for (let mediaItm of filterMedia) {
            mediaDet = {
              id: mediaItm.id,
              position: type === 'next' ? mediaItm.position += 1 : mediaItm.position -= 1
            };

            if (mediaDet.position > maxLength - 1) {
              mediaDet = Object(utility["f" /* updateObject */])(mediaDet, {
                position: 0
              });
            }

            if (mediaDet.position < 0) {
              mediaDet = Object(utility["f" /* updateObject */])(mediaDet, {
                position: maxLength - 1
              });
            }

            let updateMedia = mediaItms.filter(media => media.id !== id);
            updateMedia.push(mediaDet);
            this.setState({
              mediaItms: updateMedia,
              removeAnim: false,
              removePrevMedia: null,
              animateItm: {
                id,
                direction: type
              }
            });
          }

          return;
        }

        mediaItms.push(mediaDet);
        this.setState({
          mediaItms,
          removeAnim: false,
          removePrevMedia: null,
          animateItm: {
            id,
            direction: type
          }
        });
      }, timeFrame);
      setTimeout(() => {
        IS_ANIMATED = true;
      }, 500);
    });

    pages_defineProperty(this, "changeCntHandler", (id, title, det, modelType) => {
      let checkTitle = String(title).length > 50 ? String(title).substr(0, 50) + '...' : title;
      this.props.onChangeCnt(id, checkTitle, det, false, modelType);
    });

    this.state = {
      cntOpt: null,
      fetchLimit: pages_limit,
      filterTag: 'post',
      mediaItms: [],
      animateItm: null,
      removeAnim: false,
      removePrevMedia: null,
      playerIcnId: null,
      animationComplete: true,
      scrollEnable: false
    };
  }

  componentDidUpdate() {
    if (this.props.cnts && this.props.cnts.length > 0 && !this.state.scrollEnable) {
      window.addEventListener('scroll', this.onScroll, false);
      this.setState({
        scrollEnable: true
      });
    }
  }

  componentWillUnmount() {
    this.props.onFetchCntReset();
    window.removeEventListener('scroll', this.onScroll, false);
  }

  render() {
    this.props.onFetchShareActive();
    this.props.onFetchShareCntActive();
    this.props.onFetchNotifyActive();
    this.props.onFetchCntActive();
    this.props.onFetchQueActive();
    this.props.onFetchPtActive();
    this.props.onFetchReqActive();

    let cnt = pages_jsx(Loader_Loader, null);

    if (this.props.postErr) {
      cnt = null;
    }

    if (this.props.cnts && this.props.cnts.length === 0) {
      cnt = pages_jsx(NoAcc_NoAcc, {
        isAuth: this.props.userID !== null,
        det: "No content found!",
        icn: "clone",
        filter: true
      });
    }

    if (this.props.cnts && this.props.cnts.length === 0) {
      cnt = pages_jsx(NoAcc_NoAcc, {
        isAuth: this.props.userID !== null,
        det: "No content found!",
        icn: "clone",
        filter: true
      });
    }

    if (this.props.cnts && this.props.cnts.length > 0) {
      cnt = pages_jsx(Post, {
        content: this.props.cnts,
        media: this.props.media,
        userOpt: this.showUserOptHandler,
        showCntOpt: this.state.cntOpt,
        fav: this.changeFavoriteHandler,
        changedFav: this.props.changedFav,
        favChange: this.props.favChange,
        share: this.showShareHandler,
        nextMedia: this.changeMediaHandler,
        prevMedia: this.changeMediaHandler,
        mediaItms: this.state.mediaItms,
        removeAnim: this.removeAnimHandler,
        disableAnim: this.state.removeAnim,
        animateItm: this.state.animateItm,
        removePrevMedia: this.state.removePrevMedia,
        playVideo: this.playVideoHandler,
        videoErr: this.props.videoErr,
        video: this.props.postVideo,
        playerIcnId: this.state.playerIcnId,
        slidePlay: this.slidePlayHandler,
        moveSlidePlay: this.moveSlidePlayHandler,
        clearSlidePlay: this.clearSlidePlayhandler,
        changeCnt: this.changeCntHandler
      });
    }

    return pages_jsx(react_index_App, null, cnt);
  }

}

const pages_mapStateToProps = state => {
  return {
    userID: state.auth.userID,
    cnts: state.cnt.cnts,
    skipCnt: state.cnt.skipCnt,
    cntTotal: state.cnt.cntTotal,
    changedFav: state.cnt.changedFav,
    favChange: state.cnt.favChange,
    cntErr: state.cnt.cntErr,
    postVideo: state.cnt.postVideo,
    videoErr: state.cnt.videoErr,
    filterDet: state.cnt.filterDet
  };
};

const pages_mapDispatchToProps = dispatch => {
  return {
    onFetchShareActive: () => dispatch(actions["Y" /* fetchShareactiveInit */]()),
    onFetchShareCntActive: () => dispatch(actions["X" /* fetchShareCntactiveInit */]()),
    onFetchQueActive: () => dispatch(actions["S" /* fetchQueActiveInit */]()),
    onFetchPtActive: () => dispatch(actions["Q" /* fetchPtActiveInit */]()),
    onFetchCntActive: () => dispatch(actions["y" /* fetchCntActiveInit */]()),
    onFetchNotifyActive: () => dispatch(actions["O" /* fetchNotifyactiveInit */]()),
    onFetchReqActive: () => dispatch(actions["U" /* fetchReqActiveInit */]()),
    onFetchCnt: (userID, fetchType, limit, skipCnt, cntTotal) => dispatch(actions["B" /* fetchCntInit */](userID, fetchType, limit, skipCnt, cntTotal)),
    onFetchCntReset: () => dispatch(actions["C" /* fetchCntReset */]()),
    onChangeFav: (id, liked, favAdd, changedFav, userID, cntGrp) => dispatch(actions["h" /* changeFavInit */](id, liked, favAdd, changedFav, userID, cntGrp)),
    onChangeShareID: (shareID, cntType) => dispatch(actions["xb" /* shareID */](shareID, cntType)),
    onChangeTag: path => dispatch(actions["p" /* changeTagsPath */](path)),
    onFetchVideo: (id, url) => dispatch(actions["eb" /* fetchVideo */](id, url)),
    onChangeCnt: (id, title, det, confirm, modelType) => dispatch(actions["d" /* changeCntInit */](id, title, det, confirm, modelType))
  };
};

/* harmony default export */ var pages = __webpack_exports__["default"] = (Object(router_["withRouter"])(Object(external_react_redux_["connect"])(pages_mapStateToProps, pages_mapDispatchToProps)(pages_Posts)));

/***/ }),

/***/ "YVJH":
/***/ (function(module, exports) {

module.exports = require("react-timeago");

/***/ }),

/***/ "bpod":
/***/ (function(module, exports) {



/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "ckee":
/***/ (function(module, exports) {



/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "iswe":
/***/ (function(module, exports) {



/***/ }),

/***/ "uhWA":
/***/ (function(module, exports) {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ "uk0Q":
/***/ (function(module, exports) {



/***/ }),

/***/ "v99J":
/***/ (function(module, exports) {



/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });