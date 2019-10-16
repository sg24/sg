import * as actions from '../../store/actions/index';
import axios from '../../axios';

export const submit = (formData) => {
    return dispatch => {
        dispatch(actions.submitFormStart());

        let formContent = new FormData();
        
        for (let key in formData) {
            if (key !== 'media') {
                formContent.append(key, formData[key]);
            }
    
            if (key === 'media' && formData[key].video.length > 0) {
                for (let video of formData[key].video) {
                    formContent.append(key, video.file, video.file.name);
                }
            }
    
            if (key === 'media' && formData[key].image.length > 0) {
                for (let image of formData[key].image) {
                    formContent.append(key, image.file, image.file.name);
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