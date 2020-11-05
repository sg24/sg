import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios';
import AsyncStorage from '@react-native-community/async-storage';

export function* submitAuthFormSigninInitSaga (action) {
    yield put(actions.submitAuthFormStart('signin'));

    try {
        let response = yield axios.post('/login', action.formData);
        let username = ['username', response.data.username];
        let token = ['token', response.data.token];
        let userID = ['userID', response.data.userID];
        let expiresIn = ['expiresIn', String(response.data.expiresIn)]
        yield AsyncStorage.multiSet([username, userID, token, expiresIn])
        yield put(actions.authFormSubmitted('signin'))
        yield put(actions.loggedIn(response.data.userID));
    } catch(err) {
        let error = null
        if (err.response) {
            if(err.response.data && err.response.data.keyValue) {
                error = err.message
            } else {
                error = typeof err.response.data !== 'object' ? err.response.data.startsWith('<!doctype') ? 'Network Error' : err.response.data : 'Connection Error';
            } 
        } else {
            error = err.message
        }
       yield put(actions.submitAuthFormFail('signin',error))
    }
} 

export function* submitAuthFormSignupInitSaga (action) {
    yield put(actions.submitAuthFormStart('signup'));

    try {
        let response = yield axios.post('/signup', action.formData);
        let username = ['username', action.formData.username];
        let token = ['token', response.data.token];
        let userID = ['userID', response.data.userID];
        let expiresIn = ['expiresIn', String(response.data.expiresIn)]
        yield AsyncStorage.multiSet([username, token, userID, expiresIn])
        yield put(actions.authFormSubmitted('signup'))
        yield put(actions.loggedIn(response.data.userID));
    } catch(err) {
        let error = null
        if (err.response) {
            if(err.response.data && err.response.data.keyValue) {
                for (let key in err.response.data.keyValue) {
                    if (key === 'email') {
                        error = `${key}  already taken`;
                    } else if (key === 'username') {
                        error = `${key} already taken`;
                    } else {
                        error = err.message
                    }
                }
            } else {
                error = typeof err.response.data !== 'object' ? err.response.data.startsWith('<!doctype') ? 'Network Error' : err.response.data : 'Connection Error';
            }
            
          } else {
              error = err.message
          }
       yield put(actions.submitAuthFormFail('signup', error))
    }
} 

export function* submitAuthFormForgetPassInitSaga (action) {
    yield put(actions.submitAuthFormStart('reset'));
    try {
        yield axios.post('/forget/password', action.formData);
        yield put(actions.authFormSubmitted('reset'))
    } catch(err) { 
        let error = null
        if (err.response) {
            if(err.response.data && err.response.data.keyValue) {
                error = err.message
            } else {
                error = typeof err.response.data !== 'object' ? err.response.data.startsWith('<!doctype') ? 'Network Error' : err.response.data : 'Connection Error';
            } 
          } else {
              error = err.message
          }
       yield put(actions.submitAuthFormFail('reset', error));
    }
} 