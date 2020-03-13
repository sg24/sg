import * as actionTypes from './actionTypes';

export const fetchUsersInit = () => {
    return {
        type: actionTypes.FETCH_USERS_INIT
    };
};

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS
    }
};

export const fetchUsersFail = () => {
    return {
        type: actionTypes.FETCH_USERS_FAIL
    }
};


export const fetchUsers = (users) => {
    return {
        type: actionTypes.FETCH_USERS,
        users
    };
};

export const userSelect = (userSelect) => {
    return {
        type: actionTypes.USER_SELECT,
        userSelect
    };
};

export const viewUsers = () => {
    return {
        type: actionTypes.VIEW_USERS
    };
};

export const removeUser = (users) => {
    return {
        type: actionTypes.REMOVE_USER,
        users
    };
};

export const filterUserInit = (users, filterContent) => {
    return {
        type: actionTypes.FILTER_USER_INIT,
        users,
        filterContent
    };
};

export const filterUser = (users) => {
    return {
        type: actionTypes.FILTER_USER,
        users
    };
};

export const filterUserSelectInit = (filterContent, userSelect) => {
    return {
        type: actionTypes.FILTER_USER_SELECT_INIT,
        filterContent,
        userSelect
    };
};

export const filterUserSelect = (userSelect) => {
    return {
        type: actionTypes.FILTER_USER_SELECT,
        userSelect
    };
};

export const shareID = (shareID) => {
    return {
        type: actionTypes.SHARE_ID,
        shareID
    };
};

export const shareUserInit = (userSelect, shareID) => {
    return {
        type: actionTypes.SHARE_USER_INIT,
        userSelect,
        shareID
    };
};

export const shareUserStart = () => {
    return {
        type: actionTypes.SHARE_USER_START
    };
};

export const shareUserfail = (err) => {
    return {
        type: actionTypes.SHARE_USER_FAIL,
        err
    };
};

export const shareUser = () => {
    return {
        type: actionTypes.SHARE_USER
    };
};



export const fetchInfoInit = (id, status) => {
    return {
        type: actionTypes.FETCH_INFO_INIT,
        id,
        status
    };
};

export const fetchInfoStart = (curTab) => {
    return {
        type: actionTypes.FETCH_INFO_START,
        curTab
    };
};

export const fetchInfoFail = (err) => {
    return {
        type: actionTypes.FETCH_INFO_FAIL,
        err
    };
};

export const fetchInfo = (users) => {
    return {
        type: actionTypes.FETCH_INFO,
        users
    };
};

export const setGrpInfo = (grpInfo) => {
    return {
        type: actionTypes.SET_GRP_INFO,
        grpInfo
    };
};


export const resetInputFilter = () => {
    return {
        type: actionTypes.RESET_INPUT_FILTER
    };
};


export const changeCntInit = (id, user, categ, username, curTab, confirm) => {
    return {
        type: actionTypes.CHANGE_CNT_INIT,
        id, 
        user,
        categ,
        username,
        curTab,
        confirm
    }
};
export const changeCntStartInit = (userID, categ) => {
    return {
        type: actionTypes.CHANGE_CNT_STARTINIT,
        userID,
        categ
    }
};

export const changeCntStart = ( id, user, categ,username, curTab) => {
    return {
        type: actionTypes.CHANGE_CNT_START,
        id,
        user,
        categ,
        username,
        curTab   
    }
};

export const changeCntCancel = () => {
    return {
        type: actionTypes.CHANGE_CNT_CANCEL
    }
};

export const changeCntReset = (user) => {
    return {
        type: actionTypes.CHANGE_CNT_RESET,
        user
    }
};

export const changeCntFail = (err) => {
    return {
        type: actionTypes.CHANGE_CNT_FAIL,
        err
    }
};

export const changeCnt= () => {
    return {
        type: actionTypes.CHANGE_CNT
    }
};
