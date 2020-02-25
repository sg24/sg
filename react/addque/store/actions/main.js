import * as actionTypes from './actionTypes';

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
