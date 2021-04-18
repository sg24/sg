import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { checkAuthInitSaga } from './auth';
import { submitAuthFormSigninInitSaga, 
    submitAuthFormSignupInitSaga, submitAuthFormForgetPassInitSaga } from './authForm';
import { headerFilterInitSaga, fetchConvInitSaga, fetchNotifyInitSaga } from './header';
import { fetchProfileInitSaga, changeProfileInitSaga, submitAboutInitSaga, submitUsernameInitSaga } from './profile';
import { fetchEditFormInitSaga } from './editForm';
import { fetchPageInitSaga, deletePageInitSaga, pageReactionInitSaga } from './page';
import { fetchMediaInfoInitSaga, mediaReactionInitSaga } from './media';
import { fetchChatInitSaga, fetchReplyInitSaga, deleteChatInitSaga } from './chatBox';
import { fetchSharecntInitSaga, shareInitSaga } from './share';
import { externalPageInitSaga } from './externalPage';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.CHECK_AUTH_INIT, checkAuthInitSaga)
    ])
} 

export function* watchAuthForm() {
    yield all([
       takeEvery(actionTypes.SUBMIT_AUTHFORMSIGNIN_INIT, submitAuthFormSigninInitSaga),
       takeEvery(actionTypes.SUBMIT_AUTHFORMSIGNUP_INIT, submitAuthFormSignupInitSaga),
       takeEvery(actionTypes.SUBMIT_AUTHFORMFORGETPASS_INIT, submitAuthFormForgetPassInitSaga)
    ])
}

export function* watchHeader() {
    yield all([
       takeEvery(actionTypes.HEADER_FILTER_INIT, headerFilterInitSaga),
       takeEvery(actionTypes.FETCH_CONV_INIT, fetchConvInitSaga),
       takeEvery(actionTypes.FETCH_NOTIFY_INIT, fetchNotifyInitSaga),
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
       takeEvery(actionTypes.DELETE_CHAT_INIT, deleteChatInitSaga)
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