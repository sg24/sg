import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
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
        <TouchableWithoutFeedback  onPress={props.closeOption}>
            <View style={styles.wrapper}>
                {props.overlay ? <AbsoluteFill  onPress={props.closeOption}/> : null}
                <View style={[styles.container, props.overlay ? styles.overlayContainer : null, props.wrapperStyle]}>
                    <BoxShadow style={
                        props.overlay ? styles.overlayOptionWrapper : styles.optionWrapper}>
                        <ScrollView>
                        {props.info ? 
                            <View style={[styles.infoWrapper, props.infoWrapperStyle]}>
                                <Text style={[styles.info, props.infoStyle]}>{ props.info }</Text>
                            </View> : null}
                        { props.option.map((option, index) => (
                            <Button style={styles.option} key={index} onPress={() => props.onPress(option.action)}>
                                <Ionicons name={option.icon.name} size={option.icon.size || 20} />
                                <Text style={styles.optiontext}>{ option.title }</Text>
                            </Button>
                        ))}
                        </ScrollView>
                    </BoxShadow>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </InnerScreen>
)

const styles = StyleSheet.create({
    outterStyle: {
        backgroundColor: 'transparent'
    },
    wrapper: {
        flex: 1
    },
    container: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundColor: '#fff'
    },
    overlayContainer: {
        position: 'relative',
        flex: 1,
        top: 'auto',
        right: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    optionWrapper: {
        shadowOffset: {
            width: 0,
            height: 1
        }
    },
    overlayOptionWrapper: {
        maxWidth: 250,
        shadowOffset: {
            width: 0,
            height: 1
        },
        maxHeight: 200
    },
    option: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    optiontext: {
        marginLeft: 10
    },
    infoWrapper: {
        padding: 10
    },
    info: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});


export default option;