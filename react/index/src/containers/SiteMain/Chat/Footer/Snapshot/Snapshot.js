import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'uuid';
import { withRouter } from 'react-router-dom';

import './Snapshot.css';
import { socket, getImageURL } from '../../shared/utility';
import Loader from '../../Loader/Loader';
import axios from '../../axios';

let videoRef = React.createRef(null);
class Snapshot extends Component {
    state = {
        start: false,
        err: null,
        id: this.props.match.params.id,
        editChat: this.props.editChat
    };

    componentDidMount() {
        if (!('mediaDevices' in navigator)) {
            navigator.mediaDevices = {};
        }
        let these = this;
        if (!('getUserMedia' in navigator.mediaDevices)) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
            if (!getUserMedia) {
                return these.setState({err: 'getUserMedia is not implemented!'});
            }
        
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
            }
        }
    
        navigator.mediaDevices.getUserMedia({video: true})
            .then(function(stream) {
                videoRef.current.srcObject= stream;
                these.setState({start: true})
            })
            .catch(function(err) {
                these.setState({err, start: false})
            });
    }

     componenetDidUpdate() {
        if (JSON.stringify(this.state.editChat) !== JSON.stringify(this.props.editChat)) {
            this.setState({editChat: this.props.editChat})
        }
    }

    componentWillUnmount() {
        if (videoRef && videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }
    }

    stopRecHandler = () => {
        if (videoRef && videoRef.current) {
            getImageURL(videoRef.current).then(imageData => {
                videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                    track.stop();
                });
                if (this.state.editChat) {
                    this.uploadMedia([{file: imageData, type: 'image', format: 'png', chatID: {mainID: this.state.editChat.mainID, chatID: this.state.editChat.chatID}}])
                } else {
                    this.uploadMedia([{file: imageData, type: 'image', format: 'png',chatID: uuid()}])
                }
                this.props.closeMedia()
            }).catch(err => {
                this.setState({err})
            })
        }
    }

    closeRecHandler = () => {
        if (videoRef && videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getVideoTracks().forEach(function(track) {
                track.stop();
            });
        }
        this.props.closeMedia()
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
            axios.post(`/aroundme`, formContent, {
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
        let cnt = <Loader 
            bg/>

        if (this.state.start) {
            cnt = null
        }

       return(
           <div className="site-main__chat--cam">
               {this.state.err ? <div className="site-main__chat--err">{this.state.err.message ? this.state.err.message : this.state.err.toString()}</div> : null }
               <div className="site-main__chat--cam__wrapper">
                    {cnt }
                    <video 
                        ref={videoRef}
                        autoPlay
                        className="site-main__chat--cam__video--wrapper">
                        <p>our browser doesn't support embedded videos</p>
                    </video>
                    <div className="site-main__chat--cam__opt">
                        <button 
                            onClick={this.stopRecHandler}
                            className="site-main__chat--cam__opt--control"
                            disabled={!this.state.start}>
                            <FontAwesomeIcon icon={['fas', 'camera']} className="icon icon__site-main--chat__footer--camera"/>
                        </button>
                        <button 
                            onClick={this.closeRecHandler}
                            className="site-main__chat--cam__close">
                            <FontAwesomeIcon icon={['fas', 'times']}/>
                        </button>
                    </div>
               </div>
           </div>
       )
    }
}

export default withRouter(Snapshot); 