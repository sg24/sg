import React, { Component } from 'react';

import axios from 'axios';
import { updateObject, checkValidity } from '../../../../../shared/utility';

class Auth extends Component {
    state = {
        formElement: {
            username: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
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
        signup: {
            username: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            email: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        formMode: 'login',
        confirmPass:{
            value: '',
            valid: false,
            touched: false,
            err: null
        },
        err: null,
        start: false,
        signupIsValid: false
    }

    inputChangedHandler = (event, inputType) => {
        let value = event.target.value;
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

    changeTabHandler = (mode) => {
        this.setState({formMode: mode, err: null})
    }

    contentChangedHandler = (event, inputType) => {
        let updateFormType = updateObject(this.state.signup[inputType], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.signup[inputType].validation),
            touched: true
        });
        
        let signupIsValid = true;
        let updateFormElement = updateObject(this.state.signup, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            signupIsValid = updateFormElement[inputType].valid && signupIsValid;
        }

        this.setState({signup: updateFormElement, signupIsValid, 
            confirmPass: this.state.confirmPass.touched && inputType === 'password' && this.state.confirmPass.value !== event.target.value ? updateObject(this.state.confirmPass, {valid: false, err: 'Password does not match'})
            : !this.state.confirmPass.touched ?this.state.confirmPass :  updateObject(this.state.confirmPass, {valid: true, err: null})})
    }

    confirmPasswordHandler = (event) => {
        let value = event.target.value;
        if (this.state.signup.password.value && this.state.signup.password.valid) {
            if (this.state.signup.password.value === event.target.value) {
                this.setState({confirmPass: updateObject(this.state.confirmPass, {value,  valid: true, err: null})});
                return 
            }
            this.setState({confirmPass: updateObject(this.state.confirmPass, {value,valid: false,  touched: true, err: 'Password does not match'})})
            return
        }
        this.setState({confirmPass: updateObject(this.state.confirmPass, {value, valid: false, touched: true,err: 'Please, enter valid password'})})
    }

    signupHandler = () => {
        if (this.state.signupIsValid && this.state.confirmPass.valid) {
            this.setState({start: true, err: null})
             let cnt = {
                 username: this.state.signup.username.value,
                 password: this.state.signup.password.value,
                 email: this.state.signup.email.value,
             }
             axios.post('http://localhost:3002/signup', cnt).then((res) => {
                this.props.userAuth()
            }).catch(err => {
                let error = null
                if (err.response) {
                    if(err.response.data && err.response.data.keyValue) {
                        for (let key in err.response.data.keyValue) {
                            if (key === 'email') {
                                error = `${key}  already taken`;
                            } else if (key === 'username') {
                                error = `${key} already taken`;
                            } else {
                                error = err.message
                            }
                        }
                    } else {
                        error = typeof err.response.data !== 'object' ? err.response.data : 'Connection Error';
                    }
                } else {
                  error = err.message
                }
                this.setState({err: error, start: false})
            })
         return
        }    
    }

    loginHandler = () => {
        if (this.state.formIsValid) {
            this.setState({start: true, err: null})
             let cnt = {
                username: this.state.formElement.username.value,
                password: this.state.formElement.password.value
             }
             axios.post('http://localhost:3002/login', cnt).then((res) => {
                this.props.userAuth()
            }).catch(err => {
                let error = err.response ? err.response.data : err.message;
                this.setState({err: error, start: false})
            })
         return
        }   
    }

    render() {
        let cnt = (
            <>
                <div className="reuse-form--cnt">
                    <div className="reuse-form--cnt--wrapper">
                        <label className="reuse-form--cnt__title">Email Address</label>
                        <div className="reuse-form--cnt__det">
                            <input 
                                type="email" 
                                name=""
                                required
                                minLength="1"
                                value={this.state.formElement.username.value}
                                className="reuse-form--cnt__det--input"
                                onChange={(event) => this.inputChangedHandler(event, 'username')} />
                        </div>
                        { !this.state.formElement.username.valid && this.state.formElement.username.touched ?
                            <div className="reuse-form--err">Email must not be empty</div>
                            : null
                        }
                    </div>
                </div>
                <div className="reuse-form--cnt">
                    <div className="reuse-form--cnt--wrapper">
                        <label className="reuse-form--cnt__title">Password</label>
                        <div className="reuse-form--cnt__det">
                            <input 
                                type="password" 
                                name=""
                                required
                                value={this.state.formElement.password.value}
                                className="reuse-form--cnt__det--input"
                                onChange={(event) => this.inputChangedHandler(event, 'password')} />
                        </div>
                        { !this.state.formElement.password.valid && this.state.formElement.password.touched  ?
                            <div className="reuse-form--err">Password must not be empty</div>
                            : null
                        }
                    </div>
                </div>
                <div className="reuse-form--footer">
                    <button 
                        type="button" 
                        className="reuse-form--footer__btn"
                        onClick={this.loginHandler}
                        disabled={this.state.formIsValid && !this.state.start ? false : true}>
                            Continue 
                    </button>
                </div>
            </>
        )

        if (this.state.formMode === 'signup') {
            cnt = (
                <>
                <div className="reuse-form--cnt">
                    <div className="reuse-form--cnt--wrapper">
                        <label className="reuse-form--cnt__title">Username</label>
                        <div className="reuse-form--cnt__det">
                            <input 
                                type="text" 
                                name=""
                                required
                                minLength="6"
                                value={this.state.signup.username.value}
                                className="reuse-form--cnt__det--input"
                                onChange={(event) => this.contentChangedHandler(event, 'username')} />
                        </div>
                        { !this.state.signup.username.valid && this.state.signup.username.touched ?
                            <div className="reuse-form--err">Username must be longer than 5 characters</div>
                            : null
                        }
                    </div>
                </div>
                <div className="reuse-form--cnt">
                    <div className="reuse-form--cnt--wrapper">
                        <label className="reuse-form--cnt__title">Email Address</label>
                        <div className="reuse-form--cnt__det">
                            <input 
                                type="email" 
                                required
                                minLength="6"
                                value={this.state.signup.email.value}
                                className="reuse-form--cnt__det--input"
                                onChange={(event) => this.contentChangedHandler(event, 'email')} />
                        </div>
                        { !this.state.signup.email.valid && this.state.signup.email.touched ?
                            <div className="reuse-form--err">Email must be longer than 5 characters</div>
                            : null
                        }
                    </div>
                </div>
                <div className="reuse-form--cnt">
                    <div className="reuse-form--cnt--wrapper">
                        <label className="reuse-form--cnt__title">Password</label>
                        <div className="reuse-form--cnt__det">
                            <input 
                                type="password" 
                                minLength="6"
                                value={this.state.signup.password.value}
                                required
                                className="reuse-form--cnt__det--input"
                                onChange={(event) => this.contentChangedHandler(event, 'password')} />
                        </div>
                        { !this.state.signup.password.valid && this.state.signup.password.touched ?
                            <div className="reuse-form--err">Password must be longer than 5 characters</div>
                            : null
                        }
                    </div>
                </div>
                <div className="reuse-form--cnt">
                    <div className="reuse-form--cnt--wrapper">
                        <label className="reuse-form--cnt__title">Confirm Password</label>
                        <div className="reuse-form--cnt__det">
                            <input 
                                type="password" 
                                className="reuse-form--cnt__det--input"
                                required
                                value={this.state.confirmPass.value}
                                onChange={(event) => this.confirmPasswordHandler(event)} />
                        </div>
                        { this.state.confirmPass.err ?
                                <div className="reuse-form--err">{this.state.confirmPass.err}</div>
                                : null
                            }
                    </div>
                </div>
                <div className="reuse-form--footer">
                    <button 
                        type="submit" 
                        className="reuse-form--footer__btn"
                        onClick={this.signupHandler}
                        disabled={this.state.signupIsValid && this.state.confirmPass.valid && !this.state.start ? false : true}>
                            Continue 
                    </button>
                </div>
            </>
            )
        }

        return (
            <div className="reuse-form--auth">
                <ul className="reuse-form--auth__tab">
                    <li 
                        className={this.state.formMode === 'login' ? 'reuse-form--auth__tab--active' : null}
                        onClick={this.changeTabHandler.bind(this, 'login')}>Login</li>
                    <li className={this.state.formMode === 'signup' ? 'reuse-form--auth__tab--active' : null}
                        onClick={this.changeTabHandler.bind(this, 'signup')}>Sign Up</li>
                </ul>
                { this.state.err ?
                    <div className="reuse-form--err">{this.state.err.toString()}</div>
                    : null
                }
                { cnt }
            </div>
        )
    }
}


export default Auth;
