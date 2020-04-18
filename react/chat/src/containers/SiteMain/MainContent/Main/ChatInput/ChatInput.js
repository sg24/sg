import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import axios from 'axios';

import { socket, webCameraApi, createChat } from '../../../../../shared/utility';
import * as actions from '../../../../../store/actions/index';
import Backdrop from '../../../../../components/UI/Backdrop/Backdrop';
import Modal from '../../../../../components/UI/Modal/Modal';

class ChatInput extends Component {
    state = {
        chat: '',
        addItm: false,
        audioRec: false,
        mediaRecorder: null,
        vidRec: false,
        id: this.props.match.params.id,
        categ: this.props.match.params.categ,
        addImage: false,
        showEmoji: false,
        disable: false,
        err: null,
        disableResend: false
    };

    chatCntHandler = (event) => {
        this.setState({chat: event.target.value.trimLeft()});
        let these = this;
        socket.emit('usertyping', {}, function(err) {
            these.props.onTypingErr(err)
        })
    }

    stopTypingHandler = (event) => {
        let these = this;
        socket.emit('canceltyping', {}, function(err) {
            these.props.onTypingErr(err)
        })
        if (event.key === 'Enter' && this.state.chat.length > 0) {
            this.createChatHandler()
        }
    }

    showAddItmHandler = () => {
        this.props.onShowBackdrop();
    }

    createChatHandler = () => {
        this.props.onCreateChatInit(this.state.id, this.state.categ,'typedPlain', this.state.chat, uuid(), 'createChat')

        this.setState({chat: '', disableResend: false});
    }

    audioRecorderHandler = () => {
        webCameraApi(socket, this.state.mediaRecorder, this.state.audioRec, {audio: true}, 
            'audio/ogg; codecs=opus', 'ogg','audio', 'mediaRecChat').then(media => {
                if (!this.state.audioRec) {
                this.setState({audioRec: true, mediaRecorder: media.mediaRecorder})
            } else {
                this.setState({audioRec: false, mediaRecorder: null})
                this.props.onUploadMedia(media, this.state.id, this.state.categ)
            }
        }).catch(err => {
            this.setState({audioRec: false, err})
        })
    }

    videoRecHandler = () => {
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}?id=videoCamera`)
        this.props.onCloseChatBackdrop()
    }

    snapshotHandler = () => {
        this.props.history.push(`/chat/${this.state.categ}/${this.state.id}?id=camera`)
        this.props.onCloseChatBackdrop()
    }

    addImageHandler = () => {
        document.querySelector('.site-main__chat--footer__clip-itm--input').click()
    };

    addAudioHandler = () => {
        document.querySelector('.site-main__chat--footer__clip-itm--input-aud').click()
    };

    addDocHandler = () => {
        document.querySelector('.site-main__chat--footer__clip-itm--input-doc').click()
    }

    addVideoHandler = ()=> {
        document.querySelector('.site-main__chat--footer__clip-itm--input-vid').click()
    };

    selectMediaHandler = (event) => {
        this.setState({disable: true})
        event.stopPropagation();
        event.preventDefault();
        if (event.target.files) {
            const files = event.target.files;
            this.handleFiles(files)
        }
    }

    handleFiles = (files) => {
        let media = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            let cntType = file.type.split('/')[0] === 'video' ? 'media' :  file.type.split('/')[0];
            let format = file.type.split('/')[1];
            if(cntType) {
                media.push({file, type: cntType, format, chatID: uuid()})
            } 
        }
        this.props.onUploadMedia(media, this.state.id, this.state.categ)
        this.props.onCloseChatBackdrop();
        this.setState({disable: false})
    }

    emojiHandler = () => {
        this.props.onShowEmojiBackdrop();
    }

    addEmojiHandler = (cnt) => {
        let chat = `${this.state.chat} ${cnt.native}`
        this.setState({chat})
        this.props.onShowEmojiBackdrop();
    }

    shareLocationHandler = () => {
        let these = this
        this.setState({disable: true})
        if (('navigator' in window) && ('geolocation' in navigator)) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let fetchedLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${fetchedLocation.lat},${fetchedLocation.lng}&key=AIzaSyD2OUDjZ-urf2MAVcxPc03HA4X8KbB-jlk`).then(loc => {
                    if (!loc.data.error_message) {
                        these.props.onCreateChatInit(these.state.id, these.state.categ,'typedPlain', `In ${loc.data.results[0].formatted_address}`, uuid(), 'createChat')
                        these.props.onCloseChatBackdrop()
                        these.setState({disable: false})
                    }
                }).catch(err => {
                    these.setState({err, disable: false})
                    these.props.onCloseChatBackdrop();
                })
              }, function(err) {
                these.setState({err, disable: false})
                these.props.onCloseChatBackdrop();
              }, {timeout: 70000})
        }
    }

    closeModelBackdropHandler = () => {
        this.setState({err: null})
    }

    componentDidUpdate() {
        if ((this.props.resend.length > 0) && this.props.connect) {
            this.props.onResendChatInit(this.state.id, this.state.categ, this.props.resend);
            this.props.onResetResendChat()
        }
    }

    render() {
        let startRecClass = ['site-main__chat--footer__mic'];
        let err = null

        let userOpt = (
            <div 
            className="site-main__chat--footer__camera"
            onClick={ this.snapshotHandler }>
                <FontAwesomeIcon icon={['fas', 'camera']} className="icon icon__site-main--chat__footer--camera"/>
            </div>
        )
        let shareOpt = (
            <div 
                className="site-main__chat--footer__input--clip"
                onClick={this.showAddItmHandler }><FontAwesomeIcon icon={['fas', 'paperclip']} className="icon icon__site-main--chat__footer--input__clip"/></div>
        )

        let emojiCnt = null;

        if (this.state.audioRec) {
            startRecClass.push('site-main__chat--footer__mic--active')
        }

        if (this.state.chat || this.state.audioRec) {
            userOpt = (
                <div 
                    className="site-main__chat--footer__clip"
                    onClick={ this.showAddItmHandler }>
                    <FontAwesomeIcon icon={['fas', 'paperclip']} className="icon icon__site-main--chat__footer--clip"/>
                </div>
            )

            shareOpt = (
                <div 
                    className="site-main__chat--footer__input--share"
                    onClick={this.state.audioRec ? this.audioRecorderHandler : this.createChatHandler}><FontAwesomeIcon icon={['fas', 'location-arrow']} className="icon icon__site-main--chat__footer--input__share"/>
                </div>
            )
        }

        let addItm = null;

        if (this.props.addBackdrop) {
            addItm = (
                <div className="site-main__chat--footer__clip-itm">
                    <div 
                        className="site-main__chat--footer__clip-itm--wrapper"
                        onClick={this.snapshotHandler}>
                        <div className="site-main__chat--footer__clip-itm--cam">
                            <FontAwesomeIcon icon={['fas', 'camera']} className="icon icon__site-main__chat--clip-itm"/>
                        </div>
                        <h4>Camera</h4>
                    </div>
                    <div 
                        className="site-main__chat--footer__clip-itm--wrapper"
                        onClick={this.videoRecHandler}>
                        <div className="site-main__chat--footer__clip-itm--rec">
                        <FontAwesomeIcon icon={['fas', 'video']} className="icon icon__site-main__chat--clip-itm"/>
                        </div>
                        <h4>Video Recorder</h4>
                    </div>
                    <div 
                        className="site-main__chat--footer__clip-itm--wrapper"
                        onClick={this.addImageHandler}>
                        <div className="site-main__chat--footer__clip-itm--img-pic">
                        <FontAwesomeIcon icon={['fas', 'images']} className="icon icon__site-main__chat--clip-itm"/>
                        </div>
                        <h4>Image Picker</h4>
                        <input 
                            type="file" 
                            multiple
                            className="site-main__chat--footer__clip-itm--input"
                            onChange={this.selectMediaHandler}
                            accept="image/*"/>
                        </div>
                    <div 
                        className="site-main__chat--footer__clip-itm--wrapper"
                        onClick={this.shareLocationHandler}>
                        <div className="site-main__chat--footer__clip-itm--loc">
                            <FontAwesomeIcon icon={['fas', 'map-marker-alt']} className="icon icon__site-main__chat--clip-itm"/>
                        </div>
                        <h4>Share Location</h4>
                    </div>
                    <div 
                        className="site-main__chat--footer__clip-itm--wrapper"
                        onClick={this.addDocHandler}>
                        <div className="site-main__chat--footer__clip-itm--doc">
                            <FontAwesomeIcon icon={['fas', 'file']} className="icon icon__site-main__chat--clip-itm"/>
                        </div>
                        <h4>Documents</h4>
                        <input 
                            type="file" 
                            multiple
                            className="site-main__chat--footer__clip-itm--input-doc"
                            onChange={this.selectMediaHandler}
                            accept="*"/>
                    </div>
                    <div 
                        className="site-main__chat--footer__clip-itm--wrapper"
                        onClick={this.addAudioHandler}>
                        <div className="site-main__chat--footer__clip-itm--aud">
                            <FontAwesomeIcon icon={['fas', 'headphones']} className="icon icon__site-main__chat--clip-itm"/>
                        </div>
                        <h4>Audio Picker</h4>
                        <input 
                            type="file" 
                            multiple
                            className="site-main__chat--footer__clip-itm--input-aud"
                            onChange={this.selectMediaHandler}
                            accept="audio/*"/>
                    </div>
                    <div 
                        className="site-main__chat--footer__clip-itm--wrapper"
                        onClick={this.addVideoHandler}>
                        <div className="site-main__chat--footer__clip-itm--vid">
                            <FontAwesomeIcon icon={['fas', 'video']} className="icon icon__site-main__chat--clip-itm"/>
                        </div>
                        <h4>Video Picker</h4>
                        <input 
                            type="file" 
                            multiple
                            className="site-main__chat--footer__clip-itm--input-vid"
                            onChange={this.selectMediaHandler}
                            accept="video/*"/>
                    </div>
                </div>
            )
        }

        if (this.props.emojiBackdrop) {
            emojiCnt = (
                <Picker 
                    set="facebook"
                    onSelect={this.addEmojiHandler}
                    style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex:1
                    }}/>
            )
        }

        if (this.state.err) {
            err = (
                <Backdrop 
                    component={ Modal }
                    close={this.closeModelBackdropHandler}
                    err={  this.state.err }
                    media />
            )
        }

        return(
            <>
            { err }
            <div className="site-main__chat--footer">
                <div 
                    className={startRecClass.join(' ')}
                    onClick={this.audioRecorderHandler}>
                    <FontAwesomeIcon icon={['fas', 'microphone']} className="icon icon__site-main--chat__footer--mic"/>
                </div>
                <div className="site-main__chat--footer__input">
                        <form onSubmit={this.createChatHandler}>
                            <textarea  
                            className="site-main__chat--footer__input--field" 
                            placeholder="Type something ....." 
                            autoFocus
                            onChange={this.chatCntHandler}
                            onKeyUp={this.stopTypingHandler}
                            onMouseLeave={this.stopTypingHandler}
                            value={this.state.chat}
                            disabled={this.state.audioRec || this.state.disable}></textarea>
                        </form>
                    { shareOpt }
                    <div 
                        className="site-main__chat--footer__input--smiles"
                        onClick={this.emojiHandler}>
                        <FontAwesomeIcon icon={['far', 'smile']} className="icon icon__site-main--chat__footer--input__smile"/>
                    </div>
                </div>
                { userOpt }
                { addItm }
                { emojiCnt }
            </div>
        </>
        )
    }
}

const mapStateToProps = state => {
    return {
        addBackdrop: state.cnt.addBackdrop,
        emojiBackdrop: state.cnt.emojiBackdrop,
        resend: state.cnt.resend,
        connect: state.cnt.connect
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onTypingErr: (err) => dispatch(actions.fetchCntFail(err)) ,
        onShowBackdrop: () => dispatch(actions.showAddBackdrop()),
        onUploadMedia: (cnt, id, categ) => dispatch(actions.uploadMediaInit(cnt, id, categ)),
        onShowEmojiBackdrop: () => dispatch(actions.showEmojiBackdrop()),
        onCloseChatBackdrop: () => dispatch(actions.closeChatBackdrop()),
        onCreateChatInit: (id, categ, msgType, msg, ID, msgCateg) => dispatch(actions.createChatInit(id, categ, msgType, msg, ID, msgCateg)),
        onResendChatInit: (id, categ, chats) => dispatch(actions.resendChatInit(id, categ, chats)),
        onResetResendChat: () => dispatch(actions.resetResendChat())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatInput)); 