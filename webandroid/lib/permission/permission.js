import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

const permission = {
    camera: async function() {
        if (Platform.OS !== 'web') {
            let { status: useCamera } = await Permissions.getAsync(Permissions.CAMERA);
            if (useCamera !== 'granted') {
                let { status } = await Permissions.askAsync(Permissions.CAMERA)
                if (status !== 'granted') {
                    alert('Permission to access camera is required!');
                    return false
                }
            }
            let { status: useImageLib} = await Permissions.getAsync(Permissions.CAMERA_ROLL);
            if  (useImageLib !== 'granted') {
                let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('Permission to access gallery is required!');
                    return false
                }
            }
            let { status: useVideoRecord} = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
            if  (useVideoRecord !== 'granted') {
                let {status} = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
                if (status !== 'granted') {
                    alert('Permission to access audio is required!');
                    return false
                }
            }
        }
        return true
    }
}

export default permission;
