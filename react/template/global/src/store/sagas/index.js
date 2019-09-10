import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { fetchUsersInitSaga, filterUserInitSaga, filterUserSelectInitSaga, shareUserInitSaga } from './share';
import { fetchTagsInitSaga } from './tags';
import { fetchTrdInitSaga, changeFavTrdSaga } from './trend';
import { fetchCategInitSaga } from './setQue';
import { fetchConvInitSaga } from './conv';
import { fetchNotifyInitSaga, 
            changeFavNotifySaga, 
            fetchNavlistInitSaga, 
            fetchNotifyActiveInitSaga,
            defaultNotifyActiveInitSaga,
            fetchShareActiveInitSaga } from './header';
import { fetchMainActiveInitSaga, defaultMainActiveInitSaga } from './main';

export function* watchShare() {
    yield all([
        takeEvery(actionTypes.FETCH_USERS_INIT, fetchUsersInitSaga),
        takeEvery(actionTypes.FILTER_USER_INIT, filterUserInitSaga),
        takeEvery(actionTypes.FILTER_USER_SELECT_INIT, filterUserSelectInitSaga),
        takeEvery(actionTypes.SHARE_USER_INIT, shareUserInitSaga),
    ])

}

export function* watchTags() {
    yield takeEvery(actionTypes.FETCH_TAGS_INIT, fetchTagsInitSaga)
}

export function* watchTrd() {
    yield all([
        takeEvery(actionTypes.FETCH_TRD_INIT, fetchTrdInitSaga),
        takeEvery(actionTypes.CHANGE_FAVORITE_TRD_INIT, changeFavTrdSaga)
    ])
}

export function* watchSetQue() {
    yield takeEvery(actionTypes.FETCH_CATEG_INIT, fetchCategInitSaga)
}

export function* watchConv() {
    yield takeEvery(actionTypes.FETCH_CONV_INIT, fetchConvInitSaga)
}

export function* watchHeader() {
     yield all([
        takeEvery(actionTypes.FETCH_NOTIFY_INIT, fetchNotifyInitSaga),
        takeEvery(actionTypes.CHANGE_FAVORITE_NOTIFY_INIT, changeFavNotifySaga),
        takeEvery(actionTypes.FETCH_NAVLIST_INIT, fetchNavlistInitSaga),
        takeEvery(actionTypes.FETCH_NOTIFY_ACTIVE_INIT, fetchNotifyActiveInitSaga),
        takeEvery(actionTypes.DEFAULT_NOTIFYACTIVE_INIT, defaultNotifyActiveInitSaga),
        takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga)
     ])
}

export function* watchMain() {
    yield all([
       takeEvery(actionTypes.FETCH_MAINACTIVE_INIT, fetchMainActiveInitSaga),
       takeEvery(actionTypes.DEFAULT_MAINACTIVE_INIT, defaultMainActiveInitSaga)
    ])
}