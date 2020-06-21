import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cnt: null,
    err: null
};

const fetchCntFail = (state, action) => {
    return updateObject(state, {err: action.err})
};

const fetchCntStart = (state, action) => {
    return updateObject(state, {start: action.start})
};

const fetchCnt = (state, action) => {
    return updateObject(state, {cnt: action.cnt})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case actionTypes.FETCH_CNT_START:
            return fetchCntStart(state, action);
        case actionTypes.FETCH_CNT_FAIL:
            return fetchCntFail(state, action);
        case actionTypes.FETCH_CNT:
            return fetchCnt(state, action);
        default: return state
    };
};

export default reducer;