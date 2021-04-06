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

export const mediaReactionInit = (mediaID, page, pageID, reactionType) => {
    return {
        type: actionTypes.MEDIA_REACTION_INIT,
        mediaID,
        page,
        pageID,
        reactionType
    };
};

export const mediaReactionStart = (mediaID) => {
    return {
        type: actionTypes.MEDIA_REACTION_START,
        mediaID
    };
};

export const mediaReactionFail = (err, mediaID) => {
    return {
        type: actionTypes.MEDIA_REACTION_FAIL,
        err,
        mediaID
    };
};

export const mediaReaction = (mediaID, cnt) => {
    return {
        type: actionTypes.MEDIA_REACTION,
        mediaID,
        cnt
    };
};

export const mediaReactionReset = () => {
    return {
        type: actionTypes.MEDIA_REACTION_RESET
    };
};