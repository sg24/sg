import * as actionTypes from './actionTypes';

export const fetchPrfInit = (userID) => {
    return {
        type: actionTypes.FETCH_PRF_INIT,
        userID
    }
};

export const fetchPrfStart = () =>{
    return {
        type: actionTypes.FETCH_PRF_START
    };
}

export const fetchPrfReset = () =>{
    return {
        type: actionTypes.FETCH_PRF_RESET,
    };
}

export const fetchPrfFail = (err) => {
    return {
        type: actionTypes.FETCH_PRF_FAIL,
        err
    }
};

export const fetchPrf = (cnt, skipCnt, cntTotal) => {
    return {
        type: actionTypes.FETCH_PRF,
        cnt,
        skipCnt,
        cntTotal
    }
};

export const changePrfInit = (id, title, det, confirm, modelType) => {
    return {
        type: actionTypes.CHANGE_PRF_INIT,
        id, 
        title,
        det,
        confirm,
        modelType
    }
};

export const changePrfStart = (title, id, det,  modelType) => {
    return {
        type: actionTypes.CHANGE_PRF_START,
        title,
        id,
        det,
        modelType
    }
};

export const changePrfCancel = () => {
    return {
        type: actionTypes.CHANGE_PRF_CANCEL
    }
};

export const changePrfReset = (changed) => {
    return {
        type: actionTypes.CHANGE_PRF_RESET,
        changed
    }
};

export const changePrfFail = (err) => {
    return {
        type: actionTypes.CHANGE_PRF_FAIL,
        err
    }
};

export const changePrf = () => {
    return {
        type: actionTypes.CHANGE_PRF
    }
};