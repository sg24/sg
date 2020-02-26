import * as actionTypes from './actionTypes';

export const fetchTrdInit = (cntGrp, id) => {
    return {
        type: actionTypes.FETCH_TRD_INIT,
        cntGrp,
        id
    }
};

export const fetchTrdStart = () => {
    return {
        type: actionTypes.FETCH_TRD_START
    }
};


export const fetchTrdSuccess = () => {
    return {
        type: actionTypes.FETCH_TRD_SUCCESS
    }
};

export const fetchTrdFail = () => {
    return {
        type: actionTypes.FETCH_TRD_FAIL
    }
};

export const fetchTrd = (trd) => {
    return {
        type: actionTypes.FETCH_TRD,
        trd
    }
};

export const showTrd = () => {
    return {
        type: actionTypes.SHOW_TRD
    }
};

export const defaultTrd = () => {
    return {
        type: actionTypes.DEFAULT_TRD
    }
};
