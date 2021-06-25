import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios';

export function* fetchSidebarInitSaga(action) {
    try {
        yield put(actions.fetchSidebarStart(action.start, action.page));
        let response = yield axios.post(`/${action.page}`, { 
            start: action.start, limit: action.limit, searchCnt: action.searchCnt },{
            headers: {
                'data-categ': action.cntID}});
        let cnt = response.data  ? response.data : null;
        yield put(actions.fetchSidebar(action.page, action.start, cnt));
    } catch(err){
        yield put(actions.fetchSidebarFail(action.page, err));
    }
};