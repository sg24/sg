import uuid from 'uuid';

import * as actions from '../../store/actions/index';
import { socket, createChat } from '../../shared/utility';

export const submitCommentInit = (id, cntGrp, cnt, modelType) => {
    return dispatch => {
        dispatch(actions.submitCommentStart());
        if (modelType === 'reply') {
            createChat(`/view/${cntGrp}/${id}`, 
            'createReplyComment', {id, cntGrp, cnt, commentID: uuid()}).then(cnt=> {
                socket.emit('createReplyComment', cnt, function(err) {
                    dispatch(actions.submitCommentFail(err))
                })
            }).catch(err =>{
                dispatch(actions.submitCommentFail(err))
            })
        } else {
            createChat(`/view/${cntGrp}/${id}`, 
            'createComment', {id, cntGrp, cnt}).then(cnt=> {
                socket.emit('createComment', cnt, function(err) {
                    dispatch(actions.submitCommentFail(err))
                })
            }).catch(err =>{
                dispatch(actions.submitCommentFail(err))
            })
        }
    }
} 
