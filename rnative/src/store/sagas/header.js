import { put } from 'redux-saga/effects';

import axios from '../../axios';
import * as actions from '../../store/actions/index';


export function* headerFilterInitSaga(action) {
    try {
        yield put(actions.headerFilterStart(action.filterCnt));
        let response = yield axios.post('/header', {filterCnt: action.filterCnt, post: true}, {headers: {'data-categ':'headerfilter'}});
        yield put(actions.headerFilter(response.data));
    } catch(err) {
        yield put(actions.headerFilterFail(err))
    }
}

export function* fetchConvInitSaga(action) {
    try {
        yield put(actions.fetchConvStart());
        let friend = yield axios.post('/conv', null, {headers: {'data-categ':'friends'}})
        let group = yield axios.post('/conv', null, {headers: {'data-categ':'allgroup'}})
        // let response = yield axios.post('/conv', null, {headers: {'data-categ':'allconv'}})
        // alert(JSON.stringify( response.data[1]))
        let cnt = {friend: friend.data, group: group.data};
        yield put(actions.fetchConv(cnt));
    } catch(err) {
        yield put(actions.fetchConvFail(err))
    }
}

export function* fetchNotifyInitSaga(action) {
    try {
        yield put(actions.fetchNotifyStart());
        let response = yield axios.post('/header', {fetchCnt: true}, {headers: {'data-categ':'allnotification'}});
        if (response.data.collTotal > 0) {
            yield put(actions.fetchNotify(response.data.coll));
        } else {
            yield put(actions.fetchNotify([]));
        }
    } catch(err) {
        yield put(actions.fetchNotifyFail(err));
    }
}
