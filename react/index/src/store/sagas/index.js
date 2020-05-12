import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { checkAuthInitSaga } from './auth';
import { fetchCntInitSaga, joinGrpInitSaga, changeFavSaga, changeCntInitSaga } from './model';
import { fetchCntCategInitSaga, filterContentInitSaga } from './filter';
import { fetchUsersInitSaga, filterUserInitSaga, filterUserSelectInitSaga, shareUserInitSaga } from './share';
import { fetchTagsInitSaga, fetchTagsCategInitSaga } from './tags';
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
        fetchJoinActiveInitSaga, 
        fetchQueActiveInitSaga,
        fetchCntActiveInitSaga,  
         fetchShareActiveInitSaga,
         fetchShareCntActiveInitSaga,
         fetchReqActiveInitSaga, 
         fetchNavActiveInitSaga,
         resetActiveInitSaga} from './main';
import { filterGrpUserInitSaga, fetchInfoInitSaga, changeGrpCntInitSaga } from './group';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.CHECK_AUTH_INIT, checkAuthInitSaga)
    ])
} 

export function* watchCnt() {
    yield all([
        takeLatest(actionTypes.FETCH_CNT_INIT, fetchCntInitSaga),
        takeLatest(actionTypes.JOIN_GRP_INIT, joinGrpInitSaga),
        takeEvery(actionTypes.CHANGE_FAVORITE_INIT, changeFavSaga),
        takeLatest(actionTypes.CHANGE_CNT_INIT, changeCntInitSaga)
    ])
} 

export function* watchFilter() {
    yield all([
        takeEvery(actionTypes.FETCH_CNTCATEG_INIT, fetchCntCategInitSaga),
        takeEvery(actionTypes.FILTER_CONTENT_INIT, filterContentInitSaga)
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
        takeEvery(actionTypes.FETCH_TRD_INIT, fetchTrdInitSaga),
        takeEvery(actionTypes.FETCH_TAGS_CATEG_INIT, fetchTagsCategInitSaga)
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
        takeEvery(actionTypes.FETCH_JOIN_ACTIVE_INIT, fetchJoinActiveInitSaga),
       takeEvery(actionTypes.FETCH_PT_ACTIVE_INIT, fetchPtActiveInitSaga),
       takeEvery(actionTypes.FETCH_QUE_ACTIVE_INIT, fetchQueActiveInitSaga),
       takeEvery(actionTypes.FETCH_CNT_ACTIVE_INIT, fetchCntActiveInitSaga),
       takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga),
       takeEvery(actionTypes.FETCH_SHARECNT_ACTIVE_INIT, fetchShareCntActiveInitSaga),
       takeEvery(actionTypes.FETCH_REQ_ACTIVE_INIT, fetchReqActiveInitSaga),
       takeEvery(actionTypes.FETCH_NAV_ACTIVE_INIT, fetchNavActiveInitSaga),
       takeEvery(actionTypes.RESET_ACTIVE_INIT, resetActiveInitSaga)
    ])
}

export function* watchGroup() {
    yield all([
        takeEvery(actionTypes.FILTER_GRPUSER_INIT, filterGrpUserInitSaga),
        takeLatest(actionTypes.FETCH_INFO_INIT, fetchInfoInitSaga),
        takeEvery(actionTypes.CHANGE_GRPCNT_INIT, changeGrpCntInitSaga)
    ])

}