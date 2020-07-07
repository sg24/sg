import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: null,
    skipPost: null,
    ptTotal: null,
    showLoader: false,
    changedFav: [],
    favChange: null,
    postVideo: {id: null},
    videoErr: null,
    filterDet: null,
    changePt: false,
    changePtErr: null,
    changePtStart: null,
    preview: []
}

const fetchPost = (state, action) => {
    let posts = !state.posts ? action.posts : state.posts.concat(...action.posts);
    return updateObject(state, {posts, skipPost: action.skipPost, ptTotal: action.ptTotal, showLoader: false})
};

const fetchPostStart = (state, action) => {
    return updateObject(state, {showLoader: true})
};

const fetchPostReset = (state, action) => {
    return updateObject(state, {posts: null, skipPost: null, ptTotal: null, showLoader: false})
};

const fetchPostFail = (state, action) => {
    return updateObject(state, {postErr: action.err, showLoader: false})
};

const changePostStart = (state, action) => {
    return updateObject(state, {changePtStart: {title: action.title, id: action.id, det: action.det}, changePtErr: null})
};

const changePostCancel = (state, action) => {
    return updateObject(state, {changePtStart: null, changePtErr: null, changePt: false})
};

const changePostReset = (state, action) => {
    let posts = [...state.posts];
    if ((state.changePtStart.det === 'publish' || state.changePtStart.det === 'acc-draft') && state.changePtStart.det !== 'delete') {
        let filterPost = posts.filter(pt => pt._id === state.changePtStart.id);
        let updated = posts.filter(pt => pt._id !== state.changePtStart.id);
        if (filterPost.length > 0) {
            let updatePost = {...filterPost[0]}
            updatePost.mode = state.changePtStart.det === 'publish' ? 'publish' : 'draft';
            updated.push(updatePost) 
            return updateObject(state, {posts: action.changed ? updated : state.posts, changePtStart: null, changePtErr: null, changePt: false})
        }
    }
    let updatePost = posts.filter(pt => pt._id !== state.changePtStart.id);
    return updateObject(state, {posts: action.changed ? updatePost : state.posts, changePtStart: null, changePtErr: null, changePt: false})
};

const changePostFail = (state, action) => {
    return updateObject(state, {changePtErr: action.err})
};

const changePost = (state, action) => {
    return updateObject(state, {changePt: true})
};

const showPreview = (state, action) => {
    return updateObject(state, {preview: action.media})
}

const fetchVideo = (state, action) => {
    return updateObject(state, {postVideo: {id: action.id, url: action.url}})
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

const resetModel = (state, action) => {
    return updateObject(state, {postErr: null,changePtStart: null, changePtErr: null, changePt: false})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POST:
            return fetchPost(state, action);
        case actionTypes.FETCH_POST_START:
            return fetchPostStart(state, action);
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
        case actionTypes.RESET_MODEL:
            return resetModel(state, action);
        case actionTypes.SHOW_PREVIEW:
            return showPreview(state, action);
        default: return state
    }
};

export default reducer