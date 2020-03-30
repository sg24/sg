import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import uuid from 'uuid';

import './AudioRec.css';
import { socket } from '../../../../../../shared/utility';
import * as actions from '../../../../../../store/actions/index';

let chunks = [];
class ChatInput extends Component {
    state = {
        chat: '',
        showAudRec: false,
        addItm: false,
        start: false,
        mediaRecorder: null,
        recState: null
    };

    startRecHandler = () => {
        if (!this.state.mediaRecorder) {
            if (!('mediaDevices' in navigator)) {
                navigator.mediaDevices = {};
            }
            
            if (!('getUserMedia' in navigator.mediaDevices)) {
                navigator.mediaDevices.getUserMedia = function(constraints) {
                var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented!'));
                }
            
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
                }
            }
            let these = this
            navigator.mediaDevices.getUserMedia({audio: true})
                .then(function(stream) {
                    let mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    mediaRecorder.ondataavailable = function(e) {
                        chunks.push(e.data);
                    }
                    these.setState({start: true, mediaRecorder, recState: mediaRecorder.state})
                })
                .catch(function(err) {
                    these.setState({err, start: false})
                });  
        } else {
            if (this.state.mediaRecorder  && this.state.mediaRecorder.state === 'paused') {
                this.state.mediaRecorder.resume();
                this.setState({start: true, recState:  this.state.mediaRecorder.state})
            }
        }
         
    }

    pauseRecHandler =  () => {
        if (this.state.mediaRecorder  && this.state.mediaRecorder.state === 'recording') {
            this.state.mediaRecorder.pause();
            this.setState({start: false, recState:  'paused'})
        }
    }

    stopRecHandler = () => {
        if (this.state.mediaRecorder) {
            this.state.mediaRecorder.stop();
            let mediaRecorder = this.state.mediaRecorder
            let these = this;
            mediaRecorder.onstop = function(e) {
                var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                chunks = [];
                these.state.mediaRecorder.stream.getTracks().forEach( track => 
                    track.stop())
                var reader = new FileReader();
                reader.onload = function(evt) {
                    socket.emit('audioRecChat', {msg: evt.target.result, type: 'audio', chatID: uuid()}, function(err) {
                        these.props.onTypingErr(err)
                    })
                };
                reader.onerror = function(err) {
                    console.log(err)   
                }
                reader.readAsDataURL(blob);
                these.setState({start: false, mediaRecorder: null})
            }
        }
    }

    render() {
        let recOpt = (
            <li
                onClick={this.startRecHandler}>
                <FontAwesomeIcon icon={['fas', 'play']} className="icon icon__site-main--chat__audrec--play"/>
            </li>
        );
        let stopRec = null
        let recIcnClass =  ['site-main__chat--audrec__icn']
        let sendRecClass = ['site-main__chat--audrec__control--send__rec']
        if (this.state.start) {
            recIcnClass.push('site-main__chat--audrec__icn-start')
            recOpt  = (
                <li
                    onClick={this.pauseRecHandler}>
                    <FontAwesomeIcon icon={['fas', 'pause']} className="icon icon__site-main--chat__audrec--play"/>
                </li>
            )
        }
         if (this.state.mediaRecorder) {
            sendRecClass.push('site-main__chat--audrec__control--send__rec-start')
            stopRec = (
                <li
                    onClick={this.stopRecHandler}
                    className="site-main__chat--audrec__control--stop">
                    <FontAwesomeIcon icon={['fas', 'stop']} className="icon icon__site-main--chat__audrec--stop"/>
                </li>
            );
        }

       return(
           <div className="reuse-modal-api">
               <div className="reuse-modal-api__wrapper">
                    <div className="reuse-modal-api__close">
                        <h4>Voice Recorder</h4>
                        {/* <span>close</span> */}
                        <div className="reuse-modal-api__close--wrapper">
                            <FontAwesomeIcon icon={['fas', 'times']} className="icon icon__site-main--chat__close"/>
                        </div>
                    </div>
                    <div className="site-main__chat--audrec">
                        <div className={recIcnClass.join(' ')}>
                            <FontAwesomeIcon icon={['fas', 'microphone']} className="icon icon__site-main--chat__audrec--mic"/>
                        </div>
                        <div className="site-main__chat--audrec__control-main">
                            <ul className="site-main__chat--audrec__control">
                                { recOpt }
                                {stopRec }
                                <li className="site-main__chat--audrec__control--time">
                                    12:00
                                </li>
                                <li className="site-main__chat--audrec__control--send">
                                    <span className={sendRecClass.join(' ')}>
                                        send
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
               </div>
           </div>
       )
    }
}

const mapStateToProps = state => {
    return {
        audRecBackdrop: state.cnt.audRecBackdrop
    };
 }

const mapDispatchToProps = dispatch => {
    return {
        onTypingErr: (err) => dispatch(actions.fetchCntFail(err)) ,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput); 