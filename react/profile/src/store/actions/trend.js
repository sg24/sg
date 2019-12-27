import * as actionTypes from './actionTypes';

export const fetchTrdInit = (userID) => {
    return {
        type: actionTypes.FETCH_TRD_INIT,
        userID
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
