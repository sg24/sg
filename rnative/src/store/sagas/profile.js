import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchProfileInitSaga(action) {
    try {
        yield put(actions.fetchProfileStart());
        let response = yield axios.post(`/user/profile/${action.userID}`, null,{
            headers: {
                'data-categ': 'userdet'}});
        let cnt = response.data  ? response.data : {}
        yield put(actions.fetchProfile(cnt));
    } catch(err){
        yield put(actions.fetchProfileFail(err));
    }
    
}