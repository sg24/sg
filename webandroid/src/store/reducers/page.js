import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    page: null,
    loadMore: false,
    fetchPostError: null,
    fetchPostStart: false,
    fetchPost: null,
    deletePostError: null,
    deletePost: null,
    fetchQuestionError: null,
    fetchQuestion: null,
    fetchQuestionStart: false,
    deleteQuestionError: null,
    deleteQuestion: null,
    fetchAdvertError: null,
    fetchAdvert: null,
    fetchFeedError: null,
    fetchFeedStart: false,
    fetchFeed: null,
    deleteFeedError: null,
    deleteFeed: null,
    fetchWriteUpError: null,
    fetchWriteUpStart: false,
    fetchWriteUp: null,
    deleteWriteUpError: null,
    deleteWriteUp: null,
    fetchCBTError: null,
    fetchCBTStart: false,
    fetchCBT: null,
    deleteCBTError: null,
    deleteCBT: null,
    fetchChatRoomError: null,
    fetchChatRoom: null,
    fetchUserError: null,
    fetchUserStart: false,
    fetchUser: null,
    pageReaction: [],
    pageReactionError: false
};

const pageReset = (state, action) => {
    return updateObject(state, {
        page: null,
        fetchPostError: null,fetchPost: null, fetchPostStart: false, deletePostError: null, deletePost: null,
        fetchQuestionError: null,fetchQuestion: null, fetchQuestionStart: false, deleteQuestionError: null, deleteQuestion: null,
        fetchAdvertError: null,fetchAdvert: null,
        fetchFeedError: null,fetchFeedStart: false,fetchFeed: null,deleteFeedError: null,deleteFeed: null,
        fetchWriteUpError: null,fetchWriteUpStart: false,fetchWriteUp: null,deleteWriteUpError: null,deleteWriteUp: null,
        fetchCBTError: null,fetchCBTStart: false,fetchCBT: null,deleteCBTError: null,deleteCBT: null,
        fetchChatRoomError: null,fetchChatRoom: null, 
        fetchUserError: null,fetchUserStart: false,fetchUser: null,
        pageReaction: [],pageReactionError: false
    })
};

const fetchPageFail = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {fetchPostError: {message: action.err}, fetchPostStart: false});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestionError: {message: action.err}, fetchQuestionStart: false});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeedError: {message: action.err}, fetchFeedStart: false});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteUpError: {message: action.err}, fetchWriteUpStart: false});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCBTError: {message: action.err}, fetchCBTStart: false});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoomError: {message: action.err}});
    } else if (action.page === 'users') {
        return updateObject(state, {fetchUserError: {message: action.err}, fetchUserStart: false});
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const fetchPageStart = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {fetchPostError: null, fetchPost: action.start === 0 ? null : state.fetchPost, fetchPostStart: true });
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestionError: null, fetchQuestion: action.start === 0 ? null : state.fetchQuestion, fetchQuestionStart: true });
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeedError: null, fetchFeed: action.start === 0 ? null : state.fetchFeed, fetchFeedStart: true });
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteUpError: null, fetchWriteUp: action.start === 0 ? null : state.fetchWriteUp, fetchWriteUpStart: true });
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCBTError: null, fetchCBT: action.start === 0 ? null : state.fetchCBT, fetchCBTStart: true });
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoomError: {message: action.err}});
    } else if (action.page === 'users') {
        return updateObject(state, {fetchUserError: null, fetchUser: action.start === 0 ? null : state.fetchUser, fetchUserStart: true });
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const fetchPageReset = (state, action) => {
    return updateObject(state, {fetchPostError: null, fetchPostStart: false, fetchUserError: null, fetchUserStart: false,
        fetchQuestionError: null, fetchQuestionStart: false, fetchFeedError: null, fetchFeedStart: false,
        fetchWriteUpError: null, fetchWriteUpStart: false, fetchCBTError: null, fetchCBTStart: false});
};

const fetchPage = (state, action) => {
    function updatePage(page, action) {
        let updatePageCnt = page && action.start !== 0 ? [...page] : [];
        updatePageCnt.push(...action.cnt.page);
        return updatePageCnt;
    }
    if (action.page === 'post') {
        return updateObject(state, {fetchPost: updatePage(state.fetchPost, action), page: action.page, loadMore: action.cnt.loadMore, fetchPostStart: false});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestion: updatePage(state.fetchQuestion, action), page: action.page, loadMore: action.cnt.loadMore, fetchQuestionStart: false});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert: action.cnt, page: action.page});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeed: updatePage(state.fetchFeed, action), page: action.page, loadMore: action.cnt.loadMore, fetchFeedStart: false});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteUp: updatePage(state.fetchWriteUp, action), page: action.page, loadMore: action.cnt.loadMore, fetchWriteUpStart: false});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCBT: updatePage(state.fetchCBT, action), page: action.page, loadMore: action.cnt.loadMore, fetchCBTStart: false});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoom: action.cnt, page: action.page});
    } else if (action.page === 'users') {
        return updateObject(state, {fetchUser: updatePage(state.fetchUser, action), page: action.page, loadMore: action.cnt.loadMore, fetchUserStart: false});
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
};

const updatePage = (state, action) => {
    function updatePageCnt (page, action) {
        let pageCnt = page.filter(page => page._id === action.pageInfo._id)[0];
        let pageCntIndex = page.findIndex(page => page._id === action.pageInfo._id);
        if (pageCnt) {
            for (let cnt in action.pageInfo) {
                pageCnt[cnt] =  action.pageInfo[cnt];
            }
        }
        page[pageCntIndex] =  pageCnt;
        return page;
    }
    if (action.page === 'post') {
        return updateObject(state, {fetchPost: updatePageCnt(state.fetchPost, action)});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestion: updatePageCnt(state.fetchQuestion, action)});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert:  updatePageCnt(state.fetchAdvert, action)});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeed: updatePageCnt(state.fetchFeed, action)});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteUp: updatePageCnt(state.fetchWriteUp, action)});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCBT: updatePageCnt(state.fetchCBT, action)});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoom: action.cnt, page: action.page});
    } else if (action.page === 'users') {
        function changeMode (oldCnts, pageID, field, isUpdate) {
            let cnts = oldCnts ? [...oldCnts] : [];
            let user = cnts.filter(userFnd =>userFnd._id === pageID)[0];
            if (user) {
                let cntIndex = cnts.findIndex(userFnd => userFnd._id === pageID);
                user.pending = false;
                user.request = false;
                user.accept = false;
                user.chat = false;
                user[field] = isUpdate;
                if (field === 'accept') {
                    user.chat = true;
                }
                delete user.unfriend;
                cnts[cntIndex] = user;
                return cnts;
            }
            return oldCnts
        }
    
        if (action.pageInfo) {
            if (action.pageInfo.cntType === 'addUser') {
                let updateProfile = changeMode(state.fetchUser, action.pageInfo._id, 'pending', true);
                return updateObject(state, {fetchUser: updateProfile})
            }
        
            if (action.pageInfo.cntType === 'acceptUser') {
                let updateProfile = changeMode(state.fetchUser,  action.pageInfo._id, 'accept', true);
                return updateObject(state, {fetchUser: updateProfile})
            }
        
            if (action.pageInfo.cntType === 'rejUser') {
                let updateProfile = changeMode(state.fetchUser,  action.pageInfo._id, 'request', false);
                return updateObject(state, {fetchUser: updateProfile})
            }
            
            if (action.pageInfo.cntType === 'cancelReq') {
                let updateProfile = changeMode(state.fetchUser,  action.pageInfo._id, 'pending', false);
                return updateObject(state, {fetchUser: updateProfile})
            }
        
            if (action.pageInfo.cntType === 'unfriend') {
                let updateProfile = changeMode(state.fetchUser,  action.pageInfo._id, 'unfriend', false);
                return updateObject(state, {fetchUser: updateProfile})
            }

            if (action.pageInfo.cntType === 'blockUser') {
                let updateProfile = state.fetchUser.filter(cnt => cnt._id !==  action.pageInfo._id);
                return updateObject(state, {fetchUser: updateProfile});
            }
            return updateObject(state, {fetchUser: updatePageCnt(state.fetchUser, action)});
        }
        return updateObject(state, {fetchUser: state.fetchUser});
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
}

const deletePageReset = (state, action) => {
    return updateObject(state, { 
        deletePostError: null, deletePost: null, deleteQuestionError: null, deleteQuestion: null,
        deleteFeedError: null, deleteFeed: null, deleteWriteUpError: null, deleteWriteUp: null,
        deleteCBTError: null, deleteCBT: null
    })
};

const deletePageStart = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {deletePostError: null,  deletePost: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'question') {
        return updateObject(state, {deleteQuestionError: null,  deleteQuestion: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}});
    } else if (action.page === 'feed') {
        return updateObject(state, {deleteFeedError: null,  deleteFeed: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'writeup') {
        return updateObject(state, {deleteWriteUpError: null,  deleteWriteUp: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'cbt') {
        return updateObject(state, {deleteCBTError: null,  deleteCBT: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoomError: {message: action.err}});
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const deletePageFail = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {deletePostError: {message: action.err}, deletePost: null});
    } else if (action.page === 'question') {
        return updateObject(state, {deleteQuestionError: {message: action.err}, deleteQuestion: null});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}});
    } else if (action.page === 'feed') {
        return updateObject(state, {deleteFeedError: {message: action.err}, deleteFeed: null});
    } else if (action.page === 'writeup') {
        return updateObject(state, {deleteWriteUpError: {message: action.err}, deleteWriteUp: null});
    } else if (action.page === 'cbt') {
        return updateObject(state, {deleteCBTError: {message: action.err}, deleteCBT: null});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoomError: {message: action.err}});
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const deletePage = (state, action) => {
    function updatePage (pageID, page) {
        let removePage = page.filter(cnt => cnt._id !== pageID);
        return removePage;
    }
    if (action.page === 'post') {
        return updateObject(state, {deletePost: null, fetchPost: updatePage(action.pageID, state.fetchPost)});
    } else if (action.page === 'question') {
        return updateObject(state, {deleteQuestion: null, fetchQuestion: updatePage(action.pageID, state.fetchQuestion)});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert: action.cnt});
    } else if (action.page === 'feed') {
        return updateObject(state, {deleteFeed: null, fetchFeed: updatePage(action.pageID, state.fetchFeed)});
    } else if (action.page === 'writeup') {
        return updateObject(state, {deleteWriteUp: null, fetchWriteUp: updatePage(action.pageID, state.fetchWriteUp)});
    } else if (action.page === 'cbt') {
        return updateObject(state, {deleteCBT: null, fetchCBT: updatePage(action.pageID, state.fetchCBT)});
    } else if (action.page === 'chatRoom') {
        return updateObject(state, {fetchChatRoom: action.cnt});
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
};

const pageReactionReset = (state, action) => {
    let pageReaction  =  [...state.pageReaction];
    let updatePageReaction = pageReaction.filter(id => id !== action.pageID);
    return updateObject(state, { 
        pageReaction: updatePageReaction, pageReactionError: null
    })
};

const pageReactionStart = (state, action) => {
    let pageReaction = [...state.pageReaction];
    let pageReactionCnt = pageReaction.filter(id => id === action.pageID)[0];
    if (!pageReactionCnt) {
        pageReaction.push(action.pageID)
    }
    return updateObject(state, {pageReaction, pageReactionError: null})
};

const pageReactionFail = (state, action) => {
    let pageReaction  = [...state.pageReaction];
    let updatePageReaction = pageReaction.filter(id => id !== action.pageID);
    return updateObject(state, { 
        pageReaction: updatePageReaction, pageReactionError: action.err
    })
};

const pageReaction = (state, action) => {
    let pageReaction  = [...state.pageReaction];
    let updatePageReaction = pageReaction.filter(id => id !== action.pageID);
    return updateObject(state, { pageReaction: updatePageReaction })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PAGE_FAIL:
            return fetchPageFail(state, action);
        case actionTypes.FETCH_PAGE_START:
            return fetchPageStart(state, action);
        case actionTypes.FETCH_PAGE_RESET:
            return fetchPageReset(state, action);
        case actionTypes.FETCH_PAGE:
            return fetchPage(state, action);
        case actionTypes.PAGE_RESET:
            return pageReset(state, action);
        case actionTypes.UPDATE_PAGE:
            return updatePage(state, action);
        case actionTypes.DELETE_PAGE_FAIL:
            return deletePageFail(state, action);
        case actionTypes.DELETE_PAGE:
            return deletePage(state, action);
        case actionTypes.DELETE_PAGE_RESET:
            return deletePageReset(state, action);
        case actionTypes.DELETE_PAGE_START:
            return deletePageStart(state, action);
        case actionTypes.PAGE_REACTION_START:
            return pageReactionStart(state, action);
        case actionTypes.PAGE_REACTION_FAIL:
            return pageReactionFail(state, action);
        case actionTypes.PAGE_REACTION:
            return pageReaction(state, action);
        case actionTypes.PAGE_REACTION_RESET:
            return pageReactionReset(state, action);
        default: return state
    };
};

export default reducer;