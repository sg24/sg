import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', { model: 'poet'}, {headers: {'data-categ': ' modelNotify'}});
        if (response.data > 0) {
            yield put(actions.fetchCntActive(response.data));
        }
        return
    } catch(err) {}

}

export function* fetchShareCntActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', { model: 'poet'}, {headers: {'data-categ': 'share'}});
        if (response.data > 0) {
            yield put(actions.fetchShareCntActive(response.data));
        }
        return
    } catch(err) {}
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

export function* resetActiveInitSaga(action) {
    try {
        if (action.curTab === 'share') {
            yield axios.patch('/header', {model: 'poet'}, {headers: {'data-categ': action.curTab}});
        } else {
            yield axios.patch('/header', {model: 'poet'}, {headers: {'data-categ': 'modelNotify'}});
        }
        yield put(actions.resetActive(action.curTab));
    } catch(err) {}
}