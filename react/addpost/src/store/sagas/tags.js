import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';

const TAGS = ['post', 'question', 'social', 'writers', 'poet', 'poeters'
, 'poem'];

export function* fetchTagsInitSaga() {
    yield put(actions.fetchTags(TAGS));
}