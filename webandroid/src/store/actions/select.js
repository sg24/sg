import * as actionTypes from './actionTypes';

export const fetchSelectcntInit = (start, limit, page, pageID, cntID, searchCnt) => {
    return {
        type: actionTypes.FETCH_SELECTCNT_INIT,
        start, 
        limit,
        page,
        pageID,
        cntID,
        searchCnt
    };
};

export const fetchSelectcntFail = (err) => {
    return {
        type: actionTypes.FETCH_SELECTCNT_FAIL,
        err
    };
};

export const fetchSelectcnt = (start, cnt) => {
    return {
        type: actionTypes.FETCH_SELECTCNT,
        start,
        cnt
    };
};

export const fetchSelectcntStart = (start) => {
    return {
        type: actionTypes.FETCH_SELECTCNT_START,
        start
    };
};

export const fetchSelectcntReset = () => {
    return {
        type: actionTypes.FETCH_SELECTCNT_RESET
    };
};

export const selectcntReset = () => {
    return {
        type: actionTypes.SELECTCNT_RESET
    };
};

export const selectInit = (page, pageID, reactionType, cntID, cnt, uriMethod = 'post', confirm = true, remove= true) => {
    return {
        type: actionTypes.SELECT_INIT,
        page,
        pageID,
        reactionType,
        cntID,
        cnt,
        uriMethod,
        confirm,
        remove
    };
};

export const selectFail = (err) => {
    return {
        type: actionTypes.SELECT_FAIL,
        err
    };
};

export const select = (remove, cnt) => {
    return {
        type: actionTypes.SELECT,
        remove,
        cnt
    };
};

export const selectStart = (selectType) => {
    return {
        type: actionTypes.SELECT_START,
        selectType
    };
};

export const selectReset = () => {
    return {
        type: actionTypes.SELECT_RESET
    };
};


export const selectReactionInit = (page, pageID, reactionType, cntID, cnt, uriMethod = 'post', confirm = true, remove= true) => {
    return {
        type: actionTypes.SELECT_REACTION_INIT,
        page,
        pageID,
        reactionType,
        cntID,
        cnt,
        uriMethod,
        confirm,
        remove
    };
};

export const selectReactionStart = (cntID) => {
    return {
        type: actionTypes.SELECT_REACTION_START,
        cntID
    };
};

export const selectReactionFail = (err, cntID) => {
    return {
        type: actionTypes.SELECT_REACTION_FAIL,
        err,
        cntID
    };
};

export const selectReaction = (cntID, remove, cnt) => {
    return {
        type: actionTypes.SELECT_REACTION,
        cntID,
        remove,
        cnt
    };
};

export const selectReactionReset = (cntID) => {
    return {
        type: actionTypes.SELECT_REACTION_RESET,
        cntID
    };
};