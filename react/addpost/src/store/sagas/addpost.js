import { put } from 'redux-saga/effects';

import { updateObject, changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';

export function* fetchAddpostInitSaga(action) {
    const category = [
        "Socal","Socal","Socal","Entertainment","TECH","Socal","Socal"
    ]

    yield put(actions.fetchPtCateg(category));
}
