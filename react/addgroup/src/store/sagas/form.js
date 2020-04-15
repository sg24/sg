import { put, delay } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';
import fileAxios from 'axios';

export function* fetchCategInitSaga(action) {
    try {
        yield put(actions.fetchCategStart());
        const category = yield axios.post('/group', null,{headers: {'data-categ':'groupCateg'}});
        const categ =  category.data && category.data.length > 0 ? category.data : [];
        yield put(actions.fetchCateg(categ))
    } catch(err){
        yield put(actions.fetchCategFail(err));
        yield delay(2000);
        yield put(actions.fetchCategReset());
    }
    
}

export function* addCategInitSaga(action) {
    let categs =  String(action.categ).split(',');
    let transformCateg = [];
    for (let categ of categs) {
        transformCateg.push(String(categ).trim().charAt(0).toUpperCase() + String(categ).trim().toLowerCase().slice(1));
    }

    let removeDuplicate = [...new Set(transformCateg)];
        
    yield put(actions.addCateg(removeDuplicate));
}

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
        let response = yield axios.post('/users', null,{headers: {'data-categ':`allteacher-${action.userStatus}`}});
        yield put(actions.fetchUsers(response.data, action.userStatus));
    } catch(err) {
        yield put(actions.fetchUsersFail(err))
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
