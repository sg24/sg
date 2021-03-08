import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Ionicons from 'ionicons';

import InnerScreen from '../InnerScreen/InnerScreen';
import Button from '../Button/Button';
import BoxShadow from '../BoxShadow/BoxShadow';
import AbsoluteFill from '../AbsoluteFill/AbsoluteFill';

const option = props => (
    <InnerScreen
        outterStyle={styles.outterStyle}
        onRequestClose={props.closeOption}
        closeModal={props.closeOption}
        animationType="fade"
        transparent
        backdropOpacity={0}
        onBackdropPress={props.closeOption}
        onPress={props.closeOption}>
        <View style={[styles.container, props.overlay ? styles.overlayContainer : null, props.wrapperStyle]}>
            {props.overlay ? <AbsoluteFill  onPress={props.closeOption}/> : null}
            <BoxShadow style={[styles.optionWrapper, props.overlay ? styles.overlayOptionWrapper : null]}>
                {props.info ? 
                    <View style={styles.infoWrapper}>
                        <Text style={styles.info}>{ props.info }</Text>
                    </View> : null}
                { props.option.map((option, index) => (
                    <Button style={styles.option} key={index} onPress={() => props.onPress(option.action)}>
                        <Ionicons name={option.icon.name} size={option.icon.size || 20} />
                        <Text style={styles.optiontext}>{ option.title }</Text>
                    </Button>
                ))}
            </BoxShadow>
        </View>
    </InnerScreen>
)

const styles = StyleSheet.create({
    outterStyle: {
        backgroundColor: 'transparent'
    },
    container: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundCOlor: '#fff'
    },
    overlayContainer: {
        position: 'relative',
        flex: 1,
        top: 'auto',
        right: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionWrapper: {
        paddingHorizontal: 10,
        shadowOffset: {
            width: 0,
            height: 1
        }
    },
    overlayOptionWrapper: {
        backgroundColor: '#fff'
    },
    option: {
        flexDirection: 'row',
        paddingVerical: 5
    },
    optiontext: {
        marginLeft: 10
    },
    infoWrapper: {
        padding: 10,
        borderBottomColor: '#dcdbdc',
        borderBottomWidth: 1
    },
    info: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});


export default option;