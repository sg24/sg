import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';

export function* checkAuthInitSaga(action) {
    let expiresIn =  document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (expiresIn && (new Date(new Date(expiresIn*1000).getTime()) >= new Date().getTime())) {
        yield put(actions.checkAuth(true))
    }
} 