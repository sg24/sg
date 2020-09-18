import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import SafeAreaView from '../SafeArea/SafeArea';

const noBackground = props => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="light-content" backgroundColor="#437da3" />
            { props.children }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
})

export default noBackground;