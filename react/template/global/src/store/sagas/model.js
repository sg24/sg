import { put, delay } from 'redux-saga/effects';
import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntInitSaga(action) {
    if (action.cntTotal > action.skipCnt) {
        yield put(actions.fetchCntStart());
    }
    
    try {
        if (action.cntTotal === 0 || action.cntTotal > action.skipCnt) {
            let response = yield axios.get('/share', {
                headers: {
                    'data-categ': action.fetchType,
                    'limit': action.fetchLimit, 
                    'skip': action.skipCnt}});
            let total =  response.data.cntTotal ?  response.data.cntTotal : 0;
            let cnt = response.data.cnt  ? response.data.cnt : {post: [], question:[], poet:[]}
            yield put(actions.fetchCnt(cnt, action.skipCnt, total));
        }  
        
    } catch(err){
        yield put(actions.fetchCntFail(err))
    }
    
}
