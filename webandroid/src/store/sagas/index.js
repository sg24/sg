import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { checkAuthInitSaga, profileInfoInitSaga } from './auth';
import { submitAuthFormSigninInitSaga, 
    submitAuthFormSignupInitSaga, submitAuthFormForgetPassInitSaga, submitAuthFormResetPassInitSaga } from './authForm';
import { headerFilterInitSaga, fetchConvInitSaga, fetchNotifyInitSaga, headerPushNotificationInitSaga } from './header';
import { fetchProfileInitSaga, changeProfileInitSaga, submitAboutInitSaga, submitUsernameInitSaga } from './profile';
import { fetchEditFormInitSaga } from './editForm';
import { fetchPageInitSaga, deletePageInitSaga, pageReactionInitSaga } from './page';
import { fetchSidebarInitSaga } from './sidebar';
import { fetchMediaInfoInitSaga, mediaReactionInitSaga } from './media';
import { fetchChatInitSaga, fetchReplyInitSaga, deleteChatInitSaga, chatBoxReactionInitSaga } from './chatBox';
import { fetchSharecntInitSaga, shareInitSaga } from './share';
import { fetchSelectcntInitSaga, selectInitSaga, selectReactionInitSaga } from './select';
import { externalPageInitSaga } from './externalPage';
import { updateSettingsInitSaga } from './settings';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.CHECK_AUTH_INIT, checkAuthInitSaga),
        takeEvery(actionTypes.PROFILE_INFO_INIT, profileInfoInitSaga)
    ])
} 

export function* watchAuthForm() {
    yield all([
       takeEvery(actionTypes.SUBMIT_AUTHFORMSIGNIN_INIT, submitAuthFormSigninInitSaga),
       takeEvery(actionTypes.SUBMIT_AUTHFORMSIGNUP_INIT, submitAuthFormSignupInitSaga),
       takeEvery(actionTypes.SUBMIT_AUTHFORMFORGETPASS_INIT, submitAuthFormForgetPassInitSaga),
       takeEvery(actionTypes.SUBMIT_AUTHFORMRESETPASS_INIT, submitAuthFormResetPassInitSaga)
    ])
}

export function* watchHeader() {
    yield all([
       takeEvery(actionTypes.HEADER_FILTER_INIT, headerFilterInitSaga),
       takeEvery(actionTypes.FETCH_CONV_INIT, fetchConvInitSaga),
       takeEvery(actionTypes.FETCH_NOTIFY_INIT, fetchNotifyInitSaga),
       takeEvery(actionTypes.HEADER_PUSHNOTIFICATION_INIT, headerPushNotificationInitSaga),
    ])
}

export function* watchProfile() {
    yield all([
       takeLatest(actionTypes.FETCH_PROFILE_INIT, fetchProfileInitSaga),
       takeEvery(actionTypes.CHANGE_PROFILE_INIT, changeProfileInitSaga),
       takeEvery(actionTypes.SUBMIT_ABOUT_INIT, submitAboutInitSaga),
       takeEvery(actionTypes.SUBMIT_USERNAME_INIT, submitUsernameInitSaga)
    ])
}

export function* watchEditForm() {
    yield all([
       takeLatest(actionTypes.FETCH_EDITFORM_INIT, fetchEditFormInitSaga)
    ])
}

export function* watchPage() {
    yield all([
       takeLatest(actionTypes.FETCH_PAGE_INIT, fetchPageInitSaga),
       takeEvery(actionTypes.DELETE_PAGE_INIT, deletePageInitSaga),
       takeEvery(actionTypes.PAGE_REACTION_INIT, pageReactionInitSaga)
    ])
}

export function* watchSidebar() {
    yield all([
       takeEvery(actionTypes.FETCH_SIDEBAR_INIT, fetchSidebarInitSaga)
    ])
}

export function* watchMedia() {
    yield all([
       takeLatest(actionTypes.FETCH_MEDIAINFO_INIT, fetchMediaInfoInitSaga),
       takeEvery(actionTypes.MEDIA_REACTION_INIT, mediaReactionInitSaga),
    ])
}

export function* watchChatBox() {
    yield all([
       takeLatest(actionTypes.FETCH_CHAT_INIT, fetchChatInitSaga),
       takeLatest(actionTypes.FETCH_REPLY_INIT, fetchReplyInitSaga),
       takeEvery(actionTypes.DELETE_CHAT_INIT, deleteChatInitSaga),
       takeEvery(actionTypes.CHATBOX_REACTION_INIT, chatBoxReactionInitSaga)
    ])
}

export function* watchShare() {
    yield all([
       takeLatest(actionTypes.FETCH_SHARECNT_INIT, fetchSharecntInitSaga),
       takeEvery(actionTypes.SHARE_INIT, shareInitSaga)
    ])
}

export function* watchExternalPage() {
    yield all([
       takeLatest(actionTypes.EXTERNAL_PAGE_INIT, externalPageInitSaga)
    ])
}

export function* watchSelect() {
    yield all([
       takeLatest(actionTypes.FETCH_SELECTCNT_INIT, fetchSelectcntInitSaga),
       takeEvery(actionTypes.SELECT_INIT, selectInitSaga),
       takeEvery(actionTypes.SELECT_REACTION_INIT, selectReactionInitSaga)
    ])
}

export function* watchSettings() {
    yield all([
       takeLatest(actionTypes.UPDATE_SETTINGS_INIT, updateSettingsInitSaga)
    ])
}