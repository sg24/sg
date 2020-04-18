import * as actions from '../actions/index';
import axios from '../../axios';
import { socket, createChat } from '../../shared/utility';
import arraySort from 'array-sort';

export const uploadMediaInit = (cnt, id, categ) => {
    return dispatch => {
        dispatch(actions.uploadMediaSet(cnt.length));
        for (let media of cnt) {
            let type = media.type === 'media' ?  'video' : media.type;
            dispatch(actions.uploadMediaStart(media.chatID, type, 0))
        }

        submit(cnt, 0);

        function submit(media, index) {
            let formContent = new FormData();
            let ext = media[index].file.type.split('/').pop();
            formContent.append('media', media[index].file, `${media[index].chatID}.${ext.split(';')[0]}`);
            formContent.append('type', media[index].type === 'video' ? 'media' : media[index].type);
            formContent.append('format', media[index].format);
            formContent.append('chatID', media[index].chatID);
            axios.post(`/chat/${categ}/${id}`, formContent, {
                headers: {'data-categ': 'uploadcntmedia'},
                onUploadProgress: function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        let type = media[index].type === 'media' ?  'video' : media[index].type;
                        dispatch(actions.uploadMediaStart(media[index].chatID, type , percentage))
                    }
                }  
            }).then((res) => {
                if (!res) {
                    let ext =  cnt[index].file.type.split('/').pop()
                    dispatch(actions.uploadMediaFail(`${cnt[index].chatID}.${ext.split(';')[0]}`,  cnt[index].type === 'video' ? 'media' : cnt[index].type,
                    cnt[index].format, cnt[index].chatID, cnt[index].file))
                } else {
                    socket.emit('mediaRecChat', res.data, (err) => {
                        dispatch(actions.fetchChatFail(err));
                    })
                    createChat(`/chat/${categ}/${id}`, 
                    'setLastMsg', {})
                }
                ++index;
                dispatch(actions.uploadMedia())
                if (index < media.length) {
                    submit(media, index)
                } 
            }).catch((err) => {
                let ext =  cnt[index].file.type.split('/').pop()
                dispatch(actions.uploadMediaFail(`${cnt[index].chatID}.${ext.split(';')[0]}`,  cnt[index].type === 'video' ? 'media' : cnt[index].type,
                cnt[index].format, cnt[index].chatID, cnt[index].file))
                dispatch(actions.uploadMedia())
            });
        }
        
    }
} 

export const createChatInit = (id, categ, msgType, msg, msgID, msgCateg) => {
    return dispatch => {
        dispatch(actions.createChatStart(msgType, msg, msgID));
        axios.post(`/chat/${categ}/${id}`,
        {type: msgType, msg, chatID: msgID} , {
            headers: {
                'data-categ': msgCateg}}).then(res => {
           if (res) {
                dispatch(actions.addNewChat(res.data))
                socket.emit('createChat', res.data, function(err) {
                    dispatch(actions.fetchChatFail(err));
                })
                createChat(`/chat/${categ}/${id}`, 
                    'setLastMsg', {})
           } else {
            dispatch(actions.createChatFail(msgType, msg, msgID, msgCateg));
           }
        }).catch(err => {
            dispatch(actions.createChatFail(msgType, msg, msgID, msgCateg));
        })
    }
};

export const resendChatInit = (id, categ, cnt) => {
    return dispatch => {
        let updateCnt = arraySort(cnt, 'created', {reverse: false});
        submit(updateCnt, 0)
        let curIndex = 0;
        function submit(cnt, index) {
            axios.post(`/chat/${categ}/${id}`,
            {type: cnt[index].msgType, msg: cnt[index].msg, chatID: cnt[index].msgID} , {
                headers: {
                    'data-categ': 'createChat'}}).then(res => {
                ++curIndex;
                if (curIndex < cnt.length) {
                    submit(cnt, curIndex)
                } 
                if (res && res.data) {
                    dispatch(actions.addNewChat(res.data))
                    socket.emit('createChat', res.data, function(err) {
                        dispatch(actions.fetchChatFail(err));
                    })
                    createChat(`/chat/${categ}/${id}`, 
                    'setLastMsg', {})
                } else {
                    dispatch(actions.createChatFail(cnt[index].msgType, cnt[index].msg, cnt[index].msgID, cnt[index].msgCateg));
                }
            }).catch(err => {
                dispatch(actions.createChatFail(cnt[index].msgType, cnt[index].msg, cnt[index].msgID, cnt[index].msgCateg));
            })
        }
    }
};