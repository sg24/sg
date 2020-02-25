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
import { fetchCategInitSaga, 
            addCategInitSaga, 
            checkLinkInitSaga, 
            fetchUsersInitSaga,
            filterUserInitSaga,
            showUserSelectInitSaga} from './form';

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

export function* watchForm() {
    yield all([
       takeEvery(actionTypes.FETCH_CATEG_INIT, fetchCategInitSaga),
       takeEvery(actionTypes.ADD_CATEG_INIT, addCategInitSaga),
       takeEvery(actionTypes.CHECK_LINK_INIT, checkLinkInitSaga),
       takeEvery(actionTypes.FETCH_USERS_INIT, fetchUsersInitSaga),
       takeEvery(actionTypes.FILTER_USER_INIT, filterUserInitSaga),
       takeEvery(actionTypes.SHOW_USER_SELECT_INIT, showUserSelectInitSaga)
    ])
}

export function* watchMain() {
    yield all([
       takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga),
       takeEvery(actionTypes.RESET_ACTIVE_INIT, resetActiveInitSaga)
    ])
}

export function* rootSaga() {
    yield all([
        watchAuth(),
        watchHeader(),
        watchForm(),
        watchMain()
    ])
}