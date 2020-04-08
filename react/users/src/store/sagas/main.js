import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

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
        yield put(actions.resetActive('user'));
    } catch(err) {}
}

export function* fetchNavActiveInitSaga(action) {
    try {
        let response = yield axios.post('conv', {}, {headers: {'data-categ':'navActive'}});
        yield put(actions.fetchNavActive(response.data));        
    } catch(err) {}
}