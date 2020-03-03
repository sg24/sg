import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios';

export function* checkAuthInitSaga(action) {
    let expiresIn =  document.cookie.replace(/(?:(?:^|.*;\s*)expiresIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (expiresIn && (new Date(new Date(expiresIn*1000).getTime()) >= new Date().getTime())) {
        yield put(actions.checkAuth(true))
        try {
            let response = yield axios.post('/header', {}, {headers: {'data-categ':'userimg'}});
            if (response.data.url) {
                yield put(actions.checkUserImg(response.data.url));
            } else {
                yield put(actions.checkUserName(response.data.name));
            }
            
        } catch(err) {}
        
    } 
} 