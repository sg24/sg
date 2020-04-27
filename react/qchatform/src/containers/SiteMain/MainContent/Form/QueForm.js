import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'promise-polyfill/src/polyfill';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { withRouter } from 'react-router-dom';

import './react-draft-wysiwyg.css';
import './Form.css';
import * as actions from '../../../../store/actions/index';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../components/UI/Modal/Modal';
import Aux from '../../../../hoc/Auxs/Aux';
import asyncComponent from '../../../../hoc/asyncComponent/asyncComponent';
import { updateObject, checkValidity } from '../../../../shared/utility';
import axios from '../../../../axios';

const AsyncImage = asyncComponent(() => {
    return import ('./AddImage/AddImage');
});

const AsyncVideo = asyncComponent(() => {
    return import ('./AddVideo/AddVideo');
});

const AsyncUsers = asyncComponent(() => {
    return import ('./AddUsers/AddUsers');
});

class QueForm extends  Component {
    state = {
        disable: true,
        showAddItm: false,
        showVidOpt: false,
        showImgOpt: false,
        showUserOpt: false,
        showAddItmOpt: true,
        editCnt: false,
        editInput: '',
        formElement: {
            question: {
                value: EditorState.createEmpty(),
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            q1: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            q2: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            q3: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            q4: {
                value: '',
                correct: false,
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        modeIsValid: false,
        showForm: false,
        answer: [],
        queNum: Number.parseInt(this.props.location.search.split('=')[1]),
        oldQueNum: Number.parseInt(this.props.location.search.split('=')[1]),
        active: null,
        isGame: false,
        default: null
    }

    componentDidMount() {
        this.setState({default: {...this.state}})
        let numberOfAjaxCAllPending = 0;
        let these = this;

        axios.interceptors.request.use(function (config) {
            numberOfAjaxCAllPending++;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            numberOfAjaxCAllPending--;
            let active = setInterval(() => {
                if (numberOfAjaxCAllPending === 0 && these.props.status) {
                    these.props.onFetchShareActive();
                    these.props.onFetchNotifyActive();
                    these.props.onFetchNavActive();
                }
            }, 5000);
            these.setState({active})
            return response;
        }, function (error) {
            numberOfAjaxCAllPending--;
        });
    }

    componentWillUnmount() {
        if (this.state.active) {
            clearInterval(this.state.active)
        }
    }

    componentDidUpdate() {
        if (this.state.showAddItmOpt && this.props.hideMediaBox) {
            this.props.onShowMediaBox();
            this.setState({showVidOpt: false,showImgOpt: false,showUserOpt: false, showAddItmOpt: false});
        }
        if (this.props.uploadPercent === 100 && this.props.id && this.state.showForm) {
            if (this.props.media.image) {
                for (let image of this.props.media.image) {
                    window.URL.revokeObjectURL(image.url);
                }
            }

            if (this.props.media.video) {
                for (let video of this.props.media.video) {
                    window.URL.revokeObjectURL(video.url);
                }
            }
            this.setState({showForm: false});
        } 
        if (this.state.oldQueNum !== this.state.queNum) {
            this.props.history.push('/add/qchat/?id='+this.state.queNum)
            let cnt = updateObject(this.state.default, {oldQueNum: this.state.queNum, queNum: this.state.queNum})
            this.setState({...cnt})
        }
    }

    addItemHandler = () => {
        this.setState((prevState, props) => {
            return {
                showAddItm: !prevState.showAddItm
            };
        });
    }

    showOptHandler = (opt) => {
        if (opt === 'image') {
            this.setState({showImgOpt: true,showVidOpt: false, showUserOpt: false, showAddItmOpt: true});
            return 
        }

        if (opt === 'video') {
            this.setState({showVidOpt: true,showImgOpt: false,showUserOpt: false, showAddItmOpt: true});
            return 
        }
        this.setState({showUserOpt: true,showImgOpt: false,showVidOpt: false, showAddItmOpt: true});
    }

    inputChangedHandler = (editorState, inputType) => {
        let text = inputType !== 'question' ? editorState.target.value : convertToRaw(editorState.getCurrentContent()).blocks[0].text;
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value: inputType !== 'question' ? editorState.target.value: editorState,
            valid: checkValidity(text, this.state.formElement[inputType].validation),
            touched: true
        });
        
        let formIsValid = true;
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            formIsValid = updateFormElement[inputType].valid && formIsValid;
        }

        this.setState({formElement: updateFormElement, formIsValid})
    }

    editCntHandler = () => {
        this.setState((prevState, props) => {
            return {
                editCnt: !prevState.editCnt
            }})
    }

    submitHandler = (mode) => {
        this.setState({showForm: true,  showAddItm: false, mode});
        if (this.state.formIsValid && this.state.answer.length > 0) {
             let newCnt = {
                position: this.state.queNum,
                question: JSON.stringify(convertToRaw(this.state.formElement.question.value.getCurrentContent())),
                option: JSON.stringify({
                    q1: this.state.formElement.q1.value,
                    q2: this.state.formElement.q2.value,
                    q3: this.state.formElement.q3.value,
                    q4: this.state.formElement.q4.value
                }),
                answer: JSON.stringify(this.state.answer),
                video: this.props.media.video ? this.props.media.video : [],
                image: this.props.media.image ? this.props.media.image: [],
                mode
            }
             if (mode === 'next') {
                this.props.onAddQchat(newCnt);
                this.setState({queNum: Number.parseInt(this.state.queNum)+1})
             } else {
                if (this.props.qchat.length > 1 && this.props.qchat.filter(cnt => cnt.position === '0')[0]) {
                    this.props.onSubmitForm(newCnt)
                } else {
                    this.props.history.push(`/add/qchat/?id=0`)
                }
                
             }
             
         return
        }
        this.setState({noCateg: true});
     }
 
     resendCntHander = () => {
         this.submitHandler(this.state.mode);
     }

     editChangeHandler = (event) => {
         let value = event.target.value;
         this.setState({editInput: value > this.props.qchat.length ? this.props.qchat.length : value})
     }
 
    ansTickedHandler = (event, opt) => {
        let ans = [...this.state.answer];
        let filterAns = ans.filter(cnt => cnt === opt)[0];
        if (filterAns) {
            let updateAns = ans.filter(cnt => cnt !== opt);
            return this.setState({answer: updateAns})
        }
        ans.push(opt);
        this.setState({answer: ans});
    }

     closeBackdropHandler = () => {
         this.setState({
             showCateg: false, showAddItm: false,showVidOpt: false,showImgOpt: false,showUserOpt: false});
     }
 
     closeModalHandler = () => {
         window.location.reload();
     }
 
    viewCntHandler = () => {
        window.location.assign('/view/qchat/' + this.props.id)
    }

    render() {
        let addItemClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--add'];
        let addItemOptClass = ['reuse-form__cnt--det__selec--opt'];
        let editCnt = null;
        let editClass = ['reuse-form__cnt--det__tm--edit'];

        if (this.state.showAddItm) {
            addItemClass.push('reuse-form__cnt--det__selec--add__visible icon--rotate');
            addItemOptClass.push('reuse-form__cnt--det__selec--opt__visible')
        }

        if (this.state.editInput) {
            editClass.push('reuse-form__cnt--det__tm--edit-show')
        }

        if (this.state.editCnt){
            editCnt = (
                <div className="reuse-form__cnt--det reuse-form__cnt--det__tm">
                    <div className="reuse-form__cnt--det__wrapper">
                        <input 
                            type="number" 
                            placeholder="Enter page number, 0 for main page" 
                            className="reuse-form__cnt--det__input reuse-form__cnt--det__input--tm-selec" 
                            value={this.state.editInput}
                            onChange={this.editChangeHandler}/>
                    </div>
                    <div className={editClass.join(' ')}>GO</div>
                </div>
            )
        }

        return (
            <form className="reuse-form">
                <div className="reuse-form__wrapper">
                    <h3 className="reuse-form__title">
                        <div>
                            <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'pencil-alt']} />
                            </div> 
                            Set QChat
                        </div>
                    </h3>
                    <div className="reuse-form__cnt">
                        <div className="reuse-form__cnt--wrapper">
                            <label 
                                className="reuse-form__cnt--title reuse-form__cnt--title__tm"
                                onClick={this.editCntHandler}>
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['far', 'edit']} 
                                        className="icon icon__reuse-form--clock" />
                                </span>
                            </label>
                            { editCnt }
                            <div className="reuse-form__cnt--tm-total">
                                Question 
                                <div>{this.state.queNum}</div>
                            </div>
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">Question </label>
                            <div className="reuse-form__cnt--det">
                                <Editor 
                                    wrapperClassName=""
                                    editorClassName="reuse-form__cnt--det__info"
                                    toolbarClassName="reuse-form__cnt--det__toolbar"
                                    editorState={this.state.formElement.question.value}
                                    onEditorStateChange={(event) => this.inputChangedHandler(event, 'question')} 
                                    toolbar={{
                                        options: ['inline', 'blockType', 'list', 'textAlign', 'emoji','remove', 'history'],
                                        inline: { inDropdown: true }
                                }}/>
                            </div>
                            { !this.state.formElement.question.valid && this.state.formElement.question.touched ?
                                <div className="reuse-form__err">Question must not be empty</div>
                                : null
                            }
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <label  className="reuse-form__cnt--title">Options (Enter answers and tick to select correct answer)</label>
                            <ul className="reuse-form__cnt--opt">
                                <li>
                                    <div>A</div>
                                    <input 
                                        type="text"
                                         className="reuse-form__cnt--opt__input"
                                         onChange={(event) => this.inputChangedHandler(event, 'q1')}
                                         value={this.state.formElement.q1.value} />
                                    <input 
                                        type="checkbox"
                                        onChange={(event) => this.ansTickedHandler(event, 'q1')}/>
                                </li>
                                <li>
                                    <div>B</div>
                                    <input 
                                        type="text" 
                                        className="reuse-form__cnt--opt__input"
                                        onChange={(event) => this.inputChangedHandler(event, 'q2')}
                                        value={this.state.formElement.q2.value}/>
                                    <input 
                                        type="checkbox" 
                                        onChange={(event) => this.ansTickedHandler(event, 'q2')}/>
                                </li>
                                <li>
                                    <div>C</div>
                                    <input 
                                        type="text" 
                                        className="reuse-form__cnt--opt__input"
                                        value={this.state.formElement.q3.value}
                                        onChange={(event) => this.inputChangedHandler(event, 'q3')}/>
                                    <input 
                                        type="checkbox"
                                        onChange={(event) => this.ansTickedHandler(event, 'q3')} />
                                </li>
                                <li>
                                    <div>D</div>
                                    <input 
                                        type="text" 
                                        className="reuse-form__cnt--opt__input"
                                        value={this.state.formElement.q4.value}
                                        onChange={(event) => this.inputChangedHandler(event, 'q4')}/>
                                    <input 
                                        type="checkbox" className="reuse-form__cnt--opt__ans"
                                        onChange={(event) => this.ansTickedHandler(event, 'q4')}/>
                                </li>
                            </ul>
                            {/* {{!-- <div className="reuse-form__err">Pls, Select Correct Answer</div> --}} */}
                        </div>
                        <div className="reuse-form__cnt--wrapper reuse-form__cnt--wrapper__select">
                            <div className="reuse-form__cnt--det">
                                <div className="reuse-form__cnt--det__wrapper">
                                    <div 
                                        className={addItemClass.join(' ')}
                                        onClick={this.addItemHandler}>
                                        Add  Items 
                                        <FontAwesomeIcon 
                                            icon={['fas', 'angle-down']} 
                                            className="icon icon__reuse-form--angle" />
                                        <div className="reuse-form__cnt--det__selec--added">
                                            <div className="reuse-form__cnt--det__selec--added__img">
                                                <div className="reuse-form__cnt--det__selec--added__img--icn">
                                                    <FontAwesomeIcon 
                                                        icon={['fas', 'images']} />
                                                </div> 
                                                {this.props.media.image ? this.props.media.image.length : 0}
                                            </div>
                                            <div className="reuse-form__cnt--det__selec--added__vid">
                                                <div className="reuse-form__cnt--det__selec--added__vid--icn">
                                                    <FontAwesomeIcon 
                                                        icon={['fas', 'video']} />
                                                </div> 
                                                {this.props.media.video ? this.props.media.video.length : 0}
                                            </div>
                                        </div>
                                        <ul className={addItemOptClass.join(' ')}>
                                            <li 
                                                className="reuse-form__cnt--det__selec--opt__img"
                                                onClick={this.showOptHandler.bind(this, 'image')}>Image</li>
                                            <li 
                                                className="reuse-form__cnt--det__selec--opt__vid"
                                                onClick={this.showOptHandler.bind(this, 'video')}>Video</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    { this.state.showAddItm ? 
                        <Aux><Backdrop close={this.closeBackdropHandler}></Backdrop></Aux> : null }
                    { this.state.showImgOpt ? <Aux><Backdrop close={this.closeBackdropHandler}></Backdrop><AsyncImage /></Aux> : null }
                    { this.state.showVidOpt ? <Aux><Backdrop close={this.closeBackdropHandler}></Backdrop><AsyncVideo /></Aux> : null }
                    { this.state.showUserOpt ? <Aux><Backdrop close={this.closeBackdropHandler}></Backdrop><AsyncUsers /></Aux> : null}
                    { this.props.submitForm && !this.state.showCateg ? 
                        <Aux>
                            <Backdrop></Backdrop>
                            <Modal 
                                uploadPercent={this.props.uploadPercent}
                                isValid={this.props.id}
                                uploadErr={this.props.submitError}
                                resend={this.resendCntHander}
                                closeModal={this.closeModalHandler}
                                view={this.viewCntHandler}/>
                        </Aux> : null}
                    { this.props.showCateg && this.state.showCateg ? 
                        <Aux>
                            {this.props.categErr ? <Backdrop close={this.closeBackdropHandler}><Modal uploadErr={this.props.categErr} type='categ' /></Backdrop>: null}
                        </Aux> : null
                    }

                    <div className="reuse-form__footer reuse-form__btn">
                        <button 
                            type="button" 
                            className="reuse-form__btn--dft"
                            disabled={!this.state.formIsValid || this.state.answer.length < 1}
                            onClick={this.submitHandler.bind(this, 'draft')}>
                            <FontAwesomeIcon 
                                icon={['fas', 'eye-slash']} 
                                className="icon icon__reuse-form--btn" />
                            Draft
                        </button>
                        <button 
                            type="button" 
                            className="reuse-form__btn--done reuse-form__btn--mid"
                            disabled={!this.state.formIsValid || this.state.answer.length < 1}
                            onClick={this.submitHandler.bind(this, 'done')}>
                            <FontAwesomeIcon 
                                icon={['fas', 'check']} 
                                className="icon icon__reuse-form--btn" />
                            Done
                        </button>
                        <button 
                            type="button" 
                            className="reuse-form__btn--nxt"
                            disabled={!this.state.formIsValid || this.state.answer.length < 1}
                            onClick={this.submitHandler.bind(this, 'next')}>
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-double-right']} 
                                className="icon icon__reuse-form--btn" />
                            Next
                        </button>
                    </div>
                </div>
            </form>
        );
    }
};

const mapStateToProps = state => {
    return {
        status: state.auth.status,
        categ: state.form.categ,
        categErr: state.form.categErr,
        showCateg: state.form.showCateg,
        newCateg: state.form.newCateg,
        hideMediaBox: state.form.hideMediaBox,
        snapshot: state.form.snapshot,
        media: state.form.media,
        uploadPercent: state.form.uploadPercent,
        qchat: state.form.qchat,
        submitForm: state.form.submitForm,
        submitError: state.form.submitError,
        id: state.form.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCateg: () => dispatch(actions.fetchCategInit()),
        onAddCateg: (categ) => dispatch(actions.addCategInit(categ)),
        onShowMediaBox: () => dispatch(actions.showMediaBox()),
        onSubmitForm: (formData) => dispatch(actions.submit(formData)),
        onFetchShareActive: (userID) => dispatch(actions.fetchShareactiveInit(userID)),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onAddQchat: (cnt) => dispatch(actions.addQchat(cnt)),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QueForm));