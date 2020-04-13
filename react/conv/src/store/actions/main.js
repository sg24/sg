import * as actionTypes from './actionTypes';

export const fetchPrivateActiveInit = (userID) => {
    return {
        type: actionTypes.FETCH_PRIVATE_ACTIVE_INIT,
        userID
    };
};

export const fetchPrivateActive = (privateActive) => {
    return {
        type: actionTypes.FETCH_PRIVATE_ACTIVE,
        privateActive
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

export const fetchGroupActiveInit = (userID) =>  {
    return {
        type: actionTypes.FETCH_GROUP_ACTIVE_INIT,
        userID
    }; 
}; 

export const fetchGroupActive = (groupActive) =>  {
    return {
        type: actionTypes.FETCH_GROUP_ACTIVE,
        groupActive
    }; 
}; 


export const fetchNavActiveInit = () => {
    return {
        type: actionTypes.FETCH_NAV_ACTIVE_INIT
    };
};

export const fetchNavActive = (active) => {
    return {
        type: actionTypes.FETCH_NAV_ACTIVE,
        active
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