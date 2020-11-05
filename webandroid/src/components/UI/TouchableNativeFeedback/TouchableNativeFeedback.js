import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform} from 'react-native';

const touchableNative = props => {
    let cnt = (
        <TouchableOpacity style={props.style} onPress={props.onPress}>
            { props.children}
        </TouchableOpacity>
    )

    if (Platform.OS === 'android') {
       cnt = (
        <TouchableNativeFeedback style={props.style} onPress={props.onPress}>
            { props.children}
        </TouchableNativeFeedback>
       )
    }
    
    return cnt
}

export default touchableNative;