import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import arraySort from 'array-sort';

const initialState = {
    userID: document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
    cnts: null,
    navCnt: null,
    cntErr: null,
    typing: [],
    showLoader: true,
    members: null,
    memberLoader: false,
    filterUser: null,
    curTab: 'online',
    userBackdrop: false,
    addBackdrop: false,
    chat: [],
    skipChat: 0,
    chatTotal: 0,
    chatLoader: false,
    audRecBackdrop: false,
    vidRecBackdrop: false,
    emojiBackdrop: false,
    linkValid: null,
    filterChat: null,
    groups: null,
    grpErr: null,
    filterGrp: null,
    pvtUserErr: null,
    pvtUser: null,
    pvtUserStart: false,
    filterPvtuser: null,
    showSideNav: false,
    chatSelected: [],
    connect: false
}

const fetchCnt = (state, action) => {
    let cnts = state.cnts;
    if(action.cnt) {
        cnts = action.cnt;
    }
    return updateObject(state, {cnts, showLoader: false})
};

const fetchCntReset = (state, action) => {
    return updateObject(state, {cnts: null, navCnt: null, showLoader: false})
};

const fetchCntStart = (state, action) => {
    return updateObject(state, {cnts: null, navCnt: null, typing: [], showLoader: true})
};

const fetchCntFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, showLoader: false})
};

const fetchMember = (state, action) => {
    let members = action.cnt;
    let navCnt = action.cnt;
    if(action.cnt && action.cnt.users && (action.cnt.users.online.length > 0 || action.cnt.users.offline.length > 0)) {
        let users = state.curTab === 'online' ? action.cnt.users.online : action.cnt.users.offline;
        navCnt = {users, online: action.cnt.online, offline: action.cnt.offline}
    }
    return updateObject(state, {members, navCnt, memberLoader: false})
};

const fetchMemberReset = (state, action) => {
    return updateObject(state, {memberLoader: false})
};

const fetchMemberStart = (state, action) => {
    return updateObject(state, {filterUser: null, memberLoader: true})
};

const fetchMemberFail = (state, action) => {
    return updateObject(state, {cntErr: action.err, memberLoader: false})
};

const fetchChatStart = (state, action) => {
    return updateObject(state, {chatLoader: state.chat.length < 1})
};

const fetchChatFail= (state, action) => {
    return updateObject(state, {cntErr: action.err, chatLoader: false})
};

const fetchChatReset = (state, action) => {
    return updateObject(state, {chat: null})
}

const fetchChat = (state, action) => {
    let chat = [...state.chat]
    chat.push(...action.chat)
    let updateChat = []
    let curPos = 0;
    let start = new Date();
    start.setHours(0,0,0,0)
    let beginning = new Date(start).getTime();
    let content= arraySort(chat, 'created', {reverse: true});

    for (let cnt of content) {
        let updateCnt = {
            ...cnt,
            timeFrame: null
        }
        
        if ((beginning > new Date(cnt.created).getTime())){
            updateCnt = {
                ...cnt,
                timeFrame: beginning
            }
            ++curPos
            beginning = new Date(beginning - (1000*60*60*24* curPos)).getTime();
        } 
        updateChat.push(updateCnt);
    }
    return updateObject(state, {chat: updateChat,  
        chatTotal: action.chatTotal, skipChat: action.skipChat, chatLoader: false})
}; 

const addNewChat =  (state, action) => {
    let chat  = [...state.chat];
    chat.push(...action.chat)
    return updateObject(state, {chat})
};

const filterUser = (state, action) => {
    return updateObject(state, {filterUser: action.users})
};

const changeTab = (state, action) => {
    let members = state.members;
    let navCnt = state.members;
    if(members && members.users && (members.users.online.length > 0 || members.users.offline.length > 0)) {
        let users = action.curTab === 'online' ? members.users.online : members.users.offline;
        navCnt = {users, online: members.online, offline: members.offline}
    }
    return updateObject(state, {navCnt, curTab: action.curTab, filterUser: null})
};

const userTyping = (state, action) => {
    let typing = state.typing;
    if(JSON.stringify(action.users) !== JSON.stringify(state.typing)) {
        typing  = action.users
    }
    return updateObject(state, {typing})
};

const closeBackdrop = (state, action) => {
    return updateObject(state, {cntErr: null, pvtUserErr: null,addBackdrop: false, userBackdrop: false,
        audRecBackdrop: false, vidRecBackdrop: false, filterChat: null,filterGrp: null, emojiBackdrop: false, showSideNav: false})
};

const showAddBackdrop = (state, action) => {
    return updateObject(state, {cntErr: null, pvtUserErr: null,addBackdrop: true, userBackdrop: false,
        audRecBackdrop: false, vidRecBackdrop: false, emojiBackdrop: false, showSideNav: false})
};

const showUserBackdrop = (state, action) => {
    return updateObject(state, {cntErr: null, pvtUserErr: null,addBackdrop: false, userBackdrop: true,
        audRecBackdrop: false, vidRecBackdrop: false, emojiBackdrop: false, showSideNav: false})
};

const closeChatBackdrop = (state, action) => {
    return updateObject(state, {addBackdrop: false, userBackdrop: false})
};

const showEmojiBackdrop = (state, action) => {
    return updateObject(state, {cntErr: null, pvtUserErr: null,addBackdrop: false, userBackdrop: false,
        audRecBackdrop: false, vidRecBackdrop: false, emojiBackdrop: true, showSideNav: false})
};

const searchChat = (state, action) => {
    return updateObject(state, {filterChat: action.cnt})
};

const fetchGroupStart = (state, action) => {
    return updateObject(state, {grpErr: null, groups: null})
};

const fetchGroupFail = (state, action) => {
    return updateObject(state, {grpErr: action.err})
};

const fetchGroup = (state, action) => {
    return updateObject(state, {groups: action.cnt})
};

const filterGroup = (state, action) => {
    let groups = state.groups;
    if (groups && groups.length > 0) {
        groups = groups.filter(grp => grp.title.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1)
    }
    return updateObject(state, {filterGrp: groups})
};

const fetchGroupNotify = (state, action) => {
    return updateObject(state, {notifyCnt: action.notifyCnt})
};

const fetchPvtuserStart = (state, action) => {
    return updateObject(state, {pvtUserStart: true, pvtUser: null, pvtUserErr: null, filterPvtuser: null})
};

const fetchPvtuserFail = (state, action) => {
    return updateObject(state, {pvtUserStart: false, pvtUserErr: action.err})
};

const fetchPvtuserReset = (state, action) => {
    return updateObject(state, {pvtUserStart: false, pvtUser: null, filterPvtuser: null,pvtUserErr: null})
};

const fetchPvtuser = (state, action) => {
    return updateObject(state, {pvtUserStart: false, pvtUser: action.cnt})
};

const filterPvtuser = (state, action) => {
    let pvtUser = state.pvtUser;
    if (pvtUser && pvtUser.length > 0) {
        pvtUser = pvtUser.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1)
    }
    return updateObject(state, {filterPvtuser: pvtUser})
};

const resetPvtInputFilter = (state, action) => {
    return updateObject(state, {filterPvtuser: null})
};

const showSideNav = (state, action) => {
    return updateObject(state, {showSideNav: true})
};

const closeSideNav = (state, action) => {
    return updateObject(state, {showSideNav: false})
};

const holdChat =  (state, action) => {
    let chatSelected  = [...state.chatSelected];
    let filterSelect = chatSelected.filter(id => id === action.id)[0];
    if (filterSelect) {
        chatSelected = chatSelected.filter(id => id !== action.id);
        return updateObject(state, {chatSelected})
    }
    chatSelected.push(action.id)
    return updateObject(state, {chatSelected})
};

const releaseChat =  (state, action) => {
    return updateObject(state, {chatSelected: []})
};

const chatRemoved = (state, action) => {
    let chats = [...state.chat]
    if (chats.length > 0 && action.cnt && action.cnt.length > 0) {
        for (let id of action.cnt) {
            chats = chats.filter(chat => chat.chatID !== id);
        }
    }
    return updateObject(state, {chat: chats, chatSelected: []})
};

const chatConnect= (state, action) => {
    let members = state.members;
    let navCnt = state.members;
    if(members && members.users && (members.users.online.length > 0 || members.users.offline.length > 0)) {
        let user = members.users.offline.filter(user => user.id === state.userID)[0];
        let users = state.navCnt.users;
        if (user && state.curTab === 'offline') {
            let updateOffline = members.users.offline.filter(user => user.id !== state.userID);
            members.users.online.push({...user, status: true});
            members.users.offline = updateOffline;
            members.online = members.online + 1;
            members.offline = members.offline - 1;
            users = members.users.offline
        }
        navCnt = {users, online: members.online, offline: members.offline}
    }
    return updateObject(state, {navCnt, members, connect: true})
};

const chatDisconnect= (state, action) => {
    let members = state.members;
    let navCnt = state.members;
    if(members && members.users && (members.users.online.length > 0 || members.users.offline.length > 0)) {
        let user = members.users.online.filter(user => user.id === state.userID)[0];
        let users = state.navCnt.users;
        if (user && state.curTab === 'online') {
            let updateOnline = members.users.online.filter(user => user.id !== state.userID);
            members.users.offline.push({...user, status: false});
            members.users.online = updateOnline;
            members.online = members.online - 1;
            members.offline = members.offline + 1;
            users = members.users.online;
        }
        navCnt = {users, online: members.online, offline: members.offline}
    }
    
    return updateObject(state, {navCnt, members, connect: false})
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CNT:
            return fetchCnt(state, action);
        case actionTypes.FETCH_CNT_START:
            return fetchCntStart(state, action);
        case actionTypes.FETCH_CNT_RESET:
            return fetchCntReset(state, action);
        case actionTypes.FETCH_CNT_FAIL:
            return fetchCntFail(state, action);
        case actionTypes.FETCH_MEMBER:
            return fetchMember(state, action);
        case actionTypes.FETCH_MEMBER_START:
            return fetchMemberStart(state, action);
        case actionTypes.FETCH_MEMBER_RESET:
            return fetchMemberReset(state, action);
        case actionTypes.FETCH_MEMBER_FAIL:
            return fetchMemberFail(state, action);
            case actionTypes.FETCH_CHAT:
            return fetchChat(state, action);
        case actionTypes.FETCH_CHAT_START:
            return fetchChatStart(state, action);
        case actionTypes.FETCH_CHAT_RESET:
            return fetchChatReset(state, action);
        case actionTypes.FETCH_CHAT_FAIL:
            return fetchChatFail(state, action);
        case actionTypes.ADD_NEW_CHAT:
            return addNewChat(state, action);
        case actionTypes.FILTER_USER:
            return filterUser(state, action);
        case actionTypes.CHANGE_TAB:
            return changeTab(state, action);
        case actionTypes.USER_TYPING:
            return userTyping(state, action);
        case actionTypes.CLOSE_BACKDROP:
            return closeBackdrop(state, action);
        case actionTypes.SHOW_ADD_BACKDROP:
            return showAddBackdrop(state, action);
        case actionTypes.SHOW_USER_BACKDROP:
            return showUserBackdrop(state, action);
        case actionTypes.CLOSE_CHAT_BACKDROP:
            return closeChatBackdrop(state, action);
        case actionTypes.SHOW_EMOJI_BACKDROP:
            return showEmojiBackdrop(state, action);
        case actionTypes.SEARCH_CHAT:
            return searchChat(state, action);
        case actionTypes.FETCH_GROUP_START:
            return fetchGroupStart(state, action);
        case actionTypes.FETCH_GROUP:
            return fetchGroup(state, action);
        case actionTypes.FETCH_GROUP_FAIL:
            return fetchGroupFail(state, action);
        case actionTypes.FETCH_PVTUSER_START:
            return fetchPvtuserStart(state, action);
        case actionTypes.FETCH_PVTUSER_RESET:
            return fetchPvtuserReset(state, action);
        case actionTypes.FETCH_PVTUSER:
            return fetchPvtuser(state, action);
        case actionTypes.FETCH_PVTUSER_FAIL:
            return fetchPvtuserFail(state, action);
        case actionTypes.FILTER_PVTUSER:
            return filterPvtuser(state, action);
        case actionTypes.RESET_PVTINPUT_FILTER:
            return resetPvtInputFilter(state, action);
        case actionTypes.FETCH_GROUP_NOTIFY:
            return fetchGroupNotify(state, action);
        case actionTypes.FILTER_GROUP:
            return filterGroup(state, action);
        case actionTypes.SHOW_SIDE_NAV:
            return showSideNav(state, action);
        case actionTypes.CLOSE_SIDE_NAV:
            return closeSideNav(state, action);
        case actionTypes.HOLD_CHAT:
            return holdChat(state, action);
        case actionTypes.RELEASE_CHAT:
            return releaseChat(state, action);
        case actionTypes.CHAT_REMOVED:
            return chatRemoved(state, action);
        case actionTypes.CHAT_CONNECT:
            return chatConnect(state, action);
        case actionTypes.CHAT_DISCONNECT:
            return chatDisconnect(state, action);
        default: return state
    }
};

export default reducer