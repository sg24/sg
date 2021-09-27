import * as actionTypes from './actionTypes';

export const fetchPageInit = (start, limit, page, cntID, searchCnt, tabPage, pageID) => {
    return {
        type: actionTypes.FETCH_PAGE_INIT,
        start,
        limit,
        page,
        cntID,
        searchCnt,
        tabPage,
        pageID
    };
};

export const fetchPageStart = (start, page, tabPage, tabLoadMore) =>  {
    return {
        type: actionTypes.FETCH_PAGE_START,
        start,
        page,
        tabPage,
        tabLoadMore
    };
};

export const fetchPageFail = (page, err) => {
    return {
        type: actionTypes.FETCH_PAGE_FAIL,
        page,
        err
    };
};

export const fetchPage = (page, start, cnt, tabPage, tabLoadMore) =>  {
    return {
        type: actionTypes.FETCH_PAGE,
        page,
        start,
        cnt,
        tabPage,
        tabLoadMore
    };
};

export const fetchPageReset = () =>  {
    return {
        type: actionTypes.FETCH_PAGE_RESET
    };
};

export const pageReset = (page) =>  {
    return {
        type: actionTypes.PAGE_RESET,
        page
    };
};

export const updatePage = (pageInfo, page) =>  {
    return {
        type: actionTypes.UPDATE_PAGE,
        pageInfo,
        page
    };
};

export const deletePageInit = (pageID, page, start, cntType) =>  {
    return {
        type: actionTypes.DELETE_PAGE_INIT,
        pageID,
        page,
        start,
        cntType
    };
};

export const deletePageReset = () =>  {
    return {
        type: actionTypes.DELETE_PAGE_RESET
    };
};

export const deletePageStart = (pageID, page, start) =>  {
    return {
        type: actionTypes.DELETE_PAGE_START,
        pageID,
        page,
        start
    };
};

export const deletePageFail = (page, err) =>  {
    return {
        type: actionTypes.DELETE_PAGE_FAIL,
        page,
        err
    };
};

export const deletePage = (pageID, page) =>  {
    return {
        type: actionTypes.DELETE_PAGE,
        pageID,
        page
    };
};

export const pageReactionInit = (page, pageID, reactionType, cnt, uriMethod = 'post', confirm = true) => {
    return {
        type: actionTypes.PAGE_REACTION_INIT,
        page,
        pageID,
        reactionType,
        cnt,
        uriMethod,
        confirm
    };
};

export const pageReactionStart = (pageID) => {
    return {
        type: actionTypes.PAGE_REACTION_START,
        pageID
    };
};

export const pageReactionFail = (err, pageID) => {
    return {
        type: actionTypes.PAGE_REACTION_FAIL,
        err,
        pageID
    };
};

export const pageReaction = (pageID, cnt) => {
    return {
        type: actionTypes.PAGE_REACTION,
        pageID,
        cnt
    };
};

export const pageReactionReset = (pageID) => {
    return {
        type: actionTypes.PAGE_REACTION_RESET,
        pageID
    };
};