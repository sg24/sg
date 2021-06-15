import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import PrivateConv from './PrivateConv/PrivateConv';
import GroupConv from './GroupConv/GroupConv';

const conv = props => (
    props.conv.map((cnt, index) =>  (
        <PrivateConv
            key={index}
            cnt={cnt}
            userID={props.userID}
            userProfile={props.userProfile.bind(this, cnt._id)}
            chat={props.chat.bind(this, cnt)}
            pageReaction={[]}
            lastItem={(props.conv.length - 1) === index}
            enableLoadMore={props.enableLoadMore}
            start={props.start}
            loadMore={props.loadMore}/>
    ))
)


const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 20,
        borderColor: '#dcdbdc',
        borderWidth: 1
    },
    category: {
        backgroundColor: '#dcdbdc',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        textTransform: 'capitalize',
        fontSize: 16
    }
});

export default conv;