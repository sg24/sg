import * as actionTypes from './actionTypes';

export const headerFormExpand = () => {
    return {
        type: actionTypes.HEADER_FORM_EXPAND
    };
};

export const headerNavDefault = () => {
    return {
        type: actionTypes.HEADER_NAV_DEFAULT
    };
};

export const headerAddNew = () => {
    return {
        type: actionTypes.HEADER_ADD_NEW
    };
};

export const fetchNotifyInit = (userID) => {
    return {
        type: actionTypes.FETCH_NOTIFY_INIT,
        userID
    };
};

export const fetchNotifyStart = () => {
    return {
        type: actionTypes.FETCH_NOTIFY_START
    };
};

export const fetchNotifySuccess = () => {
    return {
        type: actionTypes.FETCH_NOTIFY_SUCCESS
    };
};

export const fetchNotifyFail = () => {
    return {
        type: actionTypes.FETCH_NOTIFY_FAIL
    };
};

export const fetchNotify = (notify) =>  {
    return {
        type: actionTypes.FETCH_NOTIFY,
        notify
    };
}; 

export const changeFavNotifyInit = (notify, notifyID) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_NOTIFY_INIT,
        notify,
        notifyID
    };
};

export const changeFavNotify = (notify) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_NOTIFY,
        notify
    };
};

export const fetchNavlistInit = () => {
    return {
        type: actionTypes.FETCH_NAVLIST_INIT
    };
};

export const fetchNavlistStart = () => {
    return {
        type: actionTypes.FETCH_NAVLIST_START
    };
};

export const fetchNavlistSuccess = () => {
    return {
        type: actionTypes.FETCH_NAVLIST_SUCCESS
    };
};

export const fetchNavlistFail = () => {
    return {
        type: actionTypes.FETCH_NAVLIST_FAIL
    };
};

export const fetchNavlist = (navList) =>  {
    return {
        type: actionTypes.FETCH_NAVLIST,
        navList
    };
}; 

export const showUserOption = () =>  {
    return {
        type: actionTypes.SHOW_USER_OPTION 
    }; 
}; 