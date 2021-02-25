import React, { Component } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { tailwind } from 'tailwind';
import {v4 as uuid } from 'uuid';
import Icon from 'ionicons';

import Button from '../Button/Button';
import ButtonItem from './ButtonItem/ButtonItem';
import BoxShadow from '../BoxShadow/BoxShadow';
import uriScheme from 'urischeme'; 

class CreateButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: [],
            formIsValid: true,
            advertButtonCnt: [],
            updateButton: false
        }
    }

    componentDidUpdate() {
        if (this.props.updateButton && !this.state.updateButton) {
            let form = [];
            let advertButtonCnt = [];
            if (this.props.button && this.props.button.length > 0) {
                for (let button of this.props.button) {
                    let value = {buttonType: button.buttonType, content: button.content, title: button.title};
                    form.push({id: button._id, formIsValid: true, value});
                    advertButtonCnt.push({id: button._id, ...value})
                }
            }
            this.setState({form, formIsValid: true,advertButtonCnt,updateButton: true});
        }
    }

    resetButton = () => {
        this.setState({form: [], formIsValid: true, advertButtonCnt: []})
    }

    checkFormHandler = (formDet) => {
        let form = [...this.state.form];
        let curForm = form.filter(cnt => cnt.id === formDet.id)[0];
        let curFormIndex = form.findIndex(cnt => cnt.id === formDet.id);
        if (curForm) {
            curForm.formIsValid = formDet.formIsValid;
            curForm['value'] = formDet.value;
        }
        form[curFormIndex] = curForm;
        let formIsValid = true;
        let advertButtonCnt = [];
        let buttonCnt = []
        for (let formItem of form) {
            advertButtonCnt.push(formItem.value);
            buttonCnt.push({id: formItem.id, ...formItem.value})
            formIsValid = formIsValid && formItem.formIsValid;
        }
        this.props.advertButton(formIsValid, advertButtonCnt)
        this.setState({form, formIsValid, advertButtonCnt: buttonCnt})
    }

    createButtonHandler = () => {
        if (this.state.form.length <= this.props.max) {
            let form = [...this.state.form];
            form.push({id: uuid(), formIsValid: false, value: {}});
            this.props.advertButton(false, this.state.advertButtonCnt)
            this.setState({form, formIsValid: false})
        }
    }

    removeButtonHandler = (id) => {
        let form = [...this.state.form];
        let updateForm = form.filter(cnt => cnt.id !== id);
        let updateButtonCnt = this.state.advertButtonCnt.filter(cnt => cnt.id !== id);
        let formIsValid = true;
        for (let formItem of updateForm) {
            formIsValid = formIsValid && formItem.formIsValid;
        }
        this.props.advertButton(formIsValid, updateButtonCnt)
        this.setState({form: updateForm, formIsValid, advertButtonCnt: updateButtonCnt})
    }

    openLinkHandler = (button) => {
        uriScheme(button.buttonType, button.content)
    }

    render() {
       
        return(
            <View style={styles.wrapper}>
               <Button 
                    onPress={this.createButtonHandler}
                    disabled={this.state.form.length === this.props.max}
                    style={styles.createButton}>
                    <BoxShadow style={styles.form} disabled={this.state.form.length === this.props.max}>
                        <Text style={styles.title}>{this.props.title }</Text>
                    </BoxShadow>
                </Button>
                { this.state.form.length > 0 ? 
                    <View style={styles.formWrapper}>
                        {this.state.form.map((cnt, index) => (
                            <ButtonItem 
                                key={index}
                                id={cnt.id}
                                cnt={cnt.value}
                                remove={() => this.removeButtonHandler(cnt.id)}
                                inputUri={this.props.advertButtonUri}
                                checkForm={this.checkFormHandler}/>
                        ))}
                    </View> : null }
                { this.state.formIsValid && this.state.advertButtonCnt.length > 0 ? (
                    <View style={styles.previewWrapper}>
                        {this.state.advertButtonCnt.map((button, index) => (
                            <Button 
                                key={index}
                                title={button.title}
                                style={styles.previewButton}
                                onPress={() => this.openLinkHandler(button)}
                                />
                        ))}
                    </View>
                ): null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 10,
        alignItems: 'flex-start',
        width: '100%'
    },
    createButton: {
        paddingVertical: 0,
        paddingBottom: 8
    },
    form: {
        backgroundColor: '#e9ebf2',
        paddingVertical: 5,
        paddingHorizontal: 10,
        ...tailwind('rounded-full')
    },
    title: {
        color: '#333',
        fontSize: 16
    },
    formWrapper: {
        backgroundColor: '#dcdbdc',
        padding: 10,
        flex: 1,
        width: '100%'
    },
    previewWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 5
    },  
    previewButton: {
        backgroundColor: '#437da3',
        paddingHorizontal: 5,
        marginRight: 10,
        paddingVertical: 6
    }
})

export default CreateButton;