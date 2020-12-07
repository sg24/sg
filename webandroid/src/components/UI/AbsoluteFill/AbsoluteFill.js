import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';


const AbsoluteFill = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress} style={styles.overlay}>
            <View style={styles.overlay}></View>
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