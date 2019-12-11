import { put, delay } from 'redux-saga/effects';
import { changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPostInitSaga(action) {
    try {
        if (action.ptTotal === 0 || action.ptTotal > action.skipPost) {
            let response = yield axios.get('/post', {
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

export function* changePostInitSaga(action) {
    if (!action.confirm) {
        yield put(actions.changePtStart(action.title, action.id, action.det))
        return;
    }
    try {
        if (action.det === 'delete') {
            yield axios.delete('/post', {headers: {'data-categ': 'deleteCnt-'+action.id}});
        } else {
            yield axios.patch('/post', {id: action.id} ,{headers: {'data-categ': 'changemode'}});
        }
        yield put(actions.changePt())
        yield delay(1000);
        yield put(actions.changePtReset())
    } catch(err){
        yield put(actions.changePtFail(err))
        yield delay(1000);
        yield put(actions.changePtReset())
    }
}