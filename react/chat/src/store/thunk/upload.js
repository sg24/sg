import * as actions from '../actions/index';
import axios from '../../axios';
import { socket } from '../../shared/utility';

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
                socket.emit('mediaRecChat', res.data, (err) => {
                    dispatch(actions.uploadMediaFail(err))
                })
                dispatch(actions.uploadMedia(res.data))
                ++index;
                if (index < media.length) {
                    submit(media, index)
                }
            }).catch((err) => {
                dispatch(actions.uploadMediaFail(err))
            });
        }
        
    }
} 