import * as actionTypes from './actionTypes';

export const fetchMainActiveInit = (mainProps, userID) => {
    return {
        type: actionTypes.FETCH_MAINACTIVE_INIT,
        mainProps,
        userID
    };
};

export const fetchMainActive = (mainProps) => {
    return {
        type: actionTypes.FETCH_MAINACTIVE,
        mainProps
    };
};

export const defaultMainActiveInit = (mainProps, userID, categ) => {
    return {
        type: actionTypes.DEFAULT_MAINACTIVE_INIT,
        mainProps,
        userID,
        categ
    };
};

export const defaultMainActive = (mainProps) => {
    return {
        type: actionTypes.DEFAULT_MAINACTIVE,
        mainProps
    };
};

export const showMainBackdrop = () => {
    return {
        type: actionTypes.SHOW_MAIN_BACKDROP
    };
};

export const hideMainBackdrop = () => {
    return {
        type: actionTypes.HIDE_MAIN_BACKDROP
    };
};