import { put, delay } from 'redux-saga/effects';

import * as actions from '../actions/index';
import axios from '../../axios';


export function* filterGrpUserInitSaga(action) {
   let filterUser = null;
   if (!action.filterContent) {
        filterUser = action.users
    } else {
        filterUser = action.users.filter(user => user.username.toLowerCase().indexOf(action.filterContent.toLowerCase()) !== -1);
    }
   yield put(actions.filterGrpUser(filterUser))
}

export function* fetchInfoInitSaga(action) {
    yield put(actions.fetchInfoStart(action.status))
    try {
        let response;
        if (action.status === 'request') {
            response = yield axios.post('/group', {id: action.id},{headers: {'data-categ':`grpreq`}});
        } else {
            response = yield axios.post('/group', {id: action.id, status: action.status},{headers: {'data-categ':`grpinfo`}});
        }
        yield put(actions.fetchInfo(response.data));
    } catch(err) {
        yield put(actions.fetchInfoFail(err))
    }
}

export function* changeGrpCntInitSaga(action) {
    yield put(actions.changeGrpCntStartInit(action.user, action.categ))
    if (!action.confirm) {
        yield put(actions.changeGrpCntStart(action.id,action.user,action.categ, action.username, action.curTab))
        return;
    }
   
    try {
        yield axios.post('/group', {id: action.id, user: action.user}, {
            headers: {'data-categ': action.categ}})
        yield put(actions.changeGrpCnt())
        yield delay(1000);
        if (action.curTab === 'request') {
            yield put(actions.removeRequest(action.id))
        }

        yield put(actions.changeGrpCntReset(action.user))
    } catch(err){
        yield put(actions.changeGrpCntFail(err))
        yield delay(1000);
        yield put(actions.changeGrpCntReset(false))
    }
}