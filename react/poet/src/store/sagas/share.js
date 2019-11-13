import { put, delay } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';


const users = [{
    author: 'user',
    authorID: 'user_id',
    userImage: '/',
    students: 99,
    status: 'on'
}, 
{
    author: 'user user',
    authorID: 'user_ids',
    userImage: '/',
    students: "99+",
    status: 'off'
},{
    author: 'user user',
    authorID: 'new_user_id',
    userImage: '/',
    students: 99,
    status: 'on'
}
];

export function* fetchUsersInitSaga () {
    yield put(actions.fetchUsers(users));
}

export function* filterUserInitSaga(action) {
   let filterUser = users.filter(user => user.author.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);

   if (!action.filterContent) {
        filterUser = users;
   }

   yield put(actions.filterUser(filterUser))
}

export function* filterUserSelectInitSaga(action) {
   
    let filterUser = action.userSelect.filter(user => user.author.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1 );
  
    if (!action.filterContent) {
        filterUser = action.userSelect
    }

    yield put(actions.filterUserSelect(filterUser))
}

export function* shareUserInitSaga(action) {
    let shareUser = [];

    for (let user of [...action.userSelect] ) {
        shareUser.push(user.authorID)
    }
    
    try {
        yield put(actions.shareUserStart())
        yield axios.patch('/header', {users: JSON.stringify(shareUser), id: action.shareID, model: 'question'},{headers: {'data-categ': 'shareuser'}});
        yield delay(1000);
        yield put(actions.shareUser());
    } catch(err){
        yield put(actions.shareUserfail(err));
        yield delay(1000);
        yield put(actions.shareUser());
    }
}