import * as actionTypes from './actionTypes';

export const fetchCntActiveInit = (userID) => {
    return {
        type: actionTypes.FETCH_CNT_ACTIVE_INIT,
        userID
    };
};

export const fetchCntActive = (cntActive) => {
    return {
        type: actionTypes.FETCH_CNT_ACTIVE,
        cntActive
    };
};

export const fetchShareactiveInit = (userID) =>  {
    return {
        type: actionTypes.FETCH_SHARE_ACTIVE_INIT,
        userID
    }; 
}; 

export const fetchShareActive = (shareActive) =>  {
    return {
        type: actionTypes.FETCH_SHARE_ACTIVE,
        shareActive
    }; 
}; 

export const fetchShareCntactiveInit = (userID) =>  {
    return {
        type: actionTypes.FETCH_SHARECNT_ACTIVE_INIT,
        userID
    }; 
}; 

export const fetchShareCntActive = (shareCntActive) =>  {
    return {
        type: actionTypes.FETCH_SHARECNT_ACTIVE,
        shareCntActive
    }; 
}; 

export const resetActiveInit = (userID, curTab) => {
    return {
        type: actionTypes.RESET_ACTIVE_INIT,
        userID,
        curTab
    };
};

export const resetActive = (curTab) => {
    return {
        type: actionTypes.RESET_ACTIVE,
        curTab
    };
};

export const showMainBackdrop = () => {
    return {
        type: actionTypes.SHOW_MAIN_BACKDROP
    };
};

export const hideMainBackdrop = () => {
    return {
        type: actionTypes.HIDE_MAIN_BACKDROP
    };
};