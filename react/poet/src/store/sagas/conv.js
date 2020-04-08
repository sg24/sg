import { put } from 'redux-saga/effects';

import axios from '../../axios';
import * as actions from '../../store/actions/index';

export function* fetchConvInitSaga(action) {

    try {
        let response = yield axios.post('/conv', {}, {headers: {'data-categ':'allconv'}});
        yield put(actions.fetchConv(response.data));       
    } catch(err) {}
    
}