import { put, delay } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPrfInitSaga(action) {
    try {
        let response = yield axios.post(`/user/profile/${action.userID}`, null,{
            headers: {
                'data-categ': 'userdet'}});
        let cnt = response.data  ? response.data : {}
        yield put(actions.fetchPrf(cnt));
    } catch(err){
        yield put(actions.fetchPrfFail(err));
    }
    
}

export function* changePrfInitSaga(action) {
    if (!action.confirm) {
        yield put(actions.changePrfStart(action.title, action.id, action.det, action.modelType))
        return;
    }

    try {
        yield axios.patch('/users', {id: action.id}, {headers: {'data-categ': action.det}});
        yield put(actions.changePrf())
    } catch(err){
        yield put(actions.changePrfFail(err))
        yield delay(1000);
        yield put(actions.changePrfReset(false))
    }
}