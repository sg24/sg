import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

export function* fetchChatInitSaga(action) {
    try {
        yield put(actions.fetchChatStart());
        let response = yield axios.post(`/${action.chatType}`, {
                start: action.start, limit: action.limit, cntID: action.cntID, page: action.page, pageID: action.pageID},{
            headers: {
                'data-categ': 'getChat'}});
        let cnt = response.data  ? response.data : null;
        if (cnt && cnt.pageInfo) {
            yield put(actions.updatePage(cnt.pageInfo, action.page));
            if (cnt.pageInfo.media) {
                yield put(actions.updateMediaInfo(cnt.pageInfo.media))
            }
        }

        if (cnt && cnt.username && cnt.userImage) {
            yield AsyncStorage.setItem('username', cnt.username);
            yield AsyncStorage.setItem('userImage', Constants.manifest.extra.BASE_IMAGE_URL + cnt.userImage);
        }
        yield put(actions.fetchChat(action.start, cnt ? cnt : {chat: []}));
    } catch(err) {
        yield put(actions.fetchChatFail(err));
    }
    
};

export function* fetchReplyInitSaga(action) {
    try {
        yield put(actions.fetchReplyStart());
        let response = yield axios.post(`/${action.chatType}`, {
                start: action.start, limit: action.limit, chatID: action.chatID,cntID: action.cntID},{
            headers: {
                'data-categ': 'getReply'}});
        let cnt = response.data  ? response.data : null;
        if (cnt && cnt.username && cnt.userImage) {
            yield AsyncStorage.setItem('username', cnt.username);
            yield AsyncStorage.setItem('userImage', Constants.manifest.extra.BASE_IMAGE_URL + cnt.userImage);
        }
        yield put(actions.fetchReply(action.start, cnt ? cnt : {chat: []}));
    } catch(err) {
        yield put(actions.fetchReplyFail(err));
    }
};

export function* deleteChatInitSaga(action) {
    try {
        yield put(actions.deleteChatStart(action.cnt._id, action.cnt.sendChatID, action.cntType, action.start));
        if (action.start) {
            if (action.cnt._id) {
                let response = yield axios.post(`/${action.chatType}`, {
                    cntID: action.cnt._id, chatID: action.chatID, media: JSON.stringify(action.cnt.media), page: action.page, pageID: action.pageID},{
                headers: {
                    'data-categ': action.cntType}});
                let cnt = response.data  ? response.data : {};
                if (cnt.pageInfo) {
                    yield put(actions.updatePage(cnt.pageInfo, action.page));
                }
                if (cnt.mediaInfo) {
                    yield put(actions.updateMediaInfo(cnt.mediaInfo));
                }
            }
            yield put(actions.deleteChat(action.cntType === "deleteReply" ? action.cnt.replyChatID : action.cnt._id, action.cnt.sendChatID, action.cntType,
                action.cnt._id));
        }
    } catch(err) {
        yield put(actions.deleteChatFail(err));
    }
};

export function* chatBoxReactionInitSaga(action) {
    try {
        yield put(actions.chatBoxReactionStart(action.cntID));
        if (action.confirm) {
            let response = yield axios[action.uriMethod](`/${action.chatType}`, action.cnt ? action.cnt : { cntID: action.cntID },{
                headers: {
                    'data-categ': action.reactionType}});
            let cnt = response.data ? response.data : {};
            if (cnt.pageInfo) {
                yield put(actions.updatePage(cnt.pageInfo, action.page));
            }
            yield put(actions.chatBoxReaction(action.cntID, cnt.chatInfo, action.cntType));
            // yield put(actions.updatePage({cntType: action.reactionType, _id: action.cntID}, action.chatType));
        }
    } catch(err){
        yield put(actions.chatBoxReactionFail(err, action.cntID));
    }
    
};