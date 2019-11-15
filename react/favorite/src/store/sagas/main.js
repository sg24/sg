import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntActiveInitSaga(action) {
    yield put(actions.fetchCntActive(99));
}

export function* fetchShareActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', {userID: action.userID}, {headers: {'data-categ':'notification'}});
        if (response.data > 0) {
            yield put(actions.fetchShareActive(response.data));
        }
        return
    } catch(err) {}
}

export function* resetActiveInitSaga(action) {
    let modelType = action.curTab === ''|| action.curTab === 'post' ? 'post' : action.curTab === 'question' ?
    'question':'poet';
    try {
        if (action.curTab === 'share') {
            yield axios.patch('/header', {userID: action.userID, model: 'question'}, {headers: {'data-categ': action.curTab}});
        }
        yield put(actions.resetActive(action.curTab));
    } catch(err) {}
}