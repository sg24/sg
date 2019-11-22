import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';


export function* submitFormInitSaga (action) {
    yield put(actions.submitFormStart());

    try {
        yield axios.post('/login', action.formData);
        yield put(actions.formSubmitted())
    } catch(err) {
        let error = err.response ? err.response.data : err.message;
       yield put(actions.submitFormFail(error))
    }
} 