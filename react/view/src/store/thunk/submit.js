import uuid from 'uuid';

import * as actions from '../../store/actions/index';
import { socket } from '../../shared/utility';

export const submitCommentInit = (id, cntGrp, cnt, modelType) => {
    return dispatch => {
        dispatch(actions.submitCommentStart());
        if (modelType === 'reply') {
            socket.emit('createReplyComment',{id, cnt, cntGrp, commentID: uuid()},function(err) {
                dispatch(actions.submitCommentFail(err))
            })
        } else {
            socket.emit('createComment',{id, cntGrp, cnt},function(err) {
                dispatch(actions.submitCommentFail(err))
            })
        }
    }
} 
