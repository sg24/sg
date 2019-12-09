import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';
import { updateObject } from '../../shared/utility';

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

export function* fetchTotalInitSaga(action) {
    try {
        let response = yield axios.post('/header', {model: 'post'},{headers: {'data-categ':'myModel'}});
        yield put(actions.fetchTotal(response.data));
    } catch(e){}
}

export function* filterContentInitSaga(action) {
    
    let categs = [];
    for (let categ of action.content.category) {
        categs.push(categ.category);
    }
    let filterDet = updateObject(action.content, {category: categs});
    let filterCnt = JSON.stringify(filterDet);
    if(!action.content.apply) {
        try {
            yield put(actions.filterContentStart());
            let response = yield axios.get('/post', {headers: {'data-categ':'postSearch=='+filterCnt}});
            yield put(actions.filterContent(response.data));
        } catch(err) {
            yield put (actions.filterContentFail(err))
        }
        return
    }
    yield put(actions.filterPost(filterCnt));
}