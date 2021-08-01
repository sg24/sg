import { put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

import * as actions from '../actions/index';
import axios from '../../axios';

export function* checkAuthInitSaga(action) {
    try {
       let expiresIn = yield AsyncStorage.getItem('expiresIn');
       let userID = yield AsyncStorage.getItem('userID');
       let token =  yield AsyncStorage.getItem('token');
       let settings = yield AsyncStorage.getItem('settings');
       if (expiresIn && (new Date(expiresIn*1000).getTime() >= new Date().getTime()) && token) {
            try {
                let response = yield axios.post('/header', {}, {headers: {'data-categ':'userimg'}, timeout: 500});
                if (response.data.url) {
                    yield AsyncStorage.setItem('username', response.data.name);
                    yield AsyncStorage.setItem('userImage', Constants.manifest.extra.BASE_IMAGE_URL + response.data.url);
                    yield put(actions.checkUserName(response.data.name));
                    yield put(actions.checkUserImg({uri: Constants.manifest.extra.BASE_IMAGE_URL + response.data.url}));
                } else {
                    yield put(actions.checkUserName(response.data.name));
                    yield AsyncStorage.setItem('username', response.data.name);
                }
                yield put(actions.loggedIn(userID));
            } catch(err) {
                let username = yield AsyncStorage.getItem('username');
                yield put(actions.checkUserName(username));
                yield put(actions.loggedIn(userID));
            }
        
        } else {
            yield put(actions.checkAuth());
        }

        if (settings) {
            yield put(actions.saveSettings(JSON.parse(settings)));
        }
    } catch(err) {
        yield put(actions.checkAuthFail(err))
    }
} 