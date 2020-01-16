import { put, delay } from 'redux-saga/effects';
import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchCntInitSaga(action) {
    let model = action.fetchType === 'post' ? '/post' : action.fetchType === 'question' || action.fetchType === 'shared' ?
    '/question':'/'+action.fetchType;
    let categ = action.fetchType === 'shared' ? `shared-${action.userID}` : action.fetchType;
    if (action.cntTotal > action.skipCnt) {
        yield put(actions.fetchCntStart());
    }
    
    try {
        if (action.cntTotal === 0 || action.cntTotal > action.skipCnt) {
            let response = yield axios.post(model, null,{
                headers: {
                    'data-categ': categ,
                    'limit': action.fetchLimit, 
                    'skip': action.skipCnt}});
            yield put(actions.fetchCnt(response.data.cnt, action.skipCnt, response.data.cntTotal));
        }  
        
    } catch(err){
        yield put(actions.fetchCntFail(err))
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
    let field =   action.modelType === 'post' ? 'postID' : action.modelType === 'question' ? 'queID' : 'pwtID'
    if (!action.confirm) {
        yield put(actions.changeCntStart(action.title, action.id, action.det, action.modelType))
        return;
    }
    if (action.det === 'addUser') {
        yield put(actions.changeCntStart(action.title, action.id, action.det, action.modelType))
    }

    try {
        if (action.det === 'delete') {
            let payload = JSON.stringify({id: action.id, model: action.modelType, field})
            yield axios.delete('/header', {headers: {'data-categ': `deletecnt-${payload}`}});
        } else if (action.modelType === 'user') {
            yield axios.patch('/users', {id: action.id}, {headers: {'data-categ': action.det}});
        } else {
            yield axios.patch('/header', {id: action.id, model: action.modelType, field} ,{headers: {'data-categ': 'draftmode'}});
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