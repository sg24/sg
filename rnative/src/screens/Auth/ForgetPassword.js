import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import LinearBackground from '../../components/UI/LinearBackground/LinearBackground';
import logo from '../../assets/logo.png';
import FormElement from '../../components/UI/FormElement/FormElement';
import Botton from '../../components/UI/Botton/Botton';
import Href from '../../components/UI/Href/Href';
import { updateObject, checkValidity } from '../../shared/utility';
import ScrollView from '../../components/UI/ScrollView/ScrollView';
import * as actions from '../../store/actions/index';
import FormModal from '../../components/UI/FormModal/FormModal';

class ForgetPassword extends Component {
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
                }
            },
            formIsValid: false
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onAuthReset();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
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
                <View style={styles.formElementBotton}>
                    <Botton 
                        title="Next"
                        style={styles.botton}
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
                    <Image source={logo} style={styles.imageWrapper}/>
                    <View style={styles.formElementTitle}>
                        <Text style={styles.formElementTitleContent}>Welcome to S lodge24</Text>
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
    formElementBotton: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 5,
        backgroundColor: '#f9f9f9',
        alignItems: 'flex-end',
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3
    },
    botton: {
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
    term: {
        justifyContent: 'space-between',
        color: '#333'
    },
    error: {
        position: 'relative',
        paddingVertical: 5,
        paddingHorizontal: 20,
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