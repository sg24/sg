import * as actionTypes from './actionTypes';

export const fetchPtCategInit = (categ) => {
    return {
        type: actionTypes.FETCH_PTCATEG_INIT,
        categ
    }
}; 

export const fetchPtCategStart = () => {
    return {
        type: actionTypes.FETCH_PTCATEG_START
    }
};

export const fetchPtCateg = (categ) => {
    return {
        type: actionTypes.FETCH_PTCATEG,
        categ
    }
};

export const fetchTotalInit = () => {
    return {
        type: actionTypes.FETCH_TOTAL_INIT,
    };
};

export const fetchTotal = total => {
    return {
        type: actionTypes.FETCH_TOTAL,
        total
    };
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