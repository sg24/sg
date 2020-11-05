import * as actions from '../actions/index';
import axios from '../../axios';

export const submitProfileImageInit = (image, userID) => {
    return dispatch => {
        dispatch(actions.submitProfileImageStart())
        let formContent = new FormData();
        formContent.append('image', image);
        axios.post(`/user/profile/${userID}`, formContent, {
            headers: {
                'data-categ': 'profileImage',
                "Content-Type": "multipart/form-data"}}).then(() => {
            dispatch(actions.submitProfileImage(image.uri));
            setTimeout(() => {
                dispatch(actions.submitProfileImageReset())
            }, 1000)
        }).catch((err) => {
            dispatch(actions.submitProfileImageFail(err))
        });
    }
} 