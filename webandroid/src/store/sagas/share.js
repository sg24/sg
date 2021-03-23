import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchSharecntInitSaga(action) {
    try {
        yield put(actions.fetchSharecntStart());
        let response = yield axios.post(`/${action.shareType}`,{
            start: action.start, limit: action.limit },{
            headers: {
                'data-categ': action.cntID}});
        let cnt = response.data  ? response.data : null;
        yield put(actions.fetchSharecnt(cnt ? cnt : {friend: []}));
    } catch(err) {
        yield put(actions.fetchSharecntFail(err));
    }
};

export function* shareInitSaga(action) {
    try {
        yield put(actions.shareStart());
        let response = yield axios.post(`/${action.shareType}`,{
            cnt: JSON.stringify(action.cnt), reciepent:  JSON.stringify(action.reciepent)},{
            headers: {
                'data-categ': action.cntID}});
        let cnt = response.data  ? response.data : null;
        yield put(actions.share());
    } catch(err) {
        yield put(actions.shareFail(err));
    }
};