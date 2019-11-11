import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: null,
    skipPost: null,
    ptTotal: null,
    changedFav: [],
    favChange: null,
    postVideo: {id: null},
    videoErr: null,
    filterDet: null,
    changePt: false,
    changePtErr: null,
    changePtStart: null
}

const fetchPost = (state, action) => {
    let posts = !state.posts ? action.posts : state.posts.concat(...action.posts);
    return updateObject(state, {posts, skipPost: action.skipPost, ptTotal: action.ptTotal})
};

const fetchPostReset = (state, action) => {
    return updateObject(state, {posts: null, skipPost: null, ptTotal: null})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {postErr: action.err})
};

const changePostStart = (state, action) => {
    return updateObject(state, {changePtStart: {title: action.title, id: action.id, det: action.det}, changePtErr: null})
};

const changePostCancel = (state, action) => {
    return updateObject(state, {changePtStart: null, changePtErr: null, changePt: false})
};

const changePostReset = (state, action) => {
    let posts = [...state.posts];
    let updatePost = posts.filter(pt => pt._id !== state.changePtStart.id);
    return updateObject(state, {posts: updatePost, changePtStart: null, changePtErr: null, changePt: false})
};

const changePostFail = (state, action) => {
    return updateObject(state, {changePtErr: action.err})
};

const changePost = (state, action) => {
    return updateObject(state, {changePt: true})
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
    return updateObject(state, {favChange: {id:action.id, isLiked: action.isLiked}})
};

const changeFavPtFail = (state, action) => {
    return updateObject(state, {favChange: null })
};

const changeFav = (state, action) => {
    return updateObject(state, {changedFav: action.changedFav, favChange: null})
};

const filterPost = (state, action) => {
    return updateObject(state, {filterDet: action.filterDet})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POST:
            return fetchPost(state, action);
        case actionTypes.FETCH_POST_RESET:
            return fetchPostReset(state, action);
        case actionTypes.FETCH_POST_FAIL:
            return fetchPostFail(state, action);
        case actionTypes.CHANGE_POST_START:
            return changePostStart(state, action);
        case actionTypes.CHANGE_POST_CANCEL:
            return changePostCancel(state, action);
        case actionTypes.CHANGE_POST_RESET:
            return changePostReset(state, action);
        case actionTypes.CHANGE_POST_FAIL:
            return changePostFail(state, action);
        case actionTypes.CHANGE_POST:
            return changePost(state, action);
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
        case actionTypes.CHANGE_FAVORITE_PT_FAIL:
            return changeFavPtFail(state, action);
        case actionTypes.FILTER_POST:
            return filterPost(state, action);
        default: return state
    }
};

export default reducer