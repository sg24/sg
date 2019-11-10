import { put, delay } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';
import fileAxios from 'axios';

const users = [{
    id: '454537dggdgd',
    user: 'User',
    userImage: '/',
    userStatus: 'online',
    students: 99
},{
    id: '293874756gfdyey33',
    user: 'User User',
    userImage: '/',
    userStatus: 'offline',
    students: 99
},{
    id: '572ghgd898393838',
    user: 'User',
    userImage: '/',
    userStatus: 'online',
    students: 90
},{
    id: '2ii3yr4ygdbbdbdsjjw',
    user: 'User User',
    userImage: '/',
    userStatus: 'online',
    students: 99
}]

export function* fetchCategInitSaga(action) {
    try {
        yield put(actions.fetchCategStart());
        const category = yield axios.post('/header', {categ: 'post'}, {headers: {'data-categ':'category'}});
        const categ =  category.data && category.data.length > 0 ? category.data : null;
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
    let updateUser = users.filter(user => user.userStatus === action.userStatus);
    yield put(actions.fetchUsers(updateUser, action.userStatus));
}

export function* filterUserInitSaga(action) {
       let filterUser = action.users.filter(user => user.user.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1 );

       if (!action.filterContent && action.users && action.users.length > 0) {
            filterUser = [...action.users];
       }
    
       yield put(actions.filterUser(filterUser))
}

export function* showUserSelectInitSaga(action) {
    let usersArray = [];
    let usersID = [...action.userID];
    for (let user of users) {
        let filterUser = usersID.filter(userID => userID === user.id);
        if (filterUser.length > 0) {
            usersArray.push({...user})
        }
    }

    yield put(actions.showUserSelect(usersArray));
}
