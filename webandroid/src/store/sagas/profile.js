import { put, delay } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchProfileInitSaga(action) {
    try {
        yield put(actions.fetchProfileStart());
        let response = yield axios.post(`/user/profile/${action.userID}`, null,{
            headers: {
                'data-categ': 'userdet'}});
        let cnt = response.data  ? typeof response.data === 'object' ?  response.data : {} : {}
        yield put(actions.fetchProfile(cnt));
    } catch(err){
        yield put(actions.fetchProfileFail(err));
    }
    
}

export function* changeProfileInitSaga(action) {
    if (!action.confirm) {
        yield put(actions.changeProfileStart(action.title, action.id, action.det, false, action.info ))
        return;
    }
    yield put(actions.changeProfileStart(action.title, action.id, action.det, true, action.info))

    try {
        yield axios.patch('/users', {id: action.id}, {headers: {'data-categ': action.det}});
        yield put(actions.changeProfile(true))
    } catch(err){
        yield put(actions.changeProfileFail(err));
    }
}

export function* submitAboutInitSaga(action) {
    try {
        yield put(actions.submitAboutStart())
        yield axios.post(`/user/profile/${action.userID}`, {det: action.cnt}, {
            headers: {
                'data-categ': 'about'}});
        yield put(actions.submitAbout(action.cnt));
    } catch(err){
        yield put(actions.submitAboutFail(err))
    }
}

export function* submitUsernameInitSaga(action) {
    try {
        yield put(actions.submitUsernameStart())
        yield axios.post(`/user/profile/${action.userID}`, {username: action.username}, {
            headers: {
                'data-categ': 'username'}});
        yield put(actions.submitUsername(action.username));
        yield delay(1000)
        yield put(actions.submitUsernameReset());
    } catch(err){
        yield put(actions.submitUsernameFail(err))
    }
}