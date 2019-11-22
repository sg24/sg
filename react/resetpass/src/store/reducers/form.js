import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    submitError: null,
    submitted: false,
    start: true,
    tokenExpire: false,
};

const submitFormStart = (state, action) => {
    return updateObject(state, {submitError: null, start: false})
};

const submitFormFail = (state, action) => {
    return updateObject(state, {submitError: {message: action.err}, start: true})
};

const submitTokenExpire = (state, action) => {
    return updateObject(state, {tokenExpire: true})
};

const formSubmitted = (state, action) => {
    return updateObject(state, {submitted: true, start: true})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_FORM_START:
            return submitFormStart(state, action);
        case actionTypes.SUBMIT_FORM_FAIL:
            return submitFormFail(state, action);
        case actionTypes.SUBMIT_TOKEN_EXPIRE:
            return submitTokenExpire(state, action);
        case actionTypes.FORM_SUBMITTED:
            return formSubmitted(state, action);
        default: return state
    };
};

export default reducer;