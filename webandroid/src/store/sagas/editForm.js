import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios';

export function* fetchEditFormInitSaga (action) {
    yield put(actions.editFormReset());

    try {
        let response = yield axios.post(`/${action.form}`, {cntID: action.cntID}, {
            headers: {
                'data-categ': `getone${action.form}`}});
        let cnt = response.data  ? response.data : null
        if (!cnt) {
            alert('No content found');
        }
        yield put(actions.fetchEditForm(cnt, action.form))
    } catch(err) {
       yield put(actions.fetchEditFormFail(err, action.form))
    }
}