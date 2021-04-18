import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import AdvertItem from './AdvertItem';

const advert = props => {
    let cnt = props.cnt.map((cnt, index) => (
        <AdvertItem 
            key={index}
            cnt={cnt}
            openURI={props.openURI}
            preview={props.preview}
            advertChatbox={props.advertChatbox.bind(this, cnt._id)} />
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

export default advert;