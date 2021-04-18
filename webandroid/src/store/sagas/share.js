import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index';
import axios from '../../axios';
import { socket } from '../../shared/utility';

export function* fetchSharecntInitSaga(action) {
    try {
        yield put(actions.fetchSharecntStart(action.start));
        let response = yield axios.post(`/${action.shareType}`,{
            start: action.start, limit: action.limit, searchCnt: action.searchCnt },{
            headers: {
                'data-categ': action.cntID}});
        let cnt = response.data  ? response.data : null;
        yield put(actions.fetchSharecnt(action.start, cnt ? cnt : {friend: []}));
    } catch(err) {
        yield put(actions.fetchSharecntFail(err));
    }
};

export function* shareInitSaga(action) {
    try {
        yield put(actions.shareStart());
        let response = yield axios.post(`/${action.shareType}`,{
            cnt: JSON.stringify(action.cnt), reciepent:  JSON.stringify(action.reciepent)},{
            headers: {
                'data-categ': action.cntID}});
        let shareUpdates = action.shareUpdates ? action.shareUpdates : [];
        for (let cnt of shareUpdates) {
            let updateResponse = yield axios.post(`/${cnt.shareType}`, {pageID: cnt.pageID},{
                headers: {
                    'data-categ': cnt.cntID}});
            let cntInfo = updateResponse && updateResponse.data ? updateResponse.data : {};
            if (cntInfo.pageInfo) {
                yield put(actions.updatePage(cntInfo.pageInfo, cnt.page))
            }
        }
        let cnt = response.data  ? response.data : null;
        if (action.cntID === 'sendChat') {
            socket.emit('sendChat', cnt, action.reciepent)
        }
        yield put(actions.share());
    } catch(err) {
        yield put(actions.shareFail(err));
    }
};