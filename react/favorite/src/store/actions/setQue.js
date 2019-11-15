import * as actionTypes from './actionTypes';

export const fetchCategInit = () => {
    return {
        type: actionTypes.FETCH_CATEG_INIT
    };
};

export const fetchCategStart = () => {
    return {
        type: actionTypes.FETCH_CATEG_START
    }
};

export const fetchCategSuccess = () => {
    return {
        type: actionTypes.FETCH_CATEG_SUCCESS
    }
};

export const fetchCategFail = () => {
    return {
        type: actionTypes.FETCH_CATEG_FAIL
    }
};


export const fetchCateg = (categ) => {
    return {
        type: actionTypes.FETCH_CATEG,
        categ
    };
};