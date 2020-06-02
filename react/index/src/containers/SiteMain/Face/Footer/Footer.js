import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import { socket, webCameraApi } from '../shared/utility';
import axios from '../axios';
import loc from 'axios';

class Footer extends Component {
    state = {
        chat: '',
        addItm: false,
        audioRec: false,
        mediaRecorder: null,
        vidRec: false,
        id: this.props.match.params.id,
        addImage: false,
        showEmoji: false,
        disable: false,
        editChat: null,
        err: null,
        resend: [],
        addItem: false,
        showEmoji: false
    };

    chatCntHandler = (event) => {
        this.setState({chat: event.target.value.trimLeft(), addItem: false, showEmoji: false, err: null});
        let these = this;
        socket.emit('usertyping', {}, function(err) {
            these.setState({err})
        })
        if (this.state.addItem || this.state.showEmoji) {
            this.props.showBackdrop(false)
        }
    }

    stopTypingHandler = (event) => {
        let these = this;
        socket.emit('canceltyping', {}, function(err) {
            these.setState({err})
        })
        if (event.key === 'Enter' && this.state.chat.length > 0) {
            this.createChatHandler()
        }
    }

    showAddItmHandler = () => {
        this.setState((prevState, props) => {
            return {
                addItem: !prevState.addItem,
                showEmoji: false,
                err: null
            }
        });
        this.props.showBackdrop(!this.state.addItem)
    }

    createChatHandler = () => {
        if (this.state.editChat) {
            this.createChat(this.state.id,'typedPlain', {editMsg: this.state.chat, mainID: this.state.editChat.mainID, chatID: this.state.editChat.chatID}, uuid(), 'pvtcreateChat')
        } else {
            this.createChat(this.state.id,'typedPlain', this.state.chat, uuid(), 'pvtcreateChat')
        }
        this.setState({chat: '', err: null});
    }

    createChat = (id, msgType, msg, msgID, msgCateg) => {
        let these = this;
        this.props.createChatStart({msgType, msg, msgID})
        axios.post(`/contest`,
            {type: msgType, msg, chatID: msgID, id} , {
            headers: {
                'data-categ': msgCateg}}).then(res => {
            this.props.addNewChat(res.data)
            socket.emit('pvtcreateChat', res.data, function(err) {
                these.setState({err})
            })
        }).catch(err => {
            let resend = [...this.state.resend];
            resend.push({id, msgType, msg, msgID, msgCateg})
            this.setState({resend})
        })
    }

    audioRecorderHandler = () => {
        webCameraApi(socket, this.state.mediaRecorder, this.state.audioRec, {audio: true}, 
            'audio/ogg; codecs=opus', 'ogg','audio', 'pvtMediaRecChat').then(media => {
                if (!this.state.audioRec) {
                this.setState({audioRec: true, mediaRecorder: media.mediaRecorder, err: null})
            } else {
                this.setState({audioRec: false, mediaRecorder: null, err: null})
                if (this.state.editChat) {
                    this.uploadMedia([{file: media[0].file, type: media[0].type, format: media[0].format, chatID: {mainID: this.state.editChat.mainID, chatID: this.state.editChat.chatID}}])
                } else {
                    this.uploadMedia(media)
                }
            }
        }).catch(err => {
            this.setState({audioRec: false, err})
        })
    }

    videoRecHandler = () => {
       this.props.videoRec()
    }

    snapshotHandler = () => {
        this.props.snapshot()
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
                if (this.state.editChat) {
                    media.push({file, type: cntType, format, chatID: {mainID: this.state.editChat.mainID, chatID: this.state.editChat.chatID}})
                } else {
                    media.push({file, type: cntType, format, chatID: uuid()})
                }
            } 
        }
        this.uploadMedia(media)
        this.setState({disable: false,  addItem: false, err: null})
        this.props.showBackdrop(false)
    }

    emojiHandler = () => {
        this.setState((prevState, props) => {
            return {
                showEmoji: !prevState.showEmoji,
                addItem: false,
                err: null
            }
        });
        this.props.showBackdrop(!this.state.showEmoji)
    }

    addEmojiHandler = (cnt) => {
        let chat = `${this.state.chat} ${cnt.native}`
        this.setState({chat, err: null, addItem: false, showEmoji: false})
        this.props.showBackdrop(false)
    }

    shareLocationHandler = () => {
        let these = this
        this.setState({disable: true, addItem: false, err: null})
        this.props.showBackdrop(false);
        if (('navigator' in window) && ('geolocation' in navigator)) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let fetchedLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
                loc.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${fetchedLocation.lat},${fetchedLocation.lng}&key=AIzaSyDIbF8oQh1APAzLLXoeLynN8vMsAKSav2g`).then(loc => {
                    if (!loc.data.error_message) {
                        if (these.props.editChat) {
                           these.createChat(these.state.id, 'typedPlain', {editMsg: `In ${loc.data.results[0].formatted_address}`, mainID: these.state.editChat.mainID, chatID: these.state.editChat.chatID}, uuid(), 'pvtcreateChat')
                        } else {
                            these.createChat(these.state.id,'typedPlain', `In ${loc.data.results[0].formatted_address}`, uuid(), 'pvtcreateChat')
                        }
                        these.setState({disable: false, err: null})
                    }
                }).catch(err => {
                    these.setState({err, disable: false})
                })
              }, function(err) {
                these.setState({err, disable: false})
              }, {timeout: 5000})
        }
    }

    closeModelBackdropHandler = () => {
        this.setState({err: null})
    }

    componentDidUpdate() {
        if (this.props.closeContent && !this.state.closeContent) {
            this.setState({closeContent: true, addItem: false, showEmoji: false})
        }

        if (!this.props.closeContent && this.state.closeContent) {
            this.setState({closeContent: false})
        }

        if (JSON.stringify(this.state.editChat) !== JSON.stringify(this.props.editChat)) {
            this.setState({editChat: this.props.editChat})
        }
        
        if (this.props.connect && this.state.resend.length > 0) {
            let resend = this.state.resend;
            this.setState({resend: []})
            resendChat(this, resend, 0)
            let curIndex = 0;
            function resendChat(these, cnt, index) {
                axios.post(`/contest`,
                    {type: cnt[index].msgType, msg: cnt[index].msg, chatID: cnt[index].msgID, id: cnt[index].id} , {
                    headers: {
                    'data-categ': cnt[index].msgCateg}}).then(res => {
                    ++curIndex;
                    if (curIndex < cnt.length) {
                        resendChat(these, cnt, curIndex)
                    } 
                    these.props.addNewChat(res.data)
                    socket.emit('pvtcreateChat', res.data, function(err) {
                        these.setState({err})
                    })
                }).catch(err => {
                    ++curIndex;
                })
            }
        }
    }

    uploadMedia = (cnt) => {
        let these = this;
         for (let media of cnt) {
            let type = media.type === 'media' ?  'video' : media.type;
            this.props.uploadMediaStart({chatID: media.chatID, type, percentage: 0})
        }

        submit(cnt, 0);

        function submit(media, index) {
            let formContent = new FormData();
            let ext = media[index].file.type.split('/').pop();
            formContent.append('media', media[index].file, `${media[index].chatID}.${ext.split(';')[0]}`);
            formContent.append('type', media[index].type === 'video' ? 'media' : media[index].type);
            formContent.append('format', media[index].format);
            formContent.append('chatID', JSON.stringify(media[index].chatID));
            formContent.append('id', these.state.id);
            axios.post(`/contest`, formContent, {
                headers: {'data-categ': 'uploadmedia'},
                onUploadProgress: function (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        let type = media[index].type === 'media' ?  'video' : media[index].type;
                        these.props.uploadMediaStart({chatID: media[index].chatID, type , percentage})
                    }
                }  
            }).then((res) => {
                socket.emit('pvtMediaRecChat', res.data, (err) => {
                    these.setState({err})
                })
                ++index;
                these.props.mediaUploaded();
                if (index < media.length) {
                    submit(media, index)
                } 
            }).catch((err) => {
                ++index;
                these.props.mediaUploaded();
                these.setState({err})
            });
        }
    }

    render() {
        let startRecClass = ['site-main__chat--footer__mic'];

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

        if (this.state.addItem) {
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

        if (this.state.showEmoji) {
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

        return(
            <>
            {this.state.err ? <div className="site-main__chat--err">{this.state.err.message ? this.state.err.message : this.state.err.toString()}</div> : null }
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

export default withRouter(Footer); 