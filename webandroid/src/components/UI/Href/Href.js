import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from 'text';

const href = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={props.wrapperStyle}>
            { props.children ? props.children : <Text style={props.style} numberOfLines={props.numberOfLines}>{ props.title }</Text> }
        </TouchableOpacity>
    )
}

export default href;