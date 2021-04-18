import * as actionTypes from './actionTypes';

export const fetchSharecntInit = (start, limit, shareType, cntID, searchCnt) => {
    return {
        type: actionTypes.FETCH_SHARECNT_INIT,
        start, 
        limit,
        shareType,
        cntID,
        searchCnt
    };
};

export const fetchSharecntFail = (err) => {
    return {
        type: actionTypes.FETCH_SHARECNT_FAIL,
        err
    };
};

export const fetchSharecnt = (start, cnt) => {
    return {
        type: actionTypes.FETCH_SHARECNT,
        start,
        cnt
    };
};

export const fetchSharecntStart = (start) => {
    return {
        type: actionTypes.FETCH_SHARECNT_START,
        start
    };
};

export const fetchSharecntReset = () => {
    return {
        type: actionTypes.FETCH_SHARECNT_RESET
    };
};

export const sharecntReset = () => {
    return {
        type: actionTypes.SHARECNT_RESET
    };
};

export const shareInit = (shareType, cntID, cnt, reciepent,  shareUpdates) => {
    return {
        type: actionTypes.SHARE_INIT,
        shareType,
        cntID,
        cnt,
        reciepent,
        shareUpdates
    };
};

export const shareFail = (err) => {
    return {
        type: actionTypes.SHARE_FAIL,
        err
    };
};

export const share = (cnt) => {
    return {
        type: actionTypes.SHARE,
        cnt
    };
};

export const shareStart = () => {
    return {
        type: actionTypes.SHARE_START
    };
};

export const shareReset = () => {
    return {
        type: actionTypes.SHARE_RESET
    };
};
