import { put, delay } from 'redux-saga/effects';
import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntInitSaga(action) {
    if (action.cntTotal > action.skipCnt) {
        yield put(actions.fetchCntStart());
    }
    try {
        console.log(action.fetchType)
        if (action.cntTotal === 0 || action.cntTotal > action.skipCnt) {
            let response = yield axios.post('/group', null, {
                headers: {
                    'data-categ': action.fetchType, 
                    'limit': action.fetchLimit, 
                    'skip': action.skipCnt}});
            yield put(actions.fetchCnt(response.data.cnt, action.skipCnt, response.data.cntTotal));
        }  
        
    } catch(err){
        yield put(actions.fetchCntFail(err))
    }
    
}

export function* joinGrpInitSaga(action) {
    yield put(actions.joinGrpStart(action.id));
    try {
        yield axios.post('/group', {id: action.id}, {
            headers: {
                'data-categ': action.categ}});
        yield put(actions.joinGrp(action.id, action.categ));
    }catch(err){
        yield put(actions.joinGrpFail(err, action.id))
    }
}

export function* changeFavSaga(action) {
    let updateFav = changeFav(action.id ,action.liked, action.favAdd, action.changedFav);
    yield put(actions.changeMainFavoriteStart(updateFav.favDet.liked));
    yield put(actions.changeFavPtStart(updateFav.favDet.id, updateFav.favDet.liked))
    try {
        let field = action.cntGrp === 'post' ? 'postID' : action.cntGrp === 'question' ?
        'queID' : 'pwtID';
        yield axios.patch('/header', {id: updateFav.favDet.id, model: action.cntGrp, field},{headers: {'data-categ': 'changefavorite'}});
        yield delay(500)
        yield put(actions.changeMainFavoriteReset());
        yield put(actions.changeFav(updateFav.updateChangeFav));
    }catch(err){
        yield delay(500)
        yield put(actions.changeMainFavoriteReset());
        yield put(actions.changeFavPtFail())
    }
}