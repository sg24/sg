import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
const href = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={props.wrapperStyle}>
            { props.children ? props.children : <Text style={props.style} numberOfLines={props.numberOfLines}>{ props.title }</Text> }
        </TouchableOpacity>
    )
}

export default href;