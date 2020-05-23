import * as actions from '../../store/actions/index';
import axios from '../../axios';

export const submit = (formData) => {
    return dispatch => {
        dispatch(actions.submitFormStart());

        let formContent = new FormData();
        
        for (let key in formData) {
            if (key !== 'video' && key !== 'image') {
                formContent.append(key, formData[key]);
            }
    
            if (key === 'video' && formData[key].length > 0) {
                for (let video of formData[key]) {
                    let ext = video.file.type.split('/').pop();
                    formContent.append(key, video.file, `${video.id}.${ext}`);
                }
            }
    
            if (key === 'image' && formData[key].length > 0) {
                for (let image of formData[key]) {
                    let ext = image.file.type.split('/').pop();
                    formContent.append(key, image.file, `${image.id}.${ext}`);
                }
            }
        }

        axios.post('/add/post', formContent, {
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