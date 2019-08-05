import * as actionTypes from './actionTypes';

export const fetchTrdInit = () => {
    return {
        type: actionTypes.FETCH_TRD_INIT
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

export const changeFavTrdInit = (trd, trdID) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_TRD_INIT,
        trd,
        trdID
    };
};

export const changeFavTrdStart = (trd) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_TRD_START,
        trd
    };
};

export const changeFavTrdFail = (trd) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_TRD_FAIL,
        trd
    };
};

export const changeFavTrd = (trd) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_TRD,
        trd
    };
};