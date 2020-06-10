import * as actions from '../actions/index';
import { readAllData } from '../../shared/utility';
import axios from '../../axios';
import fileAxios from 'axios';

export const submit = (formData) => {
    return dispatch => {
        dispatch(actions.submitFormStart());
        let media = readAllData('media');
        console.log(media)
        let formContent = new FormData();
        // for (let cnt of formData) {
        //     formContent.append(cnt.position, JSON.stringify(cnt));
        //     for (let key in cnt) {
        //         if (key === 'video' && cnt[key].length > 0) {
        //             for (let video of cnt[key]) {
        //                 fileAxios.get(video.url, {responseType: 'blob', timeout: 8000}).then(res => {
        //                     let media = res.data
        //                     let ext = media.type.split('/').pop();
        //                     formContent.append(key, media, `${media.file.id}.${ext}`);
        //                 });
        //             }
        //         }
        
        //         if (key === 'image' && cnt[key].length > 0) {
        //             for (let image of cnt[key]) {
        //                 fileAxios.get(image.url, {responseType: 'blob', timeout: 8000}).then(res => {
        //                     let media = res.data
        //                     let ext = media.type.split('/').pop();
        //                     formContent.append(key, media, `${image.file.id}.${ext}`);
        //                 });
        //             }
        //         }
        //     }
        // }

        // axios.post('/add/post', formContent, {
        //     onUploadProgress: function (progressEvent) {
        //         if (progressEvent.lengthComputable) {
        //             const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //             dispatch(actions.submitFormSuccess(percentage))
        //         }
        //     }  
        // }).then((res) => {
        //     dispatch(actions.formSubmitted(res.data))
        // }).catch((err) => {
        //     dispatch(actions.submitFormFail(err))
        // });
    }
} 