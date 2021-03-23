import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetchChatStart: false,
    fetchChatError: null,
    fetchChat: null,
    chatID: null,
    username: null,
    userImage: null,
    userID: null,
    deleteChat: null,
    fetchReply: null,
    fetchReplyStart: false,
    fetchReplyError: null,
    loadPreviousChat: false,
    loadPreviousReply: false
};


const chatBoxReset = (state, action) => {
    return updateObject(state, { 
        fetchChatStart: false, fetchChatError: null, fetchChat: null, chatID: null,
        username: null, userImage: null, userID: null,  deleteChat: null, deleteChatError: null,
        fetchReply: null, fetchReplyStart: false, fetchReplyError: null, loadPreviousChat: false,
        loadPreviousReply: false
    })
};

const fetchChatReset = (state, action) => {
    return updateObject(state, { 
        fetchChatStart: false, fetchChatError: null
    })
};

const fetchChatStart = (state, action) => {
    return updateObject(state, { 
        fetchChatStart: true, fetchChatError: null
    })
};

const fetchChatFail = (state, action) => {
    return updateObject(state, { 
        fetchChatStart: false, fetchChatError: action.err,
    });
};

const fetchChat = (state, action) => {
    let fetchChat = state.fetchChat ? [...state.fetchChat] : [];
    fetchChat.unshift(...action.cnt.chat);
    return updateObject(state, { 
        fetchChatStart: false, fetchChatError: null, fetchChat, chatID: action.cnt.chatID,
        username: action.cnt.username, userImage: action.cnt.userImage, userID: action.cnt.userID,
        loadPreviousChat: action.cnt.loadPrevious
    })
};

const sendChatStart = (state, action) => {
    let chat = [...state.fetchChat];
    let chatAdded = chat.filter(cnt => cnt.sendChatID === action.cnt.sendChatID)[0];
    if (action.cnt.editChatBox) {
        chatAdded = chat.filter(cnt => cnt._id === action.cnt.editChatBox._id)[0];
    }
    if (chatAdded) {
        for (let cnt in action.cnt) {
            chatAdded[cnt] = action.cnt[cnt];
        }
        chatAdded.fail = false;
        chatAdded.sent = false;
        let chatAddedIndex = chat.findIndex(cnt => cnt.sendChatID === action.cnt.sendChatID);
        if (action.cnt.editChatBox) {
            chatAdded.content = action.cnt.content;
            chatAdded.sendChatID = action.cnt.sendChatID;
            chatAddedIndex = chat.findIndex(cnt => cnt._id === action.cnt.editChatBox._id);
        }
        chat[chatAddedIndex] = chatAdded;
    } else {
        chat.push(action.cnt);
    }
    return updateObject(state, {
        fetchChat: chat
    })
};

const sendChatFail = (state, action) => {
    let chat = [...state.fetchChat];
    let chatAdded = chat.filter(cnt => cnt.sendChatID === action.cnt.sendChatID)[0];
    if (action.cnt.editChatBox) {
        chatAdded = chat.filter(cnt => cnt._id === action.cnt.editChatBox._id)[0];
    }
    if (chatAdded) {
        chatAdded.fail = true;
        let chatAddedIndex = chat.findIndex(cnt => cnt.sendChatID === action.cnt.sendChatID);
        if (action.cnt.editChatBox) {
            chatAddedIndex = chat.findIndex(cnt => cnt._id === action.cnt.editChatBox._id);
        }
        chat[chatAddedIndex] = chatAdded;
    }
    return updateObject(state, {
        fetchChat: chat
    })
};

const sendChat = (state, action) => {
    let chat = [...state.fetchChat];
    let chatAdded = chat.filter(cnt => cnt.sendChatID === action.cnt.sendChatID)[0];
    if (action.cnt.editChatBox) {
        chatAdded = chat.filter(cnt => cnt._id === action.cnt.editChatBox._id)[0];
    }
    if (chatAdded) {
        chatAdded.sent = true;
        chatAdded._id = action.cntID._id;
        chatAdded.media = action.cntID.media;
        chatAdded.created = action.cntID.created;
        let chatAddedIndex = chat.findIndex(cnt => cnt.sendChatID === action.cnt.sendChatID);
        if (action.cnt.editChatBox) {
            chatAddedIndex = chat.findIndex(cnt => cnt._id === action.cnt.editChatBox._id);
        }
        delete chatAdded.sendChatID;
        chat[chatAddedIndex] = chatAdded;
    }
    return updateObject(state, {
        fetchChat: chat
    })
};

const deleteChatStart = (state, action) => {
    return updateObject(state, {
        deleteChat: {_id: action.cntID, sendChatID: action.sendChatID, start: action.start}, deleteChatError: null
    })
};

const deleteChatFail = (state, action) => {
    return updateObject(state, { 
       deleteChatError: action.err, deleteChat: null
    })
};

const deleteChat = (state, action) => {
    let chat = action.cntType === 'deleteReply' ? [...state.fetchReply] : [...state.fetchChat];
    let removeChat = chat.filter(cnt => cnt._id !== action.cntID);
    if (action.sendChatID) {
        removeChat = chat.filter(cnt => cnt.sendChatID !== action.sendChatID);
    }
    if (action.cntType === 'deleteReply') {
        if (!action.sendChatID) {
            removeChat = chat.filter(cnt => cnt._id !== action.replyChatID);
        }
        chat = [...state.fetchChat];
        let chatItem = chat.filter(cnt => cnt._id === action.cntID)[0];
        if (chatItem) {
            chatItem.reply.pop();
            let chatItemIndex = chat.findIndex(cnt => cnt._id === action.cntID);
            chat[chatItemIndex] = chatItem;
        }
        return updateObject(state, { 
            fetchReply: removeChat, deleteChat: null, deleteChatError: null, chat
        })
    }
    return updateObject(state, { 
        fetchChat: removeChat, deleteChat: null, deleteChatError: null
    })
};

const deleteChatReset = (state, action) => {
    return updateObject(state, { 
       deleteChatError: null, deleteChat: null
    })
};

const fetchReplyReset = (state, action) => {
    return updateObject(state, { 
        fetchReplyStart: false, fetchReplyError: null, 
        fetchReply: state.fetchReply && state.fetchReplyError ? state.fetchReply : null
    })
};

const fetchReplyStart = (state, action) => {
    return updateObject(state, { 
        fetchReplyStart: true, fetchReplyError: null
    })
};

const fetchReplyFail = (state, action) => {
    return updateObject(state, { 
        fetchReplyStart: false, fetchReplyError: action.err,
    })
};

const fetchReply = (state, action) => {
    let fetchReply = state.fetchReply ? [...state.fetchReply] : [];
    fetchReply.unshift(...action.cnt.chat);
    return updateObject(state, {
        fetchReplyError: null, fetchReply, fetchReplyStart: false,
        username: action.cnt.username, userImage: action.cnt.userImage, userID: action.cnt.userID,
        loadPreviousReply: action.cnt.loadPrevious
    })
};

const replyChatStart = (state, action) => {
    let chat = state.fetchReply ? [...state.fetchReply] : [];
    let chatAdded = chat.filter(cnt => cnt.sendChatID === action.cnt.sendChatID)[0];
    if (chatAdded) {
        for (let cnt in action.cnt) {
            chatAdded[cnt] = action.cnt[cnt];
        }
        chatAdded.fail = false;
        chatAdded.sent = false;
        let chatAddedIndex = chat.findIndex(cnt => cnt.sendChatID === action.cnt.sendChatID);
        chat[chatAddedIndex] = chatAdded;
    } else {
        chat.push(action.cnt);
    }
    let chatCnt = [...state.fetchChat];
    let chatItem = chatCnt.filter(cnt => cnt._id === action.chatID)[0];
    if (chatItem) {
        chatItem.reply.push(action.chatID);
        let chatItemIndex = chatCnt.findIndex(cnt => cnt._id === action.chatID);
        chatCnt[chatItemIndex] = chatItem;
    }
    return updateObject(state, {
        fetchReply: chat, fetchChat: chatCnt
    })
};

const replyChatFail = (state, action) => {
    let chat = state.fetchReply ? [...state.fetchReply] : [];
    let chatAdded = chat.filter(cnt => cnt.sendChatID === action.cnt.sendChatID)[0];
    if (chatAdded) {
        chatAdded.fail = true;
        let chatAddedIndex = chat.findIndex(cnt => cnt.sendChatID === action.cnt.sendChatID);
        chat[chatAddedIndex] = chatAdded;
    }
    return updateObject(state, {
        fetchReply: chat
    })
};

const replyChat = (state, action) => {
    let chat = [...state.fetchReply];
    let chatAdded = chat.filter(cnt => cnt.sendChatID === action.cnt.sendChatID)[0];
    if (chatAdded) {
        chatAdded.sent = true;
        chatAdded._id = action.cntID._id;
        chatAdded.media = action.cntID.media;
        chatAdded.created = action.cntID.created;
        let chatAddedIndex = chat.findIndex(cnt => cnt.sendChatID === action.cnt.sendChatID);
        delete chatAdded.sendChatID;
        chat[chatAddedIndex] = chatAdded;
    }
    return updateObject(state, {
        fetchReply: chat
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHATBOX_RESET:
            return chatBoxReset(state, action);
        case actionTypes.FETCH_CHAT_FAIL:
            return fetchChatFail(state, action);
        case actionTypes.FETCH_CHAT:
            return fetchChat(state, action);
        case actionTypes.FETCH_CHAT_RESET:
            return fetchChatReset(state, action);
        case actionTypes.FETCH_CHAT_START:
            return fetchChatStart(state, action);
        case actionTypes.SEND_CHAT_START:
            return sendChatStart(state, action);
        case actionTypes.SEND_CHAT_FAIL:
            return sendChatFail(state, action);
        case actionTypes.SEND_CHAT:
            return sendChat(state, action);
        case actionTypes.DELETE_CHAT_START:
            return deleteChatStart(state, action);
        case actionTypes.DELETE_CHAT_FAIL:
            return deleteChatFail(state, action);
        case actionTypes.DELETE_CHAT:
            return deleteChat(state, action);
        case actionTypes.DELETE_CHAT_RESET:
            return deleteChatReset(state, action);
        case actionTypes.FETCH_REPLY_FAIL:
            return fetchReplyFail(state, action);
        case actionTypes.FETCH_REPLY:
            return fetchReply(state, action);
        case actionTypes.FETCH_REPLY_RESET:
            return fetchReplyReset(state, action);
        case actionTypes.FETCH_REPLY_START:
            return fetchReplyStart(state, action);
        case actionTypes.REPLY_CHAT_START:
            return replyChatStart(state, action);
        case actionTypes.REPLY_CHAT_FAIL:
            return replyChatFail(state, action);
        case actionTypes.REPLY_CHAT:
            return replyChat(state, action);
        default: return state
    };
};

export default reducer;