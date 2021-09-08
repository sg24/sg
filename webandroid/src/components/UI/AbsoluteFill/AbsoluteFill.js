import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';


const AbsoluteFill = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress} style={[styles.overlay, props.style]}>
            <View style={[styles.overlay, props.style]}>
                { props.children }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0, .65)'
    }
})

export default AbsoluteFill;