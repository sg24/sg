import React from 'react';
import { StyleSheet, ScrollView, Dimension } from 'react-native';
const scrollView = props => {
    return (
        <ScrollView style={styles.scrollWrapper} contentContainerStyle={styles.wrapper}>
            { props.children }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollWrapper: {
        position: 'relative',
        width: '100%',
        flex: 1,
    },
    wrapper: {
        position: 'relative',
        justifyContent: 'center', 
        alignItems: 'center',
        // flex: 1
    }
})

export default scrollView;