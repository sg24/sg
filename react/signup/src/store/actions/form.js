import * as actionTypes from './actionTypes';

export const submitFormInit = (formData) => {
    return {
        type: actionTypes.SUBMIT_FORM_INIT,
        formData
    };
};

export const submitFormFail = (err) => {
    return {
        type: actionTypes.SUBMIT_FORM_FAIL,
        err
    };
};


export const submitFormStart = () => {
    return {
        type: actionTypes.SUBMIT_FORM_START
    };
};

export const formSubmitted = () => {
    return {
        type: actionTypes.FORM_SUBMITTED
    };
};

