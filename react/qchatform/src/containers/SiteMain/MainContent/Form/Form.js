import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'promise-polyfill/src/polyfill';
import { withRouter } from 'react-router-dom';

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
import { updateObject, checkValidity, readData, deleteItem, clearAllData } from '../../../../shared/utility';
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

class Form extends  Component {
    state = {
        showCateg: false,
        categs: [],
        noCateg: false,
        addCateg: null,
        disable: true,
        addNewCateg: true,
        addCategInput: '',
        selectItm: null,
        showSelectItm: false,
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
            title: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            }
        },
        setTime: {
            hour: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: true,
                touched: false
            },
            minute: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: true,
                touched: false
            },
            second: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: true,
                touched: false
            }
        },
        qchat: localStorage.getItem('question') ? JSON.parse(localStorage.getItem('question')) : [],
        formIsValid: false,
        setTimeValid: false,
        showForm: false,
        indexDBErr: null,
        mode: null,
        active: null
    }

    componentDidMount() {
        let numberOfAjaxCAllPending = 0;
        let these = this;
        this.props.onSetPosition(0);
        if ('indexedDB' in window) {
        } else {
            this.setState({indexDBErr: 'Please update your browser to add image/video'})
        }
        if (this.state.qchat && this.state.qchat.length > 0 && this.state.qchat.filter(cnt => cnt.position === 0)[0]) {
            let qchat = this.state.qchat.filter(cnt => cnt.position === 0)[0];
            let oldEditor = this.state.formElement;
            let title = {...oldEditor.title};
            title.value = qchat.title;
            oldEditor.title = title;
            oldEditor.title.valid = true;
            oldEditor.title.touched = true;
            
            let oldSetTime = this.state.setTime;
            let hour = {...oldSetTime.hour};
            hour.value = qchat.hour;
            let minute = {...oldSetTime.minute};
            minute.value = qchat.minute;
            let second = {...oldSetTime.second};
            second.value = qchat.second;
            oldSetTime.hour = hour;
            oldSetTime.hour.valid = true;
            oldSetTime.hour.touched = true;
            oldSetTime.minute = minute;
            oldSetTime.minute.valid = true;
            oldSetTime.minute.touched = true;
            oldSetTime.second = second;
            oldSetTime.second.valid = true;
            oldSetTime.second.touched = true;
            let image = []
            let video = []
            if ('indexedDB' in window) { 
                readData('media', 0).then(media => {
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
                        image,
                        user: typeof qchat.participant === 'object'?  qchat.participant : null
                    })
                })
            }
            this.setState({
                categs: qchat.categ,
                formElement: oldEditor,
                selectItm: typeof qchat.participant === 'object' ? null : qchat.participant,
                setTime: oldSetTime,
                formIsValid: true,
                setTimeValid: true
            })
        } else {
            if ('indexedDB' in window) {
                deleteItem('media', 0);
            } 
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
    }

    componentDidUpdate() {
        if (this.state.showCateg && !this.props.showCateg) {
            this.setState({showCateg: false})
        }

        if (this.state.addNewCateg && this.props.newCateg) {
            let categs = [...this.state.categs];
            let isGame = false;
            categs.push(...this.props.newCateg);
            this.setState({categs,addNewCateg: false, noCateg: !categs.length > 1, isGame})
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
            if ('indexedDB' in window) {
                clearAllData('media');
            }
            localStorage.removeItem('question')
            this.setState({showForm: false});
        } 

        let qchat = localStorage.getItem('question');
        if (qchat) {
            if (JSON.stringify(this.state.qchat) !== qchat) {
                this.setState({qchat: JSON.parse(qchat)})
            }
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

    inputChangedHandler = (editorState, inputType) => {
        let text =  editorState.target.value;
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value: editorState.target.value,
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

    setTimeHandler = (event, inputType) => {
        let value = event.target.value;
        let updateFormType = updateObject(this.state.setTime[inputType], {
            value,
            valid: inputType === 'hour' ? true : (inputType === 'minute' || inputType === 'second') && (value < 60 || !value) ?  true : false,
            touched: true
        });
        
        let formIsValid = true;
        let updateFormElement = updateObject(this.state.setTime, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            formIsValid = updateFormElement[inputType].valid && formIsValid
        }
        
        this.setState({setTime: updateFormElement, setTimeValid: formIsValid})
    }

    showSelectHandler = () => {
        this.setState((prevState, props) => {
            return {
                showSelectItm: !prevState.showSelectItm
            }})
    }

    selectItmHandler = (opt) => {
        this.setState({selectItm: opt})
        this.props.resetSelect()
    }

    submitHandler = (mode) => {
        this.setState({showForm: true,  showAddItm: false, mode});
    
        if (this.state.categs.length > 0 && this.state.formIsValid && this.state.setTimeValid) {
             let hour = this.state.setTime.hour.value ? this.state.setTime.hour.value*60*60*1000 : 0;
             let minute = this.state.setTime.minute.value ? this.state.setTime.minute.value*60*1000 : 0;
             let second = this.state.setTime.second.value ? this.state.setTime.second.value*1000 : 0;
             let newCnt = {
                position: 0,
                categ: this.state.categs,
                title: this.state.formElement.title.value,
                participant: this.props.media.user ? this.props.media.user : this.state.selectItm ? this.state.selectItm :  'public',
                duration: hour+minute+second,
                hour: this.state.setTime.hour.value,
                minute: this.state.setTime.minute.value,
                second: this.state.setTime.second.value,
                mode
            }
             this.addCntHandler(newCnt);
             if (mode === 'next') {
                this.props.history.push('/add/qchat/?id=1')
             } else {
                this.props.onSubmitForm(this.state.qchat ? this.state.qchat : newCnt)
             }
             
         return
        }
        this.setState({noCateg: true});
     }

     addCntHandler = (newCnt) => {
        let  qchat = localStorage.getItem('question') ? JSON.parse(localStorage.getItem('question')) : [];
        let position = 0
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
 
     resendCntHander = () => {
         this.submitHandler(this.state.mode);
     }
 
     closeBackdropHandler = () => {
         this.setState({
             showCateg: false, showAddItm: false,showVidOpt: false,showImgOpt: false,showUserOpt: false});
     }
 
     closeModalHandler = () => {
         window.location.reload();
     }
 
    viewCntHandler = () => {
        window.location.assign('/view/qchat/' + this.props.id);
    }

    render() {
        let addCateg = null;
        let categListClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--categ'];
        let categItems = null;
        let addItemClass = ['reuse-form__cnt--det__selec reuse-form__cnt--det__selec--add'];
        let selectOptClass = ['reuse-form__cnt--det__selec--opt-user']
        let addItemOptClass = ['reuse-form__cnt--det__selec--opt'];
        let isValid  = !this.state.formIsValid || !this.state.setTimeValid || (!this.state.setTime.hour.value && !this.state.setTime.minute.value && !this.state.setTime.second.value)
        || this.state.categs.length < 1 || (!this.state.selectItm && (!this.props.media.user || (this.props.media.user && !this.props.media.user.length > 0)));

        if (this.state.showAddItm) {
            addItemClass.push('reuse-form__cnt--det__selec--add__visible icon--rotate');
            addItemOptClass.push('reuse-form__cnt--det__selec--opt__visible')
        }

        if (this.state.showSelectItm) {
            selectOptClass.push('reuse-form__cnt--det__selec--opt-user__visible icon--rotate');
            selectOptClass.push('reuse-form__cnt--det__selec--opt-user__visible')
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
                                icon={['fas', 'coffee']} />
                            </div> 
                            Add QChat
                        </div>
                    </h3>
                    <div className="reuse-form__cnt">
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">
                                <FontAwesomeIcon 
                                    icon={['fas', 'tags']} 
                                    className="icon icon__reuse-form--cnt__tag" />
                                Tags
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
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">
                                <FontAwesomeIcon 
                                    icon={['far', 'clock']}
                                    className="icon icon__reuse-form--clock" />
                                Set Time
                            </label>
                            <div className="reuse-form__cnt--det">
                                <div className="reuse-form__cnt--det__wrapper">
                                    <input 
                                        type="number" 
                                        placeholder="Hrs" 
                                        className="reuse-form__cnt--det__input reuse-form__cnt--det__input--tm reuse-form__cnt--det__input--tm__hrs"
                                        onChange={(event) => this.setTimeHandler(event, 'hour')}
                                        value={this.state.setTime.hour.value}
                                        maxLength="2" />
                                    <input 
                                        type="number" 
                                        placeholder="Minute" 
                                        className="reuse-form__cnt--det__input reuse-form__cnt--det__input--tm reuse-form__cnt--det__input--tm__min"
                                        onChange={(event) => this.setTimeHandler(event, 'minute')}
                                        value={this.state.setTime.minute.value} />
                                    <input 
                                        type="number" 
                                        placeholder="Second" 
                                        className="reuse-form__cnt--det__input reuse-form__cnt--det__input--tm"
                                        onChange={(event) => this.setTimeHandler(event, 'second')}
                                        value={this.state.setTime.second.value} />
                                    <div className="reuse-form__cnt--det__input--pre">
                                        {this.state.setTime.hour.value && this.state.setTime.hour.value < 10 ? '0'+String(this.state.setTime.hour.value) : this.state.setTime.hour.value ? this.state.setTime.hour.value : '00'}:
                                        {this.state.setTime.minute.value && this.state.setTime.minute.value < 60 ? this.state.setTime.minute.value < 10 ? '0'+String(this.state.setTime.minute.value)  : this.state.setTime.minute.value : '00'}: 
                                        {this.state.setTime.second.value && this.state.setTime.second.value < 60 ? this.state.setTime.second.value < 10 ? '0'+String(this.state.setTime.second.value)  : this.state.setTime.second.value : '00'}
                                    </div>
                                </div>
                                { !this.state.setTime.hour.value && !this.state.setTime.minute.value && !this.state.setTime.second.value 
                                && this.state.setTime.hour.touched && this.state.setTime.minute.touched && this.state.setTime.second.touched ?
                                    <div className="reuse-form__err"> Qchat time must not be empty </div>
                                    : null
                                }
                                { !this.state.setTime.hour.valid  && this.state.setTime.hour.touched ?
                                    <div className="reuse-form__err"> Qchat Hour must not be empty </div>
                                    : null
                                }
                                { (!this.state.setTime.minute.valid || !this.state.setTime.second.valid)  && (this.state.setTime.minute.touched || this.state.setTime.second.touched) ?
                                    <div className="reuse-form__err"> Qchat Minutes/Seconds must not be greater than 59 minutes or seconds </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="reuse-form__cnt--wrapper">
                            <label className="reuse-form__cnt--title">QChat Title</label>
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
                                <div className="reuse-form__err">QChat title must not be empty </div>
                                : null
                            }
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
                                    <div 
                                        className="reuse-form__cnt--det__selec reuse-form__cnt--det__selec--user"
                                        onClick={this.showSelectHandler}>
                                        <FontAwesomeIcon 
                                            icon={['fas', 'caret-down']} 
                                            className="icon icon__reuse-form--cnt__user" />
                                            
                                        {this.props.media.user && this.props.media.user.length > 0 ?  'Picked Friends' : this.state.selectItm ? this.state.selectItm : 'participant'}
                                        <ul className={selectOptClass.join(' ')}>
                                            <li 
                                                onClick={this.selectItmHandler.bind(this, 'public')}>public</li>
                                            <li 
                                                onClick={this.selectItmHandler.bind(this, 'friends')}>friends</li>
                                            <li 
                                                onClick={this.showOptHandler.bind(this, 'user')}>Pick Friend</li>
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
                            disabled={!this.state.formIsValid || !this.state.setTimeValid || (!this.state.setTime.hour.value && !this.state.setTime.minute.value && !this.state.setTime.second.value)
                                || this.state.categs.length < 1 || (!this.state.selectItm && (!this.props.media.user || (this.props.media.user && !this.props.media.user.length > 0)))}
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
                    { this.state.indexDBErr ? <div className="reuse-form__err"> { this.state.indexDBErr } </div> : null }
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
        resetSelect: () => dispatch(actions.resetSelect()),
        onAddQchat: (cnt) => dispatch(actions.addQchat(cnt)),
        onSetMedia: (media) => dispatch(actions.setMedia(media)),
        onSetPosition: (position) => dispatch(actions.setPosition(position)),
        onFetchNavActive: () => dispatch(actions.fetchNavActiveInit())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));