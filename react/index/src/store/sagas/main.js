import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPtActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', { model: 'post'}, {headers: {'data-categ': ' modelNotify'}});
        yield put(actions.fetchPtActive(response.data));
        return
    } catch(err) {}

}

export function* fetchQueActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', { model: 'question'}, {headers: {'data-categ': ' modelNotify'}});
        yield put(actions.fetchQueActive(response.data));
        return
    } catch(err) {}

}

export function* fetchCntActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', { model: 'poet'}, {headers: {'data-categ': ' modelNotify'}});
        yield put(actions.fetchCntActive(response.data));
    } catch(err) {}

}

export function* fetchShareCntActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', { model: 'question'}, {headers: {'data-categ': 'share'}});
        yield put(actions.fetchShareCntActive(response.data));
    } catch(err) {}
}

export function* fetchReqActiveInitSaga(action) {
    try {
        let response = yield axios.post('/users', null,{headers: {'data-categ': 'request-activeOnly'}});
        yield put(actions.fetchReqActive(response.data));
    } catch(err) {}

}

export function* fetchShareActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', {}, {headers: {'data-categ':'notification'}});
        yield put(actions.fetchShareActive(response.data));        
    } catch(err) {}
}

export function* resetActiveInitSaga(action) {
    try {
        if (action.curTab === 'helpme') {
            yield axios.patch('/header', {model: 'question'}, {headers: {'data-categ': 'share'}});
        } else {
            yield axios.patch('/header', {model: action.curTab}, {headers: {'data-categ': 'modelNotify'}});
        }
        yield put(actions.resetActive(action.curTab));
    } catch(err) {}
}