import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPrivateActiveInitSaga(action) {
    try {
        let response = yield axios.post('/conv', null, {headers: {'data-categ': 'privateActive'}});
        if (response.data > 0) {
            yield put(actions.fetchPrivateActive(response.data));
        }
        return
    } catch(err) {}

}

export function* fetchGroupActiveInitSaga(action) {
    try {
        let response = yield axios.post('/conv', null, {headers: {'data-categ': 'groupActive'}});
        if (response.data > 0) {
            yield put(actions.fetchGroupActive(response.data));
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

export function* fetchNavActiveInitSaga(action) {
    try {
        let response = yield axios.post('/conv', {}, {headers: {'data-categ':'navActive'}});
        yield put(actions.fetchNavActive(response.data));        
    } catch(err) {}
}