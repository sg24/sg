import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'ionicons';

import TouchableNativeFeedback from '../../TouchableNativeFeedback/TouchableNativeFeedback';
import FormElement from '../../FormElement/FormElement';
import Select from '../../Select/Select';
import { updateObject, checkValidity, checkUri } from '../../../../shared/utility';

class ButtonItem extends Component {
    state = {
        formElement: {
            buttonType: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            content: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            title: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false,
                range: {start: 0, end: 10}
            }
        },
        formIsValid: false,
        buttonType: [{title: 'URL', icon: {name: 'link-outline', size: 18}},
        {title: 'Call', icon: {name: 'call-outline', size: 18}},
        {title: 'Message', icon: {name: 'mail-outline', size: 18}},
        {title: 'E-mail', icon: {name: 'document-attach-outline', size: 18}}],
        inputUri: [],
        id: this.props.id
    };

    inputChangedHandler = (value, inputType) => {
        if (!this.state.formElement[inputType].range || (String(value).length <= this.state.formElement[inputType].range.end)) {
            let uri = checkUri(value);
            let range = this.state.formElement[inputType].range ? {
                range: updateObject(this.state.formElement[inputType].range , {
                    start: String(value).length
                })
            }: {}
            let updateFormType = updateObject(this.state.formElement[inputType], {
                value,
                valid: checkValidity(value, this.state.formElement[inputType].validation),
                touched: true,
                ...range
            });
            
            let formIsValid = true;
            let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})
            let allValue = {};
            for (let inputType in updateFormElement) {
                allValue[inputType] = updateFormElement[inputType].value;
                formIsValid = updateFormElement[inputType].valid && formIsValid;
            }
            
            if (this.state.formElement.buttonType.value === 'URL') {
                this.props.inputUri( uri ? uri : []);
            }
            this.props.checkForm({id: this.state.id, formIsValid, value: allValue});
            this.setState({formElement: updateFormElement, formIsValid, inputUri: uri ? uri : []})
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.select.closeSelectHandler()}>
                <View style={styles.wrapper}>
                    <View style={[styles.removeWrapper, styles.remove]}>
                        <TouchableNativeFeedback onPress={this.props.remove}>
                            <Ionicons name="trash-bin-outline" size={20} color="#ff1600"/>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.option}>
                        <Select 
                            ref={(ref) => this.select = ref}
                            title="Type"
                            icon={{name: 'chevron-down-outline', size: 15}}
                            onSelect={(val) => this.inputChangedHandler(val, 'buttonType')}
                            error="Type must not be empty"
                            value={this.state.formElement.buttonType.value}
                            option={this.state.buttonType}
                            optionWrapperStyle={Platform.OS !== 'web' ? styles.selectOption : null}
                            optionStyle={Platform.OS !== 'web' ? styles.optionStyle : null}
                            />
                        <FormElement
                            placeholder={`${this.state.formElement.buttonType.value !== '' ? 
                            this.state.formElement.buttonType.value === 'URL' || this.state.formElement.buttonType.value === 'E-mail' ? 
                            this.state.formElement.buttonType.value : 'Phone  Number' : 'URL / Phone Number'}`}
                            onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                            error={`${this.state.formElement.buttonType.value !== '' ? 
                            this.state.formElement.buttonType.value === 'URL' || this.state.formElement.buttonType.value === 'E-mail' ? 
                            this.state.formElement.buttonType.value : 'Phone  Number' : 'URL / Phone Number'}`}
                            formWrapperStyle={styles.formWrapper}
                            value={this.state.formElement.content.value}/>
                        <FormElement
                            placeholder="Buy Now"
                            onChangeText={(val) => this.inputChangedHandler(val, 'title')}
                            error="Title must not be empty"
                            autoCorrect
                            formWrapperStyle={styles.formWrapper}
                            value={this.state.formElement.title.value}
                            range={`${this.state.formElement.title.range.start}/${this.state.formElement.title.range.end}`}
                            inputIconStyle={styles.inputIcon}/>
                    </View>
                    { this.state.formElement.buttonType.value === 'URL' && this.state.formElement.content.touched &&
                        !String(this.state.formElement.content.value).startsWith('http') ? 
                    <Text style={styles.error}>URL must start with http or https</Text> : null}
                </View> 
            </TouchableWithoutFeedback>
                     
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 3,
    },
    option: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: Platform.OS !== 'web' ? 30 : 20,
        borderRadius: 3
    },
    removeWrapper: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#dcdbdc',
        position: 'absolute',
        right: -5,
        zIndex: 2,
        top: -5
    },
    remove: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    formWrapper: {
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 0,
        paddingBottom: 0,
        flexShrink: 1
    },
    inputIcon: {
        width: 'auto'
    },
    selectOption: {
        bottom: 'auto',
        top: -50,
        left: -10
    },
    optionStyle: {
        paddingVertical: 4,
        paddingHorizontal: 5,
        flex: 1,
        flexDirection: 'row'
    },
    error: {
        position: 'relative',
        paddingVertical: 5,
        fontSize: 15,
        color: '#ff1600',
        marginBottom: 5
    }
})

export default ButtonItem;