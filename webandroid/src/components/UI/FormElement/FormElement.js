import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import Ionicons from 'ionicons';
import { makeUseStyles } from "react-native-stylex";
import {withStyles} from "react-native-stylex/withStyles";

const formElement = props => {
    const {styles} = props
    return (
        <View style={[styles.wrapper, props.formWrapperStyle]}>
            {props.labelTitle ? <Text style={[styles.labelTitle, props.labelStyle]}>{props.labelTitle}</Text> : null}
            <View style={[styles.InputWrapper, props.inputWrapperStyle]}>
                <TextInput 
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    {...props}
                    style={[styles.input, props.style]} />
                {props.inputIcon || props.range ? (
                    <View style={[styles.inputIcon, props.inputIconStyle]}>
                        { props.inputIcon ? 
                            <TouchableOpacity onPress={props.onPress}>
                                <Ionicons name={props.inputIcon} size={props.inputIconSize ? props.inputIconSize : 14}/>
                            </TouchableOpacity> : 
                            <Text>{ props.range }</Text>}
                    </View>
                ): null}
            </View>
            { props.valid ?
                <Text style={styles.error}>{props.error}</Text> : null
            }
        </View>
    )
}

const useStyles = makeUseStyles(({ palette, utils }) => ({
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
        borderColor: '#dcdbdc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        borderWidth: 0,
        paddingVertical: Platform.OS !== 'web' ? 4 : 7,
        paddingHorizontal: 10,
        marginTop: 0,
        marginRight: 0,
        marginLeft: 0,
        marginBottom: 0,
        borderRadius: 5,
        backgroundColor: 'transparent',
        ...Platform.select({
            web: {
                outlineWidth: 0
            }
        })
    },
    inputIcon: {
        position: 'absolute',
        right: 10,
        top: 0,
        bottom: 0,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center'
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
}))

export default withStyles(useStyles)(formElement);