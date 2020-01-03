import { put, delay } from 'redux-saga/effects';
import uuid from 'uuid';

import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';


export function* fetchCntInitSaga(action) {
    try {
        let response =  yield axios.get(`/view/${action.categ}/${action.id}`,{headers: {'data-categ': 'viewcnt'}});
        if (response.data) {
            yield put(actions.fetchCnt(response.data))
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
        // yield put(actions.fetchCntFail(err))
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
        // yield put(actions.fetchCntFail(err))
    }
    
}

export function* submitCommentInitSaga(action) {
    try {
        yield put(actions.submitCommentStart())
        let response;
        if (action.modelType === 'reply') {
           response =  yield axios.patch('/view', {id: action.id, cnt: action.cnt, cntGrp: action.cntGrp,commentID: uuid()},{headers: {'data-categ': 'reply'}});
           yield put(actions.submitComment(action.id, action.modelType, response.data))
        } else {
            response= yield axios.post('/view', {id: action.id, 
                cntGrp: action.cntGrp, cnt: action.cnt},{headers: {'data-categ': 'viewcnt'}});
            yield put(actions.submitComment(action.id, action.cntGrp, response.data))   
        }
        
    } catch(err){
        yield put(actions.submitCommentFail(err))
        yield delay(1000)
        yield put(actions.resetModel())
    }
    
}

export function* fetchVideoInitSaga(action) {
    yield put(actions.fetchVideoStart(action.ptVideoID))
    try {
        let media =  yield axios.post('/media', {mediaID: action.videoID},{headers: {'data-categ':'media'}});
        function dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        }
        let url = window.URL.createObjectURL(dataURLtoBlob(media.data));
        yield put(actions.fetchVideo(url))
    } catch(err) {
        yield put(actions.fetchVideoFail(err))
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