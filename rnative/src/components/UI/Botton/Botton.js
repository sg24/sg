import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
const botton = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[styles.wrapper, props.disabled ? styles.disabled : null, props.style]}>
                {props.children ? props.children :
                props.submitting ? <ActivityIndicator size="small" color={props.loaderStyle} animating/> : <Text style={[styles.title, props.textStyle]}>{props.title}</Text>}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        borderRadius: 3,
        paddingVertical: 8
    },
    title: {
        color: '#fff',
        fontWeight: 'normal',
    },
    disabled: {
        opacity: .65
    }
})

export default botton;