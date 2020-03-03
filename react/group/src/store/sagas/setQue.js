import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

const CATEG = ['post', 'question', 'social', 'writers', 'poet', 'poeters'
, 'poem','post', 'question', 'social', 'writers', 'poet', 'poeters'
, 'poem'];

export function* fetchCategInitSaga() {
    yield put(actions.fetchCateg(CATEG));
}