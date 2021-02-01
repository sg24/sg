import React from 'react';
import { View, ImageBackground, TextInput, StyleSheet } from 'react-native';
import Icon from 'ionicons';
import { tailwind } from 'tailwind';

import BoxShadow from '../BoxShadow/BoxShadow';
import TouchableNativeFeedback from '../TouchableNativeFeedback/TouchableNativeFeedback';
import FormElement from '../FormElement/FormElement';


const search = props => (
    <>
        <BoxShadow style={styles.wrapper}>
            <TouchableNativeFeedback onPress={props.modal ? props.hideModal : props.onPress}>
                <Icon name="arrow-back-outline" size={26}/>
            </TouchableNativeFeedback>
            <FormElement
                placeholder="Search ... "
                autoCapitalize="none"
                formWrapperStyle={styles.formWrapper}
                inputWrapperStyle={styles.inputWrapper}
                style={styles.input}
                onChangeText={props.filterCnt}
                value={props.value}
                editable={props.editable}
                autoFocus/>
        </BoxShadow>
    </>
)

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        height: 40,
    },
    formWrapper: {
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 0,
        marginLeft: 10,
        width: 'auto',
        flex: 1,
        ...tailwind('rounded-full')
    },
    inputWrapper: {
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: 0,
        width: 'auto',
        flex: 1,
        ...tailwind('rounded-full')
    },
    input: {
        paddingHorizontal: 10,
        height: '100%',
        backgroundColor: '#e9ebf2',
        paddingVertical: 3,
        ...tailwind('rounded-full')
    }
});


export default search;