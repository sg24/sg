import * as actionTypes from './actionTypes';

export const fetchPostInit = (userID, fetchType, fetchLimit, skipPost, ptTotal) => {
    return {
        type: actionTypes.FETCH_POST_INIT,
        userID,
        fetchType,
        fetchLimit,
        skipPost,
        ptTotal
    }
};

export const fetchPostReset = () =>{
    return {
        type: actionTypes.FETCH_POST_RESET,
    };
}

export const fetchPostFail = (err) => {
    return {
        type: actionTypes.FETCH_POST_FAIL,
        err
    }
};

export const fetchPost = (posts, skipPost, ptTotal) => {
    return {
        type: actionTypes.FETCH_POST,
        posts,
        skipPost,
        ptTotal
    }
};

export const changePtInit = (id, title, det, confirm) => {
    return {
        type: actionTypes.CHANGE_POST_INIT,
        id, 
        title,
        det,
        confirm
    }
};

export const changePtStart = (title, id, det) => {
    return {
        type: actionTypes.CHANGE_POST_START,
        title,
        id,
        det
    }
};

export const changePtCancel = () => {
    return {
        type: actionTypes.CHANGE_POST_CANCEL
    }
};

export const changePtReset = () => {
    return {
        type: actionTypes.CHANGE_POST_RESET
    }
};

export const changePtFail = (err) => {
    return {
        type: actionTypes.CHANGE_POST_FAIL,
        err
    }
};

export const changePt = () => {
    return {
        type: actionTypes.CHANGE_POST
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

export const changeFavInit = (id, liked, favAdd, changedFav, userID, cntGrp) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_INIT,
        id,
        liked,
        favAdd,
        changedFav,
        userID,
        cntGrp
    };
};

export const changeFavPtStart = (id, isLiked) => {
    return {
        type: actionTypes.CHANGE_FAVORITE_PT_START,
        id,
        isLiked
    };
};

export const changeFavPtFail = () => {
    return {
        type: actionTypes.CHANGE_FAVORITE_PT_FAIL
    };
};

export const changeFav = (changedFav) => {
    return {
        type: actionTypes.CHANGE_FAVORITE,
        changedFav
    };
};