import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Form.css';
import * as actions from '../../../../store/actions/index';
import Logo from '../../../../components/UI/Logo/Logo';
import Loader from '../../../../components/UI/Loader/Loader';
import Modal from '../../../../components/UI/Modal/Modal';
import Aux from '../../../../hoc/Auxs/Aux';
import { updateObject, checkValidity } from '../../../../shared/utility';

class Form extends Component {
    state = {
        formElement: {
            email: {
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
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
                 email: this.state.formElement.email.value,
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
                        <h4>Welcome to Slodge24</h4>
                        <p>Knowledge sharing platform | Connecting scholars</p>
                    </div>
                    { this.props.submitError ?
                        <div className="reuse-form__err">{this.props.submitError.message}</div>
                        : null
                    }
                    <div className="reuse-form__cnt--main-wrapper">
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">Email Address</label>
                            <div className="reuse-form__cnt--det">
                                <input 
                                    type="email" 
                                    className="reuse-form__cnt--det__input"
                                    required
                                    minLength="6"
                                    value={this.state.formElement.email.value}
                                    onChange={(event) => this.inputChangedHandler(event, 'email')}/>
                            </div>
                            { !this.state.formElement.email.valid && this.state.formElement.email.touched ?
                                <div className="reuse-form__err">Email must be longer than 6 characters</div>
                                : null
                            }
                        </div>
                         <div className="reuse-form__cnt--footer reuse-form__btn">
                            <button 
                                type="submit" className="reuse-form__btn--nxt"
                                disabled={this.state.formIsValid && this.props.start? false : true}>
                                <FontAwesomeIcon 
                                    icon={['fas', 'angle-double-right']} 
                                    className="icon icon__reuse-form--btn" />
                                    Next
                                { !this.props.start? <Loader/> : null}
                            </button>
                        </div>
                    </div>
                    <p>Create New Account <a href="/signup">Sign up</a></p>
                    <p>Already have an account <a href="/login">Login in</a></p>
                </div>
                <ul className="reuse-form__footer">
                    <li><a href="/privacy">Privacy policy</a></li>
                    <li className="reuse-form__footer--copy">&copy; Slodge24 , 2019</li>
                    <li><a href="/term">Terms of service</a></li>
                </ul>
            </Aux>
        );

        if (this.props.submitted) {
            cnt = <Modal email={this.state.formElement.email.value} />
        }
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