import permission from 'permission';
import { Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';

const checkExt = {
    image(type) {
        return (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(type);
    }
}

export const camera = (options) => {
    return new Promise((resolve, reject) => {
        (async () => { 
            let isPermitted = await permission.camera();
            if (!isPermitted) {
                return reject('exit') 
            }
            try {
                if (Platform.OS === 'web') {
                    if (await Camera.isAvailableAsync()) {
                        return reject('useCamera') 
                    }
                } 
                let response = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions[options.type],
                    allowsEditing: true,
                    quality: 1,
                    ...options
                });
                if (!response.cancelled) {
                    let name = null;
                    let type = null;
                    let image = null
                    if (Platform.OS !== 'web') {
                        name = response.uri.split('/').pop();
                        type = response.type+'/'+name.split('.').pop();
                        image = [{uri: response.uri, type, name}]
                    } else {
                        let type = response.uri.split(';')[0].split(':')[1];
                        let checkType = (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(type)
                        if (!checkType) {
                            alert('Image file not supported')
                            return reject('exit');
                        }
                        let fileData = await axios.get(response.uri, { responseType: 'blob' });
                        image = [{ uri: response.uri, file: fileData.data}]
                    }
                    return resolve(image)
                }
            } catch(e) {
                alert(e)
                return reject('exit')
            }
        })() 
    })
};

export const  gallery = (options, fileType) => {
    return new Promise((resolve, reject) => {
        (async () => { 
            let isPermitted = await permission.camera();
            if (!isPermitted) {
                return reject('exit') 
            }
            try {
                let response = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions[options.type],
                    allowsEditing: true,
                    quality: 0,
                    ...options
                });
                if (!response.cancelled) {
                    let name = null;
                    let type = null;
                    let image = []
                    if (Platform.OS !== 'web') {
                        if (options.allowsMultipleSelection) {
                            for (let cnt of response.selected) {
                                name = cnt.uri.split('/').pop();
                                type = cnt.type+'/'+name.split('.').pop();
                                image.push({uri: cnt.uri, type, name});
                            }
                        } else {
                            name = response.uri.split('/').pop();
                            type = response.type+'/'+name.split('.').pop();
                            image.push({uri: response.uri, type, name})
                        }
                    } else {
                        if (options.allowsMultipleSelection) {
                            for (let cnt of response.selected) {
                                let type = cnt.uri.split(';')[0].split(':')[1];
                                let checkType = checkExt[fileType] ? await checkExt[fileType] (type) : true;
                                if (!checkType) {
                                    alert(fileType+' file not supported')
                                } else {
                                    let imageData = await axios.get(cnt.uri, { responseType: 'blob' });
                                    image.push({ uri: cnt.uri, imageData: imageData.data})
                                }
                            }
                        } else {
                            let type = response.uri.split(';')[0].split(':')[1];
                            let checkType = checkExt[fileType] ? await checkExt[fileType] (type) : true;
                            if (!checkType) {
                                alert(fileType+' file not supported')
                            } else {
                                let fileData = await axios.get(response.uri, { responseType: 'blob' });
                                image.push({ uri: response.uri, file: fileData.data})
                            }
                        }
                    }
                    return resolve(image)
                }
            } catch(e) {
                alert(e)
                return reject('exit') 
            }
        })()
    })
};

export const takePicture = (cameraprops) => {
    return new Promise((resolve, reject) => {
        (async () => { 
            try {
                let response = await cameraprops.takePictureAsync({
                    quality: 1
                });
                let type = response.uri.split(';')[0].split(':')[1];
                let checkType = (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(type)
                if (!checkType) {
                    alert('Image file not supported')
                    reject('exit')
                }
                let imageData = await axios.get(response.uri, { responseType: 'blob' });
                resolve([{ uri: response.uri, file: imageData.data}])
            } catch(e) {
                alert('Cannot capture')
                reject('exit')
            }
        })()
    })
}

export const stopAudioRecorder = (recording) => {
    return new Promise((resolve, reject) => {
        (async () => { 
            try {
                await recording.stopAndUnloadAsync();
                let uri = await recording.getURI();
                let name = uri.split('/').pop();
                let type = 'audio'+'/'+name.split('.').pop();
                let audio = [{uri, type, name}]
                return resolve(audio)
            } catch(e) {
                alert(e.message)
                reject('exit')
            }
        })()
    })
}

export const explorer = (options) => {
    return new Promise((resolve, reject) => {
        DocumentPicker.getDocumentAsync(options).then((res) => {
            let files  = [];
            let fileNum = 0;
            if (Platform.OS === 'web') {
                if ('FileReaders' in window) {
                    for (let cnt of res.output) {
                        const reader = new FileReader();
                        reader.onerror = () => {
                            alert(`Failed to read the selected media because the operation failed.`)
                            return reject('exit');
                        };
                        reader.onload = ({ target }) => {
                          const uri = target.result;
                          fileNum++;
                          files.push({uri, file: cnt})
                          if (fileNum === res.output.length) {
                            return resolve(files); 
                          }
                        };
                        reader.readAsDataURL(cnt);
                    }
                } else if ('URL' in window) {
                    for (let cnt of res.output) {
                        const uri = URL.createObjectURL(cnt)
                        files.push({uri, file: cnt})
                    }
                    return resolve(files); 
                } else {
                    alert('Please, update your browser or use another');
                    return reject('exit')
                } 
            } else {
                return resolve([{uri: res.uri, name: res.name, type: res.name.split('.').pop()}])
            }
        }).catch(e => {
            alert('Cannot open file explorer')
            reject('exit')
        })
    })
}