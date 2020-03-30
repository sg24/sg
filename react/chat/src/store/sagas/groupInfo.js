import { put, delay } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios';

export function* fetchUsersInitSaga () {
    try {
        let response = yield axios.post('/users', null,{headers: {'data-categ':`allteacher-notab`}});
        yield put(actions.fetchUsers(response.data));
    } catch(err) {
        yield put(actions.fetchUsersFail(err))
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

export function* fetchInfoInitSaga(action) {
    yield put(actions.fetchInfoStart(action.status))
    try {
        let response;
        if (action.status === 'request') {
            response = yield axios.post('/group', {id: action.id},{headers: {'data-categ':`grpreq`}});
        } else {
            response = yield axios.post('/group', {id: action.id, status: action.status},{headers: {'data-categ':`grpinfo`}});
        }
        yield put(actions.fetchInfo(response.data));
    } catch(err) {
        yield put(actions.fetchInfoFail(err))
    }
}

export function* changeCntInitSaga(action) {
    yield put(actions.changeCntStartInit(action.user, action.categ))
    if (!action.confirm) {
        yield put(actions.changeCntStart(action.id,action.user,action.categ, action.username, action.curTab))
        return;
    }
    try {
        yield axios.post('/group', {id: action.id, user: action.user}, {
            headers: {'data-categ': action.categ}})
        yield put(actions.changeCnt())
        yield delay(1000);
        if (action.curTab === 'request') {
            yield put(actions.removeRequest(action.id))
        }

        yield put(actions.changeCntReset(action.user))
    } catch(err){
        yield put(actions.changeCntFail(err))
        yield delay(1000);
        yield put(actions.changeCntReset(false))
    }
}


export function* filterMemberInitSaga(action) {
    let filterUser = null;
    if (!action.filterContent) {
         filterUser = action.users
     } else {
         filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
     }
    yield put(actions.filterMember(filterUser))
 }
