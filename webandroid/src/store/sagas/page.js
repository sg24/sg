import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPageInitSaga(action) {
    try {
        yield put(actions.fetchPageReset());
        let response = yield axios.post(`/${action.page}`, { start: action.start, limit: action.limit },{
            headers: {
                'data-categ': 'getByAuthor'}});
        let cnt = response.data  ? response.data : null;
        yield put(actions.fetchPage(action.page, cnt));
    } catch(err){
        yield put(actions.fetchPageFail(action.page, err));
    }
    
};

export function* deletePageInitSaga(action) {
    try {
        yield put(actions.deletePageReset());
        let response = yield axios.delete(`/${action.page}`, { id: action.id },{
            headers: {
                'data-categ': 'getOneAndDelete'}});
        yield put(actions.deletePage(action.page));
    } catch(err){
        yield put(actions.deletePageFail(action.page, err));
    }
    
};