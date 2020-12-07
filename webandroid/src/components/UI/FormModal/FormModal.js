import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'ionicons';

const formModal  = props => {
    return (
       <View style={styles.wrapper}>
            <View style={styles.msgIcon}>
                <Icon name="mail" size={30} color="#16cf27"/>
            </View>
            <Text style={styles.sentMsg}>Message sent successfully</Text>
            <View style={styles.info}> 
                <Text style={styles.infoMsg}>
                    Please check you email address <Text style={styles.email}>{props.email}</Text> to reset password
                </Text>
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10
    },
    msgIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f9f9f9',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sentMsg: {
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        textAlign: 'center'
    },
    info: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        width: '100%'
    },
    infoMsg: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    infoEmail: {
        fontWeight: 'bold'
    }
})

export default formModal;