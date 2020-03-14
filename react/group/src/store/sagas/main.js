import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchJoinActiveInitSaga(action) {
    try {
        // let response = yield axios.post('/group', { model: 'group'}, {headers: {'data-categ': 'requestTotal'}});
        // if (response.data > 0) {
        //     yield put(actions.fetchJoinActive(response.data));
        // }
        // return
    } catch(err) {}

}

export function* fetchReqActiveInitSaga(action) {
    try {
        let response = yield axios.post('/group', null, {headers: {'data-categ': 'requestTotal'}});
        if (response.data > 0) {
            yield put(actions.fetchReqActive(response.data));
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
        // yield axios.patch('/header', {model: action.curTab}, {headers: {'data-categ': 'groupNotify'}});
        // yield put(actions.resetActive(action.curTab));
    } catch(err) {}
}