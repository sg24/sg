import * as actionTypes from './actionTypes';

export const submitAddFormInit = (formData) => {
    return dispatch => {
        dispatch(submitAddFormStart(formData.form))
        let formContent = new FormData();
        formContent.append('image', image);
        axios.post(`/add/${formData.form}`, formContent, {
            headers: {
                'data-categ': 'profileImage',
                "Content-Type": "multipart/form-data"}}).then((res) => {
            dispatch(submitAddForm(form, res.data));
        }).catch((err) => {
            dispatch(submitAddFormFail(formData.form, err))
        });
    } 
};

export const submitAddFormFail = (form,  err) => {
    return {
        type: actionTypes.SUBMIT_ADDFORM_FAIL,
        form,
        err
    };
};

export const submitAddFormStart = (form) => {
    return {
        type: actionTypes.SUBMIT_ADDFORM_START,
        form
    };
};

export const addFormSubmitted = (form, cntID) => {
    return {
        type: actionTypes.ADDFORM_SUBMITTED,
        form,
        cntID
    };
};

export const addFormReset = () => {
    return {
        type: actionTypes.ADDFORM_RESET
    };
};

