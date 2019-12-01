import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Form.css';
import * as actions from '../../../../store/actions/index';
import Logo from '../../../../components/UI/Logo/Logo';
import Loader from '../../../../components/UI/Loader/Loader';
import Aux from '../../../../hoc/Auxs/Aux';
import { updateObject, checkValidity } from '../../../../shared/utility';

class Form extends Component {
    state = {
        formElement: {
            username: {
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
        field: {
            type: 'password',
            isChange: false
        },
        formIsValid: false
    }

    changeFieldHandler = () =>{
        if (this.state.field.isChange) {
            this.setState({field: updateObject(this.state.field, {type: 'password', isChange: false})});
            return
        }
        this.setState({field: updateObject(this.state.field, {type: 'text', isChange: true})});
    }

    inputChangedHandler = (event, inputType) => {
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.formElement[inputType].validation),
            touched: true
        });
        
        let formIsValid = true;
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            formIsValid = updateFormElement[inputType].valid && formIsValid;
        }

        this.setState({formElement: updateFormElement, formIsValid})
    }


    submitHandler = (event) => {
        event.preventDefault()
        if (this.state.formIsValid) {
             let newCnt = {
                 username: this.state.formElement.username.value,
                 password: this.state.formElement.password.value
             }
             this.props.onSubmitForm(newCnt)
         return
        }
     }


    render() {
        let cnt = (
            <Aux>
                 <Logo />
                <div className="reuse-form__cnt">
                    <div className="reuse-form__cnt--header">
                        <h4>Welcome to SG24</h4>
                        <p>Knowledge sharing platform | Connecting scholars</p>
                    </div>
                    <div className="reuse-form__cnt--main-wrapper">
                        <h4>Login with</h4>
                        <ul>
                            <li>
                                <a href="/auth/google">
                                    <FontAwesomeIcon 
                                        icon={['fab', 'google']}/>
                                </a>
                            </li>
                            <li>
                                <a href="/auth/facebook">
                                    <FontAwesomeIcon 
                                        icon={['fab', 'facebook-f']}/>
                                </a></li>
                        </ul>
                    </div>
                    <div className="reuse-form__cnt--alt">OR</div>
                    { this.props.submitError ?
                        <div className="reuse-form__err">{this.props.submitError.message}</div>
                        : null
                    }
                    <div className="reuse-form__cnt--main-wrapper">
                        <div className="reuse-form__cnt--wrapper">
                            <label  className="reuse-form__cnt--title">Username</label>
                            <div className="reuse-form__cnt--det">
                                <input 
                                    type="text" 
                                    className="reuse-form__cnt--det__input"
                                    required
                                    minLength="6"
                                    value={this.state.formElement.username.value}
                                    onChange={(event) => this.inputChangedHandler(event, 'username')}/>
                            </div>
                            { !this.state.formElement.username.valid && this.state.formElement.username.touched ?
                                <div className="reuse-form__err">Username must be longer than 6 characters</div>
                                : null
                            }
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <label  className="reuse-form__cnt--title">Password</label>
                            <div className="reuse-form__cnt--det">
                                <input 
                                    type={this.state.field.type}
                                    className="reuse-form__cnt--det__input reuse-form__cnt--det__input--pwd"
                                    required
                                    minLength="6"
                                    value={this.state.formElement.password.value}
                                    onChange={(event) => this.inputChangedHandler(event, 'password')}/>
                                <div 
                                    className="reuse-form__cnt--det__pwd"
                                    onClick={this.changeFieldHandler}>
                                    <FontAwesomeIcon 
                                        icon={['far', 'eye']} 
                                        className="icon icon__reuse-form--view" />
                                </div>
                            </div>
                            { !this.state.formElement.password.valid && this.state.formElement.password.touched ?
                                <div className="reuse-form__err">Password must be longer than 5 characters</div>
                                : null
                            }
                        </div>
                         <div className="reuse-form__cnt--footer reuse-form__btn">
                            <button 
                                type="submit" 
                                className="reuse-form__btn--log"
                                disabled={!this.state.formIsValid}>Login
                                { !this.props.start? <Loader/> : null}
                                </button>
                        </div>
                    </div>
                    <p>Forgot password <a href="/forget/password">Retrive</a></p>
                    <p>No account <a href="/signup">Sign up</a></p>
                </div>
                <div className="reuse-form__footer">&copy; SG24 , 2019</div>
            </Aux>
        );
        
        return (
            <form className="reuse-form" onSubmit={this.submitHandler}>
            <div className="reuse-form__wrapper">
               { cnt }
            </div>
        </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        submitError: state.form.submitError,
        submitted: state.form.submitted,
        start: state.form.start
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm: (formData) => dispatch(actions.submitFormInit(formData))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);