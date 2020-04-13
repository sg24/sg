import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../../store/actions/actionTypes';
import { checkAuthInitSaga } from './auth';
import { fetchNotifyInitSaga, 
        changeFavNotifySaga, 
        fetchNavlistInitSaga, 
        fetchNotifyActiveInitSaga,
        defaultNotifyActiveInitSaga,
        fetchChatDetInitSaga,
        headerFilterInitSaga } from './header';
import { fetchShareActiveInitSaga, resetActiveInitSaga} from './main';
import { fetchCntInitSaga, fetchChatInitSaga, 
    filterUserInitSaga, fetchGroupInitSaga, fetchMemberInitSaga,fetchPvtuserInitSaga } from './model';
    import { fetchUsersInitSaga, filterMemberInitSaga ,
         fetchInfoInitSaga, changeCntInitSaga } from './groupInfo';
import { fetchPrfInitSaga, changePrfInitSaga } from './profile';

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

export function* watchPrf() {
    yield all([
        takeLatest(actionTypes.FETCH_PRF_INIT, fetchPrfInitSaga),
        takeLatest(actionTypes.CHANGE_PRF_INIT, changePrfInitSaga)
    ])
} 

export function* watchModel() {
    yield all([
        takeEvery(actionTypes.FETCH_CNT_INIT, fetchCntInitSaga),
        takeEvery(actionTypes.FILTER_USER_INIT, filterUserInitSaga),
        takeEvery(actionTypes.FETCH_CHAT_INIT, fetchChatInitSaga),
        takeEvery(actionTypes.FETCH_GROUP_INIT, fetchGroupInitSaga),
         takeEvery(actionTypes.FETCH_PVTUSER_INIT, fetchPvtuserInitSaga),
         takeEvery(actionTypes.FETCH_MEMBER_INIT, fetchMemberInitSaga)
    ])
}

export function* watchMain() {
    yield all([
       takeEvery(actionTypes.FETCH_SHARE_ACTIVE_INIT, fetchShareActiveInitSaga),
       takeEvery(actionTypes.RESET_ACTIVE_INIT, resetActiveInitSaga)
    ])
}

export function* watchGroupInfo() {
    yield all([
        takeEvery(actionTypes.FETCH_USERS_INIT, fetchUsersInitSaga),
        takeEvery(actionTypes.FETCH_INFO_INIT, fetchInfoInitSaga),
        takeEvery(actionTypes.CHANGE_CNT_INIT, changeCntInitSaga),
        takeEvery(actionTypes.FILTER_MEMBER_INIT, filterMemberInitSaga)
    ])

}