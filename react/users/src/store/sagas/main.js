import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntActiveInitSaga(action) {
    yield put(actions.fetchCntActive(99));
}

export function* fetchShareActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', {}, {headers: {'data-categ':'notification'}});
        if (response.data > 0) {
            yield put(actions.fetchShareActive(response.data));
        }
        return
    } catch(err) {}
}

export function* fetchShareCntActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', {model: 'poet'}, {headers: {'data-categ': 'share'}});
        if (response.data > 0) {
            yield put(actions.fetchShareCntActive(response.data));
        }
        return
    } catch(err) {}
}


export function* resetActiveInitSaga(action) {
    try {
        if (action.curTab === 'share') {
            yield axios.patch('/header', {userID: action.userID, model: 'poet'}, {headers: {'data-categ': action.curTab}});
        }
        yield put(actions.resetActive(action.curTab));
    } catch(err) {}
}