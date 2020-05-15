import { put, delay } from 'redux-saga/effects';

import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntInitSaga(action) {
    try {
        let response =  yield axios.post(`/view/${action.categ}/${action.id}`,null,{headers: {'data-categ': 'viewcnt'}});
        if (response.data) {
            let images = [];
            let snaps = [];
            for (let image of response.data.image) {
                images.push({url: `${window.location.protocol + '//' + window.location.host}/media/image/${image.id}`, ...image, mediaType: 'image'})            
            }
            for (let snap of response.data.snapshot) {
                snaps.push({url: `${window.location.protocol + '//' + window.location.host}/media/image/${snap.id}`, ...snap, mediaType: 'snapshot'})            
            }
            response.data.image = images;
            response.data.snapshot = snaps;
            response.data.video = [];
            yield put(actions.fetchCnt(response.data));
        } 
        
    } catch(err){
        yield put(actions.fetchCntFail(err))
    }
    
}

export function* ansCorrectInitSaga(action) {
    
    try {
        if (action.categ === 'reply') {
            yield axios.patch('/view',{id: action.commentID,replyID:action.replyID},{headers: {'data-categ': 'answercorretreply'}});
        }  else if (action.categ === 'smile') {
            yield axios.patch('/view',{id: action.commentID},{headers: {'data-categ': 'smile'}});
        }else if (action.categ === 'smilereply') {
            yield axios.patch('/view',{id: action.commentID, replyID:action.replyID},{headers: {'data-categ': 'smilereply'}});
        } else {
            yield axios.patch('/view',{id: action.commentID},{headers: {'data-categ': 'answercorrect'}});
        }
        yield put (actions.ansCorrect(action.commentID, action.categ, action.replyID))
    } catch(err){
        yield put(actions.fetchCntFail(err))
        yield delay(1000)
        yield put(actions.resetModel())
    }
    
}

export function* ansWrongInitSaga(action) {
    try {
        if (action.categ === 'reply') {
            yield axios.patch('/view',{id: action.commentID,replyID:action.replyID},{headers: {'data-categ': 'answerwrongreply'}});
        } else {
            yield axios.patch('/view',{id: action.commentID},{headers: {'data-categ': 'answerwrong'}});
        }
        yield put (actions.ansWrong(action.commentID, action.categ, action.replyID))
        
    } catch(err){
        yield put(actions.fetchCntFail(err))
        yield delay(1000)
        yield put(actions.resetModel())
    }
    
}

export function* changeFavSaga(action) {
    let updateFav = changeFav(action.id ,action.liked, action.favAdd, action.changedFav);
    yield put(actions.changeMainFavoriteStart(updateFav.favDet.liked));
    yield put(actions.changeFavPtStart(updateFav.favDet.id, updateFav.favDet.liked))
    try {
        let field = action.cntGrp === 'post' ? 'postID' : action.cntGrp === 'question' ?
        'queID' : action.cntGrp === 'advert' ? 'advertID' : 'pwtID';
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

export function* changeCntInitSaga(action) {
    let field =   action.modelType === 'post' ? 'postID' : action.modelType === 'question' ? 'queID' : 'pwtID';
    if (!action.confirm) {
        yield put(actions.changeCntStart(action.title, action.id, action.det, action.modelType))
        return;
    }

    try {
        if (action.det === 'delete') {
            let payload = JSON.stringify({id: action.id, model: action.modelType, field})
            yield axios.delete('/header', {headers: {'data-categ': `deletecnt-${payload}`}});
        } else if (action.det === 'draft'){
            yield axios.patch('/header', {id: action.id, model: action.modelType, field} ,{headers: {'data-categ': 'draftmode'}});
        } else {
            yield axios.patch('/header', {id: action.id, model: action.modelType, field} ,{headers: {'data-categ': 'publishmode'}});
        }
        yield put(actions.changeCnt())
        yield delay(1000);
        yield put(actions.changeCntReset(true))
    } catch(err){
        yield put(actions.changeCntFail(err))
        yield delay(1000);
        yield put(actions.changeCntReset(false))
    }
}