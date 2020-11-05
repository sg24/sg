import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


import NotifyItem from './NotifyItem/NotifyItem';

const notify = props => {
    return (
        props.notify.reverse().map((cnt, index) => (
            <NotifyItem
                key={index}
                notify={cnt}
                showCnt={props.navigate.bind(this, cnt.category, cnt.id)}
            />
        ))
    )
}


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

export default notify;