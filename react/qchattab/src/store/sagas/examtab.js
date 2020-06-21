import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios';

export function* fetchCntInitSaga(action) {
    try {
        yield put(actions.fetchCntStart());
        let response = yield axios.post('/examtab', {contentID: action.id}, {headers: {'data-categ':'examcnt'}});
        yield put(actions.fetchCnt(response.data));
    } catch(err) {
        console.log(err)
        yield put(actions.fetchCntFail(err));
    }
}
