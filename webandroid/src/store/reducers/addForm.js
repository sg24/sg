import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    postSubmitError: null,
    postSubmitted: false,
    postStart: false,
    questionSubmitError: null,
    questionSubmitted: false,
    questionStart: false,
    advertSubmitError: null,
    advertSubmitted: false,
    advertStart: false,
    feedSubmitError: null,
    feedSubmitted: false,
    feedStart: false,
    writeupSubmitError: null,
    writeupSubmitted: false,
    writeupStart: false,
    cbtSubmitError: null,
    cbtSubmitted: false,
    cbtStart: false,
    cntID: null
};

const addFormReset = (state, action) => {
    return updateObject(state, { postSubmitError: null, postSubmitted: false,  postStart: false,
        questionSubmitError: null, questionSubmitted: false,questionStart: false,
        advertSubmitError: null, advertSubmitted: false, advertStart: false,
        feedSubmitError: null, feedSubmitted: false,feedStart: false,
        writeupSubmitError: null, writeupSubmitted: false, writeupStart: false,
        cbtSubmitError: null, cbtSubmitted: false, cbtStart: false,
        cntID: null})
};

const submitAddFormStart = (state, action) => {
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
    } else {
        return updateObject(state, {resetSubmitError: null, resetStart: true})
    }
};

const submitAddFormFail = (state, action) => {
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
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};


const addformSubmitted = (state, action) => {
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