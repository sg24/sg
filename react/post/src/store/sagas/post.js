import { put, delay } from 'redux-saga/effects';
import { updateObject, changeFav } from '../../shared/utility';
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
            let ptArray = [];
            if (response.data.pt && response.data.pt.length > 0 ) { 
                for (let pt of response.data.pt) {
                    const newPt = {...pt};
                    let liked = false;
                    for (let userID of newPt.liked) {
                        if(action.userID === userID) {
                            liked = true
                        }
                    }
                    const valid = action.userID === newPt.authorID;
                    const author = 'user' +  newPt._id;
                    const newData = updateObject(newPt, {author,userOpt: valid, liked});
                    ptArray.push(newData);
                }
                yield put(actions.fetchPost(ptArray, action.skipPost, response.data.ptTotal));
            }

            if (response.data.pt.length === 0) {
                yield put(actions.fetchPost([]));
            }
        }  
        
    } catch(err){
        yield put(actions.fetchPostFail(err))
    }
    
}

export function* fetchVideoInitSaga(action) {
    yield put(actions.fetchVideoStart(action.ptVideoID))
    try {
        let media =  yield axios.get('/media', {headers: {'data-categ':'media', 'mediaID': action.videoID}});
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

export function* changePostInitSaga(action) {
    if (!action.confirm) {
        yield put(actions.changePtStart(action.title, action.id, action.det))
        return;
    }
    try {
        if (action.det === 'delete') {
            yield axios.delete('/post', {headers: {'data-categ': 'deletePt-'+action.id}});
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