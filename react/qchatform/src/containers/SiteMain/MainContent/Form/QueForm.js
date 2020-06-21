import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'promise-polyfill/src/polyfill';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { withRouter } from 'react-router-dom';

import './react-draft-wysiwyg.css';
import './Form.css';
import * as actions from '../../../../store/actions/index';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../components/UI/Modal/Modal';
import Aux from '../../../../hoc/Auxs/Aux';
import asyncComponent from '../../../../hoc/asyncComponent/asyncComponent';
import { updateObject, checkValidity, readData, deleteItem, clearAllData } from '../../../../shared/utility';
import Loader from '../../../../components/UI/Loader/Loader';
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
        check: {
            q1: false,
            q2: false,
            q3: false,
            q4: false
        },
        formIsValid: false,
        showForm: false,
        answer: [],
        qchat: localStorage.getItem('question') ? JSON.parse(localStorage.getItem('question')) : [],
        queNum: Number.parseInt(this.props.location.search.split('=')[1]),
        oldQueNum: Number.parseInt(this.props.location.search.split('=')[1]),
        active: null,
        default: null,
        update: false,
        reset: false
    }

    componentDidMount() {
        this.updateForm();
        let numberOfAjaxCAllPending = 0;
        let these = this;
        if (!this.state.qchat.length > 0 || !this.state.qchat.filter(cnt => cnt.position === 0)[0]) {
            this.props.history.push(`/add/qchat/?id=0`)
        }

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
        this.addCntHandler()
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
            if ('indexedDB' in window) {
                clearAllData('media');
            }
            localStorage.removeItem('question')
        } 
        if ((this.state.oldQueNum !== this.state.queNum)) {
            this.props.history.push('/add/qchat/?id='+this.state.queNum)   
            this.setState({
                disable: true,showAddItm: false, showVidOpt: false,showImgOpt: false,showUserOpt: false, showAddItmOpt: true,editCnt: false,editInput: '',
                formElement: {
                    question: {value: EditorState.createEmpty(),validation: {required: true,minLength: 1},valid: false,touched: false },
                    q1: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false},
                    q2: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false},
                    q3: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false},
                    q4: {value: '',validation: {required: true,minLength: 1},valid: false,touched: false}
                },
                check: {
                    q1: false,
                    q2: false,
                    q3: false,
                    q4: false
                },
                oldQueNum: this.state.queNum, 
                queNum: this.state.queNum,
                formIsValid: false,showForm: false, answer: [], default: null,update: false,reset: false
            })
        }
        let qchat = localStorage.getItem('question');
        if (qchat) {
            if (JSON.stringify(this.state.qchat) !== qchat) {
                this.setState({qchat: JSON.parse(qchat)})
            }
        }
        this.updateForm()
    }

    updateForm = () => {
        if (this.state.qchat && this.state.qchat.length > 0 && this.state.qchat.filter(cnt => cnt.position === this.state.queNum)[0] && this.state.queNum !== 0 &&!this.state.update) {
            this.props.onSetPosition(this.state.queNum);
            let cnt = this.state.qchat.filter(cnt => cnt.position === this.state.queNum)[0];
            let answer = JSON.parse(cnt.answer);
            let qchat = JSON.parse(cnt.option)
            let oldEditor = this.state.formElement;
            let q1 = {...oldEditor.q1};
            q1.value = qchat.q1;
            let q2 = {...oldEditor.q2};
            q2.value = qchat.q2;
            let q3 = {...oldEditor.q3};
            q3.value = qchat.q3;
            let q4 = {...oldEditor.q4};
            q4.value = qchat.q4;
            let editor = {...oldEditor.question};
            editor.value = EditorState.createWithContent(convertFromRaw(JSON.parse(cnt.question)));
            oldEditor.question = editor;
            oldEditor.question.valid = true;
            oldEditor.question.touched = true;
            oldEditor.q1 = q1;
            oldEditor.q1.valid = true;
            oldEditor.q1.touched = true;
            oldEditor.q2 = q2;
            oldEditor.q2.valid = true;
            oldEditor.q2.touched = true;
            oldEditor.q3 = q3;
            oldEditor.q3.valid = true;
            oldEditor.q3.touched = true;
            oldEditor.q4 = q4;
            oldEditor.q4.valid = true;
            oldEditor.q4.touched = true;
            let image = []
            let video = []
            if ('indexedDB' in window) {
                readData('media', this.state.queNum).then(media => {
                    if (media) {
                        for (let cnt of media.image) {
                            image.push({file: cnt.file, id: cnt.id, url: window.URL.createObjectURL(cnt.file)})
                        }
                        for (let cnt of media.video) {
                            video.push({file: cnt.file, id: cnt.id, url: window.URL.createObjectURL(cnt.file)})
                        }
                    }
                    this.props.onSetMedia({
                        video,
                        image
                    })
                })
            }
            let check =  {
                q1: false,
                q2: false,
                q3: false,
                q4: false
            };
            if (answer && answer.length > 0) {
                for (let opt of answer) {
                    check[opt] = true;
                }
            }
            this.setState({
                disable: true,showAddItm: false, showVidOpt: false,showImgOpt: false,showUserOpt: false, showAddItmOpt: true,editCnt: false,editInput: '',
                reset: false,
                default: {...this.state.default},
                formElement: oldEditor,
                answer,
                oldQueNum: this.state.queNum, 
                queNum: this.state.queNum,
                check,
                update: true,
                formIsValid: true
            })
        } else {
            if (!this.state.update) {
                this.props.onSetPosition(this.state.queNum);
                if ('indexedDB' in window) {
                    deleteItem('media', this.state.queNum);
                }
                this.setState({update: true, reset: false})
                this.props.onSetMedia({
                    video: [],
                    image: []
                })
            }
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

    navHandler = () => {
        this.props.history.push(`/add/qchat/?id=${this.state.editInput}`);
        this.setState({reset: true, queNum: this.state.editInput, oldQueNum: this.state.editInput, update: false})
        this.addCntHandler()
    };

    submitHandler = (mode) => {
        this.setState({showForm: true,  showAddItm: false, mode});
        this.addCntHandler()
        if (mode === 'next') {
            this.setState({queNum: Number.parseInt(this.state.queNum)+1, reset: true, update: false})
        } else {
            this.props.onSubmitForm()
        }
     }
 
     resendCntHander = () => {
         this.submitHandler(this.state.mode);
     }

     editChangeHandler = (event) => {
         let value = Number.parseInt(event.target.value);
         this.setState({editInput: value > this.state.qchat.length - 1 ? this.state.qchat.length - 1 : value})
     }
 
     goBackHandler = () => {
        let back = Number.parseInt(this.state.queNum - 1);
        if (back > -1) {
            this.props.history.push(`/add/qchat/?id=${back}`);
            this.setState({queNum: back, reset: true, oldQueNum: back, update: false})
            this.addCntHandler()
        }
     }

     addCntHandler = () => {
         if (this.state.formIsValid || !this.state.answer.length < 1) {
            let  qchat = localStorage.getItem('question') ? JSON.parse(localStorage.getItem('question')) : [];
            let position = this.state.queNum
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
                image: this.props.media.image ? this.props.media.image: []
            }

            let filterQueChat = qchat.filter(que => que.position === position)[0];
            if (filterQueChat) {
                let qchatIndex = qchat.findIndex(que => que.position === position)
                qchat[qchatIndex] = {...newCnt}
                localStorage.removeItem('question')
                localStorage.setItem('question', JSON.stringify(qchat))
               
            } else {
                qchat.push(newCnt)
                localStorage.removeItem('question')
                localStorage.setItem('question', JSON.stringify(qchat))
            }
           
         }
     }

    ansTickedHandler = (event, opt) => {
        let ans = [...this.state.answer];
        let filterAns = ans.filter(cnt => cnt === opt)[0];
        let check = {...this.state.check}
        if (filterAns) {
            let updateAns = ans.filter(cnt => cnt !== opt);
            check[opt] = false;
            return this.setState({answer: updateAns, check})
        }
        ans.push(opt);
        check[opt] = true;
        this.setState({answer: ans, check});
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
        let isValid = !this.state.formIsValid || this.state.answer.length < 1
        if (this.state.showAddItm) {
            addItemClass.push('reuse-form__cnt--det__selec--add__visible icon--rotate');
            addItemOptClass.push('reuse-form__cnt--det__selec--opt__visible')
        }

        if (this.state.editInput !== '') {
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
                    <div 
                        className={editClass.join(' ')}
                        onClick={this.navHandler}>GO</div>
                </div>
            )
        }

        let form = (
            <div className="reuse-form__wrapper">
                <Loader />
            </div>
        )

        if (!this.state.reset) {
            form = (
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
                            <label 
                                className="reuse-form__cnt--title reuse-form__cnt--title__back"
                                onClick={this.goBackHandler}>
                                <span>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'arrow-left']} 
                                        className="icon icon__reuse-form--back" />
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
                                        onChange={(event) => this.ansTickedHandler(event, 'q1')}
                                        checked={this.state.check.q1}/>
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
                                        onChange={(event) => this.ansTickedHandler(event, 'q2')}
                                        checked={this.state.check.q2}/>
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
                                        onChange={(event) => this.ansTickedHandler(event, 'q3')}
                                        checked={this.state.check.q3} />
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
                                        onChange={(event) => this.ansTickedHandler(event, 'q4')}
                                        checked={this.state.check.q4}/>
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
                            disabled={isValid || this.state.qchat.length < 2 || !this.state.qchat.filter(cnt => cnt.position === 0)[0]}
                            onClick={this.submitHandler.bind(this, 'draft')}>
                            <FontAwesomeIcon 
                                icon={['fas', 'eye-slash']} 
                                className="icon icon__reuse-form--btn" />
                            Draft
                        </button>
                        {!isValid && this.state.qchat.length > 1 && this.state.qchat.filter(cnt => cnt.position === 0)[0] ?
                            <button 
                                type="button" 
                                className="reuse-form__btn--done reuse-form__btn--mid"
                                onClick={this.submitHandler.bind(this, 'publish')}>
                                <FontAwesomeIcon 
                                    icon={['fas', 'check']} 
                                    className="icon icon__reuse-form--btn" />
                                Done
                            </button> : null}
                        <button 
                            type="button" 
                            className="reuse-form__btn--nxt"
                            disabled={isValid}
                            onClick={this.submitHandler.bind(this, 'next')}>
                            <FontAwesomeIcon 
                                icon={['fas', 'angle-double-right']} 
                                className="icon icon__reuse-form--btn" />
                            Next
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <form className="reuse-form">
                { form }
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
        onSetMedia: (media) => dispatch(actions.setMedia(media)),
        onSetPosition: (position) => dispatch(actions.setPosition(position)),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QueForm));