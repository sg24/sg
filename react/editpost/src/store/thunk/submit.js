import * as actions from '../../store/actions/index';
import axios from '../../axios';

export const submit = (formData) => {
    return dispatch => {
        dispatch(actions.submitFormStart());

        let formContent = new FormData();
        
        for (let key in formData) {
            if (key !== 'video' && key !== 'image' && key !== 'snapshot') {
                formContent.append(key, formData[key]);
            }
    
            if (key === 'video') {
                for (let video of formData[key]) {
                    if (formData.editVideo) {
                        formContent.append(key, video.file, video.id);
                    } else {
                        formContent.append('noedit', true);
                    }
                }
                if (formData[key].length < 1) {
                    formContent.append('deletevideo', true);
                }
            }
    
            if (key === 'image') {
                for (let image of formData[key]) {
                    if (formData.editImage) {
                        formContent.append(key, image.file);
                    } 
                }
                if (formData[key].length < 1) {
                    formContent.append('deleteimage', true);
                }
            }

            if (key === 'snapshot') {
                formContent.append(key, JSON.stringify(formData[key]));
            }
        }

        axios.post('/edit/post', formContent, {
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