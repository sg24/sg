import * as actionTypes from './actionTypes';

export const setMediaInfo = (media) => {
    return {
        type: actionTypes.SET_MEDIA_INFO,
        media
    };
};

export const updateMediaInfo = (mediaInfo) => {
    return {
        type: actionTypes.UPDATE_MEDIA_INFO,
        mediaInfo
    };
};

export const resetMediaInfo = () => {
    return {
        type: actionTypes.RESET_MEDIA_INFO,
    };
};

export const fetchMediaInfoInit = (chat, media) => {
    return {
        type: actionTypes.FETCH_MEDIAINFO_INIT,
        chat,
        media
    };
};

export const fetchMediaInfoFail = (err) => {
    return {
        type: actionTypes.FETCH_MEDIAINFO_FAIL,
        err
    };
};

export const fetchMediaInfo = (cnt) => {
    return {
        type: actionTypes.FETCH_MEDIAINFO,
        cnt
    };
};

export const fetchMediaInfoReset = () => {
    return {
        type: actionTypes.FETCH_MEDIAINFO_RESET
    };
};

export const mediaLikeInit = (mediaID, page, pageID) => {
    return {
        type: actionTypes.MEDIA_LIKE_INIT,
        mediaID,
        page,
        pageID
    };
};

export const mediaLikeStart = (mediaID) => {
    return {
        type: actionTypes.MEDIA_LIKE_START,
        mediaID
    };
};

export const mediaLikeFail = (err, mediaID) => {
    return {
        type: actionTypes.MEDIA_LIKE_FAIL,
        err,
        mediaID
    };
};

export const mediaLike = (mediaID, cnt) => {
    return {
        type: actionTypes.MEDIA_LIKE,
        mediaID,
        cnt
    };
};

export const mediaLikeReset = () => {
    return {
        type: actionTypes.MEDIA_LIKE_RESET
    };
};