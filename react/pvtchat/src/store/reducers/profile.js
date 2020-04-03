import * as actionTypes from '../actions/actionTypes';
import { updateObject, changeMode } from '../../shared/utility';

const initialState = {
    cnts: null,
    cntErr: null,
    modelType: null,
    changeCnt: false,
    changeCntErr: null,
    changeCntStart: null,
    start: false,
    det: null
}

const fetchPrf = (state, action) => {
    return updateObject(state, {cnts: action.cnt, det: action.cnt.about})
};

const fetchPrfReset = (state, action) => {
    return updateObject(state, {cnts: null, skipCnt: null, cntTotal: null, curTab: null, showLoader: false})
};

const fetchPrfStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchPrfFail = (state, action) => {
    return updateObject(state, {cntErr: action.err})
};

const changePrfStart = (state, action) => {
    return updateObject(state, {changeCntStart: {title: action.title, id: action.id, det: action.det, modelType: action.modelType}, changeCntErr: null})
};

const changePrfCancel = (state, action) => {
    return updateObject(state, {changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changePrfReset = (state, action) => {
    let cnts = {...state.cnts};
   
    if (action.changed) {
        if (state.changeCntStart.det === 'unfriend') {
            let updateCnts = changeMode(cnts, state.changeCntStart, 'accept', false);
            return updateObject(state, {cnts: updateCnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
        }
    
        let updateCnt = cnts.filter(cnt => cnt._id !== state.changeCntStart.id);
        return updateObject(state, {cnts: updateCnt, changeCntStart: null, changeCntErr: null, changeCnt: false})
    }

    return updateObject(state, {cnts, changeCntStart: null, changeCntErr: null, changeCnt: false})
};

const changePrfFail = (state, action) => {
    return updateObject(state, {changeCntErr: action.err})
};

const changePrf = (state, action) => {
    return updateObject(state, {changeCnt: true})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PRF:
            return fetchPrf(state, action);
        case actionTypes.FETCH_PRF_START:
            return fetchPrfStart(state, action);
        case actionTypes.FETCH_PRF_RESET:
            return fetchPrfReset(state, action);
        case actionTypes.FETCH_PRF_FAIL:
            return fetchPrfFail(state, action);
        case actionTypes.CHANGE_PRF_START:
            return changePrfStart(state, action);
        case actionTypes.CHANGE_PRF_CANCEL:
            return changePrfCancel(state, action);
        case actionTypes.CHANGE_PRF_RESET:
            return changePrfReset(state, action);
        case actionTypes.CHANGE_PRF_FAIL:
            return changePrfFail(state, action);
        case actionTypes.CHANGE_PRF:
            return changePrf(state, action);
        default: return state
    }
};

export default reducer