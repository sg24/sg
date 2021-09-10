import React from 'react';
import {  StyleSheet } from 'react-native';


import NotifyItem from './NotifyItem/NotifyItem';

const notify = props => {
    return (
        props.notify.map((cnt, index) => (
            <NotifyItem
                key={index}
                cnt={cnt}
                showCnt={props.navigate.bind(this, cnt.page, cnt)}
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