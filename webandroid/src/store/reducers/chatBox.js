import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    start: 0,
    fetchChatStart: false,
    fetchChatError: null,
    fetchChat: null,
    username: null,
    userImage: null,
    userID: null
};

const fetchChatReset = (state, action) => {
    return updateObject(state, { 
        fetchChatStart: false, fetchChatError: null, fetchChat: null
    })
};

const fetchChatFail = (state, action) => {
    return updateObject(state, { 
        fetchChatStart: false, fetchChatError: action.err,
    })
};

const fetchChat = (state, action) => {
    return updateObject(state, { 
        fetchChatStart: false, fetchChatErroor: null, fetchChat: action.cnt.chat,
        username: action.cnt.username, userImage: action.cnt.userImage, userID: action.cnt.userID
    })
};

const sendChatStart = (state, action) => {
    let chat = [...state.fetchChat];
    let chatAdded = chat.filter(cnt => cnt.id === action.cnt.sendChatID)[0];
    if (chatAdded) {
        chatAdded.fail = false
        let chatAddedIndex = chat.findIndex(cnt => cnt.id === action.cnt.sendChatID);
        chat[chatAddedIndex] = chatAdded;
    } else {
        chat.push(action.cnt)
    }
    return updateObject(state, {
        fetchChat: chat
    })
};

const sendChatFail = (state, action) => {
    let chat = [...state.fetchChat];
    let chatAdded = chat.filter(cnt => cnt.id === action.cnt.sendChatID)[0];
    if (chatAdded) {
        chatAdded.fail = true;
        let chatAddedIndex = chat.findIndex(cnt => cnt.id === action.cnt.sendChatID);
        chat[chatAddedIndex] = chatAdded;
    }
    return updateObject(state, {
        fetchChat: chat
    })
};

const sendChat = (state, action) => {
    let chat = [...state.fetchChat];
    let chatAdded = chat.filter(cnt => cnt.id === action.cnt.sendChatID)[0];
    if (chatAdded) {
        chatAdded.sent = true;
        chatAdded._id = action.cntID;
        let chatAddedIndex = chat.findIndex(cnt => cnt.id === action.cnt.sendChatID);
        delete chatAdded.sendChatID;
        chat[chatAddedIndex] = chatAdded;
    }
    return updateObject(state, {
        fetchChat: chat
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CHAT_FAIL:
            return fetchChatFail(state, action);
        case actionTypes.FETCH_CHAT:
            return fetchChat(state, action);
        case actionTypes.FETCH_CHAT_RESET:
            return fetchChatReset(state, action);
        case actionTypes.SEND_CHAT_START:
            return sendChatStart(state, action);
        case actionTypes.SEND_CHAT_FAIL:
            return sendChatFail(state, action);
        case actionTypes.SEND_CHAT:
            return sendChat(state, action);
        default: return state
    };
};

export default reducer;