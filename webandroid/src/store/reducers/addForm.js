import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    postSubmitError: null,
    postSubmitted: false,
    postStart: false,
    grouppostSubmitError: null,
    grouppostSubmitted: false,
    grouppostStart: false,
    questionSubmitError: null,
    questionSubmitted: false,
    questionStart: false,
    groupquestionSubmitError: null,
    groupquestionSubmitted: false,
    groupquestionStart: false,
    advertSubmitError: null,
    advertSubmitted: false,
    advertStart: false,
    feedSubmitError: null,
    feedSubmitted: false,
    feedStart: false,
    groupfeedSubmitError: null,
    groupfeedSubmitted: false,
    groupfeedStart: false,
    writeupSubmitError: null,
    writeupSubmitted: false,
    writeupStart: false,
    groupwriteupSubmitError: null,
    groupwriteupSubmitted: false,
    groupwriteupStart: false,
    cbtSubmitError: null,
    cbtSubmitted: false,
    cbtStart: false,
    groupcbtSubmitError: null,
    groupcbtSubmitted: false,
    groupcbtStart: false,
    chatroomSubmitError: null,
    chatroomSubmitted: false,
    chatroomStart: false,
    pageReportSubmitError: null,
    pageReportSubmitted: false,
    pageReportStart: false,
    appErrorSubmitError: null,
    appErrorSubmitted: false,
    appErrorStart: false,
    groupSubmitError: null,
    groupSubmitted: false,
    groupStart: false,
    cntID: null
};

const addFormReset = (state, action) => {
    return updateObject(state, { postSubmitError: null, postSubmitted: false,  postStart: false,
        grouppostSubmitError: null, grouppostSubmitted: false,  grouppostStart: false,
        questionSubmitError: null, questionSubmitted: false,questionStart: false,
        groupquestionSubmitError: null, groupquestionSubmitted: false,groupquestionStart: false,
        advertSubmitError: null, advertSubmitted: false, advertStart: false,
        feedSubmitError: null, feedSubmitted: false,feedStart: false,
        groupfeedSubmitError: null, groupfeedSubmitted: false,groupfeedStart: false,
        writeupSubmitError: null, writeupSubmitted: false, writeupStart: false,
        groupwriteupSubmitError: null, groupwriteupSubmitted: false, groupwriteupStart: false,
        cbtSubmitError: null, cbtSubmitted: false, cbtStart: false,
        groupcbtSubmitError: null, groupcbtSubmitted: false, groupcbtStart: false,
        chatroomSubmitError: null, chatroomSubmitted: false, chatroomStart: false,
        pageReportSubmitError: null, pageReportSubmitted: false, pageReportStart: false,
        appErrorSubmitError: null, appErrorSubmitted: false, appErrorStart: false,
        groupSubmitError: null, groupSubmitted: false, groupStart: false,
        cntID: null})
};

const submitAddFormStart = (state, action) => {
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
    } else if (action.form === 'chatroom') {
        return updateObject(state, {chatroomSubmitError: null, chatroomStart: true})
    } else if (action.form === 'pageReport') {
        return updateObject(state, {pageReportSubmitError: null, pageReportStart: true})
    } else if (action.form === 'appError') {
        return updateObject(state, {appErrorSubmitError: null, appErrorStart: true})
    } else if (action.form === 'group') {
        return updateObject(state, {groupSubmitError: null, groupStart: true})
    } else {
        return updateObject(state, {resetSubmitError: null, resetStart: true})
    }
};

const submitAddFormFail = (state, action) => {
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
    } else if (action.form === 'chatroom') {
        return updateObject(state, {chatroomSubmitError: {message: action.err}, chatroomStart: false})
    } else if (action.form === 'pageReport') {
        return updateObject(state, {pageReportSubmitError: {message: action.err}, pageReportStart: false})
    } else if (action.form === 'appError') {
        return updateObject(state, {appErrorSubmitError: {message: action.err}, appErrorStart: false})
    } else if (action.form === 'group') {
        return updateObject(state, {groupSubmitError: {message: action.err}, groupStart: false})
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};


const addformSubmitted = (state, action) => {
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
        return updateObject(state, {groupwriteupSubmitted: true, writeupStart: false, cntID: action.cntID})
    } else if (action.form === 'cbt') {
        return updateObject(state, {cbtSubmitted: true, cbtStart: false, cntID: action.cntID})
    } else if (action.form === 'groupcbt') {
        return updateObject(state, {groupcbtSubmitted: true, groupcbtStart: false, cntID: action.cntID})
    } else if (action.form === 'chatroom') {
        return updateObject(state, {chatroomSubmitted: true, chatroomStart: false, cntID: action.cntID})
    } else if (action.form === 'pageReport') {
        return updateObject(state, {pageReportSubmitted: true, pageReportStart: false, cntID: action.cntID})
    } else if (action.form === 'appError') {
        return updateObject(state, {appErrorSubmitted: true, appErrorStart: false, cntID: action.cntID})
    } else if (action.form === 'group') {
        return updateObject(state, {groupSubmitted: true, groupStart: false, cntID: action.cntID})
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_ADDFORM_START:
            return submitAddFormStart(state, action);
        case actionTypes.SUBMIT_ADDFORM_FAIL:
            return submitAddFormFail(state, action);
        case actionTypes.ADDFORM_SUBMITTED:
            return addformSubmitted(state, action);
        case actionTypes.ADDFORM_RESET:
            return addFormReset(state, action);
        default: return state
    };
};

export default reducer;