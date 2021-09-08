import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from 'text';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

const tabBarge = props => {
    let cnt = (
        <View style={[styles.tabBarge, props.style]}>
            <TouchableNativeFeedback onPress={props.onPress}>
                <Text style={[styles.notification, props.textStyle]} numberOfLines={1}>{props.notification}</Text>
            </TouchableNativeFeedback>
        </View>
    );

    if (props.disableZero && (props.notification === 0 || props.notification === '0')) {
        cnt = null;
    }
    return cnt;
}

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
        padding: 0,
        zIndex: 9999
    },
    notification: {
        color: '#fff',
        overflow: 'hidden'
    }
})

export default tabBarge;