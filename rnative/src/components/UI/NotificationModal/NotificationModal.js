import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Botton from '../Botton/Botton';
import BoxShadow from '../BoxShadow/BoxShadow';

const notificationModal = props => {
    return (
        <Modal 
            transparent
            onRequestClose={props.closeModal}
            animationType="slide">
            <TouchableWithoutFeedback>
                <View style={styles.modalWrapper}>
                    <View style={styles.wrapper}>
                        <View style={styles.infoWrapper}>
                            {props.infoIcon ? <Icon name={props.infoIcon.name} size={ props.infoIcon.size || 40} color={ props.infoIcon.color || '#000'}/> : null }
                            <Text style={[styles.textStyle, props.style]}>{props.info}</Text>
                        </View>
                        {props.botton ? <View style={styles.botton}>
                            {props.botton.map((cnt, index) => (
                                <Botton key={index} onPress={cnt.onPress}>
                                    <BoxShadow style={styles.boxShadow}>
                                        <Text style={[styles.bottonText, cnt.style]}>{cnt.title}</Text>
                                    </BoxShadow>
                                </Botton>
                            ))}
                        </View>: null}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, .65)',
    },
    wrapper: {
        backgroundColor: '#fff',
        minWidth: 200,
        maxWidth: 300
    },
    infoWrapper: {
        alignItems: 'center',
        padding: 5
    },
    textStyle: {
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center'
    },
    botton: {
        backgroundColor: '#e9ebf2',
        paddingHorizontal: 5,
        marginTop: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    bottonText: {
        color: '#333',
        backgroundColor: '#fff',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 3,
        fontSize: 16
    },
    boxShadow: {
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: .75,
        shadowRadius: 1,
        shadowOffset: { width: 0, height: 1 },
        borderRadius: 3
    }
})

export default notificationModal;