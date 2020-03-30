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

export const fetchMemberInit = (id, categ, curTab) => {
    return {
        type: actionTypes.FETCH_MEMBER_INIT,
        id,
        categ,
        curTab
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

export const fetchChatInit = (id, categ, timeFrame,skipChat, chatLimit, chatTotal) => {
    return {
        type: actionTypes.FETCH_CHAT_INIT,
        id,
        categ,
        timeFrame,
        skipChat,
        chatLimit,
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

export const fetchChat = (chat, timeFrame, chatLimit, chatTotal) => {
    return {
        type: actionTypes.FETCH_CHAT,
        chat,
        timeFrame,
        chatLimit, 
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
