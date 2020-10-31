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

export const submitAboutInit = (cnt, userID) => {
    return {
        type: actionTypes.SUBMIT_ABOUT_INIT,
        cnt,
        userID
    }
};

export const submitAboutReset = () => {
    return {
        type: actionTypes.SUBMIT_ABOUT_RESET
    }
};

export const submitAboutFail = (err) => {
    return {
        type: actionTypes.SUBMIT_ABOUT_FAIL,
        err
    }
};

export const submitAboutStart = () => {
    return {
        type: actionTypes.SUBMIT_ABOUT_START
    }
};

export const submitAbout = (cnt) => {
    return {
        type: actionTypes.SUBMIT_ABOUT,
        cnt
    }
};

export const submitProfileImageReset = () => {
    return {
        type: actionTypes.SUBMIT_PROFILE_IMAGE_RESET
    }
};

export const submitProfileImageFail = (err) => {
    return {
        type: actionTypes.SUBMIT_PROFILE_IMAGE_FAIL,
        err
    }
};

export const submitProfileImageStart = () => {
    return {
        type: actionTypes.SUBMIT_PROFILE_IMAGE_START
    }
};

export const submitProfileImage = (image) => {
    return {
        type: actionTypes.SUBMIT_PROFILE_IMAGE,
        image
    }
};

export const submitUsernameInit = (username, userID) => {
    return {
        type: actionTypes.SUBMIT_USERNAME_INIT,
        username,
        userID
    }
};

export const submitUsernameReset = () => {
    return {
        type: actionTypes.SUBMIT_USERNAME_RESET
    }
};

export const submitUsernameFail = (err) => {
    return {
        type: actionTypes.SUBMIT_USERNAME_FAIL,
        err
    }
};

export const submitUsernameStart = () => {
    return {
        type: actionTypes.SUBMIT_USERNAME_START
    }
};

export const submitUsername = (username) => {
    return {
        type: actionTypes.SUBMIT_USERNAME,
        username
    }
};