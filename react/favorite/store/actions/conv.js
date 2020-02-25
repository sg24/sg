import * as actionTypes from './actionTypes';

export const fetchConvInit = () => {
    return {
        type: actionTypes.FETCH_CONV_INIT
    };
};

export const fetchConvStart = () => {
    return {
        type: actionTypes.FETCH_CONV_START
    }
};

export const fetchConvSuccess = () => {
    return {
        type: actionTypes.FETCH_CONV_SUCCESS
    }
};

export const fetchConvFail = () => {
    return {
        type: actionTypes.FETCH_CONV_FAIL
    }
};


export const fetchConv = (conv) => {
    return {
        type: actionTypes.FETCH_CONV,
        conv
    };
};