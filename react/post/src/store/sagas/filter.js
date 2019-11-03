import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPtCategInitSaga(action) {
    try {
        if (action.categ && action.categ.length > 0) {
            yield put (actions.fetchPtCateg([...action.categ]))
        } else {
            let response = yield axios.get('/post', {headers: {'data-categ':'postCateg'}});
            yield put(actions.fetchPtCateg(response.data));
        }
    } catch(e){}
}