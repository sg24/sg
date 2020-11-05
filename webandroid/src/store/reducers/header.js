import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    filterCnt: null,
    filterStart: false,
    searchCnt: null,
    searchCntErr: null,
    conv: null,
    convLoader: false,
    convErr: null,
    notify: null,
    notifyErr: null
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

const headerPageClose = (state, action) => {
    return updateObject(state, {searchCnt: null, filterStart: false, searchCntErr: null, filterCnt: null,
        conv: null, convLoader: false,convErr: null, notify: null, notifyErr: null})
};

const fetchConvStart = (state, action) => {
    return updateObject(state, {convErr: null, convLoader: true, conv: null})
};

const fetchConv = (state, action) => {
    return updateObject(state, {conv: action.cnt, convLoader: false})
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
        default: return state
    };
};

export default reducer;