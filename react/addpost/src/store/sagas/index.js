import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { fetchNotifyInitSaga, 
            changeFavNotifySaga, 
            fetchNavlistInitSaga, 
            fetchNotifyActiveInitSaga,
            defaultNotifyActiveInitSaga,
            fetchShareActiveInitSaga } from './header';
import { fetchAddpostInitSaga, addPostCategInitSaga, checkLinkInitSaga } from './addpost';
            
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
       takeEvery(actionTypes.FETCH_PT_CATEG_INIT, fetchAddpostInitSaga),
       takeEvery(actionTypes.ADD_PT_CATEG_INIT, addPostCategInitSaga),
       takeEvery(actionTypes.CHECK_LINK_INIT, checkLinkInitSaga)
    ])
}