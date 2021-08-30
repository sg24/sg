import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { tailwind, size } from 'tailwind';
// import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import urischeme from 'urischeme';
import { Html5Entities } from 'html-entities';

import LinearBackground from '../../components/UI/LinearBackground/LinearBackground';
import logo from '../../assets/logocircle.png';
import FormElement from '../../components/UI/FormElement/FormElement';
import Button from '../../components/UI/Button/Button';
import Href from '../../components/UI/Href/Href';
import { updateObject, checkValidity } from '../../shared/utility';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import NotificationModal from '../../components/UI/NotificationModal/NotificationModal';
import WebView from '../../components/UI/WebView/WebView';
import * as actions from '../../store/actions/index';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
            token: this.props.route.params ? this.props.route.params.token : null,
            formElement: {
                password: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false
                },
            },
            confirmPassword:{
                value: '',
                valid: false,
                touched: false,
                err: null
            },
            showPassword: false,
            formIsValid: false,
            uri: null
        }
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
        if (this.state.token) {
            this._unsubscribe = this.props.navigation.addListener('focus', () => {
                if (this.state.token) {
                    this.props.onAuthReset();
                    this.setState({allowUpdate: true})
                }
                else {
                    this.props.navigation.goBack();
                }
            });
        } else {
            this.props.navigation.goBack();
        }
    }

    componentWillUnmount() {
        if (this.state.token) {
            this._unsubscribe();
        }
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
    }

    changePasswordFieldHandler = () => {
        this.setState({showPassword: !this.state.showPassword})
    }

    navigationHandler = () => {
        this.props.navigation.navigate('SignIn')
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

        this.setState({formElement: updateFormElement, formIsValid, 
            confirmPassword: this.state.confirmPassword.touched && inputType === 'password' && this.state.confirmPassword.value !== value ? updateObject(this.state.confirmPassword, {valid: false, err: 'Password does not match'})
            : !this.state.confirmPassword.touched ?this.state.confirmPassword :  updateObject(this.state.confirmPassword, {valid: true, err: null})})
    }

    confirmPasswordHandler = (value) => {
        if (this.state.formElement.password.value && this.state.formElement.password.valid) {
            if (this.state.formElement.password.value === value) {
                this.setState({confirmPassword: updateObject(this.state.confirmPassword, {value,  valid: true, err: null})});
                return 
            }
            this.setState({confirmPassword: updateObject(this.state.confirmPassword, {value,valid: false,  touched: true, err: 'Password does not match'})})
            return
        }
        this.setState({confirmPassword: updateObject(this.state.confirmPassword, {value, valid: false, touched: true, err: value.trim() !== '' ? null : 'Please, enter valid password'})})
    }

  
    openBrowserHandler = (uri) => {
        // if (Platform.OS === 'web') {
        //     return WebBrowser.openBrowserAsync(uri)
        // }
        this.setState({uri})
        // urischeme('URL', uri);
    }

    closeWebViewHandler = () => {
        this.setState({uri: null})
    }


    submitHandler = () => {
        if (this.state.formIsValid && this.state.confirmPassword.valid) {
            let newCnt = {
                password: this.state.formElement.password.value,
                token: this.state.token
            }
            this.props.onSubmitForm(newCnt)
        return
       }
     }

    render() {
        const entities = new Html5Entities();
        if (this.state.uri) {
            return (
                <WebView
                    uri={this.state.uri}
                    onPress={this.closeWebViewHandler}
                />
            )
        }

      return (
        <LinearBackground>
            { this.props.submitted ? <NotificationModal
                    info="Password updated succesfully !"
                    closeModal={this.navigationHandler}
                    button={[{title: 'Ok', onPress: this.navigationHandler, style: styles.modalButton}]}/> : null}
            <ScrollView>
                <View style={[styles.formWrapper, this.state.viewMode === 'landscape' ? styles.formWrapperLandscape : null]}>
                    <View
                        style={styles.imageWrapper}>
                        <Image source={logo} style={styles.image}/>
                    </View>
                    <View style={styles.formElementTitle}>
                        <Text style={styles.formElementTitleContent}>Welcome to S lodge24</Text>
                    </View>
                    { this.props.submitError ?
                        <Text style={styles.error}>{this.props.submitError.message}</Text> : null
                    }
                    <View style={styles.formElementWrapper}>
                        <FormElement
                            labelTitle="Password"
                            autoCompleteType="password"
                            textContentType="password"
                            secureTextEntry={!this.state.showPassword}
                            value={this.state.formElement.password.value}
                            valid={!this.state.formElement.password.valid && this.state.formElement.password.touched}
                            onChangeText={(val) => this.inputChangedHandler(val, 'password')}
                            error="Password must not be empty"
                            inputIcon="eye-outline"
                            onPress={this.changePasswordFieldHandler}/>
                        <FormElement
                            labelTitle="Confirm Password"
                            textContentType="password"
                            secureTextEntry
                            value={this.state.confirmPassword.value}
                            valid={!this.state.confirmPassword.valid && this.state.confirmPassword.touched && this.state.confirmPassword.err}
                            onChangeText={this.confirmPasswordHandler}
                            error={this.state.confirmPassword.err}/>
                        <View style={styles.formElementButton}>
                            <Button 
                                title="Reset"
                                style={styles.button}
                                onPress={!this.props.start ? this.submitHandler : null}
                                disabled={!this.state.formIsValid || !this.state.confirmPassword.valid}
                                textStyle={styles.textStyle}
                                submitting={this.props.start}
                                loaderStyle="#fff"/>
                        </View>
                    </View>
                    <View style={[styles.options, styles.term]}>
                        <Href 
                            title="Privacy policy"
                            style={[styles.href, styles.term]}
                            onPress={() => this.openBrowserHandler(`${Constants.manifest.extra.BASE_URL}privacy`)} />
                        {Platform.OS === 'web' ? <Text style={styles.copywrite}>{entities.decode('&copy;')} 2021, S LODGE24</Text> : null}
                        <Href 
                        title="Terms of service"
                        style={[styles.href, styles.term]} 
                        onPress={() => this.openBrowserHandler(`${Constants.manifest.extra.BASE_URL}term`)}/>
                    </View>
                </View>
           </ScrollView>
        </LinearBackground>
      )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15
    },
    formWrapper: {
        backgroundColor: '#fff',
        width:'90%',
        padding: 20,
        marginBottom: 20,
        marginTop: 38,
        position: 'relative',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formWrapperLandscape: {
        width: 500
    },
    imageWrapper: {
        ...tailwind('rounded-full bg-white absolute w-16 h-16 justify-center items-center'), 
        top: -32
    },
    image: {
        ...tailwind('rounded-full'),
        resizeMode: 'cover',
        backgroundColor: '#fff',
        width: 58,
        height: 58
    },
    formElementWrapper: {
        paddingTop: 20,
        borderWidth: 1,
        borderColor: '#dcdbdc',
        marginTop: 0,
        position: 'relative',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    formElementTitle: {
        position: 'relative',
        marginLeft: 10,
        paddingVertical: 5,
        borderRadius: 10,
        width: 170,
        marginTop: 20,
        marginBottom: 20,
        ...tailwind('bg-gray-200')
    },
    formElementTitleContent: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
        fontSize: 15
    },
    formElementButton: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: '#f9f9f9',
        alignItems: 'flex-end',
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3
    },
    button: {
        width: 70,
        backgroundColor: '#437da3',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    options: {
        padding: 0,
        marginTop: 20,
        fontWeight: 'normal',
        flexDirection: 'row',
        width: '100%',
    },
    href: {
        textDecorationLine: 'underline',
        textDecorationColor: '#0284a8',
        color: '#0284a8',
        textDecorationStyle: 'solid',
        marginLeft: 5
    },
    copywrite: {
        fontWeight: 'bold',
        fontSize: 12
    },
    term: {
        justifyContent: 'space-between',
        textDecorationColor: '#333',
        color: '#333',
        alignItems: 'center',
        marginLeft: 0
    },
    error: {
        position: 'relative',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 15,
        backgroundColor: '#f9f9f9',
        color: '#ff1600'
    },
    modalButton: {
        backgroundColor: '#437da3',
        color: '#fff'
    }
})

const mapStateToProps = state => {
    return {
        submitError: state.authForm.resetpassSubmitError,
        submitted: state.authForm.resetpassSubmitted,
        start: state.authForm.resetpassStart
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm: (formData) => dispatch(actions.submitAuthFormResetPassInit(formData)),
        onAuthReset: () => dispatch(actions.authFormReset()),
        onLoggedIn: () => dispatch(actions.loggedIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);