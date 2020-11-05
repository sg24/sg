import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'Ionicons';

const formElement = props => {
    return (
        <View style={[styles.wrapper, props.formWrapperStyle]}>
            {props.labelTitle ? <Text style={[styles.labelTitle, props.labelStyle]}>{props.labelTitle}</Text> : null}
            <View style={[styles.InputWrapper, props.inputWrapperStyle]}>
                <TextInput 
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    {...props}
                    style={[styles.input, props.style]} />
                {props.inputIcon ? (
                    <View style={[styles.inputIcon, props.inputIconStyle]}>
                        <TouchableOpacity onPress={props.onPress}>
                            <Ionicons name={props.inputIcon} size={14}/>
                        </TouchableOpacity>
                    </View>
                ): null}
            </View>
            { props.valid ?
                <Text style={styles.error}>{props.error}</Text> : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        width: '100%'
    },
    labelTitle: {
        color: '#000',
        fontWeight: 'normal',
        textAlign: 'left',
        fontSize: 15,
    },
    InputWrapper: {
        position: 'relative',
        width: '100%',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dcdbdc'
    },
    input: {
        width: '100%',
        borderWidth: 0,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginTop: 0,
        marginRight: 0,
        marginLeft: 0,
        marginBottom: 0,
        borderRadius: 5,
        backgroundColor: 'transparent'
    },
    inputIcon: {
        position: 'absolute',
        right: 5,
        top: 10,
        width: 20
    },
    error: {
        position: 'relative',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        fontSize: 15,
        backgroundColor: '#f9f9f9',
        color: '#ff1600'
    }
})

export default formElement;