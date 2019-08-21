import * as actionTypes from './actionTypes';

export const fetchPtCategInit = () =>  {
    return {
        type: actionTypes.FETCH_PT_CATEG_INIT
    }; 
}; 

export const fetchPtCateg = (ptCateg) =>  {
    return {
        type: actionTypes.FETCH_PT_CATEG,
        ptCateg
    }; 
}; 

export const addPtCategInit = (categ) =>  {
    return {
        type: actionTypes.ADD_PT_CATEG_INIT,
        categ
    }; 
}; 

export const addPtCateg = (ptCateg) =>  {
    return {
        type: actionTypes.ADD_PT_CATEG,
        ptCateg
    }; 
}; 

export const checkLinkInit = (link) =>  {
    return {
        type: actionTypes.CHECK_LINK_INIT,
        link
    }; 
}; 

export const checkLink = (isValid) =>  {
    return {
        type: actionTypes.CHECK_LINK,
        isValid
    }; 
}; 

export const resetLink = () =>  {
    return {
        type: actionTypes.RESET_LINK
    }; 
}; 

export const removeMedia = (media) => {
    return {
        type: actionTypes.REMOVE_MEDIA,
        media
    };
};

export const submitMedia = (media) =>  {
    return {
        type: actionTypes.SUBMIT_MEDIA,
        media
    }; 
}; 

export const hideMediaBox = () =>  {
    return {
        type: actionTypes.HIDE_MEDIA_BOX,
    }; 
}; 

export const showMediaBox = () =>  {
    return {
        type: actionTypes.SHOW_MEDIA_BOX,
    }; 
}; 

export const fetchUsersInit = (userStatus) =>  {
    return {
        type: actionTypes.FETCH_USERS_INIT,
        userStatus
    }; 
}; 

export const fetchUsers = (users) =>  {
    return {
        type: actionTypes.FETCH_USERS,
        users
    }; 
}; 

export const inputDefaultValue = () => {
    return {
        type: actionTypes.INPUT_DEFAULT_VALUE
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

export const userSelect = (users) => {
    return {
        type: actionTypes.USER_SELECT,
        users
    };
};

export const showUserSelectInit = (userID) => {
    return {
        type: actionTypes.SHOW_USER_SELECT_INIT,
        userID
    };
};

export const showUserSelect = (users) => {
    return {
        type: actionTypes.SHOW_USER_SELECT,
        users
    };
};