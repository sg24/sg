import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'promise-polyfill/src/polyfill';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import './react-draft-wysiwyg.css';
import './Form.css';
import * as actions from '../../../../store/actions/index';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import Loader from '../../../../components/UI/Loader/Loader';
import Modal from '../../../../components/UI/Modal/Modal';
import Aux from '../../../../hoc/Auxs/Aux';
import asyncComponent from '../../../../hoc/asyncComponent/asyncComponent';
import { updateObject, checkValidity } from '../../../../shared/utility';
import axios from '../../../../axios';

const AsyncImage = asyncComponent(() => {
    return import ('./AddImage/AddImage');
});

const AsyncUsers = asyncComponent(() => {
    return import ('./AddUsers/AddUsers');
});


const AsyncGroup = asyncComponent(() => {
    return import ('./AddGroup/AddGroup');
});

class Form extends  Component {
    state = {
        showCateg: false,
        categs: [],
        noCateg: false,
        addCateg: null,
        disable: true,
        addNewCateg: true,
        addCategInput: '',
        categActiveProps: {
            active: false,
            index: null
        },
        showAddItm: false,
        showImgOpt: false,
        showUserOpt: false,
        showGroupOpt: false,
        showAddItmOpt: true,
        formElement: {
            title: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            content: {
                value: EditorState.createEmpty(),
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        allowComment: true,
        showForm: false,
        mode: null,
        groupMode: null,
        active: null
    }

    componentDidMount() {
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
            if (numberOfAjaxCAllPending === 0 && these.props.status) {
                let active = setTimeout(() => {
                    these.props.onFetchShareActive();
                    these.props.onFetchNotifyActive();
                    these.props.onFetchNavActive();
                    clearTimeout(these.state.active)
                    clearTimeout(active)
                }, 10000);
                these.setState({active})
            }
            return response;
        }, function (error) {
            numberOfAjaxCAllPending--;
        });
    }

    componentWillUnmount() {
        if (this.state.active) {
            clearTimeout(this.state.active)
        }
    }

    componentDidUpdate() {
        if (this.state.showAddItmOpt && this.props.hideMediaBox) {
            this.props.onShowMediaBox();
            this.setState({showVidOpt: false, showGroupOpt: false, showImgOpt: false,showUserOpt: false, showAddItmOpt: false});
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

        if (opt === 'group') {
            this.setState({showGroupOpt: true,showImgOpt: false,showUserOpt: false, showAddItmOpt: true});
            return 
        }
        this.setState({showUserOpt: true,showImgOpt: false,showVidOpt: false, showAddItmOpt: true});
    }

    setGroupModeHandler = (opt) => {
        this.setState({groupMode: opt})
    }

    setGroupHandler = () => {
        this.setState((prevState, props) => {
            return {
                showGroupOpt: !prevState.showGroupOpt
            }
        })
    }

    inputChangedHandler = (editorState, inputType) => {
        let text = inputType === 'title' ? editorState.target.value : convertToRaw(editorState.getCurrentContent()).blocks[0].text;
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value: inputType === 'title' ? editorState.target.value: editorState,
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

    submitHandler = (mode) => {
       this.setState({showForm: true,  showAddItm: false, mode});
        let newCnt = {
            desc: JSON.stringify(convertToRaw(this.state.formElement.content.value.getCurrentContent())),
            title: this.state.formElement.title.value,
            image: this.props.media.image ? this.props.media.image: [],
            invite: this.props.media.user ? this.props.media.user : [],
            group: this.props.media.group ?  this.props.media.group : [],
            mode
        }
        this.props.onSubmitForm(newCnt)
    }

    resendCntHander = () => {
        this.submitHandler(this.state.mode);
    }

    closeBackdropHandler = () => {
        this.setState({
            showCateg: false, showAddItm: false,showGroupOpt: false, showVidOpt: false,showImgOpt: false,showUserOpt: false, showGroupOpt: false});
    }

    closeModalHandler = () => {
        this.props.onSubmitReset();
    }

    viewCntHandler = () => {
        window.location.assign('/page/' + this.props.id)
    }

    render() {
        let addItemClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--add'];
        let addItemOptClass = ['reuse-form__cnt--det__selec--opt'];
        if (this.state.showAddItm) {
            addItemClass.push('reuse-form__cnt--det__selec--add__visible icon--rotate');
            addItemOptClass.push('reuse-form__cnt--det__selec--opt__visible')
        }

        return (
            <form className="reuse-form">
                <div className="reuse-form__wrapper">
                    <h3 className="reuse-form__title">
                        <div>
                            <div>
                            <FontAwesomeIcon 
                                icon={['fas', 'users']} />
                            </div> 
                            Add Page
                        </div>
                    </h3>
                    <div className="reuse-form__cnt">
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title"> Name</label>
                            <div className="reuse-form__cnt--det">
                                <input 
                                    type="text" 
                                    name=""
                                    required
                                    minLength="1"
                                    value={this.state.formElement.title.value}
                                    className="reuse-form__cnt--det__input reuse-form__cnt--det__input--lg"
                                    onChange={(event) => this.inputChangedHandler(event, 'title')} />
                            </div>
                            { !this.state.formElement.title.valid && this.state.formElement.title.touched ?
                                <div className="reuse-form__err"> Name must not be empty </div>
                                : null
                            }
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">Description</label>
                            <div className="reuse-form__cnt--det">
                                <Editor 
                                    wrapperClassName=""
                                    editorClassName="reuse-form__cnt--det__info"
                                    toolbarClassName="reuse-form__cnt--det__toolbar"
                                    editorState={this.state.formElement.content.value}
                                    onEditorStateChange={(event) => this.inputChangedHandler(event, 'content')} 
                                    toolbar={{
                                        options: ['inline', 'blockType', 'list', 'textAlign', 'emoji','remove', 'history'],
                                        inline: { inDropdown: true }
                                }}/>
                            </div>
                            { !this.state.formElement.content.valid && this.state.formElement.content.touched ?
                                <div className="reuse-form__err">Description must not be empty</div>
                                : null
                            }
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <div className="reuse-form__cnt--det">
                                <div className="reuse-form__cnt--det__wrapper">
                                    <div 
                                        className="reuse-form__cnt--det__selec--add-link"
                                        onClick={this.showOptHandler.bind(this, 'group')}>
                                        Link Room 
                                        <div className="reuse-form__cnt--det__selec--added-link">
                                            { this.props.media.group ? this.props.media.group.length : 0}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="reuse-form__cnt--wrapper">
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
                                        </div>
                                        <ul className={addItemOptClass.join(' ')}>
                                            <li 
                                                className="reuse-form__cnt--det__selec--opt__img"
                                                onClick={this.showOptHandler.bind(this, 'image')}>Image</li>
                                        </ul>
                                    </div>
                                    <div 
                                        className="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--user"
                                        onClick={this.showOptHandler.bind(this, 'user')}>
                                        <FontAwesomeIcon 
                                            icon={['fas', 'envelope']} 
                                            className="icon icon__reuse-form--cnt__user" />
                                            <div className="reuse-form__cnt--det__selec--added">
                                            <div className="reuse-form__cnt--det__selec--added__img">
                                                <div className="reuse-form__cnt--det__selec--added__img--icn">
                                                    <FontAwesomeIcon 
                                                        icon={['fas', 'user-friends']} />
                                                </div> 
                                                {this.props.media.user ? this.props.media.user.length : 0}
                                                </div>
                                            </div>
                                        Invite 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    { this.state.showAddItm ? 
                        <Aux><Backdrop close={this.closeBackdropHandler}></Backdrop></Aux> : null }
                    { this.state.showGroupOpt ? 
                        <Aux><Backdrop close={this.closeBackdropHandler}></Backdrop><AsyncGroup /></Aux> : null }
                    { this.state.showImgOpt ? <Aux><Backdrop></Backdrop><AsyncImage /></Aux> : null }
                    { this.state.showUserOpt ? <Aux><Backdrop close={this.closeBackdropHandler}></Backdrop><AsyncUsers /></Aux> : null}
                    { this.props.submitForm ? 
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
                    <div className="reuse-form__footer reuse-form__btn">
                        <button 
                            type="button" 
                            className="reuse-form__btn--add"
                            disabled={!this.state.formIsValid }
                            onClick={this.submitHandler.bind(this, 'publish')}>
                            <FontAwesomeIcon 
                                icon={['fas', 'plus']} 
                                className="icon icon__reuse-form--btn" />
                            Create
                        </button>
                    </div>
                </div>
            </form>
        );
    }
};

const mapStateToProps = state => {
    return {
        userID: state.auth.userID,
        cntErr: state.form.cntErr,
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
        onShowMediaBox: () => dispatch(actions.showMediaBox()),
        onSubmitForm: (formData) => dispatch(actions.submit(formData)),
        onFetchShareActive: (userID) => dispatch(actions.fetchShareactiveInit(userID)),
        onFetchNotifyActive: () => dispatch(actions.fetchNotifyactiveInit()),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit()),
        onSubmitReset: () => dispatch(actions.submitFormReset())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);