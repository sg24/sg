import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';

export function* fetchAddpostInitSaga(action) {
    const category = [
        "Socal","Socal","Entertainment","TECH","Socal","Socal"
    ]

    yield put(actions.fetchPtCateg(category));
}

export function* addPostCategInitSaga(action) {
    const category = [
        "Socal","Socal","Entertainment","TECH","Socal","Socal"
    ]
    const ptCateg = [...category];
    let newCateg = ptCateg.filter(categ => categ === action.categ);
    if (newCateg.length < 1) {
        yield put(actions.addPtCateg(action.categ));
        return
    }
    yield put(actions.addPtCateg(action.categ));
}
