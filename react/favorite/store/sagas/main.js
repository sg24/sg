import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchShareActiveInitSaga(action) {
    try {
        let response = yield axios.post('/header', {}, {headers: {'data-categ':'notification'}});
        yield put(actions.fetchShareActive(response.data));        
    } catch(err) {}
}

export function* resetActiveInitSaga(action) {
    try {
         yield axios.patch('/header', {model: action.curTab}, {headers: {'data-categ': 'modelNotify'}});
        yield put(actions.resetActive(action.curTab));
    } catch(err) {}
}