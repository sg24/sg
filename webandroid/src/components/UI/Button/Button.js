import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Platform, TouchableNativeFeedback } from 'react-native';
const button = props => {
    let cnt = (
        <View style={[styles.wrapper, props.disabled ? styles.disabled : null, props.style]}>
            {props.children && !props.submitting ? props.children :
            props.submitting ? <ActivityIndicator size="small" color={props.loaderStyle} animating/> : <Text style={[styles.title, props.textStyle]}>{props.title}</Text>}
        </View>
    )
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.disabled ? null : props.onPress} >
                { cnt }
            </TouchableNativeFeedback>
        )
    }
    return (
        <TouchableOpacity onPress={props.disabled ? null : props.onPress}>
           { cnt }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 3,
        paddingVertical: 8,
    },
    title: {
        color: '#fff',
        fontWeight: 'normal',
    },
    disabled: {
        opacity: .65
    }
})

export default button;