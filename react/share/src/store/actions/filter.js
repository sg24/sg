import * as actionTypes from './actionTypes';

export const fetchCntCategInit = (categ) => {
    return {
        type: actionTypes.FETCH_CNTCATEG_INIT,
        categ
    }
}; 

export const fetchCntCategStart = () => {
    return {
        type: actionTypes.FETCH_CNTCATEG_START
    }
};

export const fetchCntCateg = (categ) => {
    return {
        type: actionTypes.FETCH_CNTCATEG,
        categ
    }
};

export const filterContentInit = (content) => {
    return {
        type: actionTypes.FILTER_CONTENT_INIT,
        content
    }
};

export const filterContentStart = () => {
    return {
        type: actionTypes.FILTER_CONTENT_START
    }
};

export const filterContentFail = (err) => {
    return {
        type: actionTypes.FILTER_CONTENT_FAIL,
        err
    }
};

export const filterContent = (totalFound) => {
    return {
        type: actionTypes.FILTER_CONTENT,
        totalFound
    }
};

export const resetFilter = (totalFound) => {
    return {
        type: actionTypes.RESET_FILTER
    }
};

export const filterPost = (filterDet) => {
    return {
        type: actionTypes.FILTER_POST,
        filterDet
    }
};