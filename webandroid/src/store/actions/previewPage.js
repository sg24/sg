import * as actionTypes from './actionTypes';

export const previewPageInit = (page, pageID, cntType, groupID, uriMethod = "post") => {
    return {
        type: actionTypes.PREVIEW_PAGE_INIT,
        page,
        pageID,
        cntType,
        groupID,
        uriMethod
    };
};

export const previewPageStart = () =>  {
    return {
        type: actionTypes.PREVIEW_PAGE_START
    };
};

export const previewPageFail = (err) => {
    return {
        type: actionTypes.PREVIEW_PAGE_FAIL,
        err
    };
};

export const previewPage = (cnt) =>  {
    return {
        type: actionTypes.PREVIEW_PAGE,
        cnt
    };
};

export const previewPageReset = () =>  {
    return {
        type: actionTypes.PREVIEW_PAGE_RESET
    };
};