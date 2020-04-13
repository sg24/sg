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

export const fetchNotifyInit = () => {
    return {
        type: actionTypes.FETCH_NOTIFY_INIT
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

export const fetchNotifyFail = (err) => {
    return {
        type: actionTypes.FETCH_NOTIFY_FAIL,
        err
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

export const defaultNotifyactiveInit = () =>  {
    return {
        type: actionTypes.DEFAULT_NOTIFYACTIVE_INIT
    }; 
}; 

export const defaultNotifyActive = () =>  {
    return {
        type: actionTypes.DEFAULT_NOTIFYACTIVE
    }; 
}; 
export const changeMainFavoriteStart = (isLiked) =>  {
    return {
        type: actionTypes.CHANGE_MAINFAVORITE_START,
        isLiked
    }; 
}; 

export const changeMainFavoriteReset = () =>  {
    return {
        type: actionTypes.CHANGE_MAINFAVORITE_RESET
    }; 
}; 

export const headerFilterInit = (filterCnt, filterPos, filterLastPos) =>  {
    return {
        type: actionTypes.HEADER_FILTER_INIT,
        filterCnt,
        filterPos,
        filterLastPos
    }; 
}; 

export const headerFilterStart = (filterPos, filterLastPos) =>  {
    return {
        type: actionTypes.HEADER_FILTER_START,
        filterPos,
        filterLastPos
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

export const fetchChatDetInit = (categ) =>  {
    return {
        type: actionTypes.FETCH_CHATDET_INIT,
        categ
    }; 
}; 

export const fetchChatDetStart = () => {
    return {
        type: actionTypes.FETCH_CHATDET_START
    };
};

export const fetchChatDetFail = (err) => {
    return {
        type: actionTypes.FETCH_CHATDET_FAIL,
        err
    };
};

export const fetchChatDet = (cnt) => {
    return {
        type: actionTypes.FETCH_CHATDET,
        cnt
    };
};

export const showChatDet = (cnt) => {
    return {
        type: actionTypes.SHOW_CHATDET,
        cnt
    };
};