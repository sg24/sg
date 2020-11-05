import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    postSubmitError: null,
    resetSubmitError: null,
    postSubmitted: false,
    postStart: false,
    resetStart: false,
    cntID: null
};

const addFormReset = (state, action) => {
    return updateObject(state, {resetSubmitted: false, signupSubmitted: false,postSubmitted: false,
        postSubmitError: null, signupSubmitError: null, resetSubmitError: null, 
        postStart: false, signupStart: false, cntID: null})
};

const submitAddFormStart = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {postSubmitError: null, postStart: true})
    }else if (action.form === 'signup') {
        return updateObject(state, {signupSubmitError: null, signupStart: true})
    } else {
        return updateObject(state, {resetSubmitError: null, resetStart: true})
    }
};

const submitAddFormFail = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {postSubmitError: {message: action.err}, postStart: false})
    }else if (action.form === 'signup') {
        return updateObject(state, {signupSubmitError: {message: action.err}, signupStart: false})
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};


const addformSubmitted = (state, action) => {
    if (action.form === 'post') {
        return updateObject(state, {postSubmitted: true, postStart: false, cntID: action.cntID})
    }else if (action.form === 'signup') {
        return updateObject(state, {signupSubmitted: true, signupStart: false})
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