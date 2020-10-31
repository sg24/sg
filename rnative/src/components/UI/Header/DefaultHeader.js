import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import BoxShadow from '../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';

const defaultHeader = props => (
    <BoxShadow>
        <View style={styles.wrapper}>
            <TouchableNativeFeedback onPress={props.onPress}>
                <Icon name="arrow-back-outline" size={26}/>
            </TouchableNativeFeedback>
            <Text style={styles.textStyle}>
                { props.title === 'Addnew' ? 'Add New' : props.title }
            </Text>
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
        height: 50
    }
});


export default defaultHeader;