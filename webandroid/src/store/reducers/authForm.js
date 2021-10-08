import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    signinSubmitError: null,
    signupSubmitError: null,
    resetSubmitError: null,
    resetpassSubmitError: null,
    signinSubmitted: false,
    signupSubmitted: false,
    resetSubmitted: false,
    resetpassSubmitted: false,
    signinStart: false,
    signupStart: false,
    resetStart: false,
    resetpassStart: false,
    resetPassword: null
};

const authFormReset = (state, action) => {
    return updateObject(state, {resetSubmitted: false, resetpassSubmitted: false, signupSubmitted: false,signinSubmitted: false,
        signinSubmitError: null, signupSubmitError: null, resetSubmitError: null, resetpassSubmitError: null, 
        signinStart: false, signupStart: false, resetStart: false, resetpassStart: false})
};

const submitAuthFormStart = (state, action) => {
    if (action.form === 'signin') {
        return updateObject(state, {signinSubmitError: null, signinStart: true})
    }else if (action.form === 'signup') {
        return updateObject(state, {signupSubmitError: null, signupStart: true})
    } else if (action.form === 'resetpass') {
        return updateObject(state, {resetpassSubmitError: null, resetpassStart: true})
    } else {
        return updateObject(state, {resetSubmitError: null, resetStart: true})
    }
};

const submitAuthFormFail = (state, action) => {
    if (action.form === 'signin') {
        return updateObject(state, {signinSubmitError: {message: action.err}, signinStart: false})
    }else if (action.form === 'signup') {
        return updateObject(state, {signupSubmitError: {message: action.err}, signupStart: false})
    } else if (action.form === 'resetpass') { 
        return updateObject(state, {resetpassSubmitError: {message: action.err}, resetpassStart: false})
    } else {
        return updateObject(state, {resetSubmitError: {message: action.err}, resetStart: false})
    }
};


const authformSubmitted = (state, action) => {
    if (action.form === 'signin') {
        return updateObject(state, {signinSubmitted: true, signinStart: false})
    }else if (action.form === 'signup') {
        return updateObject(state, {signupSubmitted: true, signupStart: false})
    }else if (action.form === 'resetpass') {
        return updateObject(state, {resetpassSubmitted: true, resetpassStart: false})
    } else {
        return updateObject(state, {resetSubmitted: true, resetStart: false})
    }
};

const resetPasswordStart = (state, action) => {
    return updateObject(state, {resetPassword: action.cnt})
};

const resetPasswordClose = (state, action) => {
    return updateObject(state, {resetPassword: null})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_AUTHFORM_START:
            return submitAuthFormStart(state, action);
        case actionTypes.SUBMIT_AUTHFORM_FAIL:
            return submitAuthFormFail(state, action);
        case actionTypes.AUTHFORM_SUBMITTED:
            return authformSubmitted(state, action);
        case actionTypes.AUTHFORM_RESET:
            return authFormReset(state, action);
        case actionTypes.RESET_PASSWORD_START:
            return resetPasswordStart(state, action);
        case actionTypes.RESET_PASSWORD_CLOSE:
            return resetPasswordClose(state, action);
        default: return state
    };
};

export default reducer;