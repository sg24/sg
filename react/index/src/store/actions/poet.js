import * as actionTypes from './actionTypes';

export const fetchPoetInit = (userID) => {
    return {
        type: actionTypes.FETCH_POET_INIT,
        userID
    };
};

export const fetchPoetStart = () => {
    return {
        type: actionTypes.FETCH_POET_START
    };
};

export const fetchPoetSuccess = () => {
    return {
        type: actionTypes.FETCH_POET_SUCCESS
    };
};

export const fetchPoetFail = () => {
    return {
        type: actionTypes.FETCH_POET_FAIL
    };
};

export const fetchPoet = (poets) =>  {
    return {
        type: actionTypes.FETCH_POET,
        poets
    };
}; 

export const changeFavPoetInit = (poets, filterPoet, pwtID) =>  {
    return {
        type: actionTypes.CHANGE_FAVORITE_POET_INIT,
        poets,
        filterPoet,
        pwtID
    };
}; 

export const changeFavPoet = (poets) => {
    return  {
        type: actionTypes.CHANGE_FAVORITE_POET,
        poets
    };
};

export const changeFavFilterPoet = (filterPoet) => {
    return  {
        type: actionTypes.CHANGE_FAVORITE_FILTERPOET,
        filterPoet
    };
};

export const filterPoetInit = (poets, tag) => {
    return {
        type: actionTypes.FILTER_POET_INIT,
        poets,
        tag
    }
};

export const filterPoetStart = () => {
    return {
        type: actionTypes.FILTER_POET_START
    }
};

export const filterPoetSuccess = () => {
    return {
        type: actionTypes.FILTER_POET_SUCCESS
    }
};

export const filterPoetFail = () => {
    return {
        type: actionTypes.FILTER_POET_FAIL
    }
};

export const filterPoet = (filterPoet) => {
    return {
        type: actionTypes.FILTER_POET,
        filterPoet
    };
};