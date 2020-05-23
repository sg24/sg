import arraySort from 'array-sort';

export const fetchChat = (chat) => {
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
    return updateChat
}; 

export const createChatStart = (chats, userID, msgType, msg, msgID) => {
    let content = arraySort(chats, 'position', {reverse: false});
    let lastChat = content.length > 0 ? content[content.length - 1] : {};
    if (msg && !msg.editMsg) {
        if (lastChat.ID === userID) {
            lastChat.reply.push({ID: userID, position: lastChat.position, cntType: msgType, sent: false, viewed: false, 
                chatID: msgID, mainID: lastChat.chatID,delete: false,pending: true, msg, created: new Date().getTime()});
            content[content.length - 1] = lastChat;
        } else {
            content.push({ID: userID, position: !lastChat.position ? 0 : lastChat.position + 1, cntType: msgType, sent: false, viewed: false, 
                chatID: msgID, delete: false, pending: true, msg, reply: [], created: new Date().getTime()})
        }
    } else {
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
    return content
};

export const addNewChat =  (chat, chatCnt) => {
    let curIndex = 0;
    let filterChat = chat.filter((cnt, index) => {
        if (cnt.chatID === chatCnt[0].chatID) {
            curIndex = index;
            return true;
        }
        return false
    })[0];
    if (filterChat) {
        chat[curIndex] = chatCnt[0];
    } else {
        chat.push(...chatCnt)
    }
    return chat
};

export const uploadMediaStart = (chat, tempchat, userID, chatID, percentage, cntType) => {
    let chats = tempchat.length < 1 ? [...chat] : [...tempchat];
    let content = arraySort(chats, 'position', {reverse: false});
    let lastChat = content.length > 0 ? content[content.length - 1] : null;
    if (chatID && !chatID.mainID) {
        if (lastChat) {
            if (lastChat.ID === userID) {
                let curIndex = 0;
                if (lastChat.chatID === chatID) {
                    lastChat = {ID: userID, upload: true, position: lastChat.position, cntType, 
                        chatID, percentage, pending: true,reply: [], created: new Date().getTime()}
                } else {
                    let filterLastChat = lastChat.reply.filter((chat, index) => {
                        if (chat.chatID === chatID) {
                            curIndex = index;
                            return true;
                        }
                        return false;
                    })[0];
                    
                    if (filterLastChat) {
                        lastChat.reply[curIndex].percentage = percentage;
                    } else {
                        lastChat.reply.push({upload: true, pending: true,position: lastChat.position, cntType, 
                            chatID, percentage});
                        lastChat.replyID ? lastChat.replyID.push(chatID) : lastChat['replyID'] = [chatID]
                    }
                }
                content[content.length - 1] = lastChat;
            } else {
                content.push({ID: userID, upload: true, position: lastChat.position + 1, cntType, 
                    chatID, percentage, pending: true,reply: [], created: new Date().getTime()})
            }
        } else {
            content.push({ID: userID, upload: true, position: 0, cntType, 
                chatID, percentage, pending: true,reply: [], created: new Date().getTime()})
        }
    } else {
        let msg = chatID;
        if (!msg.chatID) {
            let chat = content.filter(chat => chat.chatID === msg.mainID)[0];
            let index = content.findIndex(chat => chat.chatID === msg.mainID)
            if (chat) {
                chat.cntType = cntType;
                chat['percentage'] = percentage
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
                    filterReply.cntType = cntType;
                    filterReply['percentage'] = percentage
                }
                chat.reply[filterIndex] = filterReply;
                content[index] = chat
            }
        }
    }
    return content
};

export const holdChat =  (chatSelected, userID, chatID, mainID, ID) => {
    if (!chatID) {
        let filterSelect = chatSelected.filter(cnt => (cnt.mainID === mainID) && !cnt.chatID)[0];
        if (filterSelect) {
            let selected = []
            for (let cnt of chatSelected) {
                if ((cnt.mainID === mainID) && !cnt.chatID) {

                } else {
                    selected.push(cnt)
                }
            }
            return selected
        }
        
    } else {
        let filterCnt = chatSelected.filter(cnt => cnt.chatID === chatID)[0];
        if (filterCnt) {
            chatSelected = chatSelected.filter(cnt => cnt.chatID !== chatID);
            return chatSelected
        } 
    }
    chatSelected.push({mainID, chatID, edit: ID === userID})
    
    return chatSelected
};

export const chatRemoved = (chats, cnts) => {
    if (chats.length > 0 && cnts && cnts.length > 0) {
        for (let cnt of cnts) {
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
    return chats
};