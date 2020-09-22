import { put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

import * as actions from '../actions/index';
import axios from '../../axios';

export function* checkAuthInitSaga(action) {
    try {
       let expiresIn = yield AsyncStorage.getItem('expiresIn');
       let userID = yield AsyncStorage.getItem('userID');
       if (expiresIn && (new Date(expiresIn*1000).getTime() >= new Date().getTime())) {
            try {
                let response = yield axios.post('/header', {}, {headers: {'data-categ':'userimg'}, timeout: 8000});
                if (response.data.url) {
                    yield AsyncStorage.setItem('username', response.data.name);
                    yield AsyncStorage.setItem('userImage', response.data.url);
                    yield put(actions.checkUserName(response.data.name));
                    yield put(actions.checkUserImg({uri: response.data.url}));
                } else {
                    yield put(actions.checkUserName(response.data.name));
                    yield AsyncStorage.setItem('username', response.data.name);
                }
                yield put(actions.loggedIn(userID));
            } catch(err) {
                yield put(actions.loggedIn(userID));
            }
        
        } else {
            yield put(actions.checkAuth());
        }
    } catch(err) {
        yield put(actions.checkAuthFail(err))
    }
} 