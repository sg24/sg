import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

export function* fetchMediaInfoInitSaga(action) {
    try {
        yield put(actions.fetchMediaInfoReset());
        let response = yield axios.post(`/mediachat`, { chat: JSON.stringify(action.chat) },{
            headers: {
                'data-categ': 'mediaInfo'}});
        let cnt = response.data  ? response.data : null;
        let updateMedia = null
        if (cnt) {
            updateMedia = [];
            for (let media of action.media) {
                if (media.chat) {
                    let mediaInfo = cnt.filter((mediaInfo => mediaInfo._id === media.chat))[0];
                    if (mediaInfo) {
                        updateMedia.push({...media, ...mediaInfo, _id: media._id});
                    }
                } else {
                    updateMedia.push({...media, like: 0, chatTotal: 0, dislike: 0, isLiked: false, isDisliked: false})
                }
            }
        }
        yield put(actions.fetchMediaInfo(updateMedia));
    } catch(err) {
        yield put(actions.fetchMediaInfoFail(err));
    }
    
};


export function* mediaLikeInitSaga(action) {
    try {
        yield put(actions.mediaLikeStart(action.mediaID));
        let response = yield axios.post(`/mediachat`, { mediaID: action.mediaID, pageID: action.pageID, page: action.page },{
            headers: {
                'data-categ': 'mediaLike'}})
        let cnt = response.data  ? response.data : null;
        if (cnt && cnt.mediaInfo) {
            yield put(actions.updatePageMedia(cnt.mediaInfo, action.page));
        }
        yield put(actions.mediaLike(action.mediaID, cnt));
    } catch(err){
        yield put(actions.mediaLikeFail(err, action.mediaID));
    }
    
};