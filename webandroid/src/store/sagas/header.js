import { put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

import axios from '../../axios';
import * as actions from '../../store/actions/index';


export function* headerFilterInitSaga(action) {
    try {
        let filterCnt = String(action.filterCnt);
        yield put(actions.headerFilterStart(filterCnt));
        let response = yield axios.post('/header', {filterCnt}, {headers: {'data-categ':'headerfilter'}});
        yield put(actions.headerFilter(response.data));
    } catch(err) {
        yield put(actions.headerFilterFail(err))
    }
}

export function* fetchConvInitSaga(action) {
    try {
        yield put(actions.fetchConvStart(action.start));
        let response = yield axios.post('/conv', {start: action.start, limit: action.limit}, {headers: {'data-categ':'friends'}})
        let cnt = response.data ? response.data : null;
        yield put(actions.fetchConv(cnt, action.start));
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


export function* headerPushNotificationInitSaga(action) {
    try {
        yield put(actions.headerPushNotificationStart());
        let response = yield axios.post('/users', {token: action.token, platform: action.platform}, {headers: {'data-categ':'getNotification'}});
        alert(response)
        yield put(actions.headerPushNotification(response.data))
        yield AsyncStorage.setItem('notification', JSON.stringify(response.data ? response.data.notification : {}));
    } catch(err) {
        alert(err)
        yield put(actions.headerPushNotificationFail(err));
    }
}