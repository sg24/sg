import { put } from 'redux-saga/effects';

import axios from '../../axios';
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
    let notify = changeFav(action.notify ,action.notifyID);
    yield put(actions.changeFavNotifyStart(notify.updateStartArray));
    yield put(actions.changeFavNotify(notify.updateDataArray));
}

export function* fetchNavlistInitSaga(action) {
    try {
        yield put(actions.fetchNavlistStart());
        let response = yield axios.post('/header', {categ: action.category}, {headers: {'data-categ':'category'}});
        yield put(actions.fetchNavlist(action.category, response.data))
    } catch(e) {}
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


export function* headerFilterInitSaga(action) {
    try {
        yield put(actions.headerFilterStart(action.filterPos));
        let response = yield axios.post('/header', {filterCnt: action.filterCnt}, {headers: {'data-categ':'headerfilter'}});
        yield put(actions.headerFilter(response.data));
    } catch(err) {
        yield put(actions.headerFilterFail(err))
    }
}