import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import LinearBackground from '../../components/UI/LinearBackground/LinearBackground';
import logo from '../../assets/logo.png';
import FormElement from '../../components/UI/FormElement/FormElement';
import Button from '../../components/UI/Button/Button';
import Href from '../../components/UI/Href/Href';
import { updateObject, checkValidity } from '../../shared/utility';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import * as actions from '../../store/actions/index';

class Signin extends Component {
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyle)
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
                },
                password: {
                    value: '',
                    validation: {
                        required: true,
                        minLength: 1
                    },
                    valid: false,
                    touched: false
                }
            },
            showPassword: false,
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
            this.props.onAuthReset();
        });
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

    changePasswordFieldHandler = () => {
        this.setState({showPassword: !this.state.showPassword})
    }

    navigationHandler = (page) => {
        if (page === 'signup') {
            this.props.navigation.navigate('SignUp')
        }else if (page === 'forgetPassword') {
            this.props.navigation.navigate('ForgetPassword')
        }
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
            <ScrollView>
                <View style={[styles.formWrapper, this.state.viewMode === 'landscape' ? styles.formWrapperLandscape : null]}>
                    <Image source={logo} style={styles.imageWrapper}/>
                    <View style={styles.formElementTitle}>
                        <Text style={styles.formElementTitleContent}>Welcome to S lodge24</Text>
                    </View>
                    { this.props.submitError ?
                        <Text style={styles.error}>{this.props.submitError.message}</Text> : null
                    }
                    
                    <View style={styles.formElementWrapper}>
                        <FormElement
                            labelTitle="Email"
                            onChangeText={(val) => this.inputChangedHandler(val, 'email')}
                            autoCorrect={false}
                            autoCompleteType="email"
                            keyboardType="email-address"
                            value={this.state.formElement.email.value}
                            valid={!this.state.formElement.email.valid && this.state.formElement.email.touched}
                            error={this.state.formElement.email.value.length > 0 ? "Enter valid Email" : "Email must not be empty"}/>
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
                        <View style={styles.formElementButton}>
                            <Button 
                                title="Sign In"
                                style={styles.button}
                                onPress={this.submitHandler}
                                disabled={!this.state.formIsValid}
                                textStyle={styles.textStyle}
                                submitting={this.props.start}
                                loaderStyle="#fff"/>
                        </View>
                    </View>
                    <View style={styles.options}>
                        <Text>Forgot password</Text>
                        <Href 
                        title="Retrive"
                        style={styles.href} 
                        onPress={() => this.navigationHandler('forgetPassword')}/>
                    </View>
                    <View style={styles.options}>
                        <Text>Create New Account</Text>
                        <Href 
                            title="Sign Up"
                            style={styles.href}
                            onPress={() => this.navigationHandler('signup')} />
                    </View>
                    <View style={[styles.options, styles.term]}>
                        <Href 
                        title="Privacy policy"
                        style={[styles.href, styles.term]} />
                        <Href 
                        title="Terms of service"
                        style={[styles.href, styles.term]} />
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
        position: 'absolute',
        width: 72,
        height: 56,
        backgroundColor: '#fff',
        top: -28,
        zIndex: 1,
        resizeMode: 'cover',
        borderRadius: 5,
        alignSelf: 'center'
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
        backgroundColor: '#dcdbdc',
        borderRadius: 10,
        width: 170,
        marginTop: 20,
        marginBottom: 30
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
    term: {
        justifyContent: 'space-between',
        color: '#333'
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
        submitError: state.authForm.signinSubmitError,
        submitted: state.authForm.signinSubmitted,
        start: state.authForm.signinStart
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm: (formData) => dispatch(actions.submitAuthFormSignInInit(formData)),
        onAuthReset: () => dispatch(actions.authFormReset()),
        onLoggedIn: () => dispatch(actions.loggedIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);