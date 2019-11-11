import * as actionTypes from './actionTypes';

export const headerFormExpand = () => {
    return {
        type: actionTypes.HEADER_FORM_EXPAND
    };
};


export const headerFormSm = () => {
    return {
        type: actionTypes.HEADER_FORM_SM
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

export const changeFavNotifyStart = (notify) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_NOTIFY_START,
        notify
    };
};

export const changeFavNotifyFail = (notify) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_NOTIFY_FAIL,
        notify
    };
};

export const changeFavNotify = (notify) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_NOTIFY,
        notify
    };
};

export const showNavList = () => {
    return {
        type: actionTypes.SHOW_NAV_LIST
    };
};

export const fetchNavlistInit = (category) => {
    return {
        type: actionTypes.FETCH_NAVLIST_INIT,
        category
    };
};

export const fetchNavlistStart = () => {
    return {
        type: actionTypes.FETCH_NAVLIST_START
    };
};


export const fetchNavlist = (category, navList) =>  {
    return {
        type: actionTypes.FETCH_NAVLIST,
        category,
        navList,
    };
}; 

export const showUserOption = () =>  {
    return {
        type: actionTypes.SHOW_USER_OPTION 
    }; 
}; 

export const fetchNotifyactiveInit = (userID) =>  {
    return {
        type: actionTypes.FETCH_NOTIFY_ACTIVE_INIT,
        userID
    }; 
}; 

export const fetchNotifyActive = (notifyActive) =>  {
    return {
        type: actionTypes.FETCH_NOTIFY_ACTIVE,
        notifyActive
    }; 
}; 

export const defaultNotifyactiveInit = (userID) =>  {
    return {
        type: actionTypes.DEFAULT_NOTIFYACTIVE_INIT,
        userID
    }; 
}; 

export const defaultNotifyActive = () =>  {
    return {
        type: actionTypes.DEFAULT_NOTIFYACTIVE
    }; 
}; 


export const headerFilterInit = (filterCnt, filterPos) =>  {
    return {
        type: actionTypes.HEADER_FILTER_INIT,
        filterCnt,
        filterPos
    }; 
}; 

export const headerFilterStart = (filterPos) =>  {
    return {
        type: actionTypes.HEADER_FILTER_START,
        filterPos
    }; 
}; 

export const headerFilterFail = (searchCntErr) =>  {
    return {
        type: actionTypes.HEADER_FILTER_FAIL,
        searchCntErr
    }; 
}; 

export const headerFilter = (searchCnt) =>  {
    return {
        type: actionTypes.HEADER_FILTER,
        searchCnt
    }; 
}; 

export const headerFilterClose = () => {
    return {
        type: actionTypes.HEADER_FILTER_CLOSE
    };
};