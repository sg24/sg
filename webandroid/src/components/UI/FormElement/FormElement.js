import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import Ionicons from 'ionicons';

import Editor from 'editor';

class FormElement extends Component {
    render() {
        return (
            <View style={[styles.wrapper, this.props.formWrapperStyle]}>
                {this.props.labelTitle ? <Text style={[styles.labelTitle, this.props.labelStyle]}>{this.props.labelTitle}</Text> : null}
                <View style={[styles.InputWrapper, this.props.inputWrapperStyle]}>
                    { this.props.fullEditor ? <Editor
                        ref={(ref) => this._editor = ref}
                        autoCapitalize="none"
                        {...this.props}
                        style={[styles.input, this.props.style]} />:
                        <TextInput 
                        autoCapitalize="none"
                        underlineColorAndroid="transparent"
                        {...this.props}
                        style={[styles.input, this.props.style]} />
                    }
                    {this.props.inputIcon || this.props.range ? (
                        <View style={[styles.inputIcon, this.props.inputIconStyle]}>
                            { this.props.inputIcon ? 
                                <TouchableOpacity onPress={this.props.onPress}>
                                    <Ionicons name={this.props.inputIcon} size={this.props.inputIconSize ? this.props.inputIconSize : 14}/>
                                </TouchableOpacity> : 
                                <Text>{ this.props.range }</Text>}
                        </View>
                    ): null}
                </View>
                { this.props.valid ?
                    <Text style={styles.error}>{this.props.error}</Text> : null
                }
            </View>
        )
    }
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
})

export default FormElement;