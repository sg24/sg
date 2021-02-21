import * as actionTypes from './actionTypes';
import { Platform } from 'react-native';
import axios from '../../axios';

export const submitAddFormInit = (formData, type) => {
    function uploadFile (description, formContent, uploadFile) {
        for (let media of uploadFile) {
            let fileID = media.id ? `${ media.id}.${media.type.split('/')[1] ? media.type.split('/')[1] : 'octet-stream'}` :  
            media.name.split('.').length > 1 ? media.name : `${media.name}.octet-stream`;
            let mediaData = Platform.OS !== 'web' ? {...media, name: fileID} : media.file
            formContent.append('media', mediaData, fileID);
            if (media.id) {
                description.push({id: fileID,  content: media.description})
            }
        }
        return description;
    }
    return dispatch => {
        dispatch(submitAddFormStart(type))
        let formContent = new FormData();
        if (type !== 'cbt') {
            let description = uploadFile([], formContent, formData.uploadFile);
            formContent.append('description', JSON.stringify(description))
        }

        if (type === 'advert') {
            formContent.append('content', formData.content);
            formContent.append('button', JSON.stringify(formData.button));
            formContent.append('comment', JSON.stringify(formData.comment));
            formContent.append('title', formData.title);
        } else if (type === 'feed' || type === 'writeup') {
            formContent.append('title', formData.title);
            formContent.append('content', formData.content);
            formContent.append('comment', JSON.stringify(formData.comment));
            formContent.append('hashTag', JSON.stringify(formData.hashTag));
        } else if (type === 'cbt') {
            for(let media of formData.uploadFile) {
                let fileID =  media.name.split('.').length > 1 ? `${formData.id}--${media.name}` : `${formData.id}--${media.name}.octet-stream`;
                let mediaData = Platform.OS !== 'web' ? {...media, name: fileID} : media.file
                formContent.append('media', mediaData, fileID);
            }
            let updateQuestion = [];
            for(let question of formData.question) {
                for (let media of question.uploadFile) {
                    let fileID =  media.name.split('.').length > 1 ? `${question.id}--${media.name}` : `${question.id}--${media.name}.octet-stream`;
                    let mediaData = Platform.OS !== 'web' ? {...media, name: fileID} : media.file
                    formContent.append('media', mediaData, fileID);
                }
                delete question.uploadFile;
                updateQuestion.push(question)
            }
            formContent.append('description', JSON.stringify([]));
            formContent.append('question', JSON.stringify(updateQuestion));
            formContent.append('id', formData.id);
            formContent.append('comment', JSON.stringify(formData.comment));
            formContent.append('title', formData.title);
            formContent.append('content', formData.content);
            formContent.append('participant', formData.participant);
            formContent.append('result', JSON.stringify(formData.result));
            formContent.append('delete', JSON.stringify(formData.delete));
            formContent.append('questionTotal', updateQuestion.length)
            formContent.append('hour', formData.hour);
            formContent.append('minute', formData.minute);
            formContent.append('second', formData.second);
            formContent.append('duration', formData.duration);
            formContent.append('content', formData.content);
            formContent.append('hashTag', JSON.stringify(formData.hashTag));
        } else {
            formContent.append('content', formData.content);
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

