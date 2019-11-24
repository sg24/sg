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

