import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* updateSettingsInitSaga(action) {
    try {
        yield put(actions.updateSettingsStart());
        yield axios.post(`/${action.page}`, { cnt: action.cnt, pageID: action.pageID },{
            headers: {
                'data-categ': action.cntID}});
        yield put(actions.updateSettingsReset());
    } catch(err){
        yield put(actions.updateSettingsFail(err));
    }
};