import * as actionTypes from './actionTypes';

export const fetchSidebarInit = (start, limit, page, cntID, searchCnt) => {
    return {
        type: actionTypes.FETCH_SIDEBAR_INIT,
        start,
        limit,
        page,
        cntID,
        searchCnt
    };
};

export const fetchSidebarStart = (start, page) =>  {
    return {
        type: actionTypes.FETCH_SIDEBAR_START,
        start,
        page
    };
};

export const fetchSidebarFail = (page, err) => {
    return {
        type: actionTypes.FETCH_SIDEBAR_FAIL,
        page,
        err
    };
};

export const fetchSidebar = (page, start, cnt) =>  {
    return {
        type: actionTypes.FETCH_SIDEBAR,
        page,
        start,
        cnt
    };
};

export const fetchSidebarReset = () =>  {
    return {
        type: actionTypes.FETCH_SIDEBAR_RESET
    };
};

export const updateSidebar = (pageInfo, page) =>  {
    return {
        type: actionTypes.UPDATE_SIDEBAR,
        pageInfo,
        page
    };
};