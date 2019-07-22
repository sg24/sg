import * as actionTypes from './actionTypes';

export const changeTagsPath = (path) => {
    return {
        type: actionTypes.CHANGE_TAGS_PATH,
        path
    };
};

export const fetchTagsInit = () => {
    return {
        type: actionTypes.FETCH_TAGS_INIT
    };
};

export const fetchTagsStart = () => {
    return {
        type: actionTypes.FETCH_TAGS_START
    }
};

export const fetchTagsSuccess = () => {
    return {
        type: actionTypes.FETCH_TAGS_SUCCESS
    }
};

export const fetchTagsFail = () => {
    return {
        type: actionTypes.FETCH_TAGS_FAIL
    }
};


export const fetchTags = (tags) => {
    return {
        type: actionTypes.FETCH_TAGS,
        tags
    };
};
