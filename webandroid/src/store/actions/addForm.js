import * as actionTypes from './actionTypes';
import { Platform } from 'react-native';
import axios from '../../axios';

export const submitAddFormInit = (formData, type) => {
    return dispatch => {
        dispatch(submitAddFormStart(type))
        let formContent = new FormData();
        let description = []
        for (let media of formData.uploadFile) {
            let fileID = media.id ? `${ media.id}.${media.type.split('/')[1] ? media.type.split('/')[1] : 'octet-stream'}` :  
            media.name.split('.').length > 1 ? media.name : `${media.name}.octet-stream`;
            let mediaData = Platform.OS !== 'web' ? {...media, name: fileID} : media.file
            formContent.append('media', mediaData, fileID);
            if (media.id) {
                description.push({id: fileID,  content: media.description})
            }
        }
        formContent.append('description', JSON.stringify(description))
        formContent.append('content', formData.content);
        if (type === 'advert') {
            formContent.append('title', formData.title);
            formContent.append('button', JSON.stringify(formData.button));
            formContent.append('comment', JSON.stringify(formData.comment));
        } else {
            formContent.append('hashTag', JSON.stringify(formData.hashTag));
        }
        axios.post(`/add/${type}`, formContent, {
            headers: {
                "Content-Type": "multipart/form-data"}}).then((res) => {
            dispatch(addFormSubmitted(type, res.data));
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

