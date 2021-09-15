import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* previewPageInitSaga(action) {
    try {
        yield put(actions.previewPageStart());
        let response = yield axios[action.uriMethod](`/${action.page}`, { pageID: action.pageID, groupID: action.groupID },{
            headers: {
                'data-categ': action.cntType}});
        let cnt = response.data  ? response.data : null;
        yield put(actions.previewPage(cnt));
    } catch(err){
        yield put(actions.previewPageFail(err));
    }
};