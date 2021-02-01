import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
            <View style={styles.wrapper}>
                <View style={[styles.removeWrapper, styles.remove]}>
                    <TouchableNativeFeedback onPress={this.props.remove}>
                        <Ionicons name="trash-bin-outline" size={20} color="#ff1600"/>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.option}>
                    <Select 
                        title="Button Type"
                        icon={{name: 'chevron-down-outline', size: 15}}
                        onSelect={(val) => this.inputChangedHandler(val, 'buttonType')}
                        error="Type must not be empty"
                        valid={!this.state.formElement.buttonType.valid && this.state.formElement.buttonType.touched}
                        value={this.state.formElement.buttonType.value}
                        option={this.state.buttonType}
                        />
                    <FormElement
                        placeholder={`Enter ${this.state.formElement.buttonType.value !== '' ? 
                        this.state.formElement.buttonType.value === 'URL' || this.state.formElement.buttonType.value === 'E-mail' ? 
                        this.state.formElement.buttonType.value : 'Phone  Number' : 'URL / Phone Number'}`}
                        onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                        error={`Enter ${this.state.formElement.buttonType.value !== '' ? 
                        this.state.formElement.buttonType.value === 'URL' || this.state.formElement.buttonType.value === 'E-mail' ? 
                        this.state.formElement.buttonType.value : 'Phone  Number' : 'URL / Phone Number'}`}
                        formWrapperStyle={styles.formWrapper}
                        value={this.state.formElement.content.value}
                        valid={!this.state.formElement.content.valid && this.state.formElement.content.touched}/>
                    <FormElement
                        placeholder="Buy Now"
                        onChangeText={(val) => this.inputChangedHandler(val, 'title')}
                        error="Title must not be empty"
                        autoCorrect
                        formWrapperStyle={styles.formWrapper}
                        value={this.state.formElement.title.value}
                        valid={!this.state.formElement.title.valid && this.state.formElement.title.touched}
                        range={`${this.state.formElement.title.range.start}/${this.state.formElement.title.range.end}`}/>
                    
                </View>
            </View>           
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
        paddingVertical: 20,
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
    }
})

export default ButtonItem;