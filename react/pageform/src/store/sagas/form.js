import { put, delay } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';
import fileAxios from 'axios';

export function* checkLinkInitSaga(action) {
    let link = String(action.link).trim();
    try {
        let response = yield fileAxios.get(link, {responseType: 'blob', timeout: 8000});
        if (response.data.type.startsWith(action.mediaType + '/')) {
            yield put(actions.checkLink(null, {file: response.data, url: window.URL.createObjectURL(response.data)}));   
            return;
        }
        throw new Error(`Unknown format, Only ${action.mediaType} files`);
       
    } catch(err) {
        yield put(actions.checkLink(err, null));   
    }
}

export function* fetchUsersInitSaga(action) {
    try {
        yield put(actions.fetchStart())
        let response = yield axios.post('/users', null,{headers: {'data-categ':`friend-${action.userStatus}`}});
        yield put(actions.fetchUsers(response.data.cnt, action.userStatus));
    } catch(err) {
        yield put(actions.fetchUsersFail(err))
    }
}

export function* fetchGroupInitSaga(action) {
    try {
        yield put(actions.fetchStart())
        let response = yield axios.post('/group', null,{headers: {'data-categ':`mygroup`}});
        yield put(actions.fetchGroup(response.data.cnt));
    } catch(err) {
        yield put(actions.fetchGroupFail(err))
    }
}

export function* filterUserInitSaga(action) {
       let filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1 );

       if (!action.filterContent && action.users && action.users.length > 0) {
            filterUser = [...action.users];
       }
    
       yield put(actions.filterUser(filterUser))
}

export function* showUserSelectInitSaga(action) {
    let filterUser = action.users.filter(user => action.userID.indexOf(user.id) !== -1);
    yield put(actions.showUserSelect(filterUser));
}
