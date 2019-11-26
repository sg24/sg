import { put, delay } from 'redux-saga/effects';
import { updateObject, changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntInitSaga(action) {
    try {
        if (action.cntTotal === 0 || action.cntTotal > action.skipCnt) {
            let response =  yield axios.get('/users', {
                headers: {
                    'data-categ': action.fetchType, 
                    'limit': action.fetchLimit, 
                    'skip': action.skipCnt}});
            if (response.data && response.data.cnt.length > 0) {
                yield put(actions.fetchCnt(response.data.cnt, action.skipCnt,response.data.cntTotal))
            }
        }  
        
    } catch(err){
        yield put(actions.fetchCntFail(err))
    }
    
}

export function* changeFavSaga(action) {
    let updateFav = changeFav(action.id ,action.liked, action.favAdd, action.changedFav);
    yield put(actions.changeMainFavoriteStart(updateFav.favDet.liked));
    yield put(actions.changeFavPtStart(updateFav.favDet.id, updateFav.favDet.liked))
    try {
        yield axios.patch('/post', {id: updateFav.favDet.id, userID: action.userID, model: action.cntGrp})
        yield delay(500)
        yield put(actions.changeMainFavoriteReset());
        yield put(actions.changeFav(updateFav.updateChangeFav));
    }catch(err){
        yield delay(500)
        yield put(actions.changeMainFavoriteReset());
        yield put(actions.changeFavPtFail())
    }
}

export function* changeCntInitSaga(action) {
    if (!action.confirm) {
        yield put(actions.changeCntStart(action.title, action.id, action.det))
        return;
    }
    try {
        if (action.det === 'delete') {
            yield axios.delete('/poet', {headers: {'data-categ': 'deleteCnt-'+action.id}});
        } else {
            yield axios.patch('/poet', {id: action.id} ,{headers: {'data-categ': 'changemode'}});
        }
        yield put(actions.changeCnt())
        yield delay(1000);
        yield put(actions.changeCntReset())
    } catch(err){
        yield put(actions.changeCntFail(err))
        yield delay(1000);
        yield put(actions.changeCntReset())
    }
}