import * as actionTypes from './actionTypes';
import { Platform } from 'react-native';
import axios from '../../axios';

import  { updatePage } from './page';
import  { updateMediaInfo } from './media';
import { socket } from '../../shared/utility';

export const updateChat = (cnt) => {
    return {
        type: actionTypes.UPDATE_CHAT,
        cnt
    };
};

export const chatBoxReset = () => {
    return {
        type: actionTypes.CHATBOX_RESET
    };
};

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

export const fetchChat = (start, cnt) => {
    return {
        type: actionTypes.FETCH_CHAT,
        start,
        cnt
    };
};

export const fetchChatStart = () => {
    return {
        type: actionTypes.FETCH_CHAT_START
    };
};

export const fetchChatReset = () => {
    return {
        type: actionTypes.FETCH_CHAT_RESET
    };
};

export const sendChatInit = (chatType, cntID, page, pageID, formData) => {
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
        if (formData.replyChatInfo) {
            formContent.append('replyChatInfo', JSON.stringify(formData.replyChatInfo));
        }
        formContent.append('content', formData.content || '');
        formContent.append('cntID', cntID);
        formContent.append('page', page);
        formContent.append('pageID', pageID);

        axios.post(`/${chatType}`, formContent, {
            headers: {
                "Content-Type": "multipart/form-data",
                "data-categ": "sendChat"},
            onUploadProgress: function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    dispatch(sendChatStart({...formData, uploadedPercent: percentage}))
                }
            }}).then((res) => {
            if (res.data && page === 'users') {
                let cnt = {...res.data};
                let chat = {...formData};
                delete cnt.pageInfo;
                delete cnt.mediaInfo;
                delete chat.sendChatID;
                delete chat.sent;
                socket.emit('sendChat', pageID, {...chat, ...cnt});
            }
            if (res.data && res.data.pageInfo) {
                dispatch(updatePage(res.data.pageInfo, page))
            }
            if (res.data && res.data.mediaInfo) {
                dispatch(updateMediaInfo(res.data.mediaInfo))
            }
            dispatch(sendChat(formData, res.data));
        }).catch((err) => {
            dispatch(sendChatFail(formData, err))
        });
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

export const deleteChatInit = (chatType, chatID, page, pageID, cntType, cnt, start) => {
    return {
        type: actionTypes.DELETE_CHAT_INIT,
        chatType,
        chatID,
        page,
        pageID,
        cntType,
        cnt,
        start
    }; 
};

export const deleteChatFail = (err) => {
    return {
        type: actionTypes.DELETE_CHAT_FAIL,
        err
    };
};

export const deleteChat = (cntID, sendChatID, cntType, replyChatID) => {
    return {
        type: actionTypes.DELETE_CHAT,
        cntID,
        sendChatID,
        cntType,
        replyChatID
    };
};

export const deleteChatStart = (cntID, sendChatID, cntType, start) => {
    return {
        type: actionTypes.DELETE_CHAT_START,
        cntID,
        sendChatID,
        cntType,
        start
    };
};

export const deleteChatReset = () => {
    return {
        type: actionTypes.DELETE_CHAT_RESET
    };
};

export const fetchReplyInit = (start, limit, chatType, cntID, chatID) => {
    return {
        type: actionTypes.FETCH_REPLY_INIT,
        start, 
        limit,
        chatType,
        cntID,
        chatID
    };
};

export const fetchReplyFail = (err) => {
    return {
        type: actionTypes.FETCH_REPLY_FAIL,
        err
    };
};

export const fetchReply = (start, cnt) => {
    return {
        type: actionTypes.FETCH_REPLY,
        start,
        cnt
    };
};

export const fetchReplyStart = () => {
    return {
        type: actionTypes.FETCH_REPLY_START
    };
};

export const fetchReplyReset = () => {
    return {
        type: actionTypes.FETCH_REPLY_RESET
    };
};

export const replyChatInit = (chatType, cntID, chatID, page, pageID, formData) => {
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
        dispatch(replyChatStart(formData, chatID))
        let formContent = new FormData();
        if (formData.uploadFile) {
            let description = uploadFile([], formContent, formData.uploadFile);
            formContent.append('description', JSON.stringify(description));
        }
        formContent.append('content', formData.content || '');
        formContent.append('chatID', chatID);
        formContent.append('cntID', cntID);
        formContent.append('page', page);
        formContent.append('pageID', pageID);

        axios.post(`/${chatType}`, formContent, {
            headers: {
                "Content-Type": "multipart/form-data",
                "data-categ": "replyChat"},
            onUploadProgress: function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    dispatch(replyChatStart({...formData, uploadedPercent: percentage}))
                }
            }}).then((res) => {
            if (res.data && res.data.pageInfo) {
                dispatch(updatePage(res.data.pageInfo, page))
            }
            if (res.data && res.data.mediaInfo) {
                dispatch(updateMediaInfo(res.data.mediaInfo))
            }
            dispatch(replyChat(formData, res.data));
        }).catch((err) => {
            dispatch(replyChatFail(formData, err))
        });
    } 
};

export const replyChatFail = (cnt, err) => {
    return {
        type: actionTypes.REPLY_CHAT_FAIL,
        cnt,
        err
    };
};

export const replyChat = (cnt, cntID) => {
    return {
        type: actionTypes.REPLY_CHAT,
        cnt,
        cntID
    };
};

export const replyChatStart = (cnt, chatID) => {
    return {
        type: actionTypes.REPLY_CHAT_START,
        cnt,
        chatID
    };
};


export const chatBoxReactionInit = (chatType, cntID, page, reactionType, cnt,  cntType = 'chatReaction', uriMethod = 'post', confirm = true) => {
    return {
        type: actionTypes.CHATBOX_REACTION_INIT,
        chatType,
        cntID,
        page,
        reactionType,
        cnt,
        cntType,
        uriMethod,
        confirm
    };
};

export const chatBoxReactionStart = (cntID) => {
    return {
        type: actionTypes.CHATBOX_REACTION_START,
        cntID
    };
};

export const chatBoxReactionFail = (err, cntID) => {
    return {
        type: actionTypes.CHATBOX_REACTION_FAIL,
        err,
        cntID
    };
};

export const chatBoxReaction = (cntID, cnt, cntType) => {
    return {
        type: actionTypes.CHATBOX_REACTION,
        cntID,
        cnt,
        cntType
    };
};

export const chatBoxReactionReset = (cntID) => {
    return {
        type: actionTypes.CHATBOX_REACTION_RESET,
        cntID
    };
};