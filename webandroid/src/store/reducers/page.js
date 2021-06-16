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
    fetchGroupPostError: null,
    fetchGroupPostStart: false,
    fetchGroupPost: null,
    deleteGroupPostError: null,
    deleteGroupPost: null,
    fetchQuestionError: null,
    fetchQuestion: null,
    fetchQuestionStart: false,
    deleteQuestionError: null,
    deleteQuestion: null,
    fetchGroupQuestionError: null,
    fetchGroupQuestion: null,
    fetchGroupQuestionStart: false,
    deleteGroupQuestionError: null,
    deleteGroupQuestion: null,
    fetchFeedError: null,
    fetchFeedStart: false,
    fetchFeed: null,
    deleteFeedError: null,
    deleteFeed: null,
    fetchGroupFeedError: null,
    fetchGroupFeedStart: false,
    fetchGroupFeed: null,
    deleteGroupFeedError: null,
    deleteGroupFeed: null,
    fetchWriteUpError: null,
    fetchWriteUpStart: false,
    fetchWriteUp: null,
    deleteWriteUpError: null,
    deleteWriteUp: null,
    fetchGroupWriteUpError: null,
    fetchGroupWriteUpStart: false,
    fetchGroupWriteUp: null,
    deleteGroupWriteUpError: null,
    deleteGroupWriteUp: null,
    fetchCBTError: null,
    fetchCBTStart: false,
    fetchCBT: null,
    deleteCBTError: null,
    deleteCBT: null,
    fetchGroupCBTError: null,
    fetchGroupCBTStart: false,
    fetchGroupCBT: null,
    deleteGroupCBTError: null,
    deleteGroupCBT: null,
    fetchExamError: null,
    fetchExamStart: false,
    fetchExam: null,
    fetchGroupError: null,
    fetchGroupStart: false,
    fetchGroup: null,
    deleteGroupError: null,
    deleteGroup: null,
    fetchGroupPreviewError: null,
    fetchGroupPreviewStart: false,
    fetchGroupPreview: null,
    fetchChatRoomError: null,
    fetchChatRoomStart: false,
    fetchChatRoom: null,
    deleteChatRoomError: null,
    deleteChatRoom: null,
    fetchAdvertError: null,
    fetchAdvertStart: false,
    fetchAdvert: null,
    deleteAdvertError: null,
    deleteAdvert: null,
    fetchUserError: null,
    fetchUserStart: false,
    fetchUser: null,
    pageReaction: [],
    pageReactionError: false,
    tabPage: false
};

const pageReset = (state, action) => {
    return updateObject(state, {
        page: null,
        fetchPostError: null,fetchPost: null, fetchPostStart: false, deletePostError: null, deletePost: null,
        fetchGroupPostError: null,fetchGroupPost: null, fetchGroupPostStart: false, deleteGroupPostError: null, deleteGroupPost: null,
        fetchFavoritePostError: null,fetchFavoritePost: null, fetchFavoritePostStart: false, deleteFavoritePostError: null, deleteFavoritePost: null,
        fetchQuestionError: null,fetchQuestion: null, fetchQuestionStart: false, deleteQuestionError: null, deleteQuestion: null,
        fetchGroupQuestionError: null,fetchGroupQuestion: null, fetchGroupQuestionStart: false, deleteGroupQuestionError: null, deleteGroupQuestion: null,
        fetchFeedError: null,fetchFeedStart: false,fetchFeed: null,deleteFeedError: null,deleteFeed: null,
        fetchGroupFeedError: null,fetchGroupFeedStart: false,fetchGroupFeed: null,deleteGroupFeedError: null,deleteGroupFeed: null,
        fetchWriteUpError: null,fetchWriteUpStart: false,fetchWriteUp: null,deleteWriteUpError: null,deleteWriteUp: null,
        fetchGroupWriteUpError: null,fetchGroupWriteUpStart: false,fetchGroupWriteUp: null,deleteGroupWriteUpError: null,deleteGroupWriteUp: null,
        fetchCBTError: null,fetchCBTStart: false,fetchCBT: null,deleteCBTError: null,deleteCBT: null,
        fetchGroupCBTError: null,fetchGroupCBTStart: false,fetchGroupCBT: null,deleteGroupCBTError: null,deleteGroupCBT: null,
        fetchExamError: null,fetchExamStart: false,fetchExam: null,
        fetchGroupError: null,fetchGroupStart: false,fetchGroup: null,deleteGroupError: null,deleteGroup: null,
        fetchGroupPreviewError: null,fetchGroupPreviewStart: false,fetchGroupPreview: null,
        fetchChatRoomError: null,fetchChatRoomStart: false,fetchChatRoom: null,deleteChatRoomError: null,deleteChatRoom: null,
        fetchAdvertError: null,fetchAdvertStart: false,fetchAdvert: null,deleteAdvertError: null,deleteAdvert: null,
        fetchUserError: null,fetchUserStart: false,fetchUser: null,
        pageReaction: [],pageReactionError: false
    })
};

const fetchPageFail = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {fetchPostError: {message: action.err}, fetchPostStart: false});
    } else if (action.page === 'grouppost') {
        return updateObject(state, {fetchGroupPostError: {message: action.err}, fetchGroupPostStart: false});
    } else if (action.page === 'favoritepost') {
        return updateObject(state, {fetchFavoritePostError: {message: action.err}, fetchFavoritePostStart: false});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestionError: {message: action.err}, fetchQuestionStart: false});
    } else if (action.page === 'groupquestion') {
        return updateObject(state, {fetchGroupQuestionError: {message: action.err}, fetchGroupQuestionStart: false});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}, fetchAdvertStart: false});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeedError: {message: action.err}, fetchFeedStart: false});
    } else if (action.page === 'groupfeed') {
        return updateObject(state, {fetchGroupFeedError: {message: action.err}, fetchGroupFeedStart: false});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteUpError: {message: action.err}, fetchWriteUpStart: false});
    } else if (action.page === 'groupwriteup') {
        return updateObject(state, {fetchGroupWriteUpError: {message: action.err}, fetchGroupWriteUpStart: false});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCBTError: {message: action.err}, fetchCBTStart: false});
    } else if (action.page === 'groupcbt') {
        return updateObject(state, {fetchGroupCBTError: {message: action.err}, fetchGroupCBTStart: false});
    } else if (action.page === 'exam') {
        return updateObject(state, {fetchExamError: {message: action.err}, fetchExamStart: false});
    } else if (action.page === 'group') {
        return updateObject(state, {fetchGroupError: {message: action.err}, fetchGroupStart: false});
    } else if (action.page === 'groupPreview') {
        return updateObject(state, {fetchGroupPreviewError: {message: action.err}, fetchGroupPreviewStart: false});
    } else if (action.page === 'chatroom') {
        return updateObject(state, {fetchChatRoomError: {message: action.err}, fetchChatRoomStart: false});
    } else if (action.page === 'users') {
        return updateObject(state, {fetchUserError: {message: action.err}, fetchUserStart: false});
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const fetchPageStart = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {fetchPostError: null, fetchPost: action.start === 0 ? null : state.fetchPost, fetchPostStart: true});
    } else if (action.page === 'grouppost') {
        return updateObject(state, {fetchGroupPostError: null, fetchGroupPost: action.start === 0 ? null : state.fetchGroupPost, fetchGroupPostStart: true });
    } else if (action.page === 'favoritepost') {
        return updateObject(state, {fetchFavoritePostError: null, fetchFavoritePost: action.start === 0 ? null : state.fetchFavoritePost, fetchFavoritePostStart: true });
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestionError: null, fetchQuestion: action.start === 0 ? null : state.fetchQuestion, fetchQuestionStart: true });
    } else if (action.page === 'groupquestion') {
        return updateObject(state, {fetchGroupQuestionError: null, fetchGroupQuestion: action.start === 0 ? null : state.fetchGroupQuestion, fetchGroupQuestionStart: true });
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvertError: null, fetchAdvert: action.start === 0 ? null : state.fetchAdvert, fetchAdvertStart: true});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeedError: null, fetchFeed: action.start === 0 ? null : state.fetchFeed, fetchFeedStart: true });
    } else if (action.page === 'groupfeed') {
        return updateObject(state, {fetchGroupFeedError: null, fetchGroupFeed: action.start === 0 ? null : state.fetchGroupFeed, fetchGroupFeedStart: true });
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteUpError: null, fetchWriteUp: action.start === 0 ? null : state.fetchWriteUp, fetchWriteUpStart: true });
    } else if (action.page === 'groupwriteup') {
        return updateObject(state, {fetchGroupWriteUpError: null, fetchGroupWriteUp: action.start === 0 ? null : state.fetchGroupWriteUp, fetchGroupWriteUpStart: true });
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCBTError: null, fetchCBT: action.start === 0 ? null : state.fetchCBT, fetchCBTStart: true });
    } else if (action.page === 'groupcbt') {
        return updateObject(state, {fetchGroupCBTError: null, fetchGroupCBT: action.start === 0 ? null : state.fetchGroupCBT, fetchGroupCBTStart: true });
    } else if (action.page === 'group') {
        return updateObject(state, {fetchGroupError: null, fetchGroup: action.start === 0 ? null : state.fetchGroup, fetchGroupStart: true });
    } else if (action.page === 'groupPreview') {
        return updateObject(state, {fetchGroupPreviewError: null, fetchGroupPreview: action.start === 0 ? null : state.fetchGroupPreview, fetchGroupPreviewStart: true });
    } else if (action.page === 'exam') {
        return updateObject(state, {fetchExamError: null, fetchExam: action.start === 0 ? null : state.fetchExam, fetchExamStart: true });
    } else if (action.page === 'chatroom') {
        return updateObject(state, {fetchChatRoomError: null, fetchChatRoom: action.start === 0 ? null : state.fetchChatRoom, fetchChatRoomStart: true });
    } else if (action.page === 'users') {
        return updateObject(state, {fetchUserError: null, fetchUser: action.start === 0 ? null : state.fetchUser, fetchUserStart: true });
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const fetchPageReset = (state, action) => {
    return updateObject(state, {fetchPostError: null, fetchPostStart: false, fetchGroupPostError: null, fetchGroupPostStart: false,
        fetchFavoritePostError: null, fetchFavoritePostStart: false, fetchUserError: null, fetchUserStart: false,
        fetchQuestionError: null, fetchQuestionStart: false, fetchGroupQuestionError: null, fetchGroupQuestionStart: false, 
        fetchFeedError: null, fetchFeedStart: false, fetchGroupFeedError: null, fetchGroupFeedStart: false,
        fetchWriteUpError: null, fetchWriteUpStart: false, fetchGroupWriteUpError: null, fetchGroupWriteUpStart: false,
        fetchCBTError: null, fetchCBTStart: false, fetchGroupCBTError: null, fetchGroupCBTStart: false, 
        fetchExamError: null, fetchExamStart: false, fetchGroupError: null, fetchGroupStart: false,
        fetchGroupPreviewError: null, fetchGroupPreviewStart: false , fetchChatRoomError: null, fetchChatRoomStart: false,
        fetchAdvertError: null, fetchAdvertStart: false});
};

const fetchPage = (state, action) => {
    function updatePage(page, action) {
        let updatePageCnt = page && action.start !== 0 ? [...page] : [];
        updatePageCnt.push(...action.cnt.page);
        return updatePageCnt;
    }
    if (action.page === 'post') {
        return updateObject(state, {fetchPost: updatePage(state.fetchPost, action), page: action.page, loadMore: action.cnt.loadMore, fetchPostStart: false, tabPage: action.cnt.tabPage});
    } else if (action.page === 'grouppost') {
        return updateObject(state, {fetchGroupPost: updatePage(state.fetchGroupPost, action), page: action.page, loadMore: action.cnt.loadMore, fetchGroupPostStart: false});
    } else if (action.page === 'favoritepost') {
        return updateObject(state, {fetchFavoritePost: updatePage(state.fetchFavoritePost, action), page: action.page, loadMore: action.cnt.loadMore, fetchFavoritePostStart: false});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestion: updatePage(state.fetchQuestion, action), page: action.page, loadMore: action.cnt.loadMore, fetchQuestionStart: false, tabPage: action.cnt.tabPage});
    } else if (action.page === 'groupquestion') {
        return updateObject(state, {fetchGroupQuestion: updatePage(state.fetchGroupQuestion, action), page: action.page, loadMore: action.cnt.loadMore, fetchGroupQuestionStart: false});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert: updatePage(state.fetchAdvert, action), page: action.page, loadMore: action.cnt.loadMore, fetchAdvertStart: false, tabPage: action.cnt.tabPage});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeed: updatePage(state.fetchFeed, action), page: action.page, loadMore: action.cnt.loadMore, fetchFeedStart: false, tabPage: action.cnt.tabPage});
    } else if (action.page === 'groupfeed') {
        return updateObject(state, {fetchGroupFeed: updatePage(state.fetchGroupFeed, action), page: action.page, loadMore: action.cnt.loadMore, fetchGroupFeedStart: false});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteUp: updatePage(state.fetchWriteUp, action), page: action.page, loadMore: action.cnt.loadMore, fetchWriteUpStart: false, tabPage: action.cnt.tabPage});
    } else if (action.page === 'groupwriteup') {
        return updateObject(state, {fetchGroupWriteUp: updatePage(state.fetchGroupWriteUp, action), page: action.page, loadMore: action.cnt.loadMore, fetchGroupWriteUpStart: false});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCBT: updatePage(state.fetchCBT, action), page: action.page, loadMore: action.cnt.loadMore, fetchCBTStart: false, tabPage: action.cnt.tabPage});
    } else if (action.page === 'groupcbt') {
        return updateObject(state, {fetchGroupCBT: updatePage(state.fetchGroupCBT, action), page: action.page, loadMore: action.cnt.loadMore, fetchGroupCBTStart: false});
    } else if (action.page === 'exam') {
        return updateObject(state, {fetchExam: updatePage(state.fetchExam, action), page: action.page, loadMore: action.cnt.loadMore, fetchExamStart: false});
    } else if (action.page === 'group') {
        return updateObject(state, {fetchGroup: updatePage(state.fetchGroup, action), page: action.page, loadMore: action.cnt.loadMore, fetchGroupStart: false, tabPage: action.cnt.tabPage});
    } else if (action.page === 'groupPreview') {
        return updateObject(state, {fetchGroupPreview: updatePage(state.fetchGroupPreview, action), page: action.page, loadMore: action.cnt.loadMore, fetchGroupPreviewStart: false});
    } else if (action.page === 'chatroom') {
        return updateObject(state, {fetchChatRoom: updatePage(state.fetchChatRoom, action), page: action.page, loadMore: action.cnt.loadMore, fetchChatRoomStart: false});
    } else if (action.page === 'users') {
        return updateObject(state, {fetchUser: updatePage(state.fetchUser, action), page: action.page, loadMore: action.cnt.loadMore, fetchUserStart: false});
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
};

const updatePage = (state, action) => {
    function updatePageCnt (page, action) {
        if (page) {
            let pageCnt = page.filter(page => page._id === action.pageInfo._id)[0];
            let pageCntIndex = page.findIndex(page => page._id === action.pageInfo._id);
            if (pageCnt) {
                for (let cnt in action.pageInfo) {
                    pageCnt[cnt] =  action.pageInfo[cnt];
                }
            }
            page[pageCntIndex] =  pageCnt;
        }
        return page;
    }
    if (action.page === 'post') {
        return updateObject(state, {fetchPost: updatePageCnt(state.fetchPost, action)});
    } else if (action.page === 'grouppost') {
        return updateObject(state, {fetchGroupPost: updatePageCnt(state.fetchGroupPost, action)});
    } else if (action.page === 'favoritepost') {
        return updateObject(state, {fetchFavoritePost: updatePageCnt(state.fetchFavoritePost, action)});
    } else if (action.page === 'question') {
        return updateObject(state, {fetchQuestion: updatePageCnt(state.fetchQuestion, action)});
    } else if (action.page === 'groupquestion') {
        return updateObject(state, {fetchGroupQuestion: updatePageCnt(state.fetchGroupQuestion, action)});
    } else if (action.page === 'advert') {
        return updateObject(state, {fetchAdvert: updatePageCnt(state.fetchAdvert, action)});
    } else if (action.page === 'feed') {
        return updateObject(state, {fetchFeed: updatePageCnt(state.fetchFeed, action)});
    } else if (action.page === 'groupfeed') {
        return updateObject(state, {fetchGroupFeed: updatePageCnt(state.fetchGroupFeed, action)});
    } else if (action.page === 'writeup') {
        return updateObject(state, {fetchWriteUp: updatePageCnt(state.fetchWriteUp, action)});
    } else if (action.page === 'groupwriteup') {
        return updateObject(state, {fetchGroupWriteUp: updatePageCnt(state.fetchGroupWriteUp, action)});
    } else if (action.page === 'cbt') {
        return updateObject(state, {fetchCBT: updatePageCnt(state.fetchCBT, action)});
    } else if (action.page === 'groupcbt') {
        return updateObject(state, {fetchGroupCBT: updatePageCnt(state.fetchGroupCBT, action)});
    } else if (action.page === 'exam') {
        return updateObject(state, {fetchExam: updatePageCnt(state.fetchExam, action)});
    } else if (action.page === 'group') {
        return updateObject(state, {fetchGroup: updatePageCnt(state.fetchGroup, action)});
    } else if (action.page === 'groupPreview') {
        return updateObject(state, {fetchGroupPreview: updatePageCnt(state.fetchGroupPreview, action)});
    } else if (action.page === 'chatroom') {
        return updateObject(state, {fetchChatRoom: updatePageCnt(state.fetchChatRoom, action)});
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
        deletePostError: null, deletePost: null,  deleteGroupPostError: null, deleteGroupPost: null,
        deleteFavoritePostError: null, deleteFavoritePost: null, deleteQuestionError: null, deleteQuestion: null,
        deleteGroupQuestionError: null, deleteGroupQuestion: null,
        deleteFeedError: null, deleteFeed: null, deleteGroupFeedError: null, deleteGroupFeed: null,
        deleteWriteUpError: null, deleteWriteUp: null,deleteGroupWriteUpError: null, deleteGroupWriteUp: null,
        deleteCBTError: null, deleteCBT: null, deleteGroupCBTError: null, deleteGroupCBT: null,
        deleteGroupError: null, deleteGroup: null, deleteChatRoomError: null, deleteChatRoom: null,
        deleteAdvertError: null, deleteAdvert: null
    })
};

const deletePageStart = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {deletePostError: null,  deletePost: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'grouppost') {
        return updateObject(state, {deleteGroupPostError: null,  deleteGroupPost: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'favoritepost') {
        return updateObject(state, {deleteFavoritePostError: null,  deleteFavoritePost: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'question') {
        return updateObject(state, {deleteQuestionError: null,  deleteQuestion: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'groupquestion') {
        return updateObject(state, {deleteGroupQuestionError: null,  deleteGroupQuestion: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'advert') {
        return updateObject(state, {deleteAdvertError: null,  deleteAdvert: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'feed') {
        return updateObject(state, {deleteFeedError: null,  deleteFeed: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'groupfeed') {
        return updateObject(state, {deleteGroupFeedError: null,  deleteGroupFeed: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'writeup') {
        return updateObject(state, {deleteWriteUpError: null,  deleteWriteUp: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'groupwriteup') {
        return updateObject(state, {deleteGroupWriteUpError: null,  deleteGroupWriteUp: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'cbt') {
        return updateObject(state, {deleteCBTError: null,  deleteCBT: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'groupcbt') {
        return updateObject(state, {deleteGroupCBTError: null,  deleteGroupCBT: {pageID: action.pageID, page: action.page, start: action.start}});
    } else if (action.page === 'group') {
        return updateObject(state, {deleteGroupError: null,  deleteGroup: {pageID: action.pageID, page: action.page, start: action.start}});
    }  else if (action.page === 'chatroom') {
        return updateObject(state, {deleteChatRoomError: null,  deleteChatRoom: {pageID: action.pageID, page: action.page, start: action.start}});
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const deletePageFail = (state, action) => {
    if (action.page === 'post') {
        return updateObject(state, {deletePostError: {message: action.err}, deletePost: null});
    } else if (action.page === 'grouppost') {
        return updateObject(state, {deleteGroupPostError: {message: action.err}, deleteGroupPost: null});
    } else if (action.page === 'favoritepost') {
        return updateObject(state, {deleteFavoritePostError: {message: action.err}, deleteFavoritePost: null});
    } else if (action.page === 'question') {
        return updateObject(state, {deleteQuestionError: {message: action.err}, deleteQuestion: null});
    } else if (action.page === 'groupquestion') {
        return updateObject(state, {deleteGroupQuestionError: {message: action.err}, deleteGroupQuestion: null});
    } else if (action.page === 'advert') {
        return updateObject(state, {deleteAdvertError: {message: action.err}, deleteAdvert: null});
    } else if (action.page === 'feed') {
        return updateObject(state, {deleteFeedError: {message: action.err}, deleteFeed: null});
    } else if (action.page === 'groupfeed') {
        return updateObject(state, {deleteGroupFeedError: {message: action.err}, deleteGroupFeed: null});
    } else if (action.page === 'writeup') {
        return updateObject(state, {deleteWriteUpError: {message: action.err}, deleteWriteUp: null});
    } else if (action.page === 'groupwriteup') {
        return updateObject(state, {deleteGroupWriteUpError: {message: action.err}, deleteGroupWriteUp: null});
    } else if (action.page === 'cbt') {
        return updateObject(state, {deleteCBTError: {message: action.err}, deleteCBT: null});
    } else if (action.page === 'groupcbt') {
        return updateObject(state, {deleteGroupCBTError: {message: action.err}, deleteGroupCBT: null});
    } else if (action.page === 'group') {
        return updateObject(state, {deleteGroupError: {message: action.err}, deleteGroup: null});
    } else if (action.page === 'chatroom') {
        return updateObject(state, {deleteChatRoomError: {message: action.err}, deleteChatRoom: null});
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
    } else if (action.page === 'grouppost') {
        return updateObject(state, {deleteGroupPost: null, fetchGroupPost: updatePage(action.pageID, state.fetchGroupPost)});
    } else if (action.page === 'favoritepost') {
        return updateObject(state, {deleteFavoritePost: null, fetchFavoritePost: updatePage(action.pageID, state.fetchFavoritePost)});
    } else if (action.page === 'question') {
        return updateObject(state, {deleteQuestion: null, fetchQuestion: updatePage(action.pageID, state.fetchQuestion)});
    } else if (action.page === 'groupquestion') {
        return updateObject(state, {deleteGroupQuestion: null, fetchGroupQuestion: updatePage(action.pageID, state.fetchGroupQuestion)});
    } else if (action.page === 'advert') {
        return updateObject(state, {deleteAdvert: null, fetchAdvert: updatePage(action.pageID, state.fetchAdvert)});
    } else if (action.page === 'feed') {
        return updateObject(state, {deleteFeed: null, fetchFeed: updatePage(action.pageID, state.fetchFeed)});
    } else if (action.page === 'groupfeed') {
        return updateObject(state, {deleteGroupFeed: null, fetchGroupFeed: updatePage(action.pageID, state.fetchGroupFeed)});
    } else if (action.page === 'writeup') {
        return updateObject(state, {deleteWriteUp: null, fetchWriteUp: updatePage(action.pageID, state.fetchWriteUp)});
    } else if (action.page === 'groupwriteup') {
        return updateObject(state, {deleteGroupWriteUp: null, fetchGroupWriteUp: updatePage(action.pageID, state.fetchGroupWriteUp)});
    } else if (action.page === 'cbt') {
        return updateObject(state, {deleteCBT: null, fetchCBT: updatePage(action.pageID, state.fetchCBT)});
    } else if (action.page === 'groupcbt') {
        return updateObject(state, {deleteGroupCBT: null, fetchGroupCBT: updatePage(action.pageID, state.fetchGroupCBT)});
    } else if (action.page === 'group') {
        return updateObject(state, {deleteGroup: null, fetchGroup: updatePage(action.pageID, state.fetchGroup)});
    } else if (action.page === 'chatroom') {
        return updateObject(state, {deleteChatRoom: null, fetchChatRoom: updatePage(action.pageID, state.fetchChatRoom)});
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