import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';


export function* submitFormInitSaga (action) {
    yield put(actions.submitFormStart());

    try {
        yield axios.post('/forget/reset', action.formData);
        yield put(actions.formSubmitted())
    } catch(err) {
        let error = err.message
       yield put(actions.submitFormFail(error))
    }
} 