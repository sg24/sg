import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'ionicons';

import BoxShadow from '../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

const defaultHeader = props => (
    <BoxShadow style={styles.topLevel}>
        <View style={[styles.wrapper, props.rightSideContent ? styles.split : null]}>
            <View style={styles.title}>
                { props.disableBackButton ? null : ( 
                    <TouchableNativeFeedback onPress={props.onPress}>
                        <Icon name="arrow-back-outline" size={26}/>
                    </TouchableNativeFeedback>
                )}
                <Text style={styles.textStyle}>
                    { props.title === 'Addnew' ? 'Add New' : props.title }
                </Text>
            </View>
            { props.rightSideContent ? props.rightSideContent : null }
        </View>
    </BoxShadow>
)

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        marginLeft: 10
    },
    wrapper: {
        width: '100%',
        paddingVertical: 6,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 40,
    },
    split: {
        justifyContent: 'space-between'
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topLevel: {
        zIndex: 999,
        width: '100%'
    }
});


export default defaultHeader;