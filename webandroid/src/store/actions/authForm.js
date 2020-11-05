import * as actionTypes from './actionTypes';

export const submitAuthFormSignInInit = (formData) => {
    return {
        type: actionTypes.SUBMIT_AUTHFORMSIGNIN_INIT,
        formData
    };
};

export const submitAuthFormSignUpInit = (formData) => {
    return {
        type: actionTypes.SUBMIT_AUTHFORMSIGNUP_INIT,
        formData
    };
};

export const submitAuthFormForgetPassInit = (formData) => {
    return {
        type: actionTypes.SUBMIT_AUTHFORMFORGETPASS_INIT,
        formData
    };
};

export const submitAuthFormFail = (form,  err) => {
    return {
        type: actionTypes.SUBMIT_AUTHFORM_FAIL,
        form,
        err
    };
};

export const submitAuthFormStart = (form) => {
    return {
        type: actionTypes.SUBMIT_AUTHFORM_START,
        form
    };
};

export const authFormSubmitted = (form) => {
    return {
        type: actionTypes.AUTHFORM_SUBMITTED,
        form
    };
};

export const authFormReset = () => {
    return {
        type: actionTypes.AUTHFORM_RESET
    };
};

