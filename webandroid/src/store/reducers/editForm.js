import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchPostError: null,
    fetchPost: null,
    postSubmitError: null,
    postSubmitted: false,
    postStart: false,
    fetchQuestionError: null,
    fetchQuestion: null,
    questionSubmitError: null,
    questionSubmitted: false,
    questionStart: false,
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
    fetchWriteupError: null,
    fetchWriteup: null,
    writeupSubmitError: null,
    writeupSubmitted: false,
    writeupStart: false,
    fetchCbtError: null,
    fetchCbt: null,
    cbtSubmitError: null,
    cbtSubmitted: false,
    cbtStart: false,
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
        questionSubmitError: null, questionSubmitted: false,questionStart: false,fetchQuestionError: null,fetchQuestion: null,
        advertSubmitError: null, advertSubmitted: false, advertStart: false, fetchAdvertError: null,fetchAdvert: null,
        feedSubmitError: null, feedSubmitted: false,feedStart: false, fetchFeedError: null,fetchFeed: null,
        writeupSubmitError: null, writeupSubmitted: false, writeupStart: false, fetchWriteupError: null,fetchWriteup: null,
        cbtSubmitError: null, cbtSubmitted: false, cbtStart: false, fetchCbtError: null,fetchCbt: null,
        chatRoomSubmitError: null, chatRoomSubmitted: false, chatRoomStart: false,fetchChatRoomError: null,fetchChatRoom: null,
        groupSubmitError: null, groupSubmitted: false, groupStart: false,fetchGroupError: null,fetchGroup: null,
        cntID: null})
};

const fetchEditFormFail = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {fetchPostError: {message: action.err}});
    } else if (action.form === 'question') {
        return updateObject(state, {fetchQuestionError: {message: action.err}});
    } else if (action.form === 'advert') {
        return updateObject(state, {fetchAdvertError: {message: action.err}});
    } else if (action.form === 'feed') {
        return updateObject(state, {fetchFeedError: {message: action.err}});
    } else if (action.form === 'writeup') {
        return updateObject(state, {fetchWriteupError: {message: action.err}});
    } else if (action.form === 'cbt') {
        return updateObject(state, {fetchCbtError: {message: action.err}});
    } else if (action.form === 'chatRoom') {
        return updateObject(state, {fetchChatRoomError: {message: action.err}});
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};

const fetchEditForm = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {fetchPost: action.cnt});
    } else if (action.form === 'question') {
        return updateObject(state, {fetchQuestion: action.cnt});
    } else if (action.form === 'advert') {
        return updateObject(state, {fetchAdvert: action.cnt});
    } else if (action.form === 'feed') {
        return updateObject(state, {fetchFeed: action.cnt});
    } else if (action.form === 'writeup') {
        return updateObject(state, {fetchWriteup: action.cnt});
    } else if (action.form === 'cbt') {
        return updateObject(state, {fetchCbt: action.cnt});
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
    } else if (action.form === 'question') {
        return updateObject(state, {questionSubmitError: null, questionStart: true})
    } else if (action.form === 'advert') {
        return updateObject(state, {advertSubmitError: null, advertStart: true})
    } else if (action.form === 'feed') {
        return updateObject(state, {feedSubmitError: null, feedStart: true})
    } else if (action.form === 'writeup') {
        return updateObject(state, {writeupSubmitError: null, writeupStart: true})
    } else if (action.form === 'cbt') {
        return updateObject(state, {cbtSubmitError: null, cbtStart: true})
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
    } else if (action.form === 'question') {
        return updateObject(state, {questionSubmitError: {message: action.err}, questionStart: false})
    } else if (action.form === 'advert') {
        return updateObject(state, {advertSubmitError: {message: action.err}, advertStart: false})
    } else if (action.form === 'feed') {
        return updateObject(state, {feedSubmitError: {message: action.err}, feedStart: false})
    } else if (action.form === 'writeup') {
        return updateObject(state, {writeupSubmitError: {message: action.err}, writeupStart: false})
    } else if (action.form === 'cbt') {
        return updateObject(state, {cbtSubmitError: {message: action.err}, cbtStart: false})
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
    } else if (action.form === 'question') {
        return updateObject(state, {questionSubmitted: true, questionStart: false, cntID: action.cntID})
    } else if (action.form === 'advert') {
        return updateObject(state, {advertSubmitted: true, advertStart: false, cntID: action.cntID})
    } else if (action.form === 'feed') {
        return updateObject(state, {feedSubmitted: true, feedStart: false, cntID: action.cntID})
    } else if (action.form === 'writeup') {
        return updateObject(state, {writeupSubmitted: true, writeupStart: false, cntID: action.cntID})
    } else if (action.form === 'cbt') {
        return updateObject(state, {cbtSubmitted: true, cbtStart: false, cntID: action.cntID})
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