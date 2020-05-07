import { put } from 'redux-saga/effects';

import axios from '../../axios';
import * as actions from '../../store/actions/index';

export function* fetchTagsInitSaga() {
    try {
        let response = yield axios.post('/post', null,{headers: {'data-categ':'postCateg'}});
        yield put(actions.fetchTags(response.data));
    } catch(e) {}

}

export function* fetchTagsCategInitSaga(action) {
    try {
        yield put(actions.fetchTagsCategStart())
        let response = yield axios.post('/header', {categ: String(action.path).split('/')[1]}, {headers: {'data-categ':'category'}});
        yield put(actions.fetchTagsCateg(response.data));
    } catch(e) {}

}