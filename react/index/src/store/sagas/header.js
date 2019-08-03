import { put } from 'redux-saga/effects';

import { updateObject, changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';

export function* fetchNotifyInitSaga(action) {
    const data = [{
        id: '234444',
        cntGrp: 'post',
        category: 'Post',
        title: 'What is your view about all this stuffs',
        view: 11100000,
        comment: 12000000,
        favorite: 11000000, 
        liked: true
    },{
        id: '464738383838',
        cntGrp: 'poet',
        category: 'Poet/Writer',
        desc: 'The quote is the best nature of lif, this is from the databaseThe quote is the best nature of lif, this is from the database',
        helpFull: 11100000,
        favorite: 12000000,
        comment: 12000000,
        liked: false
    },{
        id: '546447737378',
        cntGrp: 'question',
        category: 'Question',
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        helpFull: 11100000,
        notHelpFull: 12000000,
        favorite: 112000,
        liked: true
    }, {
        id: '88584903030',
        cntGrp: 'group', 
        category: 'Group',
        desc: 'The is a description of the sites to be used when this is rendered to the database,this is rendered to the database',
        users: 11100000,
        userOnline: 12000000,
    }
    ]

    let notifyArray = [];

    for (let notify of data) {
        const newPt = {...notify};
        const valid = action.userID === newPt.authorID;
        const newData = updateObject(notify, {userOpt: valid});
        notifyArray.push(newData);
    }

    yield put(actions.fetchNotify(notifyArray));
}

export function* changeFavNotifySaga(action) {
    yield put(actions.changeFavNotify(changeFav(action.notify, action.notifyID)));
}

export function* fetchNavlistInitSaga(action) {
    const data = [{
        cntGrp: 'post',
        category: [
            "Socal","Socal","Socal","Entertainment","TECH","Socal","Socal"
        ]
    }, {
        cntGrp: 'question',
        category: [
            "Social", "TECH","Entertainment","TECH","socal","socal"
        ]
    }, {
        cntGrp: 'onlineque',
        category: [
            "Socal","Socal","Entertainment","socal","socal","socal"
        ]
    }, {
        cntGrp: 'group',
        category: [
            "Entertainment","TECH","Socal","Socal","Socal","Socal","Socal"
        ]
    }, {
        cntGrp: 'poet',
        category: [
            "Socal","Socal","Entertainment","Socal","Socal","Socal"
        ]
    }];

    let categArray = [];

    for (let categ of data) {
        if (categ.cntGrp === action.category) {
            categArray.push(...categ.category)
        }
    }

    yield put(actions.fetchNavlist(action.category, categArray))
}

export function* fetchNotifyActiveInitSaga(action) {
    yield put(actions.fetchNotifyActive('9'));
}

export function* defaultNotifyActiveInitSaga(action) {
    yield put(actions.defaultNotifyActive());
}

export function* fetchShareActiveInitSaga(action) {
    yield put(actions.fetchShareActive('9'));
}
