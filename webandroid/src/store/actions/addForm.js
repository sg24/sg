import * as actionTypes from './actionTypes';
import { Platform } from 'react-native';
import axios from '../../axios'

export const submitAddFormInit = (formData, type) => {
    return dispatch => {
        dispatch(submitAddFormStart(type))
        let formContent = new FormData();
        for (let media of formData.uploadFile) {
            let mediaData = Platform.OS !== 'web' ? media : media.file
            formContent.append('media', mediaData);
        }
        axios.post(`/add/${type}`, formContent, {
            headers: {
                "Content-Type": "multipart/form-data"}}).then((res) => {
            dispatch(submitAddForm(form, res.data));
        }).catch((err) => {
            dispatch(submitAddFormFail(type, err))
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

