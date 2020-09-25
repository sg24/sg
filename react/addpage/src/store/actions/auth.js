import * as actionTypes from './actionTypes';

export const checkAuthInit = () => {
    return {
        type: actionTypes.CHECK_AUTH_INIT
    };
};

export const checkAuth = (status) => {
    return {
        type: actionTypes.CHECK_AUTH,
        status
    };
};

export const checkUserImg = (img) => {
    return {
        type: actionTypes.CHECK_USERIMG,
        img
    };
};


export const checkUserName = (name) => {
    return {
        type: actionTypes.CHECK_USERNAME,
        name
    };
};

