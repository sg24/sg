import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const formElement = props => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.labelTitle}>{props.labelTitle}</Text>
            <View style={styles.InputWrapper}>
                <TextInput 
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    {...props}
                    style={[styles.input, props.style]} />
                {props.inputIcon ? (
                    <View style={styles.inputIcon}>
                        <TouchableOpacity onPress={props.onPress}>
                            <Icon name={props.inputIcon} size={14}/>
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
        paddingLeft: 20,
        paddingRight: 20,
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
        paddingHorizontal: 20,
        marginTop: 10,
        fontSize: 15,
        backgroundColor: '#f9f9f9',
        color: '#ff1600'
    }
})

export default formElement;