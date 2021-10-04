import { put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

import * as actions from '../actions/index';
import axios from '../../axios';

export function* checkAuthInitSaga(action) {
    try {
        let userInfo = yield AsyncStorage.multiGet(['expiresIn', 'userID', 'token', 'settings']);
        let expiresIn = userInfo[0][1];
        let userID = userInfo[1][1];
        let token =  userInfo[2][1];
        let settings = userInfo[3][1];

       if (expiresIn && (new Date(expiresIn*1000).getTime() > new Date().getTime()) && token) {
            yield put(actions.loggedIn(userID));
        } else {
            yield put(actions.checkAuth());
        }

        if (settings) {
            let savedSettings = JSON.parse(settings);
            yield put(actions.saveSettings({...savedSettings, isRTL: action.isRTL}));
        } else {
            yield put(actions.saveSettings({isRTL: action.isRTL}));
        }
    } catch(err) {
        yield put(actions.checkAuthFail(err))
    }
} 


export function* profileInfoInitSaga(action) {
    try {
        let response = yield axios.post('/header', {}, {headers: {'data-categ':'userimg'}, timeout: 2000});
        if (response.data.url) {
            yield AsyncStorage.setItem('username', response.data.name);
            yield AsyncStorage.setItem('userImage', Constants.manifest.extra.BASE_IMAGE_URL + response.data.url);
            yield put(actions.checkUserName(response.data.name));
            yield put(actions.checkUserImg({uri: Constants.manifest.extra.BASE_IMAGE_URL + response.data.url}));
        } else {
            yield put(actions.checkUserName(response.data.name));
            yield AsyncStorage.setItem('username', response.data.name);
        }
    } catch(err) {
        let username = yield AsyncStorage.getItem('username');
        yield put(actions.checkUserName(username));
    }
}