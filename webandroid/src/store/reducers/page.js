import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    start: 0,
    page: null,
    fetchPostError: null,
    fetchPost: null,
    deletePostStart: false,
    deletePostError: null,
    deletePost: false,
    fetchQuestionError: null,
    fetchQuestion: null,
    fetchAdvertError: null,
    fetchAdvert: null,
    fetchFeedError: null,
    fetchFeed: null,
    fetchWriteupError: null,
    fetchWriteup: null,
    fetchCbtError: null,
    fetchCbt: null,
    fetchChatRoomError: null,
    fetchChatRoom: null
};

const pageReset = (state, action) => {
    return updateObject(state, {
        start: 0, page: null,
        fetchPostError: null,fetchPost: null, deletePostStart: false,deletePostError: null, deletePost: false,
        fetchQuestionError: null,fetchQuestion: null,
        fetchAdvertError: null,fetchAdvert: null,
        fetchFeedError: null,fetchFeed: null,
        fetchWriteupError: null,fetchWriteup: null,
        fetchCbtError: null,fetchCbt: null,
        fetchChatRoomError: null,fetchChatRoom: null
    })
};

const fetchPageFail = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {fetchPostError: {message: action.err}});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestionError: {message: action.err}});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeedError: {message: action.err}});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteupError: {message: action.err}});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCbtError: {message: action.err}});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoomError: {message: action.err}});
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const fetchPage = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {fetchPost: action.cnt, page: action.page});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestion: action.cnt, page: action.page});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert: action.cnt, page: action.page});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeed: action.cnt, page: action.page});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteup: action.cnt, page: action.page});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCbt: action.cnt, page: action.page});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoom: action.cnt, page: action.page});
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
};

const updatePageMedia = (state, action) => {
    function updatePage (page, action) {
        let pageCnt = page.filter(page => page._id === action.mediaInfo._id)[0];
        let pageCntIndex = page.findIndex(page => page._id === action.mediaInfo._id);
        if (pageCnt) {
            pageCnt.media = action.mediaInfo.media;
        }
        page[pageCntIndex] =  pageCnt;
        return page;
    }
    if (action.page === 'post') {
        return updateObject(state, {fetchPost: updatePage(state.fetchPost, action)});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestion: updatePage(state.fetchQuestion, action)});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert:  updatePage(state.fetchAdvert, action)});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeed: updatePage(state.fetchFeed, action)});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteup: updatePage(state.fetchWriteup, action)});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCbt: updatePage(state.fetchCbt, action)});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoom: action.cnt, page: action.page});
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
}

const deletePageReset = (state, action) => {
    return updateObject(state, { 
        deletePostStart: false,deletePostError: null, deletePost: false
    })
};

const deletePageFail = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {deletePostError: {message: action.err}});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestionError: {message: action.err}});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeedError: {message: action.err}});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteupError: {message: action.err}});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCbtError: {message: action.err}});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoomError: {message: action.err}});
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const deletePage = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {deletePost: true});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestion: action.cnt});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert: action.cnt});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeed: action.cnt});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteup: action.cnt});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCbt: action.cnt});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoom: action.cnt});
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PAGE_FAIL:
            return fetchPageFail(state, action);
        case actionTypes.FETCH_PAGE:
            return fetchPage(state, action);
        case actionTypes.FETCH_PAGE_RESET:
            return pageReset(state, action);
        case actionTypes.UPDATE_PAGE_MEDIA:
            return updatePageMedia(state, action);
        case actionTypes.DELETE_PAGE_FAIL:
            return deletePageFail(state, action);
        case actionTypes.DELETE_PAGE:
            return deletePage(state, action);
        case actionTypes.DELETE_PAGE_RESET:
            return deletePageReset(state, action);
        default: return state
    };
};

export default reducer;