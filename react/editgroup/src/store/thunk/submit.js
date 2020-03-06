import * as actions from '../../store/actions/index';
import axios from '../../axios';

export const submit = (formData) => {
    return dispatch => {
        dispatch(actions.submitFormStart());

        let formContent = new FormData();
        
        for (let key in formData) {
            if (key !== 'video' && key !== 'image' && key !== 'removedSnap' && key !== 'snapshot') {
                formContent.append(key, formData[key]);
            }
    
            if (key === 'video') {
                for (let video of formData[key]) {
                    let ext = video.file.type.split('/').pop();
                    formContent.append(key, video.file, `${video.id}.${ext}`);
                }
            }
    
            if (key === 'image') {
                let send = 0;
                let uploaded = []
                for (let image of formData[key]) {
                    if (image.mediaType) {
                        uploaded.push({id: image.id, filename: image.filename, type: image.type});
                        ++send;
                        if (send === formData[key].length) {
                            formContent.append('uploadedimage', JSON.stringify(uploaded));
                        }
                    } else {
                        let ext = image.imageCapture.type.split('/').pop();
                        formContent.append(key, image.imageCapture, `${image.id}.${ext}`);
                        ++send;
                        if (send === formData[key].length) {
                            formContent.append('uploadedimage', JSON.stringify(uploaded));
                        }
                    }
                }
            }

            if (key === 'snapshot') {
                let uploadedSnap = [];
                let uploadedVideo = []
                for (let media of formData[key]) {
                    uploadedSnap.push({id: media.id, videoID: media.videoID, videoCnt: media.videoCnt})
                    uploadedVideo.push({id: media.video.id, snapshotID: media.video.snapshotID, type: media.video.type})
                }
                formContent.append('uploadedvideo', JSON.stringify(uploadedVideo));
                formContent.append('uploadedsnap', JSON.stringify(uploadedSnap));
            }

            if (key === 'removedSnap' && formData[key].length > 0) { 
                console.log(formData[key])
                formContent.append('removedmedia', JSON.stringify(formData[key]));
            }
        }
        
        axios.post('/edit/group', formContent, {
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