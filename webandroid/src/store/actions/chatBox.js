import * as actionTypes from './actionTypes';
import { Platform } from 'react-native';
import axios from '../../axios';

export const fetchChatInit = (start, limit, chatType, cntID, page, pageID) => {
    return {
        type: actionTypes.FETCH_CHAT_INIT,
        start, 
        limit,
        chatType,
        cntID,
        page,
        pageID
    };
};

export const fetchChatFail = (err) => {
    return {
        type: actionTypes.FETCH_CHAT_FAIL,
        err
    };
};

export const fetchChat = (cnt) => {
    return {
        type: actionTypes.FETCH_CHAT,
        cnt
    };
};

export const fetchChatReset = () => {
    return {
        type: actionTypes.FETCH_CHAT_RESET
    };
};

export const sendChatInit = (chatType, cntID, formData) => {
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
        dispatch(sendChatStart(formData))
        let formContent = new FormData();
        if (formData.uploadFile) {
            let description = uploadFile([], formContent, formData.uploadFile);
            formContent.append('description', JSON.stringify(description));
        }
        formContent.append('content', formData.content);

        // axios.post(`/${chatType}`, formContent, {
        //     headers: {
        //         "Content-Type": "multipart/form-data"}}).then((res) => {
        //     dispatch(sendChat(formData, res));
        // }).catch((err) => {
        //     dispatch(sendChatFail(formData, err))
        // });
    } 
};

export const sendChatFail = (cnt, err) => {
    return {
        type: actionTypes.SEND_CHAT_FAIL,
        cnt,
        err
    };
};

export const sendChat = (cnt, cntID) => {
    return {
        type: actionTypes.SEND_CHAT,
        cnt,
        cntID
    };
};

export const sendChatStart = (cnt) => {
    return {
        type: actionTypes.SEND_CHAT_START,
        cnt
    };
};