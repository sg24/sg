import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { checkAuthInitSaga } from './auth';
import { fetchNotifyInitSaga, 
        changeFavNotifySaga, 
        fetchNavlistInitSaga, 
        fetchNotifyActiveInitSaga,
        defaultNotifyActiveInitSaga,
        fetchChatDetInitSaga,
        headerFilterInitSaga } from './header';
import { fetchShareActiveInitSaga, fetchNavActiveInitSaga, resetActiveInitSaga} from './main';
import { fetchCntInitSaga } from './examtab';

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
        takeEvery(actionTypes.FETCH_CHATDET_INIT, fetchChatDetInitSaga),
        takeEvery(actionTypes.HEADER_FILTER_INIT, headerFilterInitSaga)
     ])
}

export function* watchExamtab() {
    yield all([
        takeEvery(actionTypes.FETCH_CNT_INIT, fetchCntInitSaga)
    ])
}

export function* watchMain() {
    yield all([
       takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga),
       takeEvery(actionTypes.FETCH_NAV_ACTIVE_INIT, fetchNavActiveInitSaga),
       takeEvery(actionTypes.RESET_ACTIVE_INIT, resetActiveInitSaga)
    ])
}