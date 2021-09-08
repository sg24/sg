import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { tailwind } from 'tailwind';
import Constants from 'expo-constants';
// import * as WebBrowser from 'expo-web-browser';
// import urischeme from 'urischeme';
import { Html5Entities } from 'html-entities';
import AsyncStorage from '@react-native-community/async-storage';
import Text, { translator } from 'text';

import LinearBackground from '../../components/UI/LinearBackground/LinearBackground';
import logo from '../../assets/logocircle.png';
import FormElement from '../../components/UI/FormElement/FormElement';
import Button from '../../components/UI/Button/Button';
import Href from '../../components/UI/Href/Href';
import { updateObject, checkValidity } from '../../shared/utility';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import * as actions from '../../store/actions/index';
import WebView from '../../components/UI/WebView/WebView';
import FormModal from '../../components/UI/FormModal/FormModal';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: Dimensions.get('window').width >= 530 ? 'landscape' : 'portrait',
            formElement: {
                email: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1,
                        emailValidator: true
                    },
                    valid: false,
                    touched: false
                }
            },
            formIsValid: false,
            uri: null
        }
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.updateStyle)
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onAuthReset();
        });
        AsyncStorage.getItem(Constants.manifest.extra.REDIRECT_URI).then(url => {
            if (url) {
                let redirectUri = JSON.parse(url);
                this.props.navigation.push(redirectUri.uri, redirectUri.params);
                AsyncStorage.removeItem(Constants.manifest.extra.REDIRECT_URI);
            }
        });
    }

    componentDidUpdate() {
        AsyncStorage.getItem(Constants.manifest.extra.REDIRECT_URI).then(url => {
            if (url) {
                let redirectUri = JSON.parse(url);
                this.props.navigation.push(redirectUri.uri, redirectUri.params);
                AsyncStorage.removeItem(Constants.manifest.extra.REDIRECT_URI);
            }
        })
    }

    componentWillUnmount() {
        this._unsubscribe();
        Dimensions.removeEventListener('change', this.updateStyle);
    }

    updateStyle = (dims) => {
        this.setState({
            viewMode: dims.window.width >= 530 ? 'landscape' : 'portriat'
        })
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
        if (page === 'signup') {
          this.props.navigation.navigate('SignUp')
        } else if (page === 'signin') {
          this.props.navigation.navigate('SignIn')
        }

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
        if (this.state.formIsValid) {
             let newCnt = {
                 email: this.state.formElement.email.value
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

        let cnt = (
            <>
                <FormElement
                    labelTitle="Email"
                    onChangeText={(val) => this.inputChangedHandler(val, 'email')}
                    autoCorrect={false}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    value={this.state.formElement.email.value}
                    valid={!this.state.formElement.email.valid && this.state.formElement.email.touched}
                    error={this.state.formElement.email.value.length > 0 ? "Enter valid Email" : "Email must not be empty"}/>
                <View style={styles.formElementButton}>
                    <Button 
                        title="Next"
                        style={styles.button}
                        onPress={this.submitHandler}
                        disabled={!this.state.formIsValid}
                        textStyle={styles.textStyle}
                        submitting={this.props.start}
                        loaderStyle="#fff"/>
                </View>
            </>
        )


        if (this.props.submitted) {
            cnt = (
                <FormModal 
                    email={this.state.formElement.email.value}/>
            )
        }

      return (
        <LinearBackground>
            <ScrollView>
                <View style={[styles.formWrapper, this.state.viewMode === 'landscape' ? styles.formWrapperLandscape : null]}>
                    <View
                        style={styles.imageWrapper}>
                        <Image source={logo} style={styles.image}/>
                    </View>
                    <View style={styles.formElementTitle}>
                        <Text style={styles.formElementTitleContent} keyword="S lodge24">Welcome to</Text>
                    </View>
                    { this.props.submitError ?
                        <Text style={styles.error}>{this.props.submitError.message}</Text> : null
                    }
                    <View style={styles.formElementWrapper}>
                        {cnt}   
                    </View>
                    <View style={styles.options}>
                        <Text>Create New Account</Text>
                        <Href 
                        title="Sign Up"
                        style={styles.href} 
                        onPress={() => this.navigationHandler('signup')}/>
                    </View>
                    <View style={styles.options}>
                        <Text>Already have an account</Text>
                        <Href 
                            title="Sign In"
                            style={styles.href}
                            onPress={() => this.navigationHandler('signin')} />
                    </View>
                    <View style={[styles.options, styles.term]}>
                        <Href 
                            title="Privacy policy"
                            style={[styles.href, styles.term]}
                            onPress={() => this.openBrowserHandler(`${Constants.manifest.extra.BASE_URL}privacy`)} />
                        {Platform.OS === 'web' ? <Text style={styles.copywrite} keyword=", S LODGE24">{entities.decode('&copy;')}{translator('2021')}</Text> : null}
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
        width: '90%',
        padding: 20,
        marginBottom: 20,
        marginTop: 38,
        position: 'relative',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
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
        ...tailwind('bg-gray-300  rounded-full')
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
        backgroundColor: '#ff1600',
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
    }
})

const mapStateToProps = state => {
    return {
        submitError: state.authForm.resetSubmitError,
        submitted: state.authForm.resetSubmitted,
        start: state.authForm.resetStart
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm: (formData) => dispatch(actions.submitAuthFormForgetPassInit(formData)),
        onAuthReset: () => dispatch(actions.authFormReset())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);