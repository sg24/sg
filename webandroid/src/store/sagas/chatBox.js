import { put } from 'redux-saga/effects';
import * as actions from '../../store/actions/index';
import axios from '../../axios';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';

export function* fetchChatInitSaga(action) {
    try {
        yield put(actions.fetchChatReset());
        let response = yield axios.post(`/${action.chatType}`, {
                start: action.start, limit: action.limit, cntID: action.cntID, page: action.page, pageID: action.pageID},{
            headers: {
                'data-categ': 'getChat'}});
        let cnt = response.data  ? response.data : null;
        if (cnt && cnt.mediaInfo) {
            yield put(actions.updatePageMedia(cnt.mediaInfo, action.page));
        }

        if (cnt && cnt.username && cnt.userImage) {
            yield AsyncStorage.setItem('username', cnt.username);
            yield AsyncStorage.setItem('userImage', Constants.manifest.extra.BASE_IMAGE_URL + cnt.userImage);
        }

        yield put(actions.fetchChat(cnt ? cnt : {chat: []}));
    } catch(err) {
        yield put(actions.fetchChatFail(err));
    }
    
};