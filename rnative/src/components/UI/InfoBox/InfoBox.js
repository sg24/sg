import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const infoBox = props => {
    return (
        <View style={styles.wrapper}>
            <View style={[styles.icon,props.iconStyle]}>
                <Icon name={props.name} size={props.size} color={props.color}/>
            </View>
            <Text style={[styles.det, props.style]}>{ props.det }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    det: {
        marginLeft: 10
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e9ebf2',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default infoBox;