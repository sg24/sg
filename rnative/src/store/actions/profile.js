import * as actionTypes from './actionTypes';

export const fetchProfileInit = (userID) => {
    return {
        type: actionTypes.FETCH_PROFILE_INIT,
        userID
    };
};

export const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_PROFILE_START
    };
};

export const fetchProfileFail = (err) => {
    return {
        type: actionTypes.FETCH_PROFILE_FAIL,
        err
    };
};

export const fetchProfile = (profile) =>  {
    return {
        type: actionTypes.FETCH_PROFILE,
        profile
    };
}; 


export const changeProfileInit = (id, title, det, confirm, info) => {
    return {
        type: actionTypes.CHANGE_PROFILE_INIT,
        id, 
        title,
        det,
        confirm,
        info
    }
};

export const changeProfileStart = (title, id, det, confirm, info) => {
    return {
        type: actionTypes.CHANGE_PROFILE_START,
        title,
        id,
        det,
        confirm,
        info,
    }
};

export const changeProfileCancel = () => {
    return {
        type: actionTypes.CHANGE_PROFILE_CANCEL
    }
};

export const changeProfile = (changed) => {
    return {
        type: actionTypes.CHANGE_PROFILE,
        changed
    }
};

export const changeProfileFail = (err) => {
    return {
        type: actionTypes.CHANGE_PROFILE_FAIL,
        err
    }
};
