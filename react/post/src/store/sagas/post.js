import { put } from 'redux-saga/effects';
import { updateObject, changeFav } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchPostInitSaga(action) {
    try {
        let response = yield axios.get('/post', {headers: {'data-categ':'post', 'limit': window.innerHeight}});
        let ptArray = [];
      
        for (let pt of response.data) {
            const newPt = {...pt};
            let liked = false;
            for (let userID of newPt.liked) {
                if(action.userID === userID) {
                    liked = true
                }
            }
            const valid = action.userID === newPt.authorID;
            const author = 'user' +  newPt._id;
            const newData = updateObject(newPt, {author,userOpt: valid, category: newPt.category[0], liked});
            ptArray.push(newData);
        }

        yield put(actions.fetchPost(ptArray));
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
    let pt = changeFav(action.posts ,action.postID);
    yield put(actions.changeFavPtStart(pt.updateStartArray, true))
    if (action.filteredPost && action.filteredPost.length > 0) {
        let filterPt = changeFav(action.filteredPost, action.postID)
        yield put(actions.changeFavPtStart(filterPt.updateStartArray, false))
        yield put(actions.changeFavFilter(filterPt.updateDataArray));
    }
    yield put(actions.changeFav(pt.updateDataArray));
}

export function* filterPostInitSaga(action) {
    const posts = [...action.posts];
    let filteredPost = posts.filter(post => post.category === action.tag);
    yield put(actions.filterPost(filteredPost))
}