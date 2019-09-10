import * as actionTypes from './actionTypes';

export const fetchPostInit = (userID) => {
    return {
        type: actionTypes.FETCH_POST_INIT,
        userID
    }
};

export const fetchPostStart = () => {
    return {
        type: actionTypes.FETCH_POST_START
    }
};


export const fetchPostSuccess = () => {
    return {
        type: actionTypes.FETCH_POST_SUCCESS
    }
};

export const fetchPostFail = () => {
    return {
        type: actionTypes.FETCH_POST_FAIL
    }
};

export const fetchPost = (posts) => {
    return {
        type: actionTypes.FETCH_POST,
        posts
    }
};

export const changeFavInit = (posts, filteredPost, postID) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_INIT,
        posts,
        filteredPost,
        postID
    };
};

export const changeFavPtStart = (posts, isPost) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_PT_START,
        posts,
        isPost
    };
};

export const changeFavPtFail = (post) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_PT_START,
        post
    };
};

export const changeFav = (posts) => {
    return {
        type: actionTypes.CHANGE_FAVORITE,
        posts
    };
};

export const changeFavFilter = (filteredPost) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_FILTER,
        filteredPost
    };
};

export const filterPostInit = (posts, tag) => {
    return {
        type: actionTypes.FILTER_POST_INIT,
        posts,
        tag
    }
};

export const filterPostStart = () => {
    return {
        type: actionTypes.FILTER_POST_START
    }
};

export const filterPostSuccess = () => {
    return {
        type: actionTypes.FILTER_POST_SUCCESS
    }
};

export const filterPostFail = () => {
    return {
        type: actionTypes.FILTER_POST_FAIL
    }
};

export const filterPost = (posts) => {
    return {
        type: actionTypes.FILTER_POST,
        posts
    };
};