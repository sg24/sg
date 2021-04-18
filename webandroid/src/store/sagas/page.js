import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPageInitSaga(action) {
    try {
        yield put(actions.fetchPageStart(action.start, action.page));
        let response = yield axios.post(`/${action.page}`, { 
            start: action.start, limit: action.limit, searchCnt: action.searchCnt },{
            headers: {
                'data-categ': action.cntID}});
        let cnt = response.data  ? response.data : null;
        yield put(actions.fetchPage(action.page, action.start, cnt));
    } catch(err){
        yield put(actions.fetchPageFail(action.page, err));
    }
    
};

export function* deletePageInitSaga(action) {
    try {
        yield put(actions.deletePageStart(action.pageID, action.page, action.start));
        if (action.start) {
            yield axios.post(`/${action.page}`, { pageID: action.pageID },{
                headers: {
                    'data-categ': action.cntType}});
            yield put(actions.deletePage(action.pageID, action.page));
        }
    } catch(err){
        yield put(actions.deletePageFail(action.page, err));
    }
    
};

export function* pageReactionInitSaga(action) {
    try {
        yield put(actions.pageReactionStart(action.pageID));
        let response = yield axios.post(`/${action.page}`, { pageID: action.pageID },{
            headers: {
                'data-categ': action.reactionType}});
        let cnt = response.data ? response.data : {};
        if (cnt.pageInfo) {
            yield put(actions.updatePage(cnt.pageInfo, action.page))
        }
        yield put(actions.pageReaction(action.pageID));
    } catch(err){
        yield put(actions.pageReactionFail(err, action.pageID));
    }
    
};