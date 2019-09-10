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

export const filterUserInit = (filterContent) => {
    return {
        type: actionTypes.FILTER_USER_INIT,
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

export const defaultShareProps = () => {
    return {
        type: actionTypes.DEFAULT_SHARE_PROPS
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

export const shareUserfail = () => {
    return {
        type: actionTypes.SHARE_USER_FAIL
    };
};

export const shareUserSuccess = () => {
    return {
        type: actionTypes.SHARE_USER_SUCCESS
    };
};



