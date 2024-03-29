import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

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
    chatDet: null,
    chatDetLoader: false,
    chatDetErr: null,
    filterStart: false
};

const formExpand = (state, action) => {
    return updateObject(state, {expand: state.expend ? state.expand : true, default: false})
};

const formSm = (state, action) => {
    return updateObject(state, {hideFormSm : false, default: false})
};

const navDefault = (state, action) => {
    return updateObject(state, {expand: false, hideFormSm: true, addNew: false, hidNotify: true, hidNavList: true, hidUserOption: true, default: true})
};

const addNew = (state, action) => {
    return updateObject(state, {addNew: !state.addNew, default: false})
};

const changeMainFavStart = (state, action) => {
    return updateObject(state, {favChange: action.isLiked})
};

const changeMainFavReset = (state, action) => {
    return updateObject(state, {favChange: null})
};

const fetchNotify = (state, action) => {
    return updateObject(state, {notify: action.notify, hidNotify: false, hidNavList: true, hidUserOption: true, default: false})
};

const fetchNotifyStart = (state, action) => {
    return updateObject(state, {notify: null, hidNotify: false, hidNavList: true, hidUserOption: true, default: false})
};

const changeFavNotifyStart = (state, action) => {
    return updateObject(state, {notify: action.notify})
};

const changeFavNotify = (state, action) => {
    return updateObject(state, {notify: action.notify})
};

const showNavList = (state, action) => {
    return updateObject(state, {hidNotify: true, hidNavList: false, hidUserOption: true, default: false})
};

const fetchNavListStart = (state, action) => {
    return updateObject(state, {navList: null, navListCateg: null})
};

const fetchNavList = (state, action) => {
    return updateObject(state, {navList: action.navList, navListCateg: action.category})
};

const showUserOption = (state, action) => {
    return updateObject(state, {hidNotify: true, hidNavList: true, hidUserOption: false, default: false})
};

const fetchNotifyActive = (state, action) => {
    return updateObject(state, {notifyActive: action.notifyActive})
};

const defaultNotifyActive = (state, action) => {
    return updateObject(state, {notifyActive: null})
};

const headerFilterStart = (state, action) => {
    return updateObject(state, {searchCnt: null, filterPos: action.filterPos, filterLastPos: action.filterLastPos, searchCntErr: null, filterStart: true})
};

const headerFilterFail= (state, action) => {
    return updateObject(state, {searchCntErr: action.searchCntErr})
};

const headerFilter = (state, action) => {
    return updateObject(state, {searchCnt: action.searchCnt})
};

const headerFilterClose = (state, action) => {
    return updateObject(state, {searchCnt: null, filterStart: false})
};

const fetchChatDetStart = (state, action) => {
    return updateObject(state, {chatDetErr: null, chatDetLoader: true})
};

const fetchChatDet = (state, action) => {
    return updateObject(state, {chatDet: action.cnt, chatDetLoader: false})
};

const fetchChatDetFail = (state, action) => {
    return updateObject(state, {chatDetErr: action.err, chatDetLoader: false})
};

const showChatDet = (state, action) => {
    return updateObject(state, {default: false})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HEADER_FORM_EXPAND:
            return formExpand(state, action);
        case actionTypes.HEADER_FORM_SM:
            return formSm(state, action);
        case actionTypes.HEADER_NAV_DEFAULT:
            return navDefault(state, action);
        case actionTypes.HEADER_ADD_NEW:
            return addNew(state, action);
        case actionTypes.CHANGE_MAINFAVORITE_START:
            return changeMainFavStart(state, action);
        case actionTypes.CHANGE_MAINFAVORITE_RESET:
            return changeMainFavReset(state, action);
        case actionTypes.FETCH_NOTIFY_START:
            return fetchNotifyStart(state, action);
        case actionTypes.FETCH_NOTIFY:
            return fetchNotify(state, action);
        case actionTypes.CHANGE_FAVORITE_NOTIFY_START:
            return changeFavNotifyStart(state, action);
        case actionTypes.CHANGE_FAVORITE_NOTIFY:
            return changeFavNotify(state, action);
        case actionTypes.SHOW_NAV_LIST:
            return showNavList(state, action);
        case actionTypes.FETCH_NAVLIST_START:
            return fetchNavListStart(state, action);
        case actionTypes.FETCH_NAVLIST:
            return fetchNavList(state, action);
        case actionTypes.SHOW_USER_OPTION:
            return showUserOption(state, action);
        case actionTypes.FETCH_NOTIFY_ACTIVE:
            return fetchNotifyActive(state, action);
        case actionTypes.DEFAULT_NOTIFYACTIVE:
            return defaultNotifyActive(state, action);
        case actionTypes.HEADER_FILTER_START:
            return headerFilterStart(state, action);
        case actionTypes.HEADER_FILTER_FAIL:
            return headerFilterFail(state, action);
        case actionTypes.HEADER_FILTER_CLOSE:
            return headerFilterClose(state, action);
        case actionTypes.HEADER_FILTER:
            return headerFilter(state, action);
        case actionTypes.FETCH_CHATDET:
            return fetchChatDet(state, action);
        case actionTypes.FETCH_CHATDET_FAIL:
            return fetchChatDetFail(state, action);
        case actionTypes.FETCH_CHATDET_START:
            return fetchChatDetStart(state, action);
        case actionTypes.SHOW_CHATDET:
            return showChatDet(state, action);
        default: return state
    };
};

export default reducer;