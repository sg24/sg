import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import CBTPreviewItem from './CBTPreviewItem';

const cbtPreview = props => {
    let cnt = props.cnt.map((cnt, index) => (
        <CBTPreviewItem 
            key={index}
            cnt={cnt}
            openURI={props.openURI}
            preview={props.preview} />
    ))
    return  (
        <ScrollView
            horizontal
            style={styles.wrapper}>
            { cnt }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#dcdbdc',
        width: '100%',
        padding: 10,
        marginBottom: 20
    }
})

export default cbtPreview;