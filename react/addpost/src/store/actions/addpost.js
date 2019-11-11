import * as actionTypes from './actionTypes';

export const fetchPtCategInit = () =>  {
    return {
        type: actionTypes.FETCH_PT_CATEG_INIT
    }; 
}; 


export const fetchPtCategStart = () =>  {
    return {
        type: actionTypes.FETCH_PT_CATEG_START
    }; 
}; 

export const fetchPtCategFail = (err) =>  {
    return {
        type: actionTypes.FETCH_PT_CATEG_FAIL,
        err
    }; 
}; 

export const fetchPtCategReset = () =>  {
    return {
        type: actionTypes.FETCH_PT_CATEG_RESET
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

export const checkLinkInit = (link, mediaType) =>  {
    return {
        type: actionTypes.CHECK_LINK_INIT,
        link,
        mediaType
    }; 
}; 

export const checkLink = (err, media) =>  {
    return {
        type: actionTypes.CHECK_LINK,
        err,
        media
    }; 
}; 

export const resetLink = () =>  {
    return {
        type: actionTypes.RESET_LINK
    }; 
}; 

export const addSnapshot = (snapshot) => {
    return {
        type: actionTypes.ADD_SNAPSHOT,
        snapshot
    };
};

export const removeSnapshot = (snapshot) => {
    return {
        type: actionTypes.REMOVE_SNAPSHOT,
        snapshot
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

export const submitFormInit = (formData) => {
    return {
        type: actionTypes.SUBMIT_FORM_INIT,
        formData
    };
};

export const submitFormFail = (err) => {
    return {
        type: actionTypes.SUBMIT_FORM_FAIL,
        err
    };
};

export const submitFormSuccess = (uploadPercent) => {
    return {
        type: actionTypes.SUBMIT_FORM_SUCCESS,
        uploadPercent
    };
};

export const submitFormStart = () => {
    return {
        type: actionTypes.SUBMIT_FORM_START
    };
};

export const submitForm = () => {
    return {
        type: actionTypes.SUBMIT_FORM
    };
};

export const formSubmitted = (ID) => {
    return {
        type: actionTypes.FORM_SUBMITTED,
        ID
    };
};
