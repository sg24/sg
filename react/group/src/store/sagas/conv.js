import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* fetchConvInitSaga(action) {
    const data = [{
        id: '63763637737',
        type: 'grpChat',
        groupImage: '/',
        title: 'The real community for programmers The real community for programmers The real community for programmers',
        lastMsg: 'Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while',
        online: '5353535',
        offline: '63636363' 
    },{
        id: '7575848839939',
        type: 'pvtChat',
        userImage: '/',
        status: true,
        user: 'user user',
        convCreated: '2m ago',
        lastMsg: 'Pls do you know the reson while Pls do you know the reson while Pls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson whilePls do you know the reson while Pls do you know the reson while'
    }]


    yield put(actions.fetchConv([...data]));
}