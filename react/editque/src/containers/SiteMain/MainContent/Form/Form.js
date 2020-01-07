import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'promise-polyfill/src/polyfill';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import '../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Form.css';
import * as actions from '../../../../store/actions/index';
import PtCategs from '../../../../components/Main/PostCategs/PostCategs';
import Categs from '../../../../components/Main/PostCategs/Categs/Categs';
import Backdrop from '../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../components/UI/Modal/Modal';
import Aux from '../../../../hoc/Auxs/Aux';
import asyncComponent from '../../../../hoc/asyncComponent/asyncComponent';
import { updateObject, checkValidity } from '../../../../shared/utility';
import Loader from '../../../../components/UI/Loader/Loader';

const AsyncImage = asyncComponent(() => {
    return import ('./AddImage/AddImage');
});

const AsyncVideo = asyncComponent(() => {
    return import ('./AddVideo/AddVideo');
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
        showAddItmOpt: true,
        formElement: {
            content: {
                value: EditorState.createEmpty(),
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        showForm: false,
        mode: null,
        updateEditor: false
    }

    componentDidMount() {
        this.props.onFetchCnt(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (this.state.showCateg && !this.props.showCateg) {
            this.setState({showCateg: false})
        }
       
        if (this.props.content && !this.state.updateEditor) {
            let oldEditor = this.state.formElement;
            let editor = {...oldEditor.content};
            editor.value = EditorState.createWithContent(convertFromRaw(this.props.content));
            oldEditor.content = editor;
            oldEditor.content.valid = true;
            oldEditor.content.touched = true;
            this.setState({updateEditor: true, formElement: oldEditor, formIsValid: true})
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
        this.setState({addCateg: value, addCategInput: value, disable: value.length < 4})
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

    inputChangedHandler = (editorState, inputType) => {
        let text = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value: editorState,
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
        let updateEditorBlock = updateObject(convertToRaw(this.state.formElement.content.value.getCurrentContent()).blocks[0], {text: ''})
        let updateEditorState = updateObject(convertToRaw(this.state.formElement.content.value.getCurrentContent()), {blocks: [updateEditorBlock]});
       this.setState({showForm: true,  showAddItm: false, mode});
       if (this.state.categs.length > 0 && this.state.formIsValid) {
            let newCnt = {
                categ: this.state.categs,
                desc: JSON.stringify(updateEditorState),
                title: convertToRaw(this.state.formElement.content.value.getCurrentContent()).blocks[0].text,
                video: this.props.media.video ? this.props.media.video : [],
                image: this.props.media.image ? this.props.media.image: [],
                snapshot: this.props.snapshot,
                shareMe: this.props.media.user ? this.props.media.user : [],
                editImage: this.props.editImage,
                editVideo: this.props.editVideo,
                id: this.props.match.params.id,
                mode
            }
            this.props.onSubmitForm(newCnt)
        return
       }
       this.setState({noCateg: true});
    }

    resendCntHander = () => {
        this.submitHandler(this.state.mode);
    }

    closeBackdropHandler = () => {
        this.setState({
            showCateg: false, showAddItm: false});
    }

    closeModalHandler = () => {
        window.location.reload();
    }

    viewCntHandler = () => {
        window.location.assign('/view/question/' + this.props.id)
    }

    render() {
        let form = <Loader />
        
        if (this.props.cntErr) {
            form = (
                <Aux>
                <Backdrop
                        close={this.closeBackdropHandler}></Backdrop>
                    {this.props.cntErr ? <Modal uploadErr={this.props.cntErr} type='categ' />: null}
                </Aux>
            )
        }

        if (this.props.redirect) {
            form = <Redirect 
                to="/index/question" />
        }

        this.props.onFetchShareActive(this.props.userID);
        let addCateg = null;
        let categListClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--categ'];
        let categItems = null;
        let addItemClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--add'];
        let addItemOptClass = ['reuse-form__cnt--det__selec--opt'];

        if (this.state.showAddItm) {
            addItemClass.push('reuse-form__cnt--det__selec--add__visible icon--rotate');
            addItemOptClass.push('reuse-form__cnt--det__selec--opt__visible')
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

        if (this.props.content) {
            form = (
                <div className="reuse-form__wrapper">
                <h3 className="reuse-form__title">
                    <div>
                        <div>
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} />
                        </div> 
                        Edit Question
                    </div>
                </h3>
                <div className="reuse-form__cnt">
                    <div className="reuse-form__cnt--wrapper">
                        <label className="reuse-form__cnt--title">
                            <FontAwesomeIcon 
                                icon={['fas', 'tags']} 
                                className="icon icon__reuse-form--cnt__tag" />
                                Question Tags
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
                                            placeholder="Add Category" 
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
                    </div>
                    <div className="reuse-form__cnt--wrapper">
                        <label className="reuse-form__cnt--title">Content </label>
                        <div className="reuse-form__cnt--det">
                            <Editor 
                                wrapperClassName=""
                                editorClassName="reuse-form__cnt--det__info"
                                toolbarClassName="reuse-form__cnt--det__toolbar"
                                editorState={this.state.formElement.content.value}
                                onEditorStateChange={(event) => this.inputChangedHandler(event, 'content')} 
                                toolbar={{
                                    options: ['inline', 'blockType', 'emoji', 'remove', 'history'],
                                    inline: { inDropdown: true }
                            }}/>
                        </div>
                        { !this.state.formElement.content.valid && this.state.formElement.content.touched ?
                            <div className="reuse-form__err">Content must be longer than 5 characters</div>
                            : null
                        }
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
                                <div 
                                    className="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--user"
                                    onClick={this.showOptHandler.bind(this, 'user')}>
                                    <FontAwesomeIcon 
                                        icon={['fas', 'chalkboard-teacher']} 
                                        className="icon icon__reuse-form--cnt__user" />
                                        <div className="reuse-form__cnt--det__selec--added">
                                        <div className="reuse-form__cnt--det__selec--added__img">
                                            <div className="reuse-form__cnt--det__selec--added__img--icn">
                                                <FontAwesomeIcon 
                                                    icon={['fas', 'chalkboard-teacher']} />
                                            </div> 
                                            {this.props.media.user ? this.props.media.user.length : 0}
                                        </div>
                                    </div>
                                    Share Users 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                { this.state.showAddItm ? 
                    <Aux><Backdrop close={this.closeBackdropHandler}></Backdrop></Aux> : null }
                { this.state.showImgOpt ? <Aux><Backdrop></Backdrop><AsyncImage /></Aux> : null }
                { this.state.showVidOpt ? <Aux><Backdrop></Backdrop><AsyncVideo /></Aux> : null }
                { this.state.showUserOpt ? <Aux><Backdrop></Backdrop><AsyncUsers /></Aux> : null}
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
                        <Backdrop
                            close={this.closeBackdropHandler}></Backdrop>
                        {this.props.categErr ? <Modal uploadErr={this.props.categErr} type='categ' />: null}
                    </Aux> : null
                }

                <div className="reuse-form__footer reuse-form__btn">
                    <button 
                        type="button" 
                        className="reuse-form__btn--dft"
                        disabled={!this.state.formIsValid}
                        onClick={this.submitHandler.bind(this, 'draft')}>
                        <FontAwesomeIcon 
                            icon={['fas', 'eye-slash']} 
                            className="icon icon__reuse-form--btn" />
                        Draft
                    </button>
                    <button 
                        type="button" 
                        className="reuse-form__btn--add"
                        disabled={!this.state.formIsValid}
                        onClick={this.submitHandler.bind(this, 'publish')}>
                        <FontAwesomeIcon 
                            icon={['far', 'edit']} 
                            className="icon icon__reuse-form--btn" />
                        Edit
                    </button>
                 </div>
            </div>
            );
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
        userID: state.auth.userID,
        cntErr: state.form.cntErr,
        redirect: state.form.redirect,
        categ: state.form.categ,
        categErr: state.form.categErr,
        content: state.form.content,
        showCateg: state.form.showCateg,
        newCateg: state.form.newCateg,
        hideMediaBox: state.form.hideMediaBox,
        snapshot: state.form.snapshot,
        media: state.form.media,
        editImage: state.form.editImage,
        editVideo: state.form.editVideo,
        uploadPercent: state.form.uploadPercent,
        submitForm: state.form.submitForm,
        submitError: state.form.submitError,
        id: state.form.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCnt: (id) => dispatch(actions.fetchCntInit(id)),
        onFetchCateg: () => dispatch(actions.fetchCategInit()),
        onAddCateg: (categ) => dispatch(actions.addCategInit(categ)),
        onShowMediaBox: () => dispatch(actions.showMediaBox()),
        onSubmitForm: (formData) => dispatch(actions.submit(formData)),
        onFetchShareActive: (userID) => dispatch(actions.fetchShareactiveInit(userID)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));