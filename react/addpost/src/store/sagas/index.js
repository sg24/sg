import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { fetchNotifyInitSaga, 
            changeFavNotifySaga, 
            fetchNavlistInitSaga, 
            fetchNotifyActiveInitSaga,
            defaultNotifyActiveInitSaga,
            fetchShareActiveInitSaga } from './header';
import { fetchAddpostInitSaga } from './addpost';
            
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

export function* watchAddpost() {
    yield all([
       takeEvery(actionTypes.FETCH_PT_CATEG_INIT, fetchAddpostInitSaga)
    ])
}