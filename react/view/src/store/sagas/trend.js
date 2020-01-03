import { put } from 'redux-saga/effects';

import axios from '../../axios';
import * as actions from '../../store/actions/index';

export function* fetchTrdInitSaga(action) {
    try {
        let response = yield axios.get(`/view/${action.cntGrp}/${action.id}`,{headers: {'data-categ': 'related'}});;
        yield put(actions.fetchTrd(response.data));
        
    }  catch(e) {}

  
}
