import * as actions from '../actions/index';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../../axios';

export const submitProfileImageInit = (image, userID) => {
    return dispatch => {
        dispatch(actions.submitProfileImageStart())
        let formContent = new FormData();
        let imageData = Platform.OS !== 'web' ? image : image.file
        formContent.append('image', imageData);
        axios.post(`/user/profile/${userID}`, formContent, {
            headers: {
                'data-categ': 'profileImage',
                "Content-Type": "multipart/form-data"}}).then((response) => {
            if (response.data) {
                let uri = response.data
                dispatch(actions.checkUserImg({uri: Constants.manifest.extra.BASE_IMAGE_URL + uri}))
                dispatch(actions.submitProfileImage(uri));
                AsyncStorage.setItem('userImage', Constants.manifest.extra.BASE_IMAGE_URL +uri);
            }
            setTimeout(() => {
                dispatch(actions.submitProfileImageReset())
            }, 1000)
        }).catch((err) => {
            dispatch(actions.submitProfileImageFail(err))
        });
    }
} 