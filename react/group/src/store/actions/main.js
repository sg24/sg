import * as actionTypes from './actionTypes';

export const fetchJoinActiveInit = (userID) => {
    return {
        type: actionTypes.FETCH_JOIN_ACTIVE_INIT,
        userID
    };
};

export const fetchJoinActive = (joinActive) => {
    return {
        type: actionTypes.FETCH_JOIN_ACTIVE,
        joinActive
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

export const fetchReqActiveInit = (userID) =>  {
    return {
        type: actionTypes.FETCH_REQ_ACTIVE_INIT,
        userID
    }; 
}; 

export const fetchReqActive = (reqActive) =>  {
    return {
        type: actionTypes.FETCH_REQ_ACTIVE,
        reqActive
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