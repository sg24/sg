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