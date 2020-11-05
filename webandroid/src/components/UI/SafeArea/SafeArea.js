import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const safeArea = props => (
    <SafeAreaView style={[styles.container, props.style]}>
        { props.children }
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default safeArea;