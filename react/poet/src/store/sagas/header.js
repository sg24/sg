import { put } from 'redux-saga/effects';

import axios from '../../axios';
import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';

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
    try {
        let response = yield axios.post('/header', {}, {headers: {'data-categ':'allnotification'}});
            yield put(actions.fetchNotifyActive(response.data.collTotal))
    } catch(err) {}
}

export function* defaultNotifyActiveInitSaga(action) {
    try {
         yield axios.post('/header', {}, {headers: {'data-categ':'resetnotification'}});
        yield put(actions.defaultNotifyActive());
    } catch(err) {}
}

export function* headerFilterInitSaga(action) {
    try {
        yield put(actions.headerFilterStart(action.filterPos, action.filterLastPos));
        let response = yield axios.post('/header', {filterCnt: action.filterCnt}, {headers: {'data-categ':'headerfilter'}});
        yield put(actions.headerFilter(response.data));
    } catch(err) {
        yield put(actions.headerFilterFail(err))
    }
}