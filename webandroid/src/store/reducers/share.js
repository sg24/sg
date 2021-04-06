import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchSharecntError: null,
    fetchSharecnt: null,
    fetchSharecntStart: false,
    loadMore: false,
    share: false,
    shareError: null,
    shareStart: false
};

const sharecntReset = (state, action) => {
    return updateObject(state, {
        fetchSharecntError: null, fetchSharecnt: null, loadMore: false, fetchSharecntStart: false,
        share: false, shareStart: false, shareError: null
    });
};

const fetchSharecntReset = (state, action) => {
    return updateObject(state, {
        fetchSharecntError: null,  fetchSharecntStart: false
    });
};

const fetchSharecntStart = (state, action) => {
    return updateObject(state, {
        fetchSharecntError: null, fetchSharecntStart: true, fetchSharecnt: action.start === 0 ? null : state.fetchSharecnt
    });
};

const fetchSharecntFail = (state, action) => {
    return updateObject(state, {
        fetchSharecntError: {message: action.err}, fetchSharecntStart: false
    });
};

const fetchSharecnt = (state, action) => {
    let fetchSharecnt  = state.fetchSharecnt ? [...state.fetchSharecnt] : [];
    fetchSharecnt.push(...action.cnt.friend);
    return updateObject(state, {
        fetchSharecntError: null, fetchSharecnt, loadMore: action.cnt.loadMore, fetchSharecntStart: false
    });
};

const shareReset = (state, action) => {
    return updateObject(state, {
        share: false, shareError: null, shareStart: false
    });
};

const shareStart = (state, action) => {
    return updateObject(state, {
        share: false, shareError: null, shareStart: true
    });
};

const shareFail = (state, action) => {
    return updateObject(state, {
        shareError: {message: action.err}, shareStart: false
    });
};

const share = (state, action) => {
    return updateObject(state, {
        shareError: null, share: true, shareStart: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SHARECNT_START:
            return fetchSharecntStart(state, action);
        case actionTypes.FETCH_SHARECNT_FAIL:
            return fetchSharecntFail(state, action);
        case actionTypes.FETCH_SHARECNT:
            return fetchSharecnt(state, action);
        case actionTypes.FETCH_SHARECNT_RESET:
            return fetchSharecntReset(state, action);
        case actionTypes.SHARECNT_RESET:
            return sharecntReset(state, action);
        case actionTypes.SHARE_FAIL:
            return shareFail(state, action);
        case actionTypes.SHARE_START:
            return shareStart(state, action);
        case actionTypes.SHARE:
            return share(state, action);
        case actionTypes.SHARE_RESET:
            return shareReset(state, action);
        default: return state
    };
};

export default reducer;