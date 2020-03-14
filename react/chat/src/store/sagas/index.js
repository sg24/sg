import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { checkAuthInitSaga } from './auth';
import { fetchNotifyInitSaga, 
        changeFavNotifySaga, 
        fetchNavlistInitSaga, 
        fetchNotifyActiveInitSaga,
        defaultNotifyActiveInitSaga,
        headerFilterInitSaga } from './header';
import { fetchShareActiveInitSaga, resetActiveInitSaga} from './main';
import { fetchCategInitSaga } from './model';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.CHECK_AUTH_INIT, checkAuthInitSaga)
    ])
} 
            
export function* watchHeader() {
     yield all([
        takeEvery(actionTypes.FETCH_NOTIFY_INIT, fetchNotifyInitSaga),
        takeEvery(actionTypes.CHANGE_FAVORITE_NOTIFY_INIT, changeFavNotifySaga),
        takeEvery(actionTypes.FETCH_NAVLIST_INIT, fetchNavlistInitSaga),
        takeEvery(actionTypes.FETCH_NOTIFY_ACTIVE_INIT, fetchNotifyActiveInitSaga),
        takeEvery(actionTypes.DEFAULT_NOTIFYACTIVE_INIT, defaultNotifyActiveInitSaga),
        takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga),
        takeEvery(actionTypes.HEADER_FILTER_INIT, headerFilterInitSaga)
     ])
}

export function* watchModel() {
    // yield all([
    // ])
}

export function* watchMain() {
    yield all([
       takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga),
       takeEvery(actionTypes.RESET_ACTIVE_INIT, resetActiveInitSaga)
    ])
}