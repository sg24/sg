import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { checkAuthInitSaga } from './auth';
import { fetchCntInitSaga, 
            saveAboutInitSaga,  
            checkLinkInitSaga, 
            changeFavSaga, changeCntInitSaga } from './model';
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
import { fetchShareActiveInitSaga, 
        fetchNavActiveInitSaga,
         resetActiveInitSaga} from './main';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.CHECK_AUTH_INIT, checkAuthInitSaga)
    ])
} 

export function* watchCnt() {
    yield all([
        takeLatest(actionTypes.FETCH_CNT_INIT, fetchCntInitSaga),
        takeLatest(actionTypes.SAVE_ABOUT_INIT, saveAboutInitSaga),
        takeEvery(actionTypes.CHECK_LINK_INIT, checkLinkInitSaga),
        takeEvery(actionTypes.CHANGE_FAVORITE_INIT, changeFavSaga),
        takeLatest(actionTypes.CHANGE_CNT_INIT, changeCntInitSaga)
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
       takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga),
       takeEvery(actionTypes.FETCH_NAV_ACTIVE_INIT, fetchNavActiveInitSaga),
       takeEvery(actionTypes.RESET_ACTIVE_INIT, resetActiveInitSaga)
    ])
}