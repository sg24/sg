import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchInfoStart: false,
    fetchInfoError: null,
    fetchInfo: null,
    mediaReactionError: null
};

const setMediaInfo = (state, action) => {
    return updateObject(state, { 
        fetchInfo: action.media
    })
};

const updateMediaInfo = (state, action) => {
    let fetchInfo = [...state.fetchInfo];
    let mediaItem = fetchInfo.filter(cnt => cnt.chat === action.mediaInfo.chat)[0];
    if (mediaItem) {
        let updateMediaItem  = updateObject(mediaItem, action.mediaInfo);
        let mediaItemIndex = fetchInfo.findIndex(cnt => cnt.chat === action.mediaInfo.chat);
        fetchInfo[mediaItemIndex] = updateMediaItem;
    }
    return updateObject(state, {fetchInfo})
};

const resetMediaInfo = (state, action) => {
    return updateObject(state, { 
        fetchInfoStart: false, fetchInfoError: null, fetchInfo: null, mediaReactionError: null
    })
};

const fetchInfoReset = (state, action) => {
    return updateObject(state, { 
        fetchInfoStart: false, fetchInfoError: null, fetchInfo: null,
        mediaReactionStart: [], mediaReactionError: null
    })
};

const fetchInfoFail = (state, action) => {
    return updateObject(state, { 
        fetchInfoStart: false, fetchInfoError: action.err,
    })
};

const fetchInfo = (state, action) => {
    return updateObject(state, { 
        fetchInfoStart: false, fetchInfoError: null, fetchInfo: action.cnt
    })
};

const mediaReactionReset = (state, action) => {
    return updateObject(state, {
       mediaReactionError: null
    })
};

const mediaReactionStart = (state, action) => {
    let fetchInfo = [...state.fetchInfo];
    let mediaItem = fetchInfo.filter(media => media.id ===  action.mediaID)[0];
    if (mediaItem) {
        mediaItem.start = true;
        let mediaItemIndex =  fetchInfo.findIndex(media => media.id ===  action.mediaID);
        fetchInfo[mediaItemIndex] = mediaItem;
    }
    return updateObject(state, { 
        fetchInfo, mediaReactionError: null,
    });
};

const mediaReactionFail = (state, action) => {
    let fetchInfo = [...state.fetchInfo];
    let mediaItem = fetchInfo.filter(media => media.id ===  action.mediaID)[0];
    if (mediaItem) {
        mediaItem.start = false
        let mediaItemIndex =  fetchInfo.findIndex(media => media.id ===  action.mediaID);
        fetchInfo[mediaItemIndex] = mediaItem;
    }
    return updateObject(state, { 
        fetchInfo, mediaReactionError: action.err,
    })
};

const mediaReaction = (state, action) => {
    let fetchInfo = [...state.fetchInfo];
    let mediaItem = fetchInfo.filter(media => media.id ===  action.mediaID)[0];
    if (mediaItem && action.cnt) {
        for (let cntItem in action.cnt) {
            mediaItem[cntItem] = action.cnt[cntItem];
        }
        delete mediaItem.start;
        let mediaItemIndex =  fetchInfo.findIndex(media => media.id ===  action.mediaID);
        fetchInfo[mediaItemIndex] = mediaItem;
    }
    return updateObject(state, { 
        mediaReactionError: null, fetchInfo
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RESET_MEDIA_INFO:
            return resetMediaInfo(state, action);
        case actionTypes.SET_MEDIA_INFO:
            return setMediaInfo(state, action);
        case actionTypes.UPDATE_MEDIA_INFO:
            return updateMediaInfo(state, action);
        case actionTypes.FETCH_MEDIAINFO_FAIL:
            return fetchInfoFail(state, action);
        case actionTypes.FETCH_MEDIAINFO:
            return fetchInfo(state, action);
        case actionTypes.FETCH_MEDIAINFO_RESET:
            return fetchInfoReset(state, action);
        case actionTypes.MEDIA_REACTION_START:
            return mediaReactionStart(state, action);
        case actionTypes.MEDIA_REACTION_FAIL:
            return mediaReactionFail(state, action);
        case actionTypes.MEDIA_REACTION:
            return mediaReaction(state, action);
        case actionTypes.MEDIA_REACTION_RESET:
            return mediaReactionReset(state, action);
        default: return state
    };
};

export default reducer;