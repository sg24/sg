import * as actionTypes from './actionTypes';

export const fetchPageInit = (start, limit, page) => {
    return {
        type: actionTypes.FETCH_PAGE_INIT,
        start,
        limit,
        page
    };
};

export const fetchPageFail = (page, err) => {
    return {
        type: actionTypes.FETCH_PAGE_FAIL,
        page,
        err
    };
};

export const fetchPage = (page, cnt) =>  {
    return {
        type: actionTypes.FETCH_PAGE,
        page,
        cnt
    };
};

export const fetchPageReset = () =>  {
    return {
        type: actionTypes.FETCH_PAGE_RESET
    };
};

export const updatePageMedia = (mediaInfo, page) =>  {
    return {
        type: actionTypes.UPDATE_PAGE_MEDIA,
        mediaInfo,
        page
    };
};

export const deletePageInit = (id, page) =>  {
    return {
        type: actionTypes.DELETE_PAGE_INIT,
        id,
        page
    };
};

export const deletePageReset = () =>  {
    return {
        type: actionTypes.DELETE_PAGE_RESET
    };
};

export const deletePageFail = (page, err) =>  {
    return {
        type: actionTypes.DELETE_PAGE_FAIL,
        page,
        err
    };
};

export const deletePage = (page) =>  {
    return {
        type: actionTypes.DELETE_PAGE,
        page
    };
};