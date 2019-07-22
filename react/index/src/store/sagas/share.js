import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
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

   let filterUser = users.filter(user => user.author === action.filterContent);

   if (!action.filterContent) {
        filterUser = users;
   }

   yield put(actions.filterUser(filterUser))
}

export function* filterUserSelectInitSaga(action) {
   
    let filterUser = action.userSelect.filter(user => user.author === action.filterContent);
  
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

    yield put(actions.defaultShareProps())
}