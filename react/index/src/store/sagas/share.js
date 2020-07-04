import { put, delay } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';


export function* fetchUsersInitSaga () {
    try {
        let response = yield axios.post('/users', null,{headers: {'data-categ':`friend`}});
        yield put(actions.fetchUsers(response.data.cnt));
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

export function* filterUserSelectInitSaga(action) {
    let filterUser = null;
    if (!action.filterContent) {
        filterUser = action.userSelect
    } else {
        filterUser = action.userSelect.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1 );
    }
    yield put(actions.filterUserSelect(filterUser))
}

export function* shareUserInitSaga(action) {
    let shareUser = [];

    for (let user of [...action.userSelect] ) {
        shareUser.push(user.id)
    }
    
    try {
        yield put(actions.shareUserStart())
        let field = action.cntType === 'post' ? 'postID' : action.cntType === 'question' ? 'queID' : 'pwtID'
        yield axios.patch('/header', {users: JSON.stringify(shareUser), id: action.shareID, model: action.cntType, field},{headers: {'data-categ': 'shareuser'}});
        yield delay(1000);
        yield put(actions.shareUser());
    } catch(err){
        yield put(actions.shareUserfail(err));
        yield delay(1000);
        yield put(actions.shareUser());
    }
}