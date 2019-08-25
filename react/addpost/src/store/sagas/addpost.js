import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

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

export function* fetchAddpostInitSaga(action) {
    const category = [
        "Socal","Socal","Entertainment","TECH","Socal","Socal"
    ]

    yield put(actions.fetchPtCateg(category));
}

export function* addPostCategInitSaga(action) {
    const category = [
        "Socal","Socal","Entertainment","TECH","Socal","Socal"
    ]
    const ptCateg = [...category];
    let newCateg = ptCateg.filter(categ => categ === action.categ);
    if (newCateg.length < 1) {
        yield put(actions.addPtCateg(action.categ));
        return
    }
    yield put(actions.addPtCateg(action.categ));
}

export function* checkLinkInitSaga(action) {
    if (action.link && action.link.length > 10) {
       yield put(actions.checkLink(true));
       return
    }
    yield put(actions.checkLink(false));
}

export function* fetchUsersInitSaga(action) {
    let updateUser = users.filter(user => user.userStatus === action.userStatus);
    yield put(actions.fetchUsers(updateUser, action.userStatus));
}

export function* filterUserInitSaga(action) {
    String('').indexOf()
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
    
    // users.sort((a, b) => {
    //     return a.user - b.user;
    // });

    yield put(actions.showUserSelect(usersArray));
}
