import React, { Component } from 'react';
import { View, Text, Keyboard, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import LinearBackground from '../../components/UI/NoBackground/NoBackground';
import logo from '../../assets/logo.png';
import FormElement from '../../components/UI/FormElement/FormElement';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Post extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyle)
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
            formElement: {
                content: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid: false
        }
    }


    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onAddFormReset();
        });
    }

    componentDidUpdate() {
        if (this.props.submitted && this.props.cntID) {
            alert();
            this._unsubscribe();
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    inputChangedHandler = (value, inputType) => {
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value,
            valid: checkValidity(value, this.state.formElement[inputType].validation),
            touched: true
        });
        
        let formIsValid = true;
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            formIsValid = updateFormElement[inputType].valid && formIsValid;
        }
        
        this.setState({formElement: updateFormElement, formIsValid})
    }

    navigationHandler = (page) => {
    }

    showEmojiHandler = () => {
        Keyboard.dismiss();
    }

    pickImageHandler = () => {
        Keyboard.dismiss();
        const options = {
            title: 'Select',
            allowsEditing: true,
            noData: true,
            quality: 0,
            videoQuality: "low",
            mediaType: 'mixed',
            takePhotoButtonTitle: 'Use Camera',
            customButtons: [{name: 'Video', title: ""}],

            multiple: true,
            includeExif: true,
            cropperToolbarTitle: 'Select',
            compressImageQuality: .5
        }
        ImagePicker.openPicker(options,(response) => {
           console.log(response)
        });
    }

    submitHandler = () => {
        if (this.state.formIsValid) {
             let newCnt = {
                 email: this.state.formElement.email.value,
                 password: this.state.formElement.password.value
             }
             this.props.onSubmitForm(newCnt)
         return
        }
    }

    render() {
      return (
        <LinearBackground>
            <View style={[styles.formWrapper, this.state.viewMode === 'landscape' ? styles.formWrapperLandscape : null]}>
                { this.props.submitError ?
                    <Text style={styles.error}>{this.props.submitError.message}</Text> : null
                }
                
                <View style={styles.formElementWrapper}>
                    <FormElement
                        onChangeText={(val) => this.inputChangedHandler(val, 'content')}
                        autoCorrect
                        multiline
                        autoFocus
                        placeholder={"Write ...."}
                        editable={this.state.editable}
                        value={this.state.formElement.content.value}
                        formWrapperStyle={styles.formWrapperStyle}
                        inputWrapperStyle={styles.formWrapperStyle}
                        style={styles.formElementInput}/>
                    <View style={styles.formElementButton}>
                        <View style={styles.formButtonWrapper}>
                            <Button 
                                style={styles.icon}
                                onPress={this.pickImageHandler}> 
                                <Icon name="camera-outline" size={22} />
                            </Button>
                            <Button 
                                style={styles.icon}
                                onPress={this.showEmojiHandler}>
                                <Icon name="happy-outline" size={22}/>
                            </Button>
                        </View>
                        <Button 
                            title="Add"
                            style={styles.button}
                            onPress={this.submitHandler}
                            disabled={!this.state.formIsValid}
                            textStyle={styles.textStyle}
                            submitting={this.props.start}
                            loaderStyle="#fff"/>
                    </View>
                </View>
            </View>
        </LinearBackground>
      )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    formWrapper: {
        width:'100%',
        padding: 10,
        marginBottom: 0,
        marginTop: 0,
        position: 'relative',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    formWrapperLandscape: {
        width: 500
    },
    imageWrapper: {
        position: 'absolute',
        width: 52,
        height: 40,
        backgroundColor: '#fff',
        top: -20,
        zIndex: 1,
        resizeMode: 'cover',
        borderRadius: 5,
        alignSelf: 'center'
    },
    formElementWrapper: {
        position: 'relative',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        backgroundColor: '#fff',
        flex: 1
    },
    formElementButton: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#f9f9f9',
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    formButtonWrapper: {
        flexDirection: 'row'
    },
    button: {
        width: 70,
        backgroundColor: '#437da3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        position: 'relative',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginBottom: 10,
        fontSize: 15,
        backgroundColor: '#f9f9f9',
        color: '#ff1600'
    },
    formWrapperStyle: {
        flex: 1,
        borderWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0
    },
    formElementInput: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16
    }
})

const mapStateToProps = state => {
    return {
        submitError: state.addForm.postSubmitError,
        submitted: state.addForm.postSubmitted,
        start: state.addForm.postStart,
        cntID: state.addForm.cntID
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm: (formData) => dispatch(actions.submitAddFormInit(formData)),
        onAddFormReset: () => dispatch(actions.addFormReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);