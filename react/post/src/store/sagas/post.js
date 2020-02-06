import { put, delay } from 'redux-saga/effects';
import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPostInitSaga(action) {
    if (action.ptTotal > action.skipPost) {
        yield put(actions.fetchPostStart());
    }
    try {
        if (action.ptTotal === 0 || action.ptTotal > action.skipPost) {
            let response = yield axios.post('/post', null,{
                headers: {
                    'data-categ': action.fetchType, 
                    'limit': action.fetchLimit, 
                    'skip': action.skipPost}});
            yield put(actions.fetchPost(response.data.cnt, action.skipPost, response.data.cntTotal));
        }  
        
    } catch(err){
        yield put(actions.fetchPostFail(err))
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

export function* changePostInitSaga(action) {
    if (!action.confirm) {
        yield put(actions.changePtStart(action.title, action.id, action.det))
        return;
    }
    try {
        if (action.det === 'delete') {
            let payload = JSON.stringify({id: action.id, model: 'post', field: 'postID'})
            yield axios.delete('/header', {headers: {'data-categ': `deletecnt-${payload}`}});
        } else if (action.det === 'draft' || action.det === 'acc-draft'){
            yield axios.patch('/header', {id: action.id, model: 'post', field: 'postID'} ,{headers: {'data-categ': 'draftmode'}});
        } else {
            yield axios.patch('/header', {id: action.id, model: 'post', field: 'postID'} ,{headers: {'data-categ': 'publishmode'}});
        }
        yield put(actions.changePt())
        yield delay(1000);
        yield put(actions.changePtReset(true))
    } catch(err){
        yield put(actions.changePtFail(err))
        yield delay(1000);
        yield put(actions.changePtReset(false))
    }
}