import * as actions from '../actions/index';
import { readAllData } from '../../shared/utility';
import axios from '../../axios';

export const submit = () => {
    return dispatch => {
        dispatch(actions.submitFormStart());
        let formContent = new FormData();
        let formData = localStorage.getItem('question') ? localStorage.getItem('question') : [];
        if ('indexedDB' in window) {
            readAllData('media').then(media => {
                for (let cnt of media) {
                    for (let video of cnt.video) {
                        let ext = video.file.type.split('/').pop();
                        formContent.append(cnt.position, video.file, `${video.id}.${ext}`);
                    }  
                    for (let image of cnt.image) {
                        let ext = image.file.type.split('/').pop();
                        formContent.append(cnt.position, image.file, `${image.id}.${ext}`);
                    }
                }
                upload();
            });
        }  else {
            upload();
        }
        
        function upload() {
            formContent.append('qchat', formData);
            axios.post('/add/qchat', formContent, {
                onUploadProgress: function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        dispatch(actions.submitFormSuccess(percentage))
                    }
                }  
            }).then((res) => {
                dispatch(actions.formSubmitted(res.data))
            }).catch((err) => {
                dispatch(actions.submitFormFail(err))
            });
        }
    }
} 