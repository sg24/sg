import React from 'react';
import { StyleSheet } from 'react-native';
import ShadowView from 'react-native-simple-shadow-view';

const boxShadow = props => {
    return (
        <ShadowView style={[styles.wrapper, props.style, props.disabled ? styles.disabled: null]}>
            { props.children }
        </ShadowView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        shadowColor: '#000',
        backgroundColor: 'rgb(255,255,255)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: .2,
        shadowRadius: 4
    },
    disabled: {
        opacity: .6
    }
});

export default boxShadow;