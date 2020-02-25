import { put, delay } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';


export function* submitFormInitSaga (action) {
    yield put(actions.submitFormStart());

    try {
        yield axios.post('/forget/reset', action.formData);
        yield put(actions.formSubmitted())
    } catch(err) {
       yield put(actions.submitFormFail(err.response.data.msg))
       if(err.response.data.expire) {
        delay(1000);
        yield put(actions.submitTokenExpire())
       }
    }
} 