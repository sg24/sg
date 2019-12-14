import { put, delay } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';


export function* fetchUsersInitSaga () {
    try {
        let response = yield axios.get('/users', {headers: {'data-categ':`allteacher-notab`}});
        yield put(actions.fetchUsers(response.data));
    } catch(err) {
        yield put(actions.fetchUsersFail(err))
    }
}

export function* filterUserInitSaga(action) {
   let filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
   if (!action.filterContent) {
        filterUser = action.users
    }
   yield put(actions.filterUser(filterUser))
}

export function* filterUserSelectInitSaga(action) {
    let filterUser = action.userSelect.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1 );
  
    if (!action.filterContent) {
        filterUser = action.userSelect
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
        yield axios.patch('/header', {users: JSON.stringify(shareUser), id: action.shareID, model: 'poet', field: 'pwtID'},{headers: {'data-categ': 'shareuser'}});
        yield delay(1000);
        yield put(actions.shareUser());
    } catch(err){
        yield put(actions.shareUserfail(err));
        yield delay(1000);
        yield put(actions.shareUser());
    }
}