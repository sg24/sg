import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* externalPageInitSaga(action) {
    try {
        yield put(actions.externalPageStart(action.pageType, action.pageID));
        yield axios[action.uriMethod](`/${action.page}`, action.cnt,{
            headers: {
                'data-categ': action.cntType}});
        yield put(actions.externalPage(action.pageType, action.pageID, action.cntType));
    } catch(err){
        yield put(actions.externalPageFail(err, action.pageType, action.pageID));
    }
    
};