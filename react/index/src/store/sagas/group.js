import { put } from 'redux-saga/effects';

import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';

export function* fetchGroupInitSaga(action) {
    const data = [{
        id: '366336636363636',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        groupCreated: '18/8/19',
        category: 'social',
        groupImage: '/',
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        users: 11100000,
        userOnline: 12000000,
        authUser: false
    }, 
    {
        id: '928645645377727',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        groupCreated: '18/8/19',
        category: 'social',
        groupImage: '/',
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        users: 11100000,
        userOnline: 12000000,
        authUser: true
    },{
        id: '4778383839222',
        author: 'user user',
        authorID: 'user_id',
        userImage: '/',
        groupCreated: '18/8/19',
        category: 'social',
        groupImage: '/',
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        users: 11100000,
        userOnline: 12000000,
        authUser: true
    }
    ]

    let grpArray = [];

    for (let grp of data) {
        const newGrp = {...grp};
        const valid = action.userID === newGrp.authorID;
        const newData = updateObject(grp, {userOpt: valid});
        grpArray.push(newData);
    }


    yield put(actions.fetchGroup(grpArray));
}

export function* filterGrpInitSaga(action) {
    const grpArray = [...action.groups];
    let filteredGrp = grpArray.filter(grp => grp.category === action.tag);
    yield put(actions.filterGrp(filteredGrp));
}