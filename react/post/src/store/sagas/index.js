import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { checkAuthInitSaga } from './auth';
import { fetchPostInitSaga, changeFavSaga, changePostInitSaga } from './post';
import { fetchPtCategInitSaga, filterContentInitSaga, fetchTotalInitSaga } from './filter';
import { fetchUsersInitSaga, filterUserInitSaga, filterUserSelectInitSaga, shareUserInitSaga } from './share';
import { fetchTagsInitSaga } from './tags';
import { fetchTrdInitSaga } from './trend';
import { fetchCategInitSaga } from './setQue';
import { fetchConvInitSaga } from './conv';
import { fetchNotifyInitSaga, 
            changeFavNotifySaga, 
            fetchNavlistInitSaga, 
            fetchNotifyActiveInitSaga,
            defaultNotifyActiveInitSaga,
            fetchChatDetInitSaga,
            headerFilterInitSaga } from './header';
import { fetchPtActiveInitSaga,  
         fetchShareActiveInitSaga,
         fetchShareCntActiveInitSaga, 
         fetchNavActiveInitSaga,
         resetActiveInitSaga} from './main';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.CHECK_AUTH_INIT, checkAuthInitSaga)
    ])
} 

export function* watchPt() {
    yield all([
        takeLatest(actionTypes.FETCH_POST_INIT, fetchPostInitSaga),
        takeEvery(actionTypes.CHANGE_FAVORITE_INIT, changeFavSaga),
        takeLatest(actionTypes.CHANGE_POST_INIT, changePostInitSaga)
    ])
} 

export function* watchFilter() {
    yield all([
        takeEvery(actionTypes.FETCH_PTCATEG_INIT, fetchPtCategInitSaga),
        takeEvery(actionTypes.FILTER_CONTENT_INIT, filterContentInitSaga),
        takeEvery(actionTypes.FETCH_TOTAL_INIT, fetchTotalInitSaga)
    ])
} 

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
        takeEvery(actionTypes.FETCH_TRD_INIT, fetchTrdInitSaga)
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
       takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga),
       takeEvery(actionTypes.FETCH_CHATDET_INIT, fetchChatDetInitSaga),
       takeEvery(actionTypes.HEADER_FILTER_INIT, headerFilterInitSaga)
    ])
}

export function* watchMain() {
    yield all([
       takeEvery(actionTypes.FETCH_PT_ACTIVE_INIT, fetchPtActiveInitSaga),
       takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga),
       takeEvery(actionTypes.FETCH_SHARECNT_ACTIVE_INIT, fetchShareCntActiveInitSaga),
       takeEvery(actionTypes.FETCH_NAV_ACTIVE_INIT, fetchNavActiveInitSaga),
       takeEvery(actionTypes.RESET_ACTIVE_INIT, resetActiveInitSaga)
    ])
}