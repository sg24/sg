import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'promise-polyfill/src/polyfill';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import './react-draft-wysiwyg.css';
import './Form.css';
import * as actions from '../../../../store/actions/index';
import PtCategs from '../../../../components/Main/PostCategs/PostCategs';
import Categs from '../../../../components/Main/PostCategs/Categs/Categs';
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
        showVidOpt: false,
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
        if (this.state.showCateg && !this.props.showCateg) {
            this.setState({showCateg: false})
        }

        if (this.state.addNewCateg && this.props.newCateg) {
            let categs = [...this.state.categs]
            categs.push(...this.props.newCateg);
            this.setState({categs,addNewCateg: false, noCateg: !categs.length > 1})
        }
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
    }

    showCategHandler = () => {
        if (!this.state.showCateg) {
            this.props.onFetchCateg();
            this.setState({
                showCateg: true
            });
            return
        }
        this.setState({
            showCateg: false});
    }

    selectCategHandler = (categ) => {
        let categs = [...this.state.categs]
        categs.push(categ);
        this.setState({categs,  noCateg: !categs.length > 1});
    }

    addCategHandler = (event) => {
        let value =  event.target.value;
        this.setState({addCateg: value, addCategInput: value, disable: value.length < 1})
    }

    addNewCategHandler = () => {
        this.props.onAddCateg(this.state.addCateg);
        this.setState({addNewCateg: true, addCategInput: '', disable: true })
    }

    categActiveHandler = (index) => {
        this.setState({categActiveProps: {active: true, index}})
    }

    categDefaultHandler = () => {
        this.setState({categActiveProps: {active: false, index: null}})
    }

    removeCategSelectHandler = (index) => {
        let category = [...this.state.categs]
            .filter((categ, categIndex) => categIndex !== index);
            this.setState({categs: category})
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
       if (this.state.formIsValid && this.state.groupMode) {
            let newCnt = {
                categ: this.state.categs,
                desc: JSON.stringify(convertToRaw(this.state.formElement.content.value.getCurrentContent())),
                title: this.state.formElement.title.value,
                image: this.props.media.image ? this.props.media.image: [],
                shareMe: this.props.media.user ? this.props.media.user : [],
                groupmode: String(this.state.groupMode).toLowerCase(),
                allowComment: this.state.allowComment,
                mode
            }
            this.props.onSubmitForm(newCnt)
        return
       }
       this.setState({noCateg: true});
    }

    allowCommentHandler = () => {
        this.setState({allowComment: !this.state.allowComment})
    }

    resendCntHander = () => {
        this.submitHandler(this.state.mode);
    }

    closeBackdropHandler = () => {
        this.setState({
            showCateg: false, showAddItm: false,showVidOpt: false,showImgOpt: false,showUserOpt: false, showGroupOpt: false});
    }

    closeModalHandler = () => {
        window.location.reload();
    }

    viewCntHandler = () => {
        window.location.assign('/chat/group/' + this.props.id)
    }

    render() {
        let addCateg = null;
        let categListClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--categ'];
        let categItems = null;
        let addItemClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--add'];
        let setGroupClass = ['reuse-form__cnt--det__mode reuse-form__cnt--det__mode--add']
        let addItemOptClass = ['reuse-form__cnt--det__selec--opt'];
        let setGroupOptClass = ['reuse-form__cnt--det__mode--opt']
        let checkClass = ['reuse-form__cnt--det__check'];

        if (this.state.allowComment) {
            checkClass.push('reuse-form__cnt--det__check--active')
        }
        if (this.state.showAddItm) {
            addItemClass.push('reuse-form__cnt--det__selec--add__visible icon--rotate');
            addItemOptClass.push('reuse-form__cnt--det__selec--opt__visible')
        }
        if (this.state.showGroupOpt) {
            setGroupClass.push('icon--rotate');
            setGroupOptClass.push('reuse-form__cnt--det__mode--opt__visible')
        }
        if (this.state.showCateg && !this.props.categ) {
            categListClass.push('icon--rotate');
            addCateg =  (
                <ul className="reuse-form__cnt--det__selec--opt reuse-form__cnt--det__selec--opt__visible">
                    <li className="reuse-form__cnt--det__selec--opt__loading">
                        <Loader />
                    </li>
                </ul>
            );
        }
        
        if (this.state.showCateg && this.props.categ) {
            categListClass.push('icon--rotate');
            addCateg =  (
                <ul className="reuse-form__cnt--det__selec--opt reuse-form__cnt--det__selec--opt__visible">
                    <PtCategs 
                        categs={this.props.categ}
                        selecCateg={this.selectCategHandler}/>
                </ul>
            );
        }

        if (this.state.categs.length > 0) {
            categItems = (
                <div className="reuse-form__cnt--tag">
                    <h3>
                        <FontAwesomeIcon 
                            icon={['fas', 'bars']} 
                            className="icon icon__reuse-form__cnt--categ" />
                        Category 
                    </h3>
                    <ul className="reuse-form__cnt--tag__itm">
                        <Categs 
                            categs={this.state.categs}
                            categActive={this.categActiveHandler}
                            categActiveProps={this.state.categActiveProps}
                            categDefault={this.categDefaultHandler}
                            removeCategSelect={this.removeCategSelectHandler}/> 
                    </ul>
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
                                icon={['fas', 'users']} />
                            </div> 
                            Add Chat Room
                        </div>
                    </h3>
                    <div className="reuse-form__cnt">
                        {/* <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">
                                <FontAwesomeIcon 
                                    icon={['fas', 'tags']} 
                                    className="icon icon__reuse-form--cnt__tag" />
                                Category (e.g Education, Entertainment, Business, Information, ...)
                            </label>
                            <div className="reuse-form__cnt--det">
                                <div className="reuse-form__cnt--det__wrapper">
                                    <div 
                                        className={categListClass.join(' ')}
                                        onClick={this.showCategHandler}>
                                        Category 
                                        <FontAwesomeIcon 
                                            icon={['fas', 'angle-down']} 
                                            className="icon icon__reuse-form--angle" />
                                       { addCateg }
                                    </div>
                                    <div className="reuse-form__cnt--det__alt">
                                        <div className="reuse-form__cnt--det__alt--title">
                                            <div>OR</div>
                                        </div>
                                        <div className="reuse-form__cnt--det__alt--cnt">
                                            <input 
                                                type="text" name="" id="" 
                                                className="reuse-form__cnt--det__input" 
                                                placeholder="Write new category ..." 
                                                value={this.state.addCategInput}
                                                onChange={this.addCategHandler}/>
                                            <button
                                                type="button"
                                                onClick={this.addNewCategHandler}
                                                disabled={this.state.disable}>
                                                <FontAwesomeIcon 
                                                icon={['fas', 'plus']} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { categItems }
                            { this.state.noCateg ?
                                <div className="reuse-form__err">Select or Add New Category</div>
                                : null
                            }
                        </div> */}
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">Room Name</label>
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
                                <div className="reuse-form__err">Chat Room Name must not be empty </div>
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
                                        className={setGroupClass.join(' ')}
                                        onClick={this.setGroupHandler}>
                                        {this.state.groupMode ? this.state.groupMode : 'Room Type'}
                                        <FontAwesomeIcon 
                                            icon={['fas', 'angle-down']} 
                                            className="icon icon__reuse-form--angle" />
                                        <ul className={setGroupOptClass.join(' ')}>
                                            <li 
                                                className="reuse-form__cnt--det__selec--opt__img"
                                                onClick={this.setGroupModeHandler.bind(this, 'General')}>General</li>
                                            <li 
                                                className="reuse-form__cnt--det__selec--opt__img"
                                                onClick={this.setGroupModeHandler.bind(this, 'Private')}>Private</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <div className="reuse-form__cnt--det">
                                <div className="reuse-form__cnt--det__wrapper">
                                   <div 
                                    className={checkClass.join(' ')}
                                    onClick={this.allowCommentHandler}>
                                       Enable Comment
                                        <input 
                                            type="checkbox" checked={this.state.allowComment}
                                            className="reuse-form__cnt--det__check--cnt" onChange={this.allowCommentHandler}/>
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
                        <Aux><Backdrop close={this.closeBackdropHandler}></Backdrop></Aux> : null }
                    { this.state.showImgOpt ? <Aux><Backdrop></Backdrop><AsyncImage /></Aux> : null }
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
                            className="reuse-form__btn--add"
                            disabled={!this.state.formIsValid || !this.state.groupMode}
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
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);