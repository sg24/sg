import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPtActiveInitSaga(action) {
    yield put(actions.fetchPtActive(99));
}

export function* fetchShareActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', {userID: action.userID}, {headers: {'data-categ':'postnotification'}});
        yield put(actions.fetchShareActive(response.data));
    } catch(err) {}
}

export function* resetActiveInitSaga(action) {
    try {
        yield axios.patch('/header', {userID: action.userID}, {headers: {'data-categ': action.curTab}});
        yield put(actions.resetActive(action.curTab));
    } catch(err) {}
}