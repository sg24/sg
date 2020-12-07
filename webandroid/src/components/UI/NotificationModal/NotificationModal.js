import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'ionicons';

import InnerScreen from '../InnerScreen/InnerScreen';
import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';
import AbsoluteFill from '../AbsoluteFill/AbsoluteFill';

const notificationModal = props => {
    return (
        <InnerScreen
            transparent 
            onRequestClose={props.closeModal}
            animationType="slide"
            onBackdropPress={props.closeModal}
            outterStyle={styles.webModal}
            overlay>
            <View style={styles.modal}>
                <AbsoluteFill  onPress={props.closeModal}/>
                <View style={styles.wrapper}>
                    <View style={styles.infoWrapper}>
                        {props.infoIcon ? <Icon name={props.infoIcon.name} size={ props.infoIcon.size || 40} color={ props.infoIcon.color || '#000'}/> : null }
                        <Text style={[styles.textStyle, props.style]}>{props.info}</Text>
                    </View>
                    {props.button ? <View style={styles.button}>
                        {props.button.map((cnt, index) => (
                            <Button key={index} onPress={cnt.onPress}>
                                <BoxShadow style={styles.boxShadow}>
                                    <Text style={[styles.buttonText, cnt.style]}>{cnt.title}</Text>
                                </BoxShadow>
                            </Button>
                        ))}
                    </View>: null}
                </View>
            </View>
        </InnerScreen>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webModal: {
        backgroundColor: 'transparent'
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
    button: {
        backgroundColor: '#e9ebf2',
        paddingHorizontal: 5,
        marginTop: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    buttonText: {
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