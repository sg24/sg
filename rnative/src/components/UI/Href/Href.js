import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
const href = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={props.wrapperStyle}>
            <Text style={props.style} numberOfLines={props.numberOfLines}>{ props.title }</Text>
            {props.children}
        </TouchableOpacity>
    )
}

export default href;