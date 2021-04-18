import * as actionTypes from './actionTypes';

export const externalPageInit = (pageType, uriMethod, page, pageID, cntType, cnt) => {
    return {
        type: actionTypes.EXTERNAL_PAGE_INIT,
        pageType,
        uriMethod,
        page,
        pageID,
        cntType,
        cnt
    };
};

export const externalPageStart = (pageType, pageID) =>  {
    return {
        type: actionTypes.EXTERNAL_PAGE_START,
        pageType,
        pageID
    };
};

export const externalPageFail = (err, pageType, pageID) => {
    return {
        type: actionTypes.EXTERNAL_PAGE_FAIL,
        err,
        pageType,
        pageID
    };
};

export const externalPage = (pageType, pageID, cntType) =>  {
    return {
        type: actionTypes.EXTERNAL_PAGE,
        pageType,
        pageID,
        cntType
    };
};

export const externalPageReset = () =>  {
    return {
        type: actionTypes.EXTERNAL_PAGE_RESET
    };
};