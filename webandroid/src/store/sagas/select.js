import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';
import { socket } from '../../shared/utility';

export function* fetchSelectcntInitSaga(action) {
    try {
        yield put(actions.fetchSelectcntStart(action.start));
        let response = yield axios.post(`/${action.page}`,{
            start: action.start, limit: action.limit, searchCnt: action.searchCnt , pageID: action.pageID},{
            headers: {
                'data-categ': action.cntID}});
        let cnt = response.data  ? response.data : null;
        yield put(actions.fetchSelectcnt(action.start, cnt ? cnt : {select: []}));
    } catch(err) {
        yield put(actions.fetchSelectcntFail(err));
    }
};

export function* selectInitSaga(action) {
    try {
        yield put(actions.selectStart(action.reactionType));
        if (action.confirm) {
            let response = yield axios[action.uriMethod](`/${action.page}`,  { pageID: action.pageID, cntID: action.cntID , cnt: action.cnt ? JSON.stringify(action.cnt) : []},{
                headers: {
                    'data-categ': action.reactionType}});
            let cnt = response.data ? response.data : {};
            if (cnt.pageInfo) {
                yield put(actions.updatePage(cnt.pageInfo, action.page))
            }
            yield put(actions.select(action.remove, action.cnt));
        }
    } catch(err) {
        yield put(actions.selectFail(err));
    }
};

export function* selectReactionInitSaga(action) {
    try {
        yield put(actions.selectReactionStart(action.cntID));
        if (action.confirm) {
            let response = yield axios[action.uriMethod](`/${action.page}`,  { pageID: action.pageID, cntID: action.cntID , cnt: action.cnt ? JSON.stringify(action.cnt) : []},{
                headers: {
                    'data-categ': action.reactionType}});
            let cnt = response.data ? response.data : {};
            if (cnt.pageInfo) {
                yield put(actions.updatePage(cnt.pageInfo, action.page))
            }
            yield put(actions.selectReaction(action.cntID, action.remove));
        }
    } catch(err){
        yield put(actions.selectReactionFail(err, action.cntID));
    }
    
};