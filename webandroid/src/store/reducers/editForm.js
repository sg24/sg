import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchPostError: null,
    fetchPost: null,
    postSubmitError: null,
    postSubmitted: false,
    postStart: false,
    fetchGroupPostError: null,
    fetchGroupPost: null,
    grouppostSubmitError: null,
    grouppostSubmitted: false,
    grouppostStart: false,
    fetchQuestionError: null,
    fetchQuestion: null,
    questionSubmitError: null,
    questionSubmitted: false,
    questionStart: false,
    fetchGroupQuestionError: null,
    fetchGroupQuestion: null,
    groupquestionSubmitError: null,
    groupquestionSubmitted: false,
    groupquestionStart: false,
    fetchAdvertError: null,
    fetchAdvert: null,
    advertSubmitError: null,
    advertSubmitted: false,
    advertStart: false,
    fetchFeedError: null,
    fetchFeed: null,
    feedSubmitError: null,
    feedSubmitted: false,
    feedStart: false,
    fetchGroupFeedError: null,
    fetchGroupFeed: null,
    groupfeedSubmitError: null,
    groupfeedSubmitted: false,
    groupfeedStart: false,
    fetchWriteupError: null,
    fetchWriteup: null,
    writeupSubmitError: null,
    writeupSubmitted: false,
    writeupStart: false,
    fetchGroupWriteupError: null,
    fetchGroupWriteup: null,
    groupwriteupSubmitError: null,
    groupwriteupSubmitted: false,
    groupwriteupStart: false,
    fetchCbtError: null,
    fetchCbt: null,
    cbtSubmitError: null,
    cbtSubmitted: false,
    cbtStart: false,
    fetchGroupCbtError: null,
    fetchGroupCbt: null,
    groupcbtSubmitError: null,
    groupcbtSubmitted: false,
    groupcbtStart: false,
    fetchChatRoomError: null,
    fetchChatRoom: null,
    chatRoomSubmitError: null,
    chatRoomSubmitted: false,
    chatRoomStart: false,
    fetchGroupError: null,
    fetchGroup: null,
    groupSubmitError: null,
    groupSubmitted: false,
    groupStart: false,
    cntID: null
};

const editFormReset = (state, action) => {
    return updateObject(state, {  
        fetchPostStart: false,fetchPostError: null, fetchPost: null,postSubmitError: null, postSubmitted: false,  postStart: false,
        fetchGroupPostStart: false,fetchGroupPostError: null, fetchGroupPost: null,grouppostSubmitError: null, grouppostSubmitted: false, grouppostStart: false,
        questionSubmitError: null, questionSubmitted: false,questionStart: false,fetchQuestionError: null,fetchQuestion: null,
        groupquestionSubmitError: null, groupquestionSubmitted: false,groupquestionStart: false,fetchGroupQuestionError: null,fetchGroupQuestion: null,
        advertSubmitError: null, advertSubmitted: false, advertStart: false, fetchAdvertError: null,fetchAdvert: null,
        feedSubmitError: null, feedSubmitted: false,feedStart: false, fetchFeedError: null,fetchFeed: null,
        groupfeedSubmitError: null, groupfeedSubmitted: false,groupfeedStart: false, fetchGroupFeedError: null,fetchGroupFeed: null,
        writeupSubmitError: null, writeupSubmitted: false, writeupStart: false, fetchWriteupError: null,fetchWriteup: null,
        groupwriteupSubmitError: null, groupwriteupSubmitted: false, groupwriteupStart: false, fetchGroupWriteupError: null,fetchGroupWriteup: null,
        cbtSubmitError: null, cbtSubmitted: false, cbtStart: false, fetchCbtError: null,fetchCbt: null,
        groupcbtSubmitError: null, groupcbtSubmitted: false, groupcbtStart: false, fetchGroupCbtError: null,fetchGroupCbt: null,
        chatRoomSubmitError: null, chatRoomSubmitted: false, chatRoomStart: false,fetchChatRoomError: null,fetchChatRoom: null,
        groupSubmitError: null, groupSubmitted: false, groupStart: false,fetchGroupError: null,fetchGroup: null,
        cntID: null})
};

const fetchEditFormFail = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {fetchPostError: {message: action.err}});
    } else if (action.form === 'grouppost') {
        return updateObject(state, {fetchGroupPostError: {message: action.err}});
    } else if (action.form === 'question') {
        return updateObject(state, {fetchQuestionError: {message: action.err}});
    }  else if (action.form === 'groupquestion') {
        return updateObject(state, {fetchGroupQuestionError: {message: action.err}});
    } else if (action.form === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}});
    } else if (action.form === 'feed') {
        return updateObject(state, {fetchFeedError: {message: action.err}});
    } else if (action.form === 'groupfeed') {
        return updateObject(state, {fetchGroupFeedError: {message: action.err}});
    } else if (action.form === 'writeup') {
        return updateObject(state, {fetchWriteupError: {message: action.err}});
    } else if (action.form === 'groupwriteup') {
        return updateObject(state, {fetchGroupWriteupError: {message: action.err}});
    } else if (action.form === 'cbt') {
        return updateObject(state, {fetchCbtError: {message: action.err}});
    } else if (action.form === 'groupcbt') {
        return updateObject(state, {fetchGroupCbtError: {message: action.err}});
    } else if (action.form === 'chatRoom') {
        return updateObject(state, {fetchChatRoomError: {message: action.err}});
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const fetchEditForm = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {fetchPost: action.cnt});
    } else if (action.form === 'grouppost') {
        return updateObject(state, {fetchGroupPost: action.cnt});
    } else if (action.form === 'question') {
        return updateObject(state, {fetchQuestion: action.cnt});
    } else if (action.form === 'groupquestion') {
        return updateObject(state, {fetchGroupQuestion: action.cnt});
    } else if (action.form === 'advert') {
        return updateObject(state, {fetchAdvert: action.cnt});
    } else if (action.form === 'feed') {
        return updateObject(state, {fetchFeed: action.cnt});
    } else if (action.form === 'groupfeed') {
        return updateObject(state, {fetchGroupFeed: action.cnt});
    } else if (action.form === 'writeup') {
        return updateObject(state, {fetchWriteup: action.cnt});
    } else if (action.form === 'groupwriteup') {
        return updateObject(state, {fetchGroupWriteup: action.cnt});
    } else if (action.form === 'cbt') {
        return updateObject(state, {fetchCbt: action.cnt});
    } else if (action.form === 'groupcbt') {
        return updateObject(state, {fetchGroupCbt: action.cnt});
    } else if (action.form === 'chatRoom') {
        return updateObject(state, {fetchChatRoom: action.cnt});
    } else if (action.form === 'group') {
        return updateObject(state, {fetchGroup: action.cnt});
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
};

const submitEditFormStart = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {postSubmitError: null, postStart: true})
    } else if (action.form === 'grouppost') {
        return updateObject(state, {grouppostSubmitError: null, grouppostStart: true})
    } else if (action.form === 'question') {
        return updateObject(state, {questionSubmitError: null, questionStart: true})
    } else if (action.form === 'groupquestion') {
        return updateObject(state, {groupquestionSubmitError: null, groupquestionStart: true})
    } else if (action.form === 'advert') {
        return updateObject(state, {advertSubmitError: null, advertStart: true})
    } else if (action.form === 'feed') {
        return updateObject(state, {feedSubmitError: null, feedStart: true})
    } else if (action.form === 'groupfeed') {
        return updateObject(state, {groupfeedSubmitError: null, groupfeedStart: true})
    } else if (action.form === 'writeup') {
        return updateObject(state, {writeupSubmitError: null, writeupStart: true})
    } else if (action.form === 'groupwriteup') {
        return updateObject(state, {groupwriteupSubmitError: null, groupwriteupStart: true})
    } else if (action.form === 'cbt') {
        return updateObject(state, {cbtSubmitError: null, cbtStart: true})
    } else if (action.form === 'groupcbt') {
        return updateObject(state, {groupcbtSubmitError: null, groupcbtStart: true})
    } else if (action.form === 'chatRoom') {
        return updateObject(state, {chatRoomSubmitError: null, chatRoomStart: true})
    } else if (action.form === 'group') {
        return updateObject(state, {groupSubmitError: null, groupStart: true})
    } else {
        return updateObject(state, {resetSubmitError: null, resetStart: true})
    }
};

const submitEditFormFail = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {postSubmitError: {message: action.err}, postStart: false})
    } else if (action.form === 'grouppost') {
        return updateObject(state, {grouppostSubmitError: {message: action.err}, grouppostStart: false})
    } else if (action.form === 'question') {
        return updateObject(state, {questionSubmitError: {message: action.err}, questionStart: false})
    } else if (action.form === 'groupquestion') {
        return updateObject(state, {groupquestionSubmitError: {message: action.err}, groupquestionStart: false})
    } else if (action.form === 'advert') {
        return updateObject(state, {advertSubmitError: {message: action.err}, advertStart: false})
    } else if (action.form === 'feed') {
        return updateObject(state, {feedSubmitError: {message: action.err}, feedStart: false})
    } else if (action.form === 'groupfeed') {
        return updateObject(state, {groupfeedSubmitError: {message: action.err}, groupfeedStart: false})
    } else if (action.form === 'writeup') {
        return updateObject(state, {writeupSubmitError: {message: action.err}, writeupStart: false})
    } else if (action.form === 'groupwriteup') {
        return updateObject(state, {groupwriteupSubmitError: {message: action.err}, groupwriteupStart: false})
    } else if (action.form === 'cbt') {
        return updateObject(state, {cbtSubmitError: {message: action.err}, cbtStart: false})
    } else if (action.form === 'groupcbt') {
        return updateObject(state, {groupcbtSubmitError: {message: action.err}, groupcbtStart: false})
    } else if (action.form === 'chatRoom') {
        return updateObject(state, {chatRoomSubmitError: {message: action.err}, chatRoomStart: false})
    } else if (action.form === 'group') {
        return updateObject(state, {groupSubmitError: {message: action.err}, groupStart: false})
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const editformSubmitted = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {postSubmitted: true, postStart: false, cntID: action.cntID})
    } else if (action.form === 'grouppost') {
        return updateObject(state, {grouppostSubmitted: true, grouppostStart: false, cntID: action.cntID})
    } else if (action.form === 'question') {
        return updateObject(state, {questionSubmitted: true, questionStart: false, cntID: action.cntID})
    } else if (action.form === 'groupquestion') {
        return updateObject(state, {groupquestionSubmitted: true, groupquestionStart: false, cntID: action.cntID})
    } else if (action.form === 'advert') {
        return updateObject(state, {advertSubmitted: true, advertStart: false, cntID: action.cntID})
    } else if (action.form === 'feed') {
        return updateObject(state, {feedSubmitted: true, feedStart: false, cntID: action.cntID})
    } else if (action.form === 'groupfeed') {
        return updateObject(state, {groupfeedSubmitted: true, groupfeedStart: false, cntID: action.cntID})
    } else if (action.form === 'writeup') {
        return updateObject(state, {writeupSubmitted: true, writeupStart: false, cntID: action.cntID})
    } else if (action.form === 'groupwriteup') {
        return updateObject(state, {groupwriteupSubmitted: true, groupwriteupStart: false, cntID: action.cntID})
    } else if (action.form === 'cbt') {
        return updateObject(state, {cbtSubmitted: true, cbtStart: false, cntID: action.cntID})
    } else if (action.form === 'groupcbt') {
        return updateObject(state, {groupcbtSubmitted: true, groupcbtStart: false, cntID: action.cntID})
    } else if (action.form === 'chatRoom') {
        return updateObject(state, {chatRoomSubmitted: true, chatRoomStart: false, cntID: action.cntID})
    } else if (action.form === 'group') {
        return updateObject(state, {groupSubmitted: true, groupStart: false, cntID: action.cntID})
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_EDITFORM_FAIL:
            return fetchEditFormFail(state, action);
        case actionTypes.FETCH_EDITFORM:
            return fetchEditForm(state, action);
        case actionTypes.SUBMIT_EDITFORM_START:
            return submitEditFormStart(state, action);
        case actionTypes.SUBMIT_EDITFORM_FAIL:
            return submitEditFormFail(state, action);
        case actionTypes.EDITFORM_SUBMITTED:
            return editformSubmitted(state, action);
        case actionTypes.EDITFORM_RESET:
            return editFormReset(state, action);
        default: return state
    };
};

export default reducer;