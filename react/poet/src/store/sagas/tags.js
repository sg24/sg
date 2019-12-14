import { put } from 'redux-saga/effects';

import axios from '../../axios';
import * as actions from '../../store/actions/index';

export function* fetchTagsInitSaga() {
    try {
        let response = yield axios.get('/poet', {headers: {'data-categ':'postCateg'}});
        yield put(actions.fetchTags(response.data));
    } catch(e) {}

}