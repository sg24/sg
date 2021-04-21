import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

const tabBarge = props => (
    <View style={[styles.tabBarge, props.style]}>
        <TouchableNativeFeedback onPress={props.onPress}>
            <Text style={styles.notification}>{props.notification}</Text>
        </TouchableNativeFeedback>
    </View>
)

const styles = StyleSheet.create({
    tabBarge: {
        position: 'absolute',
        right: 0,
        top: -11,
        width: 22,
        height: 22,
        borderRadius: 11,
        overflow: 'hidden',
        color: '#fff',
        backgroundColor: '#ff1600',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    notification: {
        color: '#fff'
    }
})

export default tabBarge;