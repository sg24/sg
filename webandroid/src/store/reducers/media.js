import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchInfoStart: false,
    fetchInfoError: null,
    fetchInfo: null,
    mediaLikeError: null
};

const setMediaInfo = (state, action) => {
    return updateObject(state, { 
        fetchInfo: action.media
    })
};

const fetchInfoReset = (state, action) => {
    return updateObject(state, { 
        fetchInfoStart: false, fetchInfoErr: null, fetchInfo: null,
        mediaLikeStart: [], mediaLikeError: null
    })
};

const fetchInfoFail = (state, action) => {
    return updateObject(state, { 
        fetchInfoStart: false, fetchInfoError: action.err,
    })
};

const fetchInfo = (state, action) => {
    return updateObject(state, { 
        fetchInfoStart: false, fetchInfoErr: null, fetchInfo: action.cnt
    })
};

const mediaLikeReset = (state, action) => {
    return updateObject(state, {
       mediaLikeError: null
    })
};

const mediaLikeStart = (state, action) => {
    let fetchInfo = [...state.fetchInfo];
    let mediaItem = fetchInfo.filter(media => media.id ===  action.mediaID)[0];
    if (mediaItem) {
        mediaItem.start = true;
        let mediaItemIndex =  fetchInfo.findIndex(media => media.id ===  action.mediaID);
        fetchInfo[mediaItemIndex] = mediaItem;
    }
    return updateObject(state, { 
        fetchInfo, mediaLikeError: null,
    })
};

const mediaLikeFail = (state, action) => {
    let fetchInfo = [...state.fetchInfo];
    let mediaItem = fetchInfo.filter(media => media.id ===  action.mediaID)[0];
    if (mediaItem) {
        mediaItem.start = false
        let mediaItemIndex =  fetchInfo.findIndex(media => media.id ===  action.mediaID);
        fetchInfo[mediaItemIndex] = mediaItem;
    }
    return updateObject(state, { 
        fetchInfo, mediaLikeError: action.err,
    })
};

const mediaLike = (state, action) => {
    let fetchInfo = [...state.fetchInfo];
    let mediaItem = fetchInfo.filter(media => media.id ===  action.mediaID)[0];
    if (mediaItem && action.cnt) {
        mediaItem.isLiked = action.cnt.isLiked;
        mediaItem.like = action.cnt.like;
        delete mediaItem.start;
        let mediaItemIndex =  fetchInfo.findIndex(media => media.id ===  action.mediaID);
        fetchInfo[mediaItemIndex] = mediaItem;
    }
    return updateObject(state, { 
        mediaLikeErr: null, fetchInfo
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MEDIA_INFO:
            return setMediaInfo(state, action);
        case actionTypes.FETCH_MEDIAINFO_FAIL:
            return fetchInfoFail(state, action);
        case actionTypes.FETCH_MEDIAINFO:
            return fetchInfo(state, action);
        case actionTypes.FETCH_MEDIAINFO_RESET:
            return fetchInfoReset(state, action);
        case actionTypes.MEDIA_LIKE_START:
            return mediaLikeStart(state, action);
        case actionTypes.MEDIA_LIKE_FAIL:
            return mediaLikeFail(state, action);
        case actionTypes.MEDIA_LIKE:
            return mediaLike(state, action);
        case actionTypes.MEDIA_LIKE_RESET:
            return mediaLikeReset(state, action);
        default: return state
    };
};

export default reducer;