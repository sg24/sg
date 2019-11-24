import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';
import { updateObject } from '../../shared/utility';

export function* fetchCntCategInitSaga(action) {
    try {
        if (action.categ && action.categ.length > 0) {
            yield put (actions.fetchCntCateg([...action.categ]))
        } else {
            let response = yield axios.post('/header', {categ: 'poet'}, {headers: {'data-categ':'category'}});
            yield put(actions.fetchCntCateg(response.data));
        }
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
            let response = yield axios.post('/header',{filterCnt, model: 'poet'},{headers: {'data-categ':'cntSearch'}});
            yield put(actions.filterContent(response.data));
        } catch(err) {
            yield put (actions.filterContentFail(err))
        }
        return
    }
    yield put(actions.filterPost(filterCnt));
}