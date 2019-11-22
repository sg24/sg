import { takeEvery, all } from 'redux-saga/effects';
import { submitFormInitSaga } from './form';

import * as actionTypes from '../../store/actions/actionTypes';

export function* watchForm() {
    yield all([
       takeEvery(actionTypes.SUBMIT_FORM_INIT, submitFormInitSaga)
    ])
}
