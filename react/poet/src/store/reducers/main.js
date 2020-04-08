import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    showBackdrop: false,
    cntActive: null,
    shareActive: null,
    navActive: null,
    shareCntActive: null
};

const fetchCntActive = (state, action) => {
    return updateObject(state, { cntActive: action.cntActive })
};

const fetchShareActive = (state, action) => {
    return updateObject(state, {shareActive: action.shareActive})
};


const fetchShareCntActive = (state, action) => {
    return updateObject(state, {shareCntActive: action.shareCntActive})
};

const resetActive = (state, action) => {
    let reset = action.curTab === 'question' ? { cntActive: null} : {shareActive: null, shareCntActive: null };
    return updateObject(state,  {...reset} )
};

const fetchNavActive = (state, action) => {
    return updateObject(state, {navActive: action.active })
};

const showMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: true })
};

const hideMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: false })
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CNT_ACTIVE:
            return fetchCntActive(state, action);
        case actionTypes.FETCH_SHARECNT_ACTIVE:
            return fetchShareCntActive(state, action);
        case actionTypes.FETCH_SHARE_ACTIVE:
            return fetchShareActive(state, action);
        case actionTypes.RESET_ACTIVE:
            return resetActive(state, action);
        case actionTypes.FETCH_NAV_ACTIVE:
            return fetchNavActive(state, action);
        case actionTypes.SHOW_MAIN_BACKDROP:
            return showMainBackdrop(state, action);
        case actionTypes.HIDE_MAIN_BACKDROP:
            return hideMainBackdrop(state, action);
        default: return state
    }
};

export default reducer;