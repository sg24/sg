import * as actionTypes from './actionTypes';

export const checkAuthInit = () => {
    return {
        type: actionTypes.CHECK_AUTH_INIT
    };
};

export const checkAuth = () => {
    return {
        type: actionTypes.CHECK_AUTH
    };
};

export const checkAuthFail = (err) => {
    return {
        type: actionTypes.CHECK_AUTH_FAIL,
        err
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

export const loggedIn = (userID) => {
    return {
        type: actionTypes.LOGGED_IN,
        userID
    };
};