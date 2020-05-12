import * as actions from '../../store/actions/index';
import axios from '../../axios';
import uuid from 'uuid';

export const submitImageInit = (image, url, userID) => {
    return dispatch => {
        dispatch(actions.submitImageStart())
        let formContent = new FormData();
        let ext = image.type.split('/').pop();
        formContent.append('image', image, `${uuid()}.${ext}`);

        axios.post(`/user/profile/${userID}`, formContent, {
            headers: {
                'data-categ': 'profileImage'}}).then(() => {
            dispatch(actions.submitImage())
            dispatch(actions.checkUserImg(url))
        }).catch((err) => {
            dispatch(actions.submitImageFail(err))
            setTimeout(() => {
                dispatch(actions.resetModel())
            }, 1000)
        });
    }
} 