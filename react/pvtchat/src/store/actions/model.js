import * as actionTypes from './actionTypes';

export const fetchCntInit = (id, categ) => {
    return {
        type: actionTypes.FETCH_CNT_INIT,
        id,
        categ
    }
};

export const fetchCntStart = () =>{
    return {
        type: actionTypes.FETCH_CNT_START
    };
}

export const fetchCntReset = () =>{
    return {
        type: actionTypes.FETCH_CNT_RESET,
    };
}

export const fetchCntFail = (err) => {
    return {
        type: actionTypes.FETCH_CNT_FAIL,
        err
    }
};

export const fetchCnt = (cnt) => {
    return {
        type: actionTypes.FETCH_CNT,
        cnt
    }
};

export const fetchMemberInit = (id, categ) => {
    return {
        type: actionTypes.FETCH_MEMBER_INIT,
        id,
        categ
    }
};

export const fetchMemberStart = () =>{
    return {
        type: actionTypes.FETCH_MEMBER_START
    };
}

export const fetchMemberReset = () =>{
    return {
        type: actionTypes.FETCH_MEMBER_RESET,
    };
}

export const fetchMemberFail = (err) => {
    return {
        type: actionTypes.FETCH_MEMBER_FAIL,
        err
    }
};

export const fetchMember = (cnt) => {
    return {
        type: actionTypes.FETCH_MEMBER,
        cnt
    }
};

export const filterUserInit = (users, filterContent) => {
    return {
        type: actionTypes.FILTER_USER_INIT,
        users,
        filterContent
    };
};

export const filterUser = (users) => {
    return {
        type: actionTypes.FILTER_USER,
        users
    };
};

export const filterUserSelectInit = (filterContent, userSelect) => {
    return {
        type: actionTypes.FILTER_USER_SELECT_INIT,
        filterContent,
        userSelect
    };
};

export const filterUserSelect = (userSelect) => {
    return {
        type: actionTypes.FILTER_USER_SELECT,
        userSelect
    };
};

export const changeTab = (curTab) => {
    return {
        type: actionTypes.CHANGE_TAB,
        curTab
    };
};

export const userTyping = (users) => {
    return {
        type: actionTypes.USER_TYPING,
        users
    };
};

export const closeBackdrop = () => {
    return {
        type: actionTypes.CLOSE_BACKDROP
    };
};

export const showAddBackdrop = () => {
    return {
        type: actionTypes.SHOW_ADD_BACKDROP
    };
};

export const showUserBackdrop = () => {
    return {
        type: actionTypes.SHOW_USER_BACKDROP
    };
};

export const fetchChatInit = (id, categ, chatLimit, skipChat, chatTotal) => {
    return {
        type: actionTypes.FETCH_CHAT_INIT,
        id,
        categ,
        chatLimit,
        skipChat,
        chatTotal
    }
};

export const fetchChatStart = () =>{
    return {
        type: actionTypes.FETCH_CHAT_START
    };
}

export const fetchChatReset = () =>{
    return {
        type: actionTypes.FETCH_CHAT_RESET,
    };
}

export const fetchChatFail = (err) => {
    return {
        type: actionTypes.FETCH_CHAT_FAIL,
        err
    }
};

export const fetchChat = (chat, skipChat, chatTotal) => {
    return {
        type: actionTypes.FETCH_CHAT,
        chat,
        skipChat, 
        chatTotal
    }
};

export const addNewChat = (chat) => {
    return {
        type: actionTypes.ADD_NEW_CHAT,
        chat
    }
};

export const showEmojiBackdrop = () => {
    return {
        type: actionTypes.SHOW_EMOJI_BACKDROP
    }
};

export const searchChat = (cnt) => {
    return {
        type: actionTypes.SEARCH_CHAT,
        cnt
    }
};

export const closeChatBackdrop = () => {
    return {
        type: actionTypes.CLOSE_CHAT_BACKDROP
    };
};

export const fetchGroupInit = (categ, id) => {
    return {
        type: actionTypes.FETCH_GROUP_INIT,
        categ,
        id
    }
};

export const fetchGroupStart = () =>{
    return {
        type: actionTypes.FETCH_GROUP_START
    };
}

export const fetchGroupFail = (err) => {
    return {
        type: actionTypes.FETCH_GROUP_FAIL,
        err
    }
};

export const fetchGroup = (cnt) => {
    return {
        type: actionTypes.FETCH_GROUP,
        cnt
    }
};

export const fetchPvtuserInit = (categ, id, curTab) => {
    return {
        type: actionTypes.FETCH_PVTUSER_INIT,
        categ,
        id,
        curTab
    }
};

export const fetchPvtuserStart = () =>{
    return {
        type: actionTypes.FETCH_PVTUSER_START
    };
}

export const fetchPvtuserFail = (err) => {
    return {
        type: actionTypes.FETCH_PVTUSER_FAIL,
        err
    }
};

export const fetchPvtuser = (cnt) => {
    return {
        type: actionTypes.FETCH_PVTUSER,
        cnt
    }
};

export const fetchPvtuserReset = (cnt) => {
    return {
        type: actionTypes.FETCH_PVTUSER_RESET,
        cnt
    }
};

export const filterPvtuser = (filterContent) => {
    return {
        type: actionTypes.FILTER_PVTUSER,
        filterContent
    }
};

export const resetPvtuserFilter = () => {
    return {
        type: actionTypes.RESET_PVTINPUT_FILTER
    }
};

export const showSideNav = () => {
    return {
        type: actionTypes.SHOW_SIDE_NAV
    }
};

export const closeSideNav = () => {
    return {
        type: actionTypes.CLOSE_SIDE_NAV
    }
};

export const holdChat = (id) => {
    return {
        type: actionTypes.HOLD_CHAT,
        id
    }
};

export const releaseChat = () => {
    return {
        type: actionTypes.RELEASE_CHAT
    }
};

export const fetchGroupNotify = (notifyCnt) => {
    return {
        type: actionTypes.FETCH_GROUP_NOTIFY,
        notifyCnt
    }
};

export const filterGroup = (filterContent) => {
    return {
        type: actionTypes.FILTER_GROUP,
        filterContent
    }
};

export const chatConnect = () => {
    return {
        type: actionTypes.CHAT_CONNECT
    }
};

export const chatDisconnect = () => {
    return {
        type: actionTypes.CHAT_DISCONNECT
    }
};


export const deleteChatInit = (chat) => {
    return {
        type: actionTypes.DELETE_CHAT_INIT,
        chat
    }
};

export const deleteChatStart = () =>{
    return {
        type: actionTypes.DELETE_CHAT_START
    };
}

export const deleteChatFail = (err) => {
    return {
        type: actionTypes.DELETE_CHAT_FAIL,
        err
    }
};

export const deleteChat = (cnt) => {
    return {
        type: actionTypes.DELETE_CHAT
    }
};

export const chatRemoved = (cnt) => {
    return {
        type: actionTypes.CHAT_REMOVED,
        cnt
    }
};

export const uploadMediaStart = (chatID, cntType, percentage) =>{
    return {
        type: actionTypes.UPLOAD_MEDIA_START,
        chatID,
        cntType,
        percentage
    };
}

export const uploadMediaFail = (err) => {
    return {
        type: actionTypes.UPLOAD_MEDIA_FAIL,
        err
    }
};


export const uploadMediaSet = (total) => {
    return {
        type: actionTypes.UPLOAD_MEDIA_SET,
        total
    }
};

export const uploadMedia = (cnt) => {
    return {
        type: actionTypes.UPLOAD_MEDIA,
        cnt
    }
};


export const groupNotify = (cnt) => {
    return {
        type: actionTypes.GROUP_NOTIFY,
        cnt
    }
};

export const userNotify = (cnt) => {
    return {
        type: actionTypes.USER_NOTIFY,
        cnt
    }
};