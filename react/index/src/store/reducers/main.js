import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

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
    return updateObject(state, { ptActive: action.ptActive })
};

const fetchQueActive = (state, action) => {
    return updateObject(state, { queActive: action.queActive })
};

const fetchCntActive = (state, action) => {
    return updateObject(state, { cntActive: action.cntActive })
};

const fetchReqActive = (state, action) => {
    return updateObject(state, { reqActive: action.reqActive })
};

const fetchShareActive = (state, action) => {
    return updateObject(state, {shareActive: action.shareActive})
};


const fetchShareCntActive = (state, action) => {
    return updateObject(state, {shareCntActive: action.shareCntActive})
};

const resetActive = (state, action) => {
    return updateObject(state,  {...state} )
};

const showMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: true })
};

const hideMainBackdrop= (state, action) => {
    return updateObject(state, { showBackdrop: false })
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PT_ACTIVE:
            return fetchPtActive(state, action);
        case actionTypes.FETCH_QUE_ACTIVE:
            return fetchQueActive(state, action);
        case actionTypes.FETCH_CNT_ACTIVE:
            return fetchCntActive(state, action);
        case actionTypes.FETCH_SHARECNT_ACTIVE:
            return fetchShareCntActive(state, action);
        case actionTypes.FETCH_SHARE_ACTIVE:
            return fetchShareActive(state, action);
        case actionTypes.FETCH_REQ_ACTIVE:
            return fetchReqActive(state, action);
        case actionTypes.RESET_ACTIVE:
            return resetActive(state, action);
        case actionTypes.SHOW_MAIN_BACKDROP:
            return showMainBackdrop(state, action);
        case actionTypes.HIDE_MAIN_BACKDROP:
            return hideMainBackdrop(state, action);
        default: return state
    }
};

export default reducer;