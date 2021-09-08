import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'ionicons';
import Text from 'text';

import BoxShadow from '../BoxShadow/BoxShadow';

const conv = props => (
    <BoxShadow style={styles.topLevel}>
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={props.onPress}>
                <Icon name="arrow-back-outline" size={26}/>
            </TouchableOpacity>
            <Text style={styles.textStyle}>
                { props.title }
            </Text>
            <View style={styles.icon}>
                <TouchableOpacity onPress={props.onNavigate}>
                    <Icon name="search" size={24} />
                </TouchableOpacity>
            </View>
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
        height: 40
    },
    icon: {
        flex: 1,
        alignItems: 'flex-end'
    },
    topLevel: {
        zIndex: 999,
        width: '100%'
    }
});


export default conv;