import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { checkAuthInitSaga } from './auth';
import { submitAuthFormSigninInitSaga, 
    submitAuthFormSignupInitSaga, submitAuthFormForgetPassInitSaga } from './authForm';
import { headerFilterInitSaga, fetchConvInitSaga, fetchNotifyInitSaga } from './header';
import { fetchProfileInitSaga, changeProfileInitSaga } from './profile';

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
       takeEvery(actionTypes.FETCH_PROFILE_INIT, fetchProfileInitSaga),
       takeEvery(actionTypes.CHANGE_PROFILE_INIT, changeProfileInitSaga)
    ])
}