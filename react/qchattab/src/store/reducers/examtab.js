import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    cnt: null,
    err: null,
    submit: false,
    totalScore: 0,
    correction: []
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

const submit = (state, action) => {
    return updateObject(state, {submit: true, totalScore: action.totalScore, correction: action.correction})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case actionTypes.FETCH_CNT_START:
            return fetchCntStart(state, action);
        case actionTypes.FETCH_CNT_FAIL:
            return fetchCntFail(state, action);
        case actionTypes.FETCH_CNT:
            return fetchCnt(state, action);
        case actionTypes.SUBMIT:
            return submit(state, action);
        default: return state
    };
};

export default reducer;