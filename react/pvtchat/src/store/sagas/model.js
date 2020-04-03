import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntInitSaga(action) {
    yield put(actions.fetchCntStart());
    try {
        let response = yield axios.post(`/chat/${action.categ}/${action.id}`, { id: action.id }, {
            headers: {
                'data-categ': 'userdet'}});
        yield put(actions.fetchCnt(response.data));
        
    } catch(err){
        yield put(actions.fetchCntFail(err))
    }
    
}

export function* fetchMemberInitSaga(action) {
    yield put(actions.fetchChatStart());
    try {
        let response = yield axios.post(`/chat/${action.categ}/${action.id}`, { }, {
            headers: {
                'data-categ': 'member'}});
        let cnt = response.data;
        yield put(actions.fetchMember(cnt));
        
    } catch(err){
        yield put(actions.fetchMemberFail(err))
    }
}


export function* fetchChatInitSaga(action) {
    yield put(actions.fetchChatStart());
    try {
        let response = yield axios.post(`/chat/${action.categ}/${action.id}`, { id: action.id,
            skipChat: action.skipChat, chatLimit: action.chatLimit}, {
            headers: {
                'data-categ': 'pvtchat'}});
        let cnt = response.data;
        yield put(actions.fetchChat(cnt.chat, action.skipChat, cnt.chatTotal));
        
    } catch(err){
        yield put(actions.fetchChatFail(err))
    }
}

export function* filterUserInitSaga(action) {
    let filterUser = null;
    if (!action.filterContent) {
         filterUser = action.users
     } else {
         filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
     }
    yield put(actions.filterUser(filterUser))
 }

 export function* fetchGroupInitSaga(action) {
    yield put(actions.fetchGroupStart());
   
    try {
        let response = yield axios.post(`/chat/${action.categ}/${action.id}`, null ,{headers: {
                'data-categ': 'allgroup'}});
                console.log(response.data)
        yield put(actions.fetchGroup(response.data));
        
    } catch(err){
        yield put(actions.fetchGroupFail(err))
    }
}

export function* fetchPvtuserInitSaga(action) {
    yield put(actions.fetchPvtuserStart());
   
    try {
        let response = yield axios.post(`/chat/${action.categ}/${action.id}`, {
            curTab: action.curTab
        } ,{headers: {
                'data-categ': 'friends'}});
        yield put(actions.fetchPvtuser(response.data));
        
    } catch(err){
        yield put(actions.fetchPvtuserFail(err))
    }
}