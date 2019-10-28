import * as actionTypes from './actionTypes';

export const fetchPostInit = (userID) => {
    return {
        type: actionTypes.FETCH_POST_INIT,
        userID
    }
};

export const fetchPostFail = (err) => {
    return {
        type: actionTypes.FETCH_POST_FAIL,
        err
    }
};

export const fetchPost = (posts) => {
    return {
        type: actionTypes.FETCH_POST,
        posts
    }
};

export const fetchVideoInit = (videoID, ptVideoID) => {
    return {
        type: actionTypes.FETCH_VIDEO_INIT,
        videoID,
        ptVideoID
    }
};

export const fetchVideoStart = (ptVideoID) => {
    return {
        type: actionTypes.FETCH_VIDEO_START,
        ptVideoID
    }
};

export const fetchVideoFail = (err) => {
    return {
        type: actionTypes.FETCH_VIDEO_FAIL,
        err
    }
};

export const fetchVideo = (url) => {
    return {
        type: actionTypes.FETCH_VIDEO,
        url
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