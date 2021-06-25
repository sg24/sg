import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loadMore: false,
    filterCnt: null,
    filterStart: false,
    searchCnt: null,
    searchCntErr: null,
    conv: null,
    convLoader: false,
    convErr: null,
    notify: null,
    notifyErr: null,
    notificationStart: false,
    notificationErr: null,
    notification: null,
    notificationPage: null
};

const headerFilterStart = (state, action) => {
    return updateObject(state, {searchCnt: null, searchCntErr: null, filterStart: true, filterCnt: action.filterCnt})
};

const headerFilterFail= (state, action) => {
    return updateObject(state, {searchCntErr: action.searchCntErr})
};

const headerFilter = (state, action) => {
    return updateObject(state, {searchCnt: action.searchCnt})
};

const headerPushNotificationStart = (state, action) => {
    return updateObject(state, {notificationStart: true, notificationErr: null})
};

const headerPushNotificationFail= (state, action) => {
    return updateObject(state, {notificationStart: false, notificationErr:  {message: action.err}})
};

const headerPushNotification = (state, action) => {
    return updateObject(state, {notificationStart: false, notification: action.cnt ? action.cnt.notification : null})
};

const headerNotificationPage = (state, action) => {
    return updateObject(state, {notificationPage: {page: action.page, cnt: action.cnt}})
};

const headerNotificationPageReset = (state, action) => {
    return updateObject(state, {notificationPage: null})
};

const headerPageClose = (state, action) => {
    return updateObject(state, {searchCnt: null, filterStart: false, searchCntErr: null, filterCnt: null,
        conv: null, convLoader: false,convErr: null, notify: null, notifyErr: null})
};

const fetchConvStart = (state, action) => {
    return updateObject(state, {convErr: null, convLoader: true, conv: action.start === 0 ? null : state.conv})
};

const fetchConv = (state, action) => {
    let updatePageCnt = action.start !== 0 ? [...state.conv] : [];
    updatePageCnt.push(...action.cnt.conv);
    return updateObject(state, {conv: updatePageCnt, convLoader: false, loadMore: action.cnt.loadMore})
};

const fetchConvFail = (state, action) => {
    return updateObject(state, {convErr: action.err, convLoader: false})
};

const fetchNotify = (state, action) => {
    return updateObject(state, {notify: action.notify})
};

const fetchNotifyStart = (state, action) => {
    return updateObject(state, {notify: null, notifyErr: null})
};

const fetchNotifyFail = (state, action) => {
    return updateObject(state, {notifyErr: action.err})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HEADER_FILTER_START:
            return headerFilterStart(state, action);
        case actionTypes.HEADER_FILTER_FAIL:
            return headerFilterFail(state, action);
        case actionTypes.HEADER_FILTER:
            return headerFilter(state, action);
        case actionTypes.HEADER_PAGE_CLOSE:
            return headerPageClose(state, action);
        case actionTypes.FETCH_CONV:
            return fetchConv(state, action);
        case actionTypes.FETCH_CONV_FAIL:
            return fetchConvFail(state, action);
        case actionTypes.FETCH_CONV_START:
            return fetchConvStart(state, action);
        case actionTypes.FETCH_NOTIFY_START:
            return fetchNotifyStart(state, action);
        case actionTypes.FETCH_NOTIFY_FAIL:
            return fetchNotifyFail(state, action);
        case actionTypes.FETCH_NOTIFY:
            return fetchNotify(state, action);
        case actionTypes.HEADER_PUSHNOTIFICATION_START:
            return headerPushNotificationStart(state, action);
        case actionTypes.HEADER_PUSHNOTIFICATION_FAIL:
            return headerPushNotificationFail(state, action);
        case actionTypes.HEADER_PUSHNOTIFICATION:
            return headerPushNotification(state, action);
        case actionTypes.HEADER_NOTIFICATIONPAGE:
            return headerNotificationPage(state, action);
        case actionTypes.HEADER_NOTIFICATIONPAGE_RESET:
            return headerNotificationPageReset(state, action);
        default: return state
    };
};

export default reducer;