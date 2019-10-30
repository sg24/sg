import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: null,
    filteredPost: null,
    postVideo: {id: null},
    videoErr: null
}

const fetchPost = (state, action) => {
    return updateObject(state, {posts: action.posts})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {postErr: action.err})
};

const fetchVideoStart = (state, action) => {
    if (state.postVideo.url) {
        window.URL.revokeObjectURL(state.postVideo.url);
    }
    return updateObject(state, {postVideo: {id: action.ptVideoID}, videoErr: null})
};

const fetchVideoFail = (state, action) => {
    return updateObject(state, {videoErr: {id: state.postVideo.id, err: action.err}})
};

const fetchVideo = (state, action) => {
    return updateObject(state, {postVideo: {id: state.postVideo.id, url: action.url}})
};

const changeFavPtStart = (state, action) => {
    return updateObject(state, {
        posts: action.isPost ? action.posts : state.posts,
        filteredPost: action.isPost ? state.filteredPost : action.posts})
};

const changeFav = (state, action) => {
    return updateObject(state, {posts: action.posts})
};

const changeFavFilter = (state, action) => {
    return updateObject(state, {filteredPost: action.filteredPost})
};

const filterPost = (state, action) => {
    return updateObject(state, {filteredPost: action.posts})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POST:
            return fetchPost(state, action);
        case actionTypes.FETCH_POST_FAIL:
            return fetchPostFail(state, action);
        case actionTypes.FETCH_VIDEO_START:
            return fetchVideoStart(state, action);
        case actionTypes.FETCH_VIDEO_FAIL:
            return fetchVideoFail(state, action);
        case actionTypes.FETCH_VIDEO:
            return fetchVideo(state, action);
        case actionTypes.CHANGE_FAVORITE:
            return changeFav(state, action);
        case actionTypes.CHANGE_FAVORITE_PT_START:
            return changeFavPtStart(state, action);
        case actionTypes.CHANGE_FAVORITE_FILTER:
            return changeFavFilter(state, action);
        case actionTypes.FILTER_POST:
            return filterPost(state, action);
        default: return state
    }
};

export default reducer