import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cnts: null,
    cntErr: null
}

const fetchCnt = (state, action) => {
    let cnts = state.cnts ? {...state.cnts} : null
    if (cnts) {
        let cnt = {...action.cnt}
        cnts.post.push(...cnt.post);
        cnts.question.push(...cnt.question);
        cnts.poet.push(...cnt.poet);
        cnts.post = [...cnts.post];
        cnts.question = [...cnts.question];
        cnts.poet = [...cnts.poet];
    }
   
    let newCnts = !state.cnts ? action.cnt : cnts;
    return updateObject(state, {cnts: newCnts, skipCnt: action.skipCnt, cntTotal: action.cntTotal, showLoader: false})
};

const fetchCntReset = (state, action) => {
    return updateObject(state, {cnts: null, skipCnt: null, cntTotal: null, curTab: null, showLoader: false})
};

const fetchCntStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, showLoader: false})
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CNT:
            return fetchCnt(state, action);
        case actionTypes.FETCH_CNT_START:
            return fetchCntStart(state, action);
            case actionTypes.FETCH_CNT_RESET:
            return fetchCntReset(state, action);
            case actionTypes.FETCH_CNT_FAIL:
            return fetchPostFail(state, action);
        default: return state
    }
};

export default reducer