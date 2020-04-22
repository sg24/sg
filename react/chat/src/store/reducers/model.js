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
    tempchat: [],
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
    online: 0,
    offline: 0,
    checkUploadTotal: 0,
    uploadTotal: 0,
    groupNotify: 0,
    userNotify: 0,
    resend: [],
    resendMedia: [],
    editChat: null,
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
    return updateObject(state, {chat: []})
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
    let curIndex = 0;
    let filterChat = chat.filter((cnt, index) => {
        if (cnt.chatID === action.chat[0].chatID) {
            curIndex = index;
            return true;
        }
        return false
    })[0];
    if (filterChat) {
        chat[curIndex] = action.chat[0];
    } else {
        chat.push(...action.chat)
    }
    return updateObject(state, {chat, editChat: null})
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
        audRecBackdrop: false, vidRecBackdrop: false, emojiBackdrop: !state.emojiBackdrop, showSideNav: false})
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

const createChatFail = (state, action) => {
    let resend = [...state.resend];
    let checkRes = resend.filter(cnt => cnt.msgID === action.msgID)[0];
    if (!checkRes) {
        resend.push({type: action.msgType, msg: action.msg, msgID: action.msgID, msgCateg: action.msgCateg, created: new Date().getTime()})
    }
    return updateObject(state, {resend})
};

const createChatStart = (state, action) => {
    let chats = [...state.chat];
    let content = arraySort(chats, 'position', {reverse: false});
    let lastChat = content.length > 0 ? content[content.length - 1] : {};
    if (action.msg && !action.msg.editMsg) {
        if (lastChat.ID === state.userID) {
            lastChat.reply.push({ID: state.userID, position: lastChat.position, cntType: action.msgType, sent: false, viewed: false, 
                chatID: action.msgID, mainID: lastChat.chatID,delete: false,pending: true, msg: action.msg, created: new Date().getTime()});
            content[content.length - 1] = lastChat;
        } else {
            content.push({ID: state.userID, position: !lastChat.position ? 0 : lastChat.position + 1, cntType: action.msgType, sent: false, viewed: false, 
                chatID: action.msgID, delete: false, pending: true, msg: action.msg, reply: [], created: new Date().getTime()})
        }
    } else {
        let msg = action.msg;
        if (!msg.chatID) {
            let chat = content.filter(chat => chat.chatID === msg.mainID)[0];
            let index = content.findIndex(chat => chat.chatID === msg.mainID)
            if (chat) {
                chat.msg = msg.editMsg;
                chat.cntType = 'typedPlain';
                chat.format = 'typedPlain';
                chat['pending'] = true;
            }
            content[index] = chat
        } else {
            let chat = content.filter(chat => chat.chatID === msg.mainID)[0];
            let index = content.findIndex(chat => chat.chatID === msg.mainID)
            if (chat) {
                let filterReply = chat.reply.filter(replyCnt => replyCnt.chatID === msg.chatID)[0];
                let filterIndex = chat.reply.findIndex(replyCnt => replyCnt.chatID === msg.chatID)[0];
                if (filterReply) {
                    filterReply.msg = msg.editMsg
                    filterReply.cntType = 'typedPlain';
                    filterReply.format = 'typedPlain';
                    filterReply['pending'] = true;
                }
                chat.reply[filterIndex] = filterReply;
                content[index] = chat
            }
        }
    }
    return updateObject(state, {chat: content, cntErr: null})
};

const resetResendChat= (state, action) => {
    return updateObject(state, {resend: []})
};

const uploadMedia = (state, action) => {
    let total = ++state.checkUploadTotal;
    if (total === state.uploadTotal) {
        return updateObject(state, {checkUploadTotal: 0, uploadTotal: 0, tempchat: []})
    }
    return updateObject(state, {checkUploadTotal: total})
};

const uploadMediaSet = (state, action) => {
    return updateObject(state, {uploadTotal: action.total, checkUploadTotal: 0, tempchat: []})
};

const uploadMediaStart = (state, action) => {
    let chats = state.tempchat.length < 1 ? [...state.chat] : [...state.tempchat];
    let content = arraySort(chats, 'position', {reverse: false});
    let lastChat = content.length > 0 ? content[content.length - 1] : null;
    if (action.chatID && !action.chatID.mainID) {
        if (lastChat) {
            if (lastChat.ID === state.userID) {
                let curIndex = 0;
                if (lastChat.chatID === action.chatID) {
                    lastChat = {ID: state.userID, upload: true, position: lastChat.position, cntType: action.cntType, 
                        chatID: action.chatID, percentage: action.percentage, pending: true,reply: [], created: new Date().getTime()}
                } else {
                    let filterLastChat = lastChat.reply.filter((chat, index) => {
                        if (chat.chatID === action.chatID) {
                            curIndex = index;
                            return true;
                        }
                        return false;
                    })[0];
                    
                    if (filterLastChat) {
                        lastChat.reply[curIndex].percentage = action.percentage;
                    } else {
                        lastChat.reply.push({upload: true, pending: true,position: lastChat.position, cntType: action.cntType, 
                            chatID: action.chatID, percentage: action.percentage});
                        lastChat.replyID ? lastChat.replyID.push(action.chatID) : lastChat['replyID'] = [action.chatID]
                    }
                }
                content[content.length - 1] = lastChat;
            } else {
                content.push({ID: state.userID, upload: true, position: lastChat.position + 1, cntType: action.cntType, 
                    chatID: action.chatID, percentage: action.percentage, pending: true,reply: [], created: new Date().getTime()})
            }
        } else {
            content.push({ID: state.userID, upload: true, position: 0, cntType: action.cntType, 
                chatID: action.chatID, percentage: action.percentage, pending: true,reply: [], created: new Date().getTime()})
        }
    } else {
        let msg = action.chatID;
        if (!msg.chatID) {
            let chat = content.filter(chat => chat.chatID === msg.mainID)[0];
            let index = content.findIndex(chat => chat.chatID === msg.mainID)
            if (chat) {
                chat.cntType = action.cntType;
                chat['percentage'] = action.percentage
                chat['pending'] = true;
                chat['upload'] = true;
            }
            content[index] = chat
        } else {
            let chat = content.filter(chat => chat.chatID === msg.mainID)[0];
            let index = content.findIndex(chat => chat.chatID === msg.mainID)
            if (chat) {
                let filterReply = chat.reply.filter(replyCnt => replyCnt.chatID === msg.chatID)[0];
                let filterIndex = chat.reply.findIndex(replyCnt => replyCnt.chatID === msg.chatID)[0];
                if (filterReply) {
                    filterReply['pending'] = true;
                    filterReply['upload'] = true;
                    filterReply.cntType = action.cntType;
                    filterReply['percentage'] = action.percentage
                }
                chat.reply[filterIndex] = filterReply;
                content[index] = chat
            }
        }
    }
    return updateObject(state, {tempchat: content, cntErr: null})
};

const uploadMediaFail = (state, action) => {
    let chats = [...state.tempchat];
    let index = 0;
    let filterchats = chats.filter(chat => chat.chatID === action.chatID)[0]
    if (filterchats) {
        chats = chats.filter(chat => chat.chatID !== action.chatID);
    } else {
        for (let cnt of chats) {
            if (cnt.replyID && cnt.replyID.length > 0) {
                let filterReplyID = cnt.replyID.filter(id => id === action.chatID)[0];
                if (filterReplyID) {
                let reply = chats[index].reply.filter(chat => chat.chatID !== action.chatID)
                // let replyCnt = chats[index].reply.filter(chat => chat.chatID === action.chatID)[0];
                // let resendMedia = state.resendMedia.push(replyCnt)
                chats[index].reply = reply;
                return updateObject(state, {tempchat: chats})
                } 
            }
            ++index;
        }
    }
    return updateObject(state, {tempchat: chats})
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
    if (!action.chatID) {
        let filterSelect = chatSelected.filter(cnt => (cnt.mainID === action.mainID) && !cnt.chatID)[0];
        if (filterSelect) {
            let selected = []
            for (let cnt of chatSelected) {
                if ((cnt.mainID === action.mainID) && !cnt.chatID) {

                } else {
                    selected.push(cnt)
                }
            }
            return updateObject(state, {chatSelected: selected})
        }
        
    } else {
        let filterCnt = chatSelected.filter(cnt => cnt.chatID === action.chatID)[0];
        if (filterCnt) {
            chatSelected = chatSelected.filter(cnt => cnt.chatID !== action.chatID);
            return updateObject(state, {chatSelected})
        } 
    }
    
    chatSelected.push({mainID: action.mainID, chatID: action.chatID, edit: action.ID === state.userID})
    
    return updateObject(state, {chatSelected, editChat:  null})
};

const releaseChat =  (state, action) => {
    return updateObject(state, {chatSelected: [], editChat: null})
};

const chatRemoved = (state, action) => {
    let chats = [...state.chat]
    if (chats.length > 0 && action.cnt && action.cnt.length > 0) {
        for (let cnt of action.cnt) {
            if (!cnt.chatID) {
                let chat = chats.filter(chat => chat.chatID === cnt.mainID)[0];
                let index = chats.findIndex(chat => chat.chatID === cnt.mainID)
                if (chat) {
                    chat.delete = true;
                }
                chats[index] = chat
            } else {
                let chat = chats.filter(chat => chat.chatID === cnt.mainID)[0];
                let index = chats.findIndex(chat => chat.chatID === cnt.mainID)
                if (chat) {
                    let filterReply = chat.reply.filter(replyCnt => replyCnt.chatID === cnt.chatID)[0];
                    let filterIndex = chat.reply.findIndex(replyCnt => replyCnt.chatID === cnt.chatID)[0];
                    if (filterReply) {
                        filterReply.delete = true
                    }
                    chat.reply[filterIndex] = filterReply;
                    chats[index] = chat
                }
            }
        }
    }
    return updateObject(state, {chat: chats, chatSelected: [], editChat: null})
};

const groupNotify = (state, action) => {
    return updateObject(state, {groupNotify: action.cnt})
};

const userNotify = (state, action) => {
    return updateObject(state, {userNotify: action.cnt})
};

const editChat = (state, action) => {
    return updateObject(state, {editChat: action.cnt, chatSelected: []})
};

const chatConnect= (state, action) => {
    let members = state.members;
    let navCnt = state.members;
    if(members && members.users && (members.users.online.length > 0 || members.users.offline.length > 0)) {
        let user = members.users.offline.filter(user => user.id === state.userID)[0];
        let users = state.navCnt.users;
        if (user) {
            let updateOffline = members.users.offline.filter(user => user.id !== state.userID);
            members.users.online.push({...user, status: true});
            members.users.offline = updateOffline;
            members.online = members.online + 1;
            members.offline = members.offline - 1;
            users = state.curTab === 'online' ? members.users.online : members.users.offline;
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
        if (user) {
            let updateOnline = members.users.online.filter(user => user.id !== state.userID);
            members.users.offline.push({...user, status: false});
            members.users.online = updateOnline;
            members.online = members.online - 1;
            members.offline = members.offline + 1;
            users = state.curTab === 'online' ? members.users.online : members.users.offline;
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
        case actionTypes.RESET_RESEND_CHAT:
            return resetResendChat(state, action);
        case actionTypes.UPLOAD_MEDIA:
            return uploadMedia(state, action);
        case actionTypes.UPLOAD_MEDIA_START:
            return uploadMediaStart(state, action);
        case actionTypes.UPLOAD_MEDIA_FAIL:
            return uploadMediaFail(state, action);
        case actionTypes.UPLOAD_MEDIA_SET:
            return uploadMediaSet(state, action);
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
        case actionTypes.CREATE_CHAT_FAIL:
            return createChatFail(state, action);
        case actionTypes.CREATE_CHAT_START:
            return createChatStart(state, action);
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
        case actionTypes.GROUP_NOTIFY:
            return groupNotify(state, action);
        case actionTypes.USER_NOTIFY:
            return userNotify(state, action);
        case actionTypes.EDIT_CHAT:
            return editChat(state, action);
        case actionTypes.CHAT_CONNECT:
            return chatConnect(state, action);
        case actionTypes.CHAT_DISCONNECT:
            return chatDisconnect(state, action);
        default: return state
    }
};

export default reducer