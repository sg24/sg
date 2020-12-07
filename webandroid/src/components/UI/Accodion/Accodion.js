import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'ionicons';

import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

const accodion = props => {
    return (
        <View style={[styles.wrapper, props.style]}>
            <TouchableNativeFeedback onPress={props.onPress}>
                <View style={[styles.titleWrapper, props.titleWrapper]}>
                    <Text style={props.titleStyle}>{props.title}</Text>
                    <Icon name={props.icon.name} size={props.icon.size} style={props.visible ? styles.open: null}/>
                </View>
            </TouchableNativeFeedback>
            { props.visible ? 
                <View style={[styles.contentWrapper, props.contentWrapper]}>
                    {props.children}
                </View> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#f9f9f9',
        marginTop: 10
    },
    titleWrapper: {
        padding: 10,
        backgroundColor: '#dcdbdc',
        width: '100%',
        flexDirection: 'row',
        fontSize: 15,
        justifyContent: 'space-between' 
    },
    contentWrapper: {
        paddingBottom: 10,
    },
    open: {
        transform: [{rotateX: '180deg'}]
    }
});

export default accodion;